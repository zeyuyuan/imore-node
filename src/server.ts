import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes'
import cors from './cors'
import { createConnection } from 'typeorm'

createConnection().then(() => {
  const app = new Koa()

  app
    .use(cors)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods)

  app.listen(3333)
  console.log('start sever at localhost:3333')
}).catch((err) => {
  console.log('mysql connect error:', err)
})
