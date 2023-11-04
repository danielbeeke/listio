import { SearchProductProps } from '../SearchProduct/SearchProduct'
import {
  BabyMilch,
  Milch,
  MilchChocolate,
} from '../SearchResult/SearchResult.stories'
import { Search, SearchProps } from './Search'

import { Default as DefaultMilk } from '../SearchProduct/SearchProduct.stories'

const milkItems: SearchProductProps[] = [
  DefaultMilk.args,
  {
    label: 'JT Österr. Haltbarmilch 0,5 % Fett',
    store: 'Mpreis',
    href: '',
    quantity: 1,
    quantifier: 'litre',
    searchTerm: 'haltbar',
    priceInEuroCents: 89,
    image:
      'https://res.cloudinary.com/saas-ag/image/upload/w_451,h_451,c_pad,q_auto,f_auto/v1643941057/mpreis/products/3114367.jpg',
  },
  {
    label: 'S-BUDGET Haltbare Magermilch 0,5% Fett',
    store: 'Spar',
    href: '',
    quantity: 1,
    quantifier: 'litre',
    searchTerm: 'haltbar',
    priceInEuroCents: 89,
    image:
      'https://cdn1.interspar.at/cachableservlets/articleImage.dam/at/4813538/dt_sub.jpg',
  },
  {
    label: 'Schärdinger Formil haltbare Leichtmilch 0,5% Fett',
    store: 'Spar',
    href: '',
    quantity: 1,
    quantifier: 'litre',
    searchTerm: 'haltbar',
    priceInEuroCents: 91,
    image:
      'https://cdn1.interspar.at/cachableservlets/articleImage.dam/at/2751122/dt_sub.jpg',
  },
]

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
