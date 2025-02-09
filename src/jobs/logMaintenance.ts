import { archiveOldLogs, deleteOldLogArchives } from "../utils/logRotation.js";


export async function runLogMaintenance() {
  await archiveOldLogs();
  await deleteOldLogArchives();
}
