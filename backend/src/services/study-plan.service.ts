import { getLatestCheckin } from "./checkin.service";
import { analyzeMindState } from "./analyze.service";
import { createAppError } from "../utils/app-error";

export const getStudyPlan = (userId: number) => {
  const latestCheckin = getLatestCheckin(userId);

  if (!latestCheckin) {
    throw createAppError(404, "No check-in found for this user");
  }

  const analysis = analyzeMindState({
    mood: latestCheckin.mood,
    sleep: latestCheckin.sleep,
  });

  if (analysis.state === "critical") {
    return {
      stressScore: analysis.stressScore,
      state: analysis.state,
      plan: [
        "Skip heavy sessions for now.",
        "Do one 20-minute revision block only.",
        "Rest, hydrate, and ask for support before studying more.",
      ],
    };
  }

  if (analysis.state === "declining") {
    return {
      stressScore: analysis.stressScore,
      state: analysis.state,
      plan: [
        "Study in 25-minute blocks.",
        "Take a 10-minute break between sessions.",
        "Focus only on top 2 priorities today.",
      ],
    };
  }

  return {
    stressScore: analysis.stressScore,
    state: analysis.state,
    plan: [
      "Do two to three focused 45-minute sessions.",
      "Review notes after each session.",
      "Keep your normal break schedule.",
    ],
  };
};
