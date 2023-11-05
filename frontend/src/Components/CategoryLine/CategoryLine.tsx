import { useLocalStorage } from 'usehooks-ts'
import { Category } from '../CategoryMatcher/CategoryMatcher'

type CategoryLineProps = {
  category: Category
  mappingCategory?: Category
  categories: Category[]
  onClick?: (category: Category) => void
}

export function CategoryLine({
  category,
  categories,
  mappingCategory,
}: CategoryLineProps) {
  const [isActive, setIsActive] = useLocalStorage(category.url, '')

  const parts: Category[] = []
  let pointer: Category | undefined = category
  parts.push(pointer)

  while (pointer?.parentUrl) {
    pointer = categories.find((category) => category.url === pointer?.parentUrl)
    if (pointer) parts.push(pointer)
  }

  const partsReversed = parts.reverse()

  return (
    <ol
      onClick={() => {
        if (mappingCategory) setIsActive(mappingCategory.url)
      }}
      className={`breadcrumb p-2 category-line d-flex ${
        isActive ? 'bg-primary text-white' : ''
      }`}
      title={category.url}
    >
      {partsReversed.map((category) => (
        <li className="breadcrumb-item" key={category.url}>
          {category.label}
        </li>
      ))}
    </ol>
  )
}
