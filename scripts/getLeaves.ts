import Billa from '../frontend/public/data/billa.json' assert { type: 'json' }
import Interspar from '../frontend/public/data/interspar.json' assert { type: 'json' }
import { NormalizedCategory } from './fetchTaxonomy.ts'

const getLeaves = (source: Array<NormalizedCategory>) => {
  const leaves = []
  for (const category of source) {
    const foundChild = source.find(
      (innerCategory) => innerCategory.parentUrl === category.url
    )
    if (!foundChild) leaves.push(category)
  }
  return leaves
}

console.log('Billa', getLeaves(Billa).length, Billa.length)
console.log('Interspar', getLeaves(Interspar).length, Interspar.length)
