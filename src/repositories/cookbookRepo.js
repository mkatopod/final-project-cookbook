import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCookbooks() {
    return await prisma.cookbook.findMany({
        select: {
            cookbook_id: true,
            user_id: true,
            date: true,
            name: true
        }
    });
}

export async function getCookbookById(id) {
    return await prisma.cookbook.findUnique({ 
        where: { cookbook_id: id },
        select: {
            cookbook_id: true,
            user_id: true,
            date: true,
            name: true
        }
    });
}

export async function createCookbook(data) {
    return await prisma.cookbook.create({ 
        data,
        select: {
            cookbook_id: true,
            user_id: true,
            date: true,
            name: true
        }
    });
}

export async function updateCookbook(id, data) {
    return await prisma.cookbook.update({
        where: { cookbook_id: id },
        data,
        select: {
            cookbook_id: true,
            user_id: true,
            date: true,
            name: true
        }
    });
}

export async function deleteCookbook(id) {
    await prisma.cookbook.delete({ where: { cookbook_id: id } });
}
