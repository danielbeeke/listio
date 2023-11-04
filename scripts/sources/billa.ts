import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'
import { NormalizedCategory } from '../fetchTaxonomy.ts'
import { fetched } from '../fetched.ts'

export type BillaCategory = {
  name: string
  slug: string
  total: number
  children: Array<BillaCategory>
}

const grabBillaCategoryLevel = async (
  slug: string,
  outputCategories: Array<NormalizedCategory> = []
): Promise<Array<NormalizedCategory>> => {
  await fetched(`https://shop.billa.at/api/categories/${slug}/child-properties`)
    .then((response) => response.text())
    .then(async (response) => {
      const dom = new DOMParser().parseFromString(response, 'text/html')
      const sourceCategories = JSON.parse(
        dom!.textContent
      ) as Array<BillaCategory>

      for (const sourceCategory of sourceCategories) {
        await grabBillaCategoryLevel(sourceCategory.slug, outputCategories)

        const parentUrl = `https://shop.billa.at/kategorie/${slug}`

        const category: NormalizedCategory = {
          label: sourceCategory['name'],
          url: `https://shop.billa.at/kategorie/${sourceCategory['slug']}`,
          parentUrl:
            parentUrl === 'https://shop.billa.at/kategorie/all'
              ? null
              : parentUrl,
        }

        outputCategories.push(category)
      }
    })
    .catch(() => [])
  return outputCategories
}

export default async () => {
  return await grabBillaCategoryLevel('all')
}
