import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import type OpenAI from "openai";

type ChatMode = "listener" | "laugh" | "brainstorm";

interface ChatInput {
  message: string;
  mode: ChatMode;
  affectiveState?: string;
  stressScore?: number;
  name?: string;
}

interface BrainDumpInput {
  text: string;
  mood?: string;
  sleep?: number;
}

const nvidiaApiKey = process.env.NVIDIA_API_KEY;
const nvidiaModelName = process.env.NVIDIA_MODEL || "deepseek-ai/deepseek-v3.2";
const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
let geminiModel: GenerativeModel | null = null;
let nvidiaClient: OpenAI | null = null;

const responseBank: Record<ChatMode, string> = {
  listener:
    "That sounds like a lot to carry. Let us name the toughest part first, then we can lighten the plan.",
  laugh:
    "Emergency comedy intervention: your syllabus is not a villain origin story, even if it is trying its best.",
  brainstorm:
    "Here is a gentle next move: pick one concept, one worked example, and one short recall round.",
};

const buildChatSystem = () => `
You are MindTrace Shift, a calm student-support assistant.
Reply in 2 to 4 sentences only.
Do not mention policies.
Do not diagnose.
Keep the tone supportive, practical, and concise.
`;

const buildChatUser = ({ affectiveState, message, mode, name, stressScore }: ChatInput) => `
Mode: ${mode}
Student name: ${name || "Student"}
Current affective state: ${affectiveState || "unknown"}
Current stress score: ${stressScore ?? "unknown"}

Mode behavior:
- listener: empathetic, reflective, grounding
- laugh: light and warm, but never mocking the student
- brainstorm: actionable and specific, focused on the next step

Student message:
${message}
`;

const buildBrainDumpSystem = () => `
You are analyzing a student's brain dump for MindTrace.
Return strict JSON only with this shape:
{
  "summary": "short summary",
  "stressSignals": ["signal1", "signal2"],
  "affectiveState": "curiosity" | "confusion" | "frustration" | "boredom",
  "suggestedAction": "short action"
}
`;

const buildBrainDumpUser = ({ mood, sleep, text }: BrainDumpInput) => `
Use the text primarily. Optional context:
- mood: ${mood || "unknown"}
- sleep hours: ${sleep ?? "unknown"}

Brain dump:
${text}
`;

const tryParseJson = <T>(value: string): T | null => {
  try {
    return JSON.parse(value) as T;
  } catch {
    const jsonMatch = value.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }

    try {
      return JSON.parse(jsonMatch[0]) as T;
    } catch {
      return null;
    }
  }
};

const getGeminiModel = () => {
  if (!geminiApiKey) {
    return null;
  }

  if (!geminiModel) {
    const client = new GoogleGenerativeAI(geminiApiKey);
    geminiModel = client.getGenerativeModel({ model: geminiModelName });
  }

  return geminiModel;
};

const getNvidiaClient = async () => {
  if (!nvidiaApiKey) {
    return null;
  }

  if (!nvidiaClient) {
    const { default: OpenAI } = await import("openai");
    nvidiaClient = new OpenAI({
      apiKey: nvidiaApiKey,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });
  }

  return nvidiaClient;
};

export const generateChatReply = async (input: ChatInput) => {
  const fallbackReply = responseBank[input.mode];
  const nvidia = await getNvidiaClient();

  if (nvidia) {
    try {
      const completion = await nvidia.chat.completions.create({
        model: nvidiaModelName,
        messages: [
          { role: "system", content: buildChatSystem() },
          { role: "user", content: buildChatUser(input) },
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 220,
      });
      const reply = completion.choices[0]?.message?.content?.trim();

      if (reply) {
        return {
          reply,
          fallbackUsed: false,
          provider: "nvidia",
        };
      }
    } catch {
      // fall through to Gemini or local fallback
    }
  }

  const model = getGeminiModel();

  if (!model) {
    return {
      reply: fallbackReply,
      fallbackUsed: true,
      provider: "local",
    };
  }

  try {
    const result = await model.generateContent(`${buildChatSystem()}\n${buildChatUser(input)}`);
    const reply = result.response.text().trim();

    return {
      reply: reply || fallbackReply,
      fallbackUsed: !reply,
      provider: "gemini",
    };
  } catch {
    return {
      reply: fallbackReply,
      fallbackUsed: true,
      provider: "local",
    };
  }
};

export const extractBrainDumpInsights = async (input: BrainDumpInput) => {
  const fallback = {
    summary: input.text.slice(0, 140),
    stressSignals: ["overwhelm"],
    affectiveState: "confusion",
    suggestedAction: "Break the problem into one small task and take a short reset before continuing.",
    fallbackUsed: true,
    provider: "local",
  } as const;

  const nvidia = await getNvidiaClient();

  if (nvidia) {
    try {
      const completion = await nvidia.chat.completions.create({
        model: nvidiaModelName,
        messages: [
          { role: "system", content: buildBrainDumpSystem() },
          { role: "user", content: buildBrainDumpUser(input) },
        ],
        temperature: 0.4,
        top_p: 0.9,
        max_tokens: 300,
      });
      const raw = completion.choices[0]?.message?.content?.trim() || "";
      const parsed = tryParseJson<{
        summary?: string;
        stressSignals?: string[];
        affectiveState?: "curiosity" | "confusion" | "frustration" | "boredom";
        suggestedAction?: string;
      }>(raw);

      if (parsed) {
        return {
          summary: parsed.summary || fallback.summary,
          stressSignals: parsed.stressSignals?.length ? parsed.stressSignals : fallback.stressSignals,
          affectiveState: parsed.affectiveState || fallback.affectiveState,
          suggestedAction: parsed.suggestedAction || fallback.suggestedAction,
          fallbackUsed: false,
          provider: "nvidia",
        };
      }
    } catch {
      // fall through to Gemini or local fallback
    }
  }

  const model = getGeminiModel();

  if (!model) {
    return fallback;
  }

  try {
    const result = await model.generateContent(`${buildBrainDumpSystem()}\n${buildBrainDumpUser(input)}`);
    const raw = result.response.text().trim();
    const parsed = tryParseJson<{
      summary?: string;
      stressSignals?: string[];
      affectiveState?: "curiosity" | "confusion" | "frustration" | "boredom";
      suggestedAction?: string;
    }>(raw);

    if (!parsed) {
      return fallback;
    }

    return {
      summary: parsed.summary || fallback.summary,
      stressSignals: parsed.stressSignals?.length ? parsed.stressSignals : fallback.stressSignals,
      affectiveState: parsed.affectiveState || fallback.affectiveState,
      suggestedAction: parsed.suggestedAction || fallback.suggestedAction,
      fallbackUsed: false,
      provider: "gemini",
    };
  } catch {
    return fallback;
  }
};
