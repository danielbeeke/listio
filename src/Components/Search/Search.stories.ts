import {
  BabyMilch,
  Milch,
  MilchChocolate,
} from '../SearchResult/SearchResult.stories'
import { Search, SearchProps } from './Search'

import { milkItems } from '../SearchProduct/SearchProduct.stories'

export default {
  title: 'Components/Search',
  component: Search,
  args: {
    searchTerm: { type: 'string' },
  },
}

export const Default = {
  args: {} as SearchProps,
}

export const MilchSearch = {
  args: {
    defaultSearchTerm: 'Milch',
    defaultSearchResults: [Milch, BabyMilch, MilchChocolate].map(
      (item) => item.args
    ),
  } as SearchProps,
}

export const MilchCategorySelected = {
  args: {
    defaultSearchTerm: 'haltbar',
    defaultSelectedCategory: {
      text: 'Milch',
      identifier: 'milch',
    },
    defaultSearchProducts: milkItems,
  } as SearchProps,
}
