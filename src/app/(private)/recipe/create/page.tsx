import CreateRecipeForm from '@/components/modules/CreateRecipeForm'

export default function RecipeCreatePage() {
  return (
    <main className="flex-1">
      <h3 className="mt-5 text-center">Create your recipe</h3>
      <CreateRecipeForm />
    </main>
  )
}
