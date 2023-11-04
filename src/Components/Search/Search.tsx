import { useEffect } from 'react'

const sparLink =
  'https://search-spar.spar-ics.com/fact-finder/rest/v4/search/products_lmos_at?query=eier&log=suggest&page=1&hitsPerPage=5'

const billaLink =
  'https://shop.billa.at/api/products/search/eier?pageSize=5&storeId=00-10'

export function Search() {
  useEffect(() => {
    fetch(billaLink)
      .then((response) => response.json())
      .then(console.log)
  })

  return (
    <>
      <input type="search" />
    </>
  )
}
