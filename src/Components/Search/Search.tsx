import { Icon } from '@iconify/react/dist/iconify.js'
import { useRef, useState } from 'react'
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
}

export function Search({
  defaultSearchTerm = '',
  defaultSearchResults = [],
  defaultSearchProducts = [],
  defaultSelectedCategory,
}: SearchProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    SearchResultPart | undefined
  >(defaultSelectedCategory)
  const [searchResults, setSearchResults] = useState(defaultSearchResults)
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm)
  const [searchProducts, setSearchProducts] = useState(defaultSearchProducts)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="search">
      <div className="input">
        {selectedCategory ? (
          <div className="selected-category">
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
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Icon icon="material-symbols:search" />
      </div>
      {searchResults.length ? (
        <div className="results">
          {searchResults.map((searchResult) => (
            <SearchResult
              onClick={(category) => {
                setSelectedCategory(category)
                setSearchResults([])
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
            <button className="button">Accept the search results</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
