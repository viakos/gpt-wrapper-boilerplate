import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "@/middleware/errorMiddleware";
import { logInfo } from "@/utils/logger";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  logInfo("API Request Received", { method: req.method, url: req.url });

  if (req.method !== "GET") {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
    return;
  }

  res.status(200).json({ success: true, message: "Logging system is working!" });
}

export default errorHandler(handler);
