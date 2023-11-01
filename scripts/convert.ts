import { stringify } from 'npm:csv-stringify/sync'
import { MiniProduct, Product } from '../src/types/Product.ts'

if (!Deno.statSync('./.cache/heissepreise.json')) {
  await fetch('https://heisse-preise.io/data/latest-canonical.json')
    .then((response) => response.text())
    .then((text) => {
      Deno.writeTextFileSync('./.cache/heissepreise.json', text)
    })
}

const heissepreise: Array<Product> = JSON.parse(
  Deno.readTextFileSync('./.cache/heissepreise.json')
)

const clean = (string: string) => {
  return string.replace(/,|"|'/g, '').trim()
}

const miniProducts = heissepreise
  .filter((product) => !product?.unavailable)
  .map((product) => {
    const {
      store = '',
      name = '',
      price = '',
      unit = '',
      quantity = '',
      bio = '',
      url = '',
      category = '',
    } = product
    return [
      store,
      clean(name),
      price,
      unit,
      quantity,
      bio,
      url,
      category,
    ] as MiniProduct
  })

const csv = stringify(miniProducts)

Deno.writeTextFileSync('../public/heissepreise-mini.csv', csv)
