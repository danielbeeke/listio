import billa from './sources/billa.ts'
import interspar from './sources/interspar.ts'

export type NormalizedCategory = {
  label: string
  url: string
  parentUrl: string | null
  children?: Array<NormalizedCategory>
}

const promises = Object.entries({
  billa,
  interspar,
}).map(([name, source]) =>
  source().then((output) => {
    Deno.writeTextFileSync(`${name}.json`, JSON.stringify(output, null, 2))
  })
)

await Promise.all(promises)
