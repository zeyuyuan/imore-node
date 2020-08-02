import Router from 'koa-router'
import AuthController from './controllers/auth'

const unprotectedRouter = new Router()

unprotectedRouter
  .post('/auth/login', AuthController.login)
  .post('/auth/register', AuthController.register)

const protectedRouter = new Router()

protectedRouter
  .get('/auth/user/list', AuthController.userList)

export { protectedRouter, unprotectedRouter }
