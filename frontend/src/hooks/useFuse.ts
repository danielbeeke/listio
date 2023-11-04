import Fuse, { IFuseOptions } from 'fuse.js'
import * as React from 'react'

/**
 * A React Hook that filters an array using the Fuse.js fuzzy-search library.
 *
 * @param list The array to filter.
 * @param searchTerm The search term to filter by.
 * @param fuseOptions Options for Fuse.js.
 *
 * @returns The filtered array.
 *
 * @see https://fusejs.io/
 */
function useFuse<T>(
  list: T[],
  searchTerm: string,
  fuseOptions?: IFuseOptions<T>
) {
  const fuse = React.useMemo(() => {
    return new Fuse(list, fuseOptions)
  }, [list, fuseOptions])

  const results = React.useMemo(() => {
    return fuse.search(searchTerm)
  }, [fuse, searchTerm])

  return results
}

export default useFuse
