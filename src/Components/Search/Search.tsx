import { Icon } from '@iconify/react/dist/iconify.js'
import { useRef, useState } from 'react'
import {
  SearchResult,
  SearchResultPart,
  SearchResultProps,
} from '../SearchResult/SearchResult'
import './Search.scss'

export type SearchProps = {
  defaultSearchTerm?: string
  defaulSearchResults?: SearchResultProps[]
}

export function Search({
  defaultSearchTerm = '',
  defaulSearchResults = [],
}: SearchProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<SearchResultPart | null>(null)
  const [searchResults, setSearchResults] = useState(defaulSearchResults)
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="search">
      <div className="input">
        {selectedCategory ? (
          <div className="selected-category">
            {selectedCategory.text}:
            <Icon
              onClick={() => {
                setSelectedCategory(null)
                setSearchTerm('')
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
    </div>
  )
}
