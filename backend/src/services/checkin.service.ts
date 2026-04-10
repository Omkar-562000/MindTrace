import db from "../database/db";

export interface CheckinRecord {
  id: number;
  mood: string;
  sleep: number;
  timestamp: string;
}

interface CreateCheckinInput {
  userId: number;
  mood: string;
  sleep: number;
}

export const createCheckin = ({ userId, mood, sleep }: CreateCheckinInput): CheckinRecord => {
  const timestamp = new Date().toISOString();
  const result = db
    .prepare("INSERT INTO checkins (user_id, mood, sleep, timestamp) VALUES (?, ?, ?, ?)")
    .run(userId, mood.trim(), sleep, timestamp);

  return {
    id: Number(result.lastInsertRowid),
    mood: mood.trim(),
    sleep,
    timestamp,
  };
};

export const getCheckinHistory = (userId: number): CheckinRecord[] => {
  return db
    .prepare(
      "SELECT id, mood, sleep, timestamp FROM checkins WHERE user_id = ? ORDER BY timestamp DESC",
    )
    .all(userId) as CheckinRecord[];
};

export const getLatestCheckin = (userId: number): CheckinRecord | undefined => {
  return db
    .prepare(
      "SELECT id, mood, sleep, timestamp FROM checkins WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1",
    )
    .get(userId) as CheckinRecord | undefined;
};
