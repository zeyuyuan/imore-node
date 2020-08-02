import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../entity/user'
import md5 from 'md5'

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
      ctx.status = 401
      ctx.body = {
        message: 'no account'
      }
    } else if (md5(md5(ctx.request.body.password)) === user.password) {
      ctx.status = 200
      ctx.body = {
        message: 'login success'
      }
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
    const userRep = getManager().getRepository(User)
    const users = await userRep.find()

    ctx.status = 200
    ctx.body = users
  }
}
