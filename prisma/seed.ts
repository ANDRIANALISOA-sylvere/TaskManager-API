import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash(faker.internet.password(), 10);
  const fakeUser = () => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: password,
    };
  };

  const fakerRounds = 10;
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.createMany({
      data: fakeUser(),
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
