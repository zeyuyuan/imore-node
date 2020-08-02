import Router from 'koa-router'
import AuthController from './controllers/auth'

const router = new Router()

router
  .post('/auth/login', AuthController.login)
  .get('/auth/user/list', AuthController.userList)
  .post('/auth/register', AuthController.register)

export default router
