import { User, UtensilsCrossed, Heart } from 'lucide-react'
import ROUTES from '@/app/constants/routes'

export const publicHeaderNavItems = [
  { title: 'All Recipes', path: ROUTES.RECIPES },
  { title: 'Top Chart', path: ROUTES.RANK },
]

export const privateHeaderNavItems = [
  { title: 'Profile', path: ROUTES.PROFILE, icon: User },
  { title: 'My Recipes', path: ROUTES.MY_RECIPES, icon: UtensilsCrossed },
  { title: 'Favourite Recipes', path: ROUTES.FAVOURITES, icon: Heart },
]
