import { launch } from 'https://deno.land/x/astral/mod.ts'
import {
  DOMParser,
  Element,
} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'
import { NormalizedCategory } from '../fetchTaxonomy.ts'

export default async () => {
  const browser = await launch()

  // Open a new page
  const page = await browser.newPage(
    'https://www.interspar.at/shop/lebensmittel/'
  )

  const dom = new DOMParser().parseFromString(await page.content(), 'text/html')
  const links = [
    ...(dom?.querySelectorAll(
      '.flyout-categories__wrapper .flyout-categories__item a'
    ) ?? []),
  ]

  await browser.close()

  const categories: Array<NormalizedCategory> = []
  for (const link of links) {
    const href = (link as Element).getAttribute('href')?.toString()

    if (href?.startsWith('/shop/lebensmittel/')) {
      const label = (link as Element).textContent.trim()
      if (label.startsWith('Übersicht')) continue
      const url = `https://www.interspar.at${href}`

      const parentUrlParts = url.split('-')
      parentUrlParts.pop()
      const piecedTogether = parentUrlParts.join('-') + '/'
      const parts = piecedTogether.split('/')
      parts.splice(parts.length - 4, 1)
      const parentUrl = parts.join('/')

      categories.push({
        label,
        url,
        parentUrl: parentUrl ? parentUrl : null,
      })
    }
  }

  return categories
}
