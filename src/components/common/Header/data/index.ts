import { User, UtensilsCrossed, Heart, Plus } from 'lucide-react'
import ROUTES from '@/app/constants/routes'

export const publicHeaderNavItems = [
  { title: 'All Recipes', path: ROUTES.RECIPES },
  { title: 'Tags', path: ROUTES.TAG },
  { title: 'Top Chart', path: ROUTES.RANK },
]

export const privateHeaderNavItems = [
  { title: 'Profile', path: ROUTES.PROFILE, icon: User },
  { title: 'My Recipes', path: ROUTES.MY_RECIPES, icon: UtensilsCrossed },
  { title: 'Create Recipe', path: ROUTES.RECIPE_CREATE, icon: Plus },
  { title: 'Favourite Recipes', path: ROUTES.FAVOURITES, icon: Heart },
]
