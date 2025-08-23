import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  try {
    // Hash the super admin password
    const hashedPassword = await bcrypt.hash("12345678", 10)

    // Create or update the super admin user
    await prisma.user.upsert({
      where: { email: "admin@biafotech.com" },
      update: {
        password: hashedPassword,
        role: "SUPER_ADMIN",
        isActive: true,
      },
      create: {
        email: "admin@biafotech.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    })
  } catch (error) {
    console.error("Error during seeding:", error)
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
