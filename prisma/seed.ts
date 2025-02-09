import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.setting.upsert({
    where: { key: "file_log_retention_days" },
    update: {},
    create: { key: "file_log_retention_days", value: "28" },
  });

  await prisma.setting.upsert({
    where: { key: "db_log_retention_days" },
    update: {},
    create: { key: "db_log_retention_days", value: "180" },
  });

  console.log("Settings seeded successfully.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
