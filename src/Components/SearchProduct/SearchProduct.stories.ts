import { SearchProduct, SearchProductProps } from './SearchProduct'

export default {
  title: 'Components/SearchProduct',
  component: SearchProduct,
  args: {},
}

export const Default = {
  args: {
    label: 'MILFINA Leichte Haltbarmilch 0,5% Fett 1l',
    store: 'Hofer',
    href: '',
    quantity: 1,
    quantifier: 'litre',
    searchTerm: 'haltbar',
    priceInEuroCents: 89,
    image:
      'https://atproductimages.blob.core.windows.net/interface/large/8cc07d32cec54bc3bd91bd3b52f5ccd5',
  } as SearchProductProps,
}

export const milkItems: SearchProductProps[] = [
  Default.args,
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
