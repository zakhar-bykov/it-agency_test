import config from '../modules/config'

import { User, UserAuthType, UserJWT, UserLoginPayload, UserRegisterPayload } from '../types/user'
import { UserModel, UserDocument } from '../models/user'

import userService from '../services/user'
import cookieService from '../services/cookie'

import * as jwt from 'jsonwebtoken'
import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import md5 from 'md5'


export const login = async (req: Req, res: Res, next: Next) => {
    const payload: UserLoginPayload = req.body

    if (!payload)
        return res.status(400).send('wrond body params')

    const user: User = userService.getUser()

    await userService.tryLogin(user, payload)

    if (user.getAuthType() === UserAuthType.authed) {
        const cookie: UserJWT = cookieService.generateUserJWT(user)
        const hash = cookieService.encode(cookie)

        res.cookie('jwt', hash, {
            maxAge: parseInt(config.keys.jwt_expire_time) * 1000,
            httpOnly: true
        }).status(200).send('successfully logged in')
    } else {
        res.status(401).send('wrong login credentials')
    }
}

export const logout = async (req: Req, res: Res, next: Next) => {
    const user: User = userService.getUser()

    await userService.tryAuth(user, req, res)

    if (user.getAuthType() === UserAuthType.authed) {
        userService.tryLogout(user)

        return res.clearCookie('jwt').status(205).send('successfully logged out')
    } else {
        return res.status(409).send('not logged in')
    }
}

export const register =  async (req: Req, res: Res, next: Next) => {
    const payload: UserRegisterPayload = req.body

    if (!payload)
        return res.status(400).send('wrond body params')

    const regexpLogin = new RegExp(/[\ !"#$%&'()*+,\/\\:;<=>?@[\]^`{|}~]/)
    const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    if ( regexpLogin.test(payload.login) )
        return res.status(409).send('login cannot contain spec symbols except: _ - .')

    if ( !regexpEmail.test(payload.email) )
        return res.status(409).send('email is invalid')

    if (payload.password.length < 8)
        return res.status(409).send('password length less then 8 symbols')

    const user: User = userService.getUser()

    await userService.tryRegister(user, payload)

    if (user.getAuthType() === UserAuthType.authed) {
        const cookie: UserJWT = cookieService.generateUserJWT(user)
        const hash = cookieService.encode(cookie)

        res.cookie('jwt', hash, {
            maxAge: parseInt(config.keys.jwt_expire_time) * 1000,
            httpOnly: true
        })

        return res.status(200).send('successfully registered')
    } else {
        return res.status(409).send('login or email are already taken')
    }

}