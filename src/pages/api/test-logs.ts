import { NextApiRequest, NextApiResponse } from "next";
import { logInfo, logWarn, logError } from "@/utils/logger";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  logInfo("Test log - info", { endpoint: "/api/test-logs" });
  logWarn("Test log - warning", { user: "test_user" });
  logError("Test log - error", { message: "Something went wrong" });

  res.status(200).json({ success: true, message: "Logs have been written!" });
}
