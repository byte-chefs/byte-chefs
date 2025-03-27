type IngredientAdapterProps = {
  foodId: string
  servingId: string
  quantity: number
  calories: number
  protein: number
  servingDescription: string
  foodName: string
  carbs: number
  fat: number
}

export const ingredientAdapter = ({
  foodId,
  servingId,
  quantity,
  servingDescription,
  calories,
  protein,
  carbs,
  fat,
  foodName,
}: IngredientAdapterProps) => {
  const IngredientName = `${quantity > 0 ? `${quantity} x ` : ''} ${servingDescription} ${foodName}`

  return {
    name: IngredientName,
    foodId: Number.parseInt(foodId),
    servingId: Number.parseInt(servingId),
    quantity: quantity,
    calories: quantity * calories,
    protein: quantity * protein,
    carbs: quantity * carbs,
    fat: quantity * fat,
  }
}
