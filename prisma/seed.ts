import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const sampleUsers = [
    {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
    {
      email: 'user@example.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'user',
    },
    {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: hashedPassword,
      role: 'user',
    },
  ]

  for (const userData of sampleUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (!existingUser) {
      const user = await prisma.user.create({
        data: userData,
      })
      console.log(`Created user: ${user.email}`)
    } else {
      console.log(`User already exists: ${userData.email}`)
    }
  }

  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 