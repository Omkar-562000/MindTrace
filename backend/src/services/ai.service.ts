import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

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

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
let geminiModel: GenerativeModel | null = null;

const responseBank: Record<ChatMode, string> = {
  listener:
    "That sounds like a lot to carry. Let us name the toughest part first, then we can lighten the plan.",
  laugh:
    "Emergency comedy intervention: your syllabus is not a villain origin story, even if it is trying its best.",
  brainstorm:
    "Here is a gentle next move: pick one concept, one worked example, and one short recall round.",
};

const buildChatPrompt = ({ affectiveState, message, mode, name, stressScore }: ChatInput) => `
You are MindTrace Shift, a calm student-support assistant for a hackathon demo.
Reply in 2 to 4 sentences only.
Do not mention policies.
Do not diagnose.
Keep the tone supportive, practical, and concise.
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

const buildBrainDumpPrompt = ({ mood, sleep, text }: BrainDumpInput) => `
You are analyzing a student's brain dump for a hackathon demo app called MindTrace.
Return strict JSON only with this shape:
{
  "summary": "short summary",
  "stressSignals": ["signal1", "signal2"],
  "affectiveState": "curiosity" | "confusion" | "frustration" | "boredom",
  "suggestedAction": "short action"
}

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

export const generateChatReply = async (input: ChatInput) => {
  const fallbackReply = responseBank[input.mode];
  const model = getGeminiModel();

  if (!model) {
    return {
      reply: fallbackReply,
      fallbackUsed: true,
      provider: "local",
    };
  }

  try {
    const result = await model.generateContent(buildChatPrompt(input));
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

  const model = getGeminiModel();

  if (!model) {
    return fallback;
  }

  try {
    const result = await model.generateContent(buildBrainDumpPrompt(input));
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
