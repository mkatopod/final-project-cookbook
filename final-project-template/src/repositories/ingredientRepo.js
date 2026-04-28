import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllIngredients() {
    return await prisma.ingredient.findMany({
        select: {
            ingredient_id: true,
            name: true,
            category: true
        }
    });
}

export async function getIngredientById(id) {
    return await prisma.ingredient.findUnique({ 
        where: { ingredient_id: id },
        select: {
            ingredient_id: true,
            name: true,
            category: true
        }
    });
}

export async function createIngredient(data) {
    return await prisma.ingredient.create({ 
        data,
        select: {
            ingredient_id: true,
            name: true,
            category: true
        }
    });
}

export async function updateIngredient(id, data) {
    return await prisma.ingredient.update({
        where: { ingredient_id: id },
        data,
        select: {
            ingredient_id: true,
            name: true,
            category: true
        }
    });
}

export async function deleteIngredient(id) {
    await prisma.ingredient.delete({ where: { ingredient_id: id } });
}
