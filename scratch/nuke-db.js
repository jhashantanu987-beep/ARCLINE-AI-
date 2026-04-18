const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function nuke() {
  console.log("Cleaning up database...");
  try {
    await prisma.callLog.deleteMany({});
    await prisma.appointment.deleteMany({});
    await prisma.patient.deleteMany({});
    // We keep the Users so you don't have to sign up again, 
    // but all their clinical data is gone.
    console.log("✅ Database cleared. All patients, calls, and appointments deleted.");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

nuke();
