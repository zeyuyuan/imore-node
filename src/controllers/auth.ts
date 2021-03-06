import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../entity/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

export default class AuthController {
  public static async login (ctx: Context) {
    const userRep = getManager().getRepository(User)
    const user = await userRep
      .createQueryBuilder()
      .where({
        username: ctx.request.body.username
      })
      .addSelect('User.password')
      .getOne()

    if (!user) {
      const newUser = new User()
      newUser.username = ctx.request.body.username
      newUser.password = md5(md5(ctx.request.body.password)) // temp bcrypt

      const user = await userRep.save(newUser)
      ctx.status = 200
      ctx.body = {
        message: {
          token: jwt.sign({ id: user.id }, JWT_SECRET)
        }
      }
      console.log('auto register', user.id)
    } else if (md5(md5(ctx.request.body.password)) === user.password) {
      ctx.status = 200
      ctx.body = {
        message: {
          token: jwt.sign({ id: user.id }, JWT_SECRET)
        }
      }
      console.log('login success', user.id)
    } else {
      ctx.status = 401
      ctx.body = {
        message: 'wrong password'
      }
    }
  }

  public static async register (ctx: Context) {
    const userRep = getManager().getRepository(User)
    const newUser = new User()
    newUser.username = ctx.request.body.username
    newUser.password = md5(md5(ctx.request.body.password)) // temp bcrypt

    const user = await userRep.save(newUser)

    ctx.status = 200
    ctx.body = user
  }

  public static async userList (ctx: Context) {
    console.log('token', ctx.state.user && ctx.state.user.id)
    const userRep = getManager().getRepository(User)
    const users = await userRep.find()

    ctx.status = 200
    ctx.body = users
  }
}
