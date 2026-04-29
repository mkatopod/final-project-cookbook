import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/*export async function getAllRecipes() {
    return await prisma.recipe.findMany({
        select: {
            id: true,
            title: true,
            instructions: true,
        }
    });
}*/
export async function getAllRecipes() {
  console.log('Entering recipeRepo.getAllRecipes');
  try {
    const recipes = await prisma.recipe.findMany({
      select: { id: true, title: true, instructions: true, authorId: true },
    });
    console.log('Fetched from DB:', recipes);
    return recipes;
  } catch (err) {
    console.error('Error in recipeRepo.getAllRecipes:', err);
    throw err;
  }
}


export async function getRecipeById(id) {
    return await prisma.recipe.findUnique({ 
        where: { id: id },
        select: {
            id: true,
            title: true,
            instructions: true
        }
    });
}

export async function createRecipe(data) {
    return await prisma.recipe.create({ 
        data,
        select: {
            id: true,
            title: true,
            instructions: true
        }
    });
}

export async function updateRecipe(id, data) {
    return await prisma.recipe.update({ 
        where: { id: id },
        data,
        select: {
            id: true,
            title: true,
            instructions: true
        }
    });
}

export async function deleteRecipe(id) {
    await prisma.recipe.delete({ where: { id: id } });
}
