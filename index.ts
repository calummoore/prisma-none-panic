import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jon',
    }    
  })

  const userId = user.id
  await prisma.code.create({
    data: {
      id: 't123',
      type: 'resetpassword',
      user: { connect: { id: userId } },
      singleUse: true,
    },
  })  
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })