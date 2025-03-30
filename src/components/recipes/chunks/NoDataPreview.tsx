import { Soup } from 'lucide-react'

export default function NoDataPreview() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl p-6 text-center">
      <Soup className="mb-4 h-12 w-12" />
      <h3 className="bold text-center">No results found.</h3>
      <p className="mt-2">Try changing your search or refreshing the page!</p>
    </div>
  )
}
