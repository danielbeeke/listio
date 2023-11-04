import Highlighter from 'react-highlight-words'
import './SearchProduct.scss'

export type SearchProductProps = {
  label: string
  href: string
  quantity: number
  quantifier: 'litre' | 'gram' | 'kilogram'
  priceInEuroCents: number
  store: string
  searchTerm?: string
  image?: string
}

export function SearchProduct({
  label,
  store,
  priceInEuroCents,
  image,
  quantity,
  quantifier,
  searchTerm,
}: SearchProductProps) {
  return (
    <div className="search-product">
      {image ? (
        <img
          className="image"
          src={`//wsrv.nl/?url=${image}&default=${image}&h=50&w=50&fit=contain`}
        />
      ) : null}
      <div className="text">
        <strong className="store">{store}</strong>
        <br />

        <Highlighter
          className="label"
          highlightClassName="highlight"
          highlightTag="span"
          searchWords={searchTerm ? [searchTerm] : []}
          autoEscape={true}
          textToHighlight={label}
        />
      </div>
      <div className="price-wrapper">
        <span className="quantity">
          {quantity}
          {quantifier}
        </span>
        <span className="price">€ {(priceInEuroCents / 100).toFixed(2)}</span>
      </div>
    </div>
  )
}
