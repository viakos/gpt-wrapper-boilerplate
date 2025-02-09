# GPT Wrapper Boilerplate

## 🚀 Overview
This is a **GPT wrapper boilerplate** built with **Next.js, Node.js, SQLite (PostgreSQL-ready)**, and **Prisma**.  
It provides **Google authentication, user roles, structured logging, and log rotation** to serve as a foundation for multiple AI-driven applications.

## 🛠️ Features Implemented

### ✅ **Authentication**
- Uses **NextAuth.js** with **Google OAuth**.
- Stores authenticated users in a **SQLite database** (future-proofed for PostgreSQL).
- **User Roles & Permissions:**
  - **Free**: Basic access.
  - **Premium**: Advanced features.
  - **Admin**: Full access to the system.

### ✅ **Logging System**
- Logs are stored in **both files and the database**.
- **Structured log storage** (message + metadata as JSON in the database).
- **Log rotation process:**
  - **Daily logs** (`app-YYYY-MM-DD.log`, `error-YYYY-MM-DD.log`).
  - **Weekly compression** (`.tar.gz` archives of the previous week's logs).
  - **Automatic deletion** of old `.tar.gz` archives based on retention settings.
  - **Database logs are stored permanently (default = 180 days)**.

### ✅ **Configurable Settings (Stored in Database)**
| Setting Key            | Description                                           | Default |
|------------------------|-------------------------------------------------------|---------|
| `file_log_retention_days` | How many days to keep `.tar.gz` log archives before deleting | **28** days |
| `db_log_retention_days`   | How long to keep logs in the database (`0` = never delete)  | **180** days |

---

## ⚙️ **Installation & Setup**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/gpt-wrapper-boilerplate.git
cd gpt-wrapper-boilerplate
```

### **2️⃣ Install Dependencies**
```bash
npm install
```
### **3️⃣ Set Up Environment Variables**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL="file:./prisma/dev.db"  # Change when migrating to PostgreSQL
```

### **4️⃣ Set Up Database**
```bash
npx prisma migrate dev --name init
npx prisma db seed
```
### **5️⃣ Start the Development Server**
```bash
npm run dev
```

## **🔥 Logging System Details**
- Logs are stored in:
    - Files (logs/app-YYYY-MM-DD.log, logs/error-YYYY-MM-DD.log).
    - Database (logs table) with structured messages & metadata.
- Log Rotation:
    - Every Monday: Compress logs from the previous week into week-WXX-YYYY.tar.gz.
    - Retention settings are stored in the database (file_log_retention_days, db_log_retention_days).
    - Database logs 180-day retention configurable.

## **⏳ Automated Log Maintenance**
A cron job should be set up to rotate and delete old logs automatically.

**Run Log Maintenance Script Manually**
```bash
npm run log-maintenance
```
**Set Up a Cron Job for Automation**
To run log maintenance every night:
```bash
crontab -e
```
Add:
```bash
0 0 * * * cd /path/to/project && npm run log-maintenance
```

## **📊 Future Improvements** 
🚀 Next Steps & Features to Implement:

- Admin Dashboard: Modify user roles & log retention settings via UI.
- Real-Time Log Viewer: View live logs from the database.
- AI API Integration: Connect OpenAI API with role-based access control.
- Payments & Monetization: Allow premium users to upgrade.

## **👨‍💻 Contributing**
1. Fork the repository.
2. Create a new branch (feature-xyz).
3. Commit your changes.
4. Push to your fork & submit a PR.

## **📝 License**
This project is licensed under the MIT License.

## **🚀 Support & Questions**
For issues, please open a GitHub issue.