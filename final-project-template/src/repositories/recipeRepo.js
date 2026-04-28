import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllRecipes() {
    return await prisma.recipes.findMany({
        select: {
            recipe_id: true,
            title: true,
            instructions: true,
        }
    });
}

export async function getRecipeById(id) {
    return await prisma.recipes.findUnique({ 
        where: { recipe_id: id },
        select: {
            recipe_id: true,
            title: true,
            instructions: true
        }
    });
}

export async function createRecipe(data) {
    return await prisma.recipes.create({ 
        data,
        select: {
            recipe_id: true,
            title: true,
            instructions: true
        }
    });
}

export async function updateRecipe(id, data) {
    return await prisma.recipes.update({ 
        where: { recipe_id: id },
        data,
        select: {
            recipe_id: true,
            title: true,
            instructions: true
        }
    });
}

export async function deleteRecipe(id) {
    await prisma.recipes.delete({ where: { recipe_id: id } });
}
