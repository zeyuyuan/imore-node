import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from './cors'
import { createConnection } from 'typeorm'
import { protectedRouter, unprotectedRouter } from './routes'
import jwt from 'koa-jwt'
import { JWT_SECRET } from './constants'

createConnection().then(() => {
  const app = new Koa()

  app
    .use(cors)
    .use(bodyParser())
    .use(unprotectedRouter.routes())
    .use(unprotectedRouter.allowedMethods())
    .use(jwt({ secret: JWT_SECRET }))
    .use(protectedRouter.routes())
    .use(protectedRouter.allowedMethods())

  app.listen(3333)
  console.log('start sever at localhost:3333')
}).catch((err) => {
  console.log('mysql connect error:', err)
})
