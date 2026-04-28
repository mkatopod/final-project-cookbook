# Database Seed Script Documentation

## Overview

The seed script (`prisma/seed.js`) populates your database with sample data for testing and development. It includes users with different roles, sample recipes, ingredients, and cookbooks to support testing of both ownership-based and role-based authorization.

## What Gets Seeded

### Users (Role-Based Authorization Testing)
- **Admin User**: `admin@example.com` / `admin123`
  - Role: ADMIN
  - Owns 2 recipes: Pasta Carbonara, Tomato Garlic Pasta
  
- **Regular User**: `user@example.com` / `user123`
  - Role: USER
  - Owns 3 recipes: Pancakes, Chocolate Cake, Vegetable Omelette

### Resources

**Ingredients**: 14 sample ingredients across 5 categories
- Baking: Flour, Sugar, Baking Powder, Vanilla Extract
- Dairy: Eggs, Milk, Butter, Cheese
- Oil: Olive Oil
- Produce: Garlic, Tomato, Onion
- Seasoning: Salt, Black Pepper

**Recipes**: 5 sample recipes with step-by-step instructions
- Associated with different users to test ownership-based authorization
- Each recipe linked to relevant ingredients

**Cookbooks**: 3 sample cookbooks
- 2 owned by regular user
- 1 owned by admin user
- Contain curated recipes for testing collection functionality

## Running the Seed Script

### Local Development

1. Ensure your database is set up:
   ```bash
   npx prisma migrate dev
   ```

2. Run the seed script:
   ```bash
   npm run seed
   ```

3. Expected output:
   ```
   🌱 Starting database seed...
   ✅ Database seeding completed successfully!
   📊 Test Credentials:
      Admin:  admin@example.com / admin123
      User:   user@example.com / user123
   ```

### Resetting the Database

If you need to reset and reseed:
```bash
npx prisma migrate reset
```

This will:
1. Drop the database
2. Recreate it with migrations
3. Automatically run the seed script

## Testing Authorization

### Testing Ownership-Based Authorization

- Regular User's recipes:
  - Login with `user@example.com` / `user123`
  - Can view, edit, delete their own recipes (Pancakes, Chocolate Cake, Omelette)
  - Cannot modify admin's recipes
  
- Admin's recipes:
  - Login with `admin@example.com` / `admin123`
  - Can view, edit, delete their own recipes (Carbonara, Tomato Pasta)

### Testing Role-Based Authorization

- **ADMIN role** (`admin@example.com`):
  - Can perform all operations
  - Can manage system-wide resources
  
- **USER role** (`user@example.com`):
  - Can view public resources
  - Can create and manage own resources
  - Cannot access admin-only features

## Configuration for Render Deployment

### Option 1: Using render.yaml (Recommended)

A `render.yaml` file is included that configures:
1. Build command: Runs migrations and seed script
2. Start command: Launches the application

**Key build command**:
```yaml
buildCommand: npm install && npx prisma migrate deploy && npx prisma db seed
```

### Option 2: Using Render Dashboard

If not using `render.yaml`:

1. Go to your Render Dashboard
2. Create a new Web Service
3. Connect your GitHub repository
4. In the **Build Command** field, enter:
   ```bash
   npm install && npx prisma migrate deploy && npx prisma db seed
   ```
5. In the **Start Command** field, enter:
   ```bash
   npm run dev
   ```
6. Add environment variable:
   - `DATABASE_URL`: Your Postgres database connection string

### Handling Existing Data

If you redeploy and want to preserve data, modify the seed script in `prisma/seed.js`:

```javascript
// Add this at the beginning of main() to check for existing data
const userCount = await prisma.user.count();
if (userCount > 0) {
    console.log("Database already seeded. Skipping...");
    return;
}
```

## Modifying the Seed Data

To customize seed data:

1. Open `prisma/seed.js`
2. Modify the data objects (ingredients, recipes, users, etc.)
3. Run `npm run seed` to test locally
4. Commit and push changes
5. Render will automatically run the updated seed script on next deployment

## Example: Adding More Sample Data

```javascript
// Add a new recipe
const newRecipe = await prisma.recipe.create({
    data: {
        title: "Your Recipe Name",
        instructions: JSON.stringify([
            "Step 1",
            "Step 2",
            "Step 3"
        ]),
        authorId: regularUser.id, // or admin.id
    },
});

// Link ingredients
await prisma.recipeIngredient.createMany({
    data: [
        { recipeId: newRecipe.id, ingredientId: ingredients[0].id, category_type: "dry" },
        // ... more ingredients
    ],
});
```

## Troubleshooting

### "No database connection"
- Ensure DATABASE_URL is set in your `.env` file locally
- On Render, check that DATABASE_URL environment variable is configured

### "Seed script fails with 'Unique constraint failed'"
- Database already has data from a previous seed
- Run `npx prisma migrate reset` to clear and reseed
- Or modify seed script to check for existing data (see above)

### "Migration pending"
- Run `npx prisma migrate dev` before seeding
- Ensure all migrations are applied

## Next Steps

1. ✅ Test login with provided credentials
2. ✅ Verify recipes appear with correct ownership
3. ✅ Test authorization with different user roles
4. ✅ Modify seed data as needed for your use cases
5. ✅ Deploy to Render with automatic seeding enabled
