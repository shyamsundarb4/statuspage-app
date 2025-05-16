const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const services = [
  { name: "Website", status: "OPERATIONAL" },
  { name: "API", status: "DEGRADED_PERFORMANCE" },
  { name: "Database", status: "OPERATIONAL" },
  { name: "Authentication", status: "MAJOR_OUTAGE" },
  { name: "Email Delivery", status: "PARTIAL_OUTAGE" },
  { name: "File Storage", status: "OPERATIONAL" },
  { name: "Payment Gateway", status: "OPERATIONAL" },
  { name: "Admin Dashboard", status: "UNDER_MAINTENANCE" },
  { name: "Mobile App", status: "OPERATIONAL" },
  { name: "Third-Party Integrations", status: "DEGRADED_PERFORMANCE" }
];

async function main() {
  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
  console.log("Seeded services!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
