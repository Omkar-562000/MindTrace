export interface AppError extends Error {
  statusCode?: number;
}

export const createAppError = (statusCode: number, message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
};
