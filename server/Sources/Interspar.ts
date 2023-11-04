/**
 * TODO Convert to a streaming converter
 */
export default async (categoryId: string, searchTerm?: string) => {
  const url = `https://search-spar.spar-ics.com/fact-finder/rest/v4/search/products_lmos_at?query=${
    searchTerm ?? '*'
  }&q=*&page=1&hitsPerPage=400&filter=category-path:${categoryId}`
  const results = await fetch(url).then((response) => response.json())

  return results.hits.map((hit: any) => {
    // price-per-unit    1.55 €/l
    const quantifier = hit.masterValues['price-per-unit'].endsWith('€/l')
      ? 'litre'
      : 'und'

    // const unitPrice = parseFloat(
    //   hit.masterValues['price-per-unit'].split(' ')[0]
    // )
    // const quantity = hit.masterValues.price

    return {
      label: hit.masterValues['short-description'],
      priceInEuroCents: Math.round(hit.masterValues.price * 100),
      image: hit.masterValues['image-url'],
      store: 'Interspar',
      quantifier,
      quantity: 1,
      href: `https://www.interspar.at/shop/lebensmittel${hit.masterValues['url']}`,
    }
  })
}
