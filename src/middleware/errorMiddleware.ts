import { NextApiRequest, NextApiResponse } from "next";
import { logError } from "@/utils/logger";

export default function errorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      logError("API Error", { message: error.message, stack: error.stack });

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
}
