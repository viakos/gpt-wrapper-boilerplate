import { logError } from "./logger";

export const captureClientError = (error: Error, source = "Client") => {
  logError(`Client Error from ${source}`, { message: error.message, stack: error.stack });
};
