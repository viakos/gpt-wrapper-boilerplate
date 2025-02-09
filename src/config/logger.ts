import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'logs', 'app.log');
if (!fs.existsSync(path.dirname(logFile))) {
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const log = (message: string, level: 'INFO' | 'ERROR' | 'DEBUG' = 'INFO') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
};

export default log;