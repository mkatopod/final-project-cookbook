import express from 'express';
import authRoutes from './routes/authRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import cookbookRoutes from './routes/cookbookRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/cookbooks', cookbookRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

