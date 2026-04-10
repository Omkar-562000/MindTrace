export type MindState = "stable" | "declining" | "critical";

export interface AnalyzeInput {
  mood: string;
  sleep: number;
}

export interface AnalyzeResult {
  stressScore: number;
  state: MindState;
  recommendation: string;
}

const getState = (stressScore: number): MindState => {
  if (stressScore > 70) {
    return "critical";
  }

  if (stressScore > 60) {
    return "declining";
  }

  return "stable";
};

const getRecommendation = (state: MindState): string => {
  switch (state) {
    case "critical":
      return "Pause intense study, rest, and reach out to a trusted person or counselor today.";
    case "declining":
      return "Reduce workload, take short breaks, and follow a lighter study block today.";
    default:
      return "You look stable. Keep a steady routine with breaks and hydration.";
  }
};

export const analyzeMindState = ({ mood, sleep }: AnalyzeInput): AnalyzeResult => {
  const normalizedMood = mood.trim().toLowerCase();
  let stressScore = 50;

  if (normalizedMood.includes("stressed")) {
    stressScore += 20;
  }

  if (normalizedMood.includes("sad")) {
    stressScore += 15;
  }

  if (sleep < 6) {
    stressScore += 15;
  }

  const state = getState(stressScore);

  return {
    stressScore,
    state,
    recommendation: getRecommendation(state),
  };
};
