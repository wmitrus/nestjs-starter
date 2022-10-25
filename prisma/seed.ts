import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      hash: 'jos8efh498wh4f',
      firstName: 'First',
      lastName: 'User',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      hash: 'jos8efh498wh4f',
      firstName: 'Second',
      lastName: 'User',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'user3@example.com',
      hash: 'jos8efh498wh4f',
      firstName: 'Second',
      lastName: 'User',
    },
  });

  console.log({ user1, user2, user3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
