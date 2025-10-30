import { PrismaClient } from '../generated/prisma';

// Instancia única de Prisma (singleton pattern)
const prisma = new PrismaClient({
  log: ['error', 'warn'], // Solo errores y advertencias en producción
});

// Desconectar cuando la aplicación se cierre
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
