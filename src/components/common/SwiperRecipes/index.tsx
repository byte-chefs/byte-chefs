'use client'

import RecipeCard from '@/components/recipes/RecipeCard'
import { RecipeListProps } from '@/types/recipe'
import React, { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        arrows: false,
      },
    },
  ],
}

const SwiperRecipes: FC<RecipeListProps> = ({ recipes, direction = 'vertical' }) => {
  return (
    <Slider {...settings}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} direction={direction} />
      ))}
    </Slider>
  )
}

export default SwiperRecipes
