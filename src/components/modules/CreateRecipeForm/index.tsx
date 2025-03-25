'use client'

import React, { FC, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createRecipeAction } from '@/actions/recipe/createRecipeAction'
import { Plus, Trash2 } from 'lucide-react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import ROUTES from '@/app/constants/routes'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { useRouter } from 'next/navigation'
import { createRecipeSchema } from '@/schemas/recipe/createRecipeSchema'
import TagSelector from '@/components/modules/CreateRecipeForm/components/TagSelector'
import IngredientSelector from '@/components/modules/CreateRecipeForm/components/IngredientSelector'
import { Ingredient, Recipe, RecipeDifficultyEnum, RecipeStatusEnum, Tag } from '@/types'
import { editRecipeAction } from '@/actions/recipe/editRecipeAction'
import { editRecipeSchema } from '@/schemas/recipe/editRecipeSchema'
import RecipeImageUpload from '@/components/modules/CreateRecipeForm/components/RecipeImageUpload'

type CreateRecipeFormProps =  {
  recipe?: Recipe
  tags?: Tag[]
  ingredients?: Ingredient[]
  editMode?: boolean
}
const CreateRecipeForm: FC<CreateRecipeFormProps> = ({ recipe, ingredients, tags, editMode }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const currentSafeAction = editMode
    ? (editRecipeAction as typeof createRecipeAction)
    : createRecipeAction;
  const currentSchema = editMode ? editRecipeSchema : (createRecipeSchema as typeof editRecipeSchema);
  const { form, handleSubmitWithAction } = useHookFormAction(
    currentSafeAction,
    zodResolver(currentSchema),
    {
      formProps: {
        defaultValues: {
          id: recipe?.id || 1,
          photo: recipe?.photo || '',
          name: recipe?.name || '',
          cookingTime: recipe?.cookingTime || 0,
          description: recipe?.description || [''],
          difficulty: recipe?.difficulty as RecipeDifficultyEnum || RecipeDifficultyEnum.easy,
          ingredients: (ingredients || []).map(ingredient => ({
            ...ingredient,
            name: ingredient.name ?? undefined,
          })),
          tags: tags || [],
          status: recipe?.status as RecipeStatusEnum || 'draft',
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success(editMode ? 'The recipe update success' : 'The recipe was created')
          router.push(ROUTES.RECIPES)
          router.refresh()
        },
        onError: ({ error }) => {
          toast.error(error.serverError)
        },
      },
    }
  )

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'description',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await handleSubmitWithAction(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="m-auto max-w-[500px] py-4 px-4">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="photo"
            render={({field}) => (
              <FormItem>
                <FormLabel>Recipe Image</FormLabel>
                <FormControl>
                  <RecipeImageUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name</FormLabel>
                <FormControl>
                  <Input placeholder="Delicious Chocolate Cake" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <input type="hidden" {...field} />
                )}
              />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="cookingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cooking Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field}  onChange={(e) => field.onChange(e.target.value ? +e.target.value : 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <FormLabel>Recipe Steps</FormLabel>
              <Button
                type="button"
                variant="outline"
                onClick={() => append('')}
                className="flex items-center gap-1 cursor-pointer"
              >
                <Plus size={16} />
                Add Step
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="mb-4">
                <div className="flex items-start gap-2">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name={`description.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 mb-1">
                            <FormLabel className="text-lg mb-0">Step {index + 1}</FormLabel>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder={`Describe step ${index + 1}...`}
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="transparent"
                    className="mt-8 p-1"
                    onClick={() => remove(index)}
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            {fields.length === 0 && (
              <div className="text-center py-4 border border-dashed rounded-md">
                <p className="text-muted-foreground">No steps added yet. Click &#34;Add Step&#34; to begin.</p>
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => {
              return <FormItem>
                <FormControl>
                  <IngredientSelector value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagSelector value={field.value || tags} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="published">Publish Now</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={() => router.push('/profile')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" /> {editMode ? 'Editing...' : 'Creating...'}
                </>
              ) : (
                editMode ? 'Edit Recipe' : 'Create Recipe'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateRecipeForm
