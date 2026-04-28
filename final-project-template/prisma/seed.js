//npm run seed
//This script creates sample users, ingredients, recipes, and cookbooks

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting the database seed...");

    //Create two users: one ADMIN and one regular USER
    console.log("\nCreating users...");

    //These are the passwords and user/admin info needed!!
    const adminPassword = await bcrypt.hash("admin123", 10);
    const regularPassword = await bcrypt.hash("user123", 10);

    const admin = await prisma.user.create({
        data: {
            email: "admin@example.com",
            password: adminPassword,
            role: "ADMIN",
        },
    });
    console.log(`Admin user created: ${admin.email}`);

    const regularUser = await prisma.user.create({
        data: {
            email: "user@example.com",
            password: regularPassword,
            role: "USER",
        },
    });
    console.log(`Regular user created: ${regularUser.email}`);

    //Create ingredients across categories
    console.log("\nCreating ingredients...");

    const ingredients = await Promise.all([
        prisma.ingredient.create({ data: { name: "Flour", category: "Baking" } }),
        prisma.ingredient.create({ data: { name: "Sugar", category: "Baking" } }),
        prisma.ingredient.create({ data: { name: "Baking Powder", category: "Baking" } }),
        prisma.ingredient.create({ data: { name: "Vanilla Extract", category: "Baking" } }),
        prisma.ingredient.create({ data: { name: "Eggs", category: "Dairy" } }),
        prisma.ingredient.create({ data: { name: "Milk", category: "Dairy" } }),
        prisma.ingredient.create({ data: { name: "Butter", category: "Dairy" } }),
        prisma.ingredient.create({ data: { name: "Cheese", category: "Dairy" } }),
        prisma.ingredient.create({ data: { name: "Olive Oil", category: "Oil" } }),
        prisma.ingredient.create({ data: { name: "Garlic", category: "Produce" } }),
        prisma.ingredient.create({ data: { name: "Tomato", category: "Produce" } }),
        prisma.ingredient.create({ data: { name: "Onion", category: "Produce" } }),
        prisma.ingredient.create({ data: { name: "Salt", category: "Seasoning" } }),
        prisma.ingredient.create({ data: { name: "Black Pepper", category: "Seasoning" } }),
    ]);
    console.log(`${ingredients.length} ingredients created`);

    //Create recipes owned by different users
    console.log("\nCreating recipes...");

    //Regular user's recipes
    const recipe1 = await prisma.recipe.create({
        data: {
            title: "Classic Pancakes",
            instructions: JSON.stringify([
                "Mix flour, sugar, and baking powder",
                "Add eggs and milk",
                "Cook on griddle until golden brown",
                "Serve with butter and syrup"
            ]),
            authorId: regularUser.id,
        },
    });

    const recipe2 = await prisma.recipe.create({
        data: {
            title: "Chocolate Cake",
            instructions: JSON.stringify([
                "Mix flour, sugar, and cocoa powder",
                "Add eggs, milk, and vanilla extract",
                "Bake at 350°F for 30 minutes",
                "Cool and decorate as desired"
            ]),
            authorId: regularUser.id,
        },
    });

    const recipe3 = await prisma.recipe.create({
        data: {
            title: "Vegetable Omelette",
            instructions: JSON.stringify([
                "Beat 3 eggs with salt and pepper",
                "Heat butter in pan",
                "Pour eggs and add vegetables",
                "Cook until set and fold in half"
            ]),
            authorId: regularUser.id,
        },
    });

    //Admin's recipes
    const recipe4 = await prisma.recipe.create({
        data: {
            title: "Pasta Carbonara",
            instructions: JSON.stringify([
                "Cook pasta until al dente",
                "Fry bacon until crispy",
                "Mix eggs with cheese",
                "Combine pasta with bacon and egg mixture",
                "Serve immediately"
            ]),
            authorId: admin.id,
        },
    });

    const recipe5 = await prisma.recipe.create({
        data: {
            title: "Tomato Garlic Pasta",
            instructions: JSON.stringify([
                "Heat olive oil in pan",
                "Sauté garlic and tomatoes",
                "Add salt and pepper to taste",
                "Simmer for 15 minutes",
                "Toss with cooked pasta"
            ]),
            authorId: admin.id,
        },
    });

    console.log(`5 recipes created`);

    //This links recipes with ingredients
    console.log("\nLinking recipes with ingredients...");

    await prisma.recipeIngredient.createMany({
        data: [
            //Pancakes ingredients
            //Flour, Sugar, Baking Powder, Eggs, Milk
            { recipeId: recipe1.id, ingredientId: ingredients[0].id, category_type: "dry" }, 
            { recipeId: recipe1.id, ingredientId: ingredients[1].id, category_type: "dry" }, 
            { recipeId: recipe1.id, ingredientId: ingredients[2].id, category_type: "dry" }, 
            { recipeId: recipe1.id, ingredientId: ingredients[4].id, category_type: "dairy" }, 
            { recipeId: recipe1.id, ingredientId: ingredients[5].id, category_type: "dairy" }, 

            //Cake ingredients
            //Flour, Sugar, Eggs, Milk, Vanilla
            { recipeId: recipe2.id, ingredientId: ingredients[0].id, category_type: "dry" }, 
            { recipeId: recipe2.id, ingredientId: ingredients[1].id, category_type: "dry" }, 
            { recipeId: recipe2.id, ingredientId: ingredients[4].id, category_type: "dairy" }, 
            { recipeId: recipe2.id, ingredientId: ingredients[5].id, category_type: "dairy" }, 
            { recipeId: recipe2.id, ingredientId: ingredients[3].id, category_type: "flavoring" }, 

            //Omelette ingredients
            //Eggs, Butter, Garlic, Tomato, Salt
            { recipeId: recipe3.id, ingredientId: ingredients[4].id, category_type: "dairy" }, 
            { recipeId: recipe3.id, ingredientId: ingredients[6].id, category_type: "dairy" }, 
            { recipeId: recipe3.id, ingredientId: ingredients[9].id, category_type: "vegetable" }, 
            { recipeId: recipe3.id, ingredientId: ingredients[10].id, category_type: "vegetable" }, 
            { recipeId: recipe3.id, ingredientId: ingredients[12].id, category_type: "seasoning" }, 

            //Pasta ingredients
            //Cheese, Eggs, Salt, Black Pepper
            { recipeId: recipe4.id, ingredientId: ingredients[7].id, category_type: "protein" }, 
            { recipeId: recipe4.id, ingredientId: ingredients[4].id, category_type: "dairy" },
            { recipeId: recipe4.id, ingredientId: ingredients[12].id, category_type: "seasoning" }, 
            { recipeId: recipe4.id, ingredientId: ingredients[13].id, category_type: "seasoning" }, 

            //Tomato Garlic Pasta ingredients
            //Olive Oil, Garlic, Tomato, Salt, Black Pepper
            { recipeId: recipe5.id, ingredientId: ingredients[8].id, category_type: "oil" }, 
            { recipeId: recipe5.id, ingredientId: ingredients[9].id, category_type: "vegetable" }, 
            { recipeId: recipe5.id, ingredientId: ingredients[10].id, category_type: "vegetable" }, 
            { recipeId: recipe5.id, ingredientId: ingredients[12].id, category_type: "seasoning" }, 
            { recipeId: recipe5.id, ingredientId: ingredients[13].id, category_type: "seasoning" }, 
        ],
    });
    console.log(`Recipe ingredients linked`);

    //User specific cookbooks with recipes
    console.log("\nCreating cookbooks...");

    const cookbook1 = await prisma.cookbook.create({
        data: {
            name: "Breakfast Dishes",
            userId: regularUser.id,
        },
    });

    const cookbook2 = await prisma.cookbook.create({
        data: {
            name: "Desserts & Sweet Treats",
            userId: regularUser.id,
        },
    });

    const cookbook3 = await prisma.cookbook.create({
        data: {
            name: "Quick Dinner Ideas",
            userId: admin.id,
        },
    });

    console.log(`3 cookbooks have been created`);

    //Links cookbooks with recipes
    console.log("\nAdding recipes to cookbooks...");

    await prisma.cookbookRecipe.createMany({
        data: [
            //Breakfast Dishes (user)
            //Pancakes and Omelette
            { cookbookId: cookbook1.id, recipeId: recipe1.id }, 
            { cookbookId: cookbook1.id, recipeId: recipe3.id }, 

            //Desserts & Sweet Treats (user)
            //Cake only
            { cookbookId: cookbook2.id, recipeId: recipe2.id }, 

            //Quick Dinner Ideas (admin)
            //Carbonara and Tomato Garlic Pasta
            { cookbookId: cookbook3.id, recipeId: recipe4.id }, 
            { cookbookId: cookbook3.id, recipeId: recipe5.id }, 
        ],
    });

    console.log(`Recipes added to cookbooks!`);

    console.log("Database seeding completed successfully!");

}

main()
    .then(async () => {
        await prisma.$disconnect();
        process.exit(0);
    })
    .catch(async (e) => {
        console.error("Seeding error:", e);
        await prisma.$disconnect();
        process.exit(1);
    });

