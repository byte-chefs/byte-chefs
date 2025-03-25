import ROUTES from '@/app/constants/routes'

export const publicHeaderNavItems = [
  { title: 'All Recipes', path: ROUTES.RECIPES },
  { title: 'Top Chart', path: ROUTES.RANK },
]

export const privateHeaderNavItems = [
  { title: 'Profile', path: ROUTES.PROFILE },
  { title: 'My Recipes', path: ROUTES.MY_RECIPES },
  { title: 'Create Recipe', path: ROUTES.RECIPE_CREATE },
  { title: 'Favourites Recipes', path: ROUTES.FAVOURITES },
]
