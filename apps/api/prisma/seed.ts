// apps/api/prisma/seed.ts (opcional)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.aluno.upsert({
    where: { email: 'demo@ntt.com' },
    update: {},
    create: { nome: 'Demo', email: 'demo@ntt.com' }
  });
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
