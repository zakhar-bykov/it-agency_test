import log from '../modules/log'

import { Request as Req, Response as Res } from 'express'
import md5 from 'md5'

import { Cookies } from '../types/cookie'
import { User, UserJWT, UserLoginPayload, UserAuthType, UserRegisterPayload, UserInterface, _UserJWT } from '../types/user'

import { UserDocument, UserModel } from '../models/user'

import cookieService from './cookie'


class UserService {
    public getUser(): User {
        return new User()
    }

    public async tryAuth(user: User, req: Req, res: Res) {
        if (!req.cookies.jwt)
            return

        const jwt: UserJWT = cookieService.decode<UserJWT>(req.cookies.jwt)

        if (!cookieService.verify<UserJWT>(_UserJWT, jwt))
            return res.clearCookie('jwt')

        const users: Array<UserInterface> = await this.find({ id: jwt.id, login: jwt.login })

        if (users.length !== 0)
            user.auth(users[0])
    }

    public async tryLogin(user: User, payload: UserLoginPayload) {
        const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        let query = {}

        if (regexpEmail.test(payload.loginEmail))
            query = { email: payload.loginEmail }
        else
            query = { login: payload.loginEmail }

        const users: Array<UserInterface> = await this.find(query)

        if (users.length !== 0 && md5(payload.password) === users[0].password) {
            user.auth(users[0])
        }
    }

    public tryLogout(user: User) {
        user.logout()
    }

    public async tryRegister(user: User, payload: UserRegisterPayload) {
        const result = await this.find({ $or: [{ login: payload.login }, { email: payload.email }] })

        if (result.length !== 0)
            return

        const newUser: UserDocument = new UserModel({ login: payload.login, email: payload.email, password: md5(payload.password), registerDate: (new Date()).toISOString() })
        await newUser.save()

        user.auth(newUser)
    }


    public async find(query: object): Promise<Array<UserInterface>> {
        const users: Array<UserInterface> = await UserModel.find(query)
        return users
    }

    public async insert(query: object): Promise<Array<UserInterface>> {
        const users: Array<UserInterface> = await UserModel.find(query)
        return users
    }
}

const userService: UserService = new UserService()

export default userService