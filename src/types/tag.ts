import { Recipes } from './recipe'

export type Tag = {
  id: number
  name: string
  include?: Array<string>
  exclude?: Array<string>
}

export type Tags = Array<Tag>

export type TagListElementProps = {
  tag: Tag
  recipes: Recipes
}

export type TagsListProps = {
  tags: Array<TagListElementProps>
}
