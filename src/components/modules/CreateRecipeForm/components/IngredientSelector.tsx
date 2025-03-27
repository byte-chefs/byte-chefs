'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { searchFoods, getFoodDetails } from '@/lib/fatsecter-api'
import { Loader2, Plus, Trash } from 'lucide-react'
import { ingredientAdapter } from '@/utils/ingredientAdapter'
import { Ingredient } from '@/types'

type IngredientSelectorProps = {
  value: Ingredient[]
  onChange: (value: Ingredient[]) => void
}

type SelectedServing = {
  serving_id: string
  serving_description: string
  calories: number
  protein: number
  carbohydrate: number
  fat: number
} | null

type SelectedFood = {
  food_id: string
  food_name: string
} | null

export default function IngredientSelector({ value, onChange }: IngredientSelectorProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(value || [])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SelectedFood[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedFood, setSelectedFood] = useState<SelectedFood>(null)
  const [selectedServing, setSelectedServing] = useState<SelectedServing>(null)
  const [servings, setServings] = useState<SelectedServing[]>([])
  const [quantity, setQuantity] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoadingFood, setIsLoadingFood] = useState(false)

  useEffect(() => {
    onChange(ingredients)
  }, [ingredients])

  async function handleSearch() {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      const results = await searchFoods(searchQuery)
      setSearchResults(Array.isArray(results) ? results : [])
    } catch (error) {
      console.error('Error searching foods:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleFoodSelect = async (food: SelectedFood) => {
    setSelectedFood(food)
    setIsLoadingFood(true)

    try {
      const foodDetails = await getFoodDetails(Number(food?.food_id))

      if (foodDetails && foodDetails.servings && foodDetails.servings.serving) {
        const servingsList = Array.isArray(foodDetails.servings.serving)
          ? foodDetails.servings.serving
          : [foodDetails.servings.serving]

        setServings(servingsList)
        setSelectedServing(servingsList[0])
      } else {
        setServings([])
        setSelectedServing(null)
      }
    } catch (error) {
      console.error('Error getting food details:', error)
      setServings([])
      setSelectedServing(null)
    } finally {
      setIsLoadingFood(false)
    }
  }

  const handleAddIngredient = () => {
    if (!selectedFood || !selectedServing) return

    const newIngredient = ingredientAdapter({
      foodId: selectedFood.food_id,
      servingId: selectedServing.serving_id,
      quantity,
      servingDescription: selectedServing.serving_description,
      calories: Number(selectedServing.calories),
      protein: Number(selectedServing.protein),
      carbs: Number(selectedServing.carbohydrate),
      fat: Number(selectedServing.fat),
      foodName: selectedFood.food_name,
    })

    setIngredients([...ingredients, newIngredient])

    setSearchQuery('')
    setSearchResults([])
    setSelectedFood(null)
    setSelectedServing(null)
    setServings([])
    setQuantity(1)
    setIsDialogOpen(false)
  }

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(index, 1)
    setIngredients(newIngredients)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Ingredients</Label>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Ingredient</DialogTitle>
              <DialogDescription>
                Search for an ingredient and select the serving size.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search for an ingredient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSearch()
                    }
                  }}
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="max-h-[200px] overflow-y-auto rounded-md border p-2">
                  {searchResults.map((food) => (
                    <div
                      key={food?.food_id}
                      className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                        selectedFood?.food_id === food?.food_id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => handleFoodSelect(food)}
                    >
                      {food?.food_name}
                    </div>
                  ))}
                </div>
              )}

              {selectedFood && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label>Selected Food</Label>
                    <div className="font-medium">{selectedFood.food_name}</div>
                  </div>

                  {isLoadingFood ? (
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      {servings.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="serving">Serving Size</Label>
                            <Select
                              value={selectedServing?.serving_id}
                              onValueChange={(value) => {
                                const serving = servings.find((s) => s?.serving_id === value)

                                if (serving) {
                                  setSelectedServing(serving)
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select serving" />
                              </SelectTrigger>
                              <SelectContent>
                                {servings.map((serving) => (
                                  <SelectItem
                                    key={serving?.serving_id}
                                    value={String(serving?.serving_id)}
                                  >
                                    {serving?.serving_description}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                              id="quantity"
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>No serving information available</div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddIngredient} disabled={!selectedFood || !selectedServing}>
                Add Ingredient
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {ingredients.length === 0 ? (
        <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center">
          No ingredients added yet. Click &#34;Add Ingredient&#34; to start.
        </div>
      ) : (
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">{ingredient?.name}</div>
              </div>
              <Button variant="destructive" onClick={() => handleRemoveIngredient(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
