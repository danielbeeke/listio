import { Icon } from '@iconify/react'
import Highlighter from 'react-highlight-words'
import './SearchResult.scss'

export type SearchResultProps = {
  parts?: SearchResultPart[]
  icon?: string
  searchTerm?: string
  onClick?: (category: SearchResultPart) => void
}

export type SearchResultPart = {
  text: string
  identifier: string
  icon?: string
}

export function SearchResult({
  parts = [],
  icon = '',
  searchTerm = '',
  onClick = () => null,
}: SearchResultProps) {
  const reversedParts = [...parts].reverse()

  return (
    <div className="search-result">
      {reversedParts.map((part) => (
        <div
          onClick={() => onClick(Object.assign({}, part, { icon }))}
          className="search-result-part"
          key={JSON.stringify(part)}
        >
          <Highlighter
            highlightClassName="highlight"
            highlightTag="span"
            searchWords={[searchTerm]}
            autoEscape={true}
            textToHighlight={part.text}
          />
        </div>
      ))}

      {icon ? (
        <div className="icon-wrapper">
          <Icon icon={icon} />
        </div>
      ) : null}
    </div>
  )
}
