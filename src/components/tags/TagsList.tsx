import { FC } from 'react'
import { TagsListProps } from '@/types/tag'
import TagElement from './TagElement'

const TagsList: FC<TagsListProps> = ({ tags }) => {
  return tags.length > 0 ? (
    <div className="flex flex-col gap-12 md:gap-20">
      {tags.map((tag) => (
        <TagElement key={tag.tag.name} tag={tag.tag} recipes={tag.recipes} />
      ))}
    </div>
  ) : (
    <h3 className="bold text-center">No tags found</h3>
  )
}

export default TagsList
