import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
}

export async function createUser(data) {
    return await prisma.user.create({ 
        data,
        select: { id: true, email: true, role: true }
    });
}
