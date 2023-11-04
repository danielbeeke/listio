import { Application, Router } from 'oak'
import Interspar from './Sources/Interspar.ts'

const router = new Router()

export type SearchProductProps = {
  label: string
  href: string
  quantity: number
  quantifier: 'litre' | 'gram' | 'kilogram'
  priceInEuroCents: number
  store: string
  searchTerm?: string
  image?: string
}

router.get('/search/:category/:searchTerm?', async (context) => {
  const categoryId = atob(context.params.category)
  const results = await Interspar(categoryId, context.params.searchTerm)

  context.response.headers.set('Access-Control-Allow-Origin', '*')
  context.response.body = results
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
