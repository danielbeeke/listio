import billa from '../public/data/billa.json' assert { type: 'json' }
import interspar from '../public/data/interspar.json' assert { type: 'json' }

import { NormalizedCategory } from './fetchTaxonomy.ts'

const getMatches = (
  source1: Array<NormalizedCategory>,
  source2: Array<NormalizedCategory>
) => {
  const results: Array<[NormalizedCategory, NormalizedCategory]> = []
  for (const category1 of source1) {
    for (const category2 of source2) {
      if (category1.label === category2.label)
        results.push([category1, category2])
    }
  }

  return results
}

const addLevels = (
  source: Array<NormalizedCategory>
): Array<NormalizedCategory & { level: number }> => {
  const output = []

  for (const category of source) {
    let pointer: NormalizedCategory | undefined = category
    let level = 0
    while (pointer?.parentUrl) {
      pointer = source.find(
        (sourceItem) => sourceItem.url === pointer?.parentUrl
      )
      level++
    }

    output.push(Object.assign({ level }, category))
  }

  return output
}

const directMatches = getMatches(addLevels(billa), addLevels(interspar))

console.log(directMatches)

const loadAsTree = (source: Array<NormalizedCategory>) => {
  const getChildren = (parentUrl: string | null) =>
    source
      .filter((innerItem) => innerItem.parentUrl === parentUrl)
      .map((item) => {
        item.children = getChildren(item.url)
        return item
      })

  return getChildren(null)
}

// console.log(JSON.stringify(loadAsTree(billa), null, 2))

// console.log(addLevels(interspar))
