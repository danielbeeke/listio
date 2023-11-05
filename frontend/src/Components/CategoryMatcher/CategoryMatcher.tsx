import { useEffect, useState } from 'react'
import { CategoryLine } from '../CategoryLine/CategoryLine'

export type Category = {
  label: string
  url: string
  parentUrl: string | null
  icon?: string
}

// All stores except the Interspar because we map to it.
const stores = [
  {
    label: 'Billa',
    data: () => fetch('/data/billa.json').then((response) => response.json()),
  },
  {
    label: 'Hofer',
    data: () => fetch('/data/hofer.json').then((response) => response.json()),
  },
]

export function CategoryMatcher() {
  const [categories, setCategories] = useState<Category[]>([])

  const [activeStore, setActiveStore] = useState(stores[0])
  const [categoriesToMap, setCategoriesToMap] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<Category | undefined>(
    undefined
  )

  const [literalMatches, setLiteralMatches] = useState<Category[]>([])

  useEffect(() => {
    fetch('/data/interspar.json')
      .then((response) => response.json())
      .then(setCategories)
  }, [])

  useEffect(() => {
    activeStore.data().then(setCategoriesToMap)
  }, [activeStore])

  useEffect(() => {
    setActiveCategory(categories[0])
  }, [categories])

  useEffect(() => {
    setLiteralMatches(
      categoriesToMap.filter(
        (category) => category.label === activeCategory?.label
      )
    )
  }, [activeCategory, categoriesToMap])

  return (
    <div>
      <ul className="nav nav-tabs mb-4">
        {stores.map((store) => (
          <li key={store.label} className="nav-item">
            <a
              className={`nav-link ${
                store.label === activeStore.label ? 'active' : ''
              }`}
              onClick={() => setActiveStore(store)}
            >
              {store.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="d-flex">
        <ul className="nav nav-pills flex-column col-2 pe-5">
          {categories.map((category) => (
            <li
              onClick={() => setActiveCategory(category)}
              key={category.url}
              className="nav-item"
            >
              <a
                className={`nav-link ${
                  activeCategory?.url === category.url ? 'active' : ''
                }`}
              >
                {category.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="col-10">
          <h3>{activeCategory?.label}</h3>

          {activeCategory ? (
            <CategoryLine category={activeCategory} categories={categories} />
          ) : null}

          {literalMatches.length ? (
            <div>
              <h4>Literal matches</h4>
              <ul className="p-0">
                {literalMatches.map((category) => (
                  <CategoryLine
                    key={category.url}
                    category={category}
                    categories={categoriesToMap}
                    mappingCategory={activeCategory}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
