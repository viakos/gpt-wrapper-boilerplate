import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import * as tar from "tar";



const prisma = new PrismaClient();
const logDir = path.join(process.cwd(), "logs");

// Get retention settings from DB
async function getRetentionSettings() {
  const fileLogRetention = await prisma.setting.findUnique({ where: { key: "file_log_retention_days" } });
  return {
    fileRetentionDays: fileLogRetention ? parseInt(fileLogRetention.value) : 28,
  };
}

// Compress logs older than 7 days (weekly compression)
export async function archiveOldLogs() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekNumber = Math.ceil(oneWeekAgo.getDate() / 7);
  const year = oneWeekAgo.getFullYear();
  const archiveName = `logs/week-W${weekNumber}-${year}.tar.gz`;
  
  // Get all old log files
  const files = fs.readdirSync(logDir).filter(file => file.endsWith(".log") && file < `app-${oneWeekAgo.toISOString().split("T")[0]}.log`);
  if (files.length === 0) return;

  // Create a tar.gz archive
  await tar.c({ gzip: true, file: archiveName, cwd: logDir }, files);
  console.log(`Archived logs to ${archiveName}`);

  // Delete individual daily logs
  files.forEach(file => fs.unlinkSync(path.join(logDir, file)));
}

// Delete old archives beyond retention policy
export async function deleteOldLogArchives() {
  const { fileRetentionDays } = await getRetentionSettings();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - fileRetentionDays);

  fs.readdirSync(logDir).forEach(file => {
    if (file.endsWith(".tar.gz")) {
      const match = file.match(/W(\d+)-(\d+).tar.gz/);
      if (match) {
        const weekNum = parseInt(match[1]);
        const year = parseInt(match[2]);
        const archiveDate = new Date(year, 0, (weekNum - 1) * 7);

        if (archiveDate < cutoffDate) {
          fs.unlinkSync(path.join(logDir, file));
          console.log(`Deleted old archive: ${file}`);
        }
      }
    }
  });
}
