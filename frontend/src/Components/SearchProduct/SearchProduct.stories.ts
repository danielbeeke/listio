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
