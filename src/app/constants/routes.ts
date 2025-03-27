const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FAVOURITES: '/favourites',
  MY_RECIPES: '/my-recipes',
  RECIPE: '/recipe',
  RECIPE_CREATE: '/recipe/create',
  RANK: '/rank',
  RECIPES: '/recipes',
  TAG: '/tags',
  PROFILE: '/profile',
}

export const PUBLIC_ROUTES = [
  ROUTES.HOMEPAGE,
  ROUTES.RANK,
  ROUTES.TAG,
  ROUTES.RECIPES,
  ROUTES.LOGIN,
]

export default ROUTES
