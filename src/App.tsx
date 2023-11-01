import Fuse from 'fuse.js'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'
import { Product } from './types/Product'

const fuseOptions = {
  isCaseSensitive: true,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 3,
  // location: 0,
  threshold: 0.2,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ['name'],
}

const fuse = new Fuse<Product>([], fuseOptions)

function App() {
  const [results, setResults] = useState<Array<Product>>([])

  useEffect(() => {
    console.log('hello')
    Papa.parse('/heissepreise-mini.csv', {
      download: true,
      step: function (results) {
        const [store, name, price, unit, quantity, bio, url, category] =
          results.data as Array<unknown>
        const product = {
          store,
          name,
          price,
          unit,
          quantity,
          bio,
          url,
          category,
        } as Product

        fuse.add(product)
      },
      complete: async () => {
        console.log('wooops')
        const results = fuse.search('Pizzateig')
        setResults(results.map((result) => result.item))
      },
    })
  }, [])

  return (
    <>
      {results.map((result) => (
        <div key={result.name}>
          <h3>{result.name}</h3>
        </div>
      ))}
    </>
  )
}

export default App
