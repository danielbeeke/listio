import type { SearchResultProps } from './SearchResult'
import { SearchResult } from './SearchResult'

export default {
  title: 'Components/SearchResult',
  component: SearchResult,
}

export const Milch = {
  args: {
    icon: 'ph:snowflake-bold',
    parts: [
      {
        text: 'Kühlwaren',
        identifier: 'koehlwaren',
      },
      {
        text: 'Milchprodukte',
        identifier: 'milchprodukte',
      },
      {
        text: 'Milch',
        identifier: 'milch',
      },
    ],
  } as SearchResultProps,
}

export const BabyMilch = {
  args: {
    icon: 'dashicons:food',
    parts: [
      {
        text: 'Nahrungsmittel',
        identifier: 'nahrungsmittel',
      },
      {
        text: 'Baby',
        identifier: 'baby',
      },
      {
        text: 'Milchpulver & Milch',
        identifier: 'milchpulver-milch',
      },
    ],
  } as SearchResultProps,
}

export const MilchChocolate = {
  args: {
    icon: 'tabler:candy',
    parts: [
      {
        text: 'Süßes & Salziges',
        identifier: 'susse-salziges',
      },
      {
        text: 'Süßes',
        identifier: 'susses',
      },
      {
        text: 'Schokoladentafeln',
        identifier: 'schokoladentafeln',
      },
    ],
  } as SearchResultProps,
}
