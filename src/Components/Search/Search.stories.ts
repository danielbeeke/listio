import {
  BabyMilch,
  Milch,
  MilchChocolate,
} from '../SearchResult/SearchResult.stories'
import { Search, SearchProps } from './Search'

export default {
  title: 'Components/Search',
  component: Search,
  args: {
    searchTerm: { type: 'string' },
  },
}

export const Default = {
  args: {
    defaultSearchTerm: 'Milch',
    defaulSearchResults: [Milch, BabyMilch, MilchChocolate].map(
      (item) => item.args
    ),
  } as SearchProps,
}
