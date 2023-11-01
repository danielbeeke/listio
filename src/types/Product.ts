export type Product = {
  store: string
  id: string
  name: string
  description: string
  price: number
  priceHistory: PriceHistory[]
  isWeighted: boolean
  unit: string
  quantity: number
  bio: boolean
  url: string
  category: string
  unavailable?: boolean
}

export type PriceHistory = {
  date: string
  price: number
}

export type MiniProduct = [
  string,
  string,
  number,
  string,
  number,
  boolean,
  string,
  string
]
