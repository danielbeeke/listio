import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useRef, useState } from 'react'
import useFuse from '../../hooks/useFuse'
import {
  SearchProduct,
  SearchProductProps,
} from '../SearchProduct/SearchProduct'
import {
  SearchResult,
  SearchResultPart,
  SearchResultProps,
} from '../SearchResult/SearchResult'
import './Search.scss'

export type SearchProps = {
  defaultSearchTerm?: string
  defaultSearchResults?: SearchResultProps[]
  defaultSelectedCategory?: SearchResultPart
  defaultSearchProducts?: SearchProductProps[]
  onClick?: (result: { category: SearchResultPart; searchTerm: string }) => void
}

const fuseOptions = {
  keys: ['label'],
  threshold: 0.2,
}

type Category = {
  label: string
  url: string
  parentUrl: string | null
  icon?: string
}

export function Search({
  defaultSearchTerm = '',
  defaultSearchProducts = [],
  defaultSelectedCategory,
  onClick = () => null,
}: SearchProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    SearchResultPart | undefined
  >(defaultSelectedCategory)
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm)
  const [searchProducts, setSearchProducts] = useState(defaultSearchProducts)

  const inputRef = useRef<HTMLInputElement>(null)

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/data/interspar.json')
      .then((response) => response.json())
      .then(setCategories)
  }, [])

  useEffect(() => {
    if (!selectedCategory) return

    const categoryId = selectedCategory.identifier
      .split('/')
      .filter(Boolean)
      .pop()!
    const encodedCategoryUrl = btoa(categoryId)

    fetch(`http://localhost:8000/search/${encodedCategoryUrl}/${searchTerm}`)
      .then((response) => response.json())
      .then(setSearchProducts)
  }, [selectedCategory, searchTerm])

  const fuseResults = useFuse(categories, searchTerm, fuseOptions)
  const searchResults = fuseResults.map((item) => {
    const parts: Array<SearchResultPart> = []

    let pointer: Category | undefined = item.item

    parts.push({
      text: pointer.label,
      identifier: pointer.url,
      icon: pointer.icon,
    })

    while (pointer?.parentUrl) {
      pointer = categories.find(
        (category) => category.url === pointer?.parentUrl
      )
      if (pointer) {
        parts.push({
          text: pointer.label,
          identifier: pointer.url,
          icon: pointer.icon,
        })
      }
    }

    const partsReversed = parts.reverse()

    const searchResult = {
      icon: partsReversed[0].icon,
      parts: partsReversed,
      searchTerm,
    }

    return searchResult
  })

  return (
    <div className="search">
      <div className="input">
        {selectedCategory ? (
          <div className="selected-category">
            {selectedCategory.icon ? (
              <Icon className="category-icon" icon={selectedCategory.icon} />
            ) : null}
            {selectedCategory.text}:
            <Icon
              onClick={() => {
                setSelectedCategory(undefined)
                setSearchTerm('')
                setSearchProducts([])
                inputRef.current?.focus()
              }}
              icon="basil:cross-solid"
            />
          </div>
        ) : null}

        <input
          ref={inputRef}
          value={searchTerm}
          type="search"
          placeholder={
            selectedCategory ? 'Refine your search' : 'Search for a category'
          }
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Icon icon="material-symbols:search" />
      </div>
      {!selectedCategory && searchResults.length ? (
        <div className="results">
          {searchResults.map((searchResult) => (
            <SearchResult
              onClick={(category) => {
                setSelectedCategory(category)
                setSearchTerm('')
                inputRef.current?.focus()
              }}
              key={JSON.stringify(searchResult)}
              {...searchResult}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      ) : null}

      {searchProducts.length ? (
        <div className="products">
          {searchProducts.map((searchProduct) => (
            <SearchProduct
              key={JSON.stringify(searchProduct)}
              {...searchProduct}
            />
          ))}
          <div className="accept">
            <span>
              Do the results look okay?
              <br />
              Refine the list by adding more search words or:
            </span>
            &nbsp;
            <button
              onClick={() => {
                if (selectedCategory && searchTerm)
                  onClick({
                    category: selectedCategory,
                    searchTerm,
                  })
              }}
              className="button"
            >
              Accept the search results
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
