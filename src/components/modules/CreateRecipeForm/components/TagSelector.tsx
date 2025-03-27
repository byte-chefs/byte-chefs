'use client'

import { useState, useEffect } from 'react'
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
import { Tag } from '@/types'
import { getTags } from '@/actions/tags/getTags'

type TagSelectorProps = {
  value?: Tag[]
  onChange: (value: Tag[]) => void
}

export default function TagSelector({ value, onChange }: TagSelectorProps) {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>(value || [])

  useEffect(() => {
    onChange(selectedTags)
  }, [selectedTags])

  useEffect(() => {
    async function fetchTags() {
      const tags = await getTags()
      setTags(tags)
    }

    fetchTags()
  }, [])

  const handleSelect = (tag: Tag) => {
    setSelectedTags((prev) => {
      if (prev.some((selectedTags) => selectedTags.id === tag.id)) {
        return prev.filter((selectedTags) => selectedTags.id !== tag.id)
      } else {
        return [...prev, tag]
      }
    })
  }

  const handleRemove = (tagId: number) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId))
  }

  const selectedTagObjects = tags.filter((tag) =>
    selectedTags.some((selectedTag) => selectedTag.id === tag.id)
  )

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedTags.length > 0
              ? `${selectedTagObjects.length} tags selected`
              : 'Select tags...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    onSelect={() => handleSelect(tag)}
                    className="flex items-center"
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border">
                      {selectedTags.some((selectedTag) => selectedTag.id === tag.id) && (
                        <Check className="text-primary-default h-3 w-3 dark:text-white" />
                      )}
                    </div>
                    <span>{tag.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedTagObjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTagObjects.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
              {tag.name}
              <Button
                variant="destructive"
                className="h-4 w-4 p-0"
                onClick={() => handleRemove(Number(tag.id))}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
