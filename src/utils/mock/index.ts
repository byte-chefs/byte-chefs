export const mockRecipe = {
  id: 2,
  name: 'Grilled Chicken Salad',
  photo: '/recipy-preview',
  cookingTime: 20,
  description:
    'A healthy grilled chicken salad with fresh greens, cherry tomatoes, and balsamic dressing.',
  calories: 400,
  favouritesTotal: 8,
  difficulty: 'easy',
  status: 'published',
  steps: [
    'Bring a large pot of salted water to a boil and cook the spaghetti until al dente. Reserve 1 cup of pasta water before draining.',
    'In a large pan over medium heat, cook the pancetta until crispy, then remove from heat.',
    'In a bowl, whisk together eggs, Parmesan cheese, and black pepper.',
    'Add the drained pasta to the pan with pancetta, tossing to combine.',
    'Slowly pour the egg mixture over the pasta, stirring continuously to create a creamy sauce.',
    'If needed, add reserved pasta water to loosen the sauce.',
    'Serve immediately with extra Parmesan and black pepper on top.',
  ],
  ingredients: [
    { id: 3, foodId: 103, servingId: 3, quantity: 150, recipeId: 2 },
    { id: 4, foodId: 104, servingId: 4, quantity: 50, recipeId: 2 },
  ],
  tags: [
    {
      recipeId: 2,
      tagId: 2,
      tag: { id: 2, name: 'Healthy', include: ['salad'], exclude: ['fried'] },
    },
  ],
  userFavorites: [{ userId: 3, recipeId: 2 }],
  userId: 1,
  createdAt: '2024-03-17T12:05:00Z',
  updatedAt: '2024-03-17T12:05:00Z',
}
