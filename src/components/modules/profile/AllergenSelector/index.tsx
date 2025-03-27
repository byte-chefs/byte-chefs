'use client'

import { FC, useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'

const commonAllergens = [
  'Dairy',
  'Eggs',
  'Fish',
  'Shellfish',
  'Tree Nuts',
  'Peanuts',
  'Wheat',
  'Soy',
  'Sesame',
  'Gluten',
]

type Props = {
  value: string[]
  onChange: (value: string[]) => void
  isCreate?: boolean
}

const AllergenSelector: FC<Props> = (props) => {
  const { value, onChange, isCreate } = props

  const [open, setOpen] = useState(false)
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(value || [])

  const handleSelect = (allergen: string) => {
    const updated = selectedAllergens.includes(allergen)
      ? selectedAllergens.filter((item) => item !== allergen)
      : [...selectedAllergens, allergen]

    setSelectedAllergens(updated)
    onChange(updated)
  }

  const handleRemove = (allergenName: string) => {
    setSelectedAllergens((prev) => prev.filter((allergen) => allergen !== allergenName))
  }

  useEffect(() => {
    setSelectedAllergens(value)
  }, [value])

  useEffect(() => {
    onChange(selectedAllergens)
  }, [onChange, selectedAllergens])

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        {!isCreate && (
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {selectedAllergens.length > 0
                ? `${selectedAllergens.length} allergens selected`
                : 'Select allergens...'}
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search allergens..." />
            <CommandList>
              <CommandEmpty>No allergens found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {commonAllergens.map((allergen) => (
                  <CommandItem
                    key={allergen}
                    onSelect={() => handleSelect(allergen)}
                    className="flex items-center"
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                        selectedAllergens.includes(allergen)
                          ? 'bg-primary-default border-primary-default'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAllergens.includes(allergen) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span>{allergen}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedAllergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAllergens.map((allergen) => (
            <Badge key={allergen} variant="secondary" className="flex items-center gap-1">
              {allergen}
              {!isCreate && (
                <Button
                  variant="destructive"
                  className="h-4 w-4 p-0"
                  onClick={() => handleRemove(allergen)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllergenSelector
