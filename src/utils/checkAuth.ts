import { Request as Req } from 'express'
import { UserJWT } from '../types/user'
import * as jwt from 'jsonwebtoken'
import UserModel from '../models/user'
import config from '../modules/config'

const checkAuth = async (req: Req, onAuthed: Function, onInvalid: Function, onNotAuthed: Function) => {
    if (req.cookies.jwt) {
        const jwtDecoded: UserJWT = JSON.parse(JSON.stringify(jwt.verify(req.cookies.jwt, config.keys.jwt_public)))

        if (jwtDecoded.id !== undefined && jwtDecoded.login) {
            const result = await UserModel.find({ id: jwtDecoded.id, login: jwtDecoded.login })

            if (result.length === 0)
                return onInvalid()
            else
                return onAuthed()
        }
    } else {
        onNotAuthed()
    }
}

export default checkAuth