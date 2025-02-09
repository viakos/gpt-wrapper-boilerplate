import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const getLogFilePath = (type: "app" | "error" | "warn") => {
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    return path.join(logDir, `${type}-${date}.log`);
  };
// Function to log messages to both file and database
export const log = async (type: "error" | "app" | "warn", message: string, metadata: any = {}) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message} ${JSON.stringify(metadata)}\n`;
  
    fs.appendFileSync(getLogFilePath(type), logMessage, "utf8");
  
    await prisma.log.create({
      data: { type, message, metadata },
    });
  };
  
  // Define log functions
  export const logInfo = (message: string, metadata?: any) => log("app", message, metadata);
  export const logWarn = (message: string, metadata?: any) => log("warn", message, metadata);
  export const logError = (message: string, metadata?: any) => log("error", message, metadata);