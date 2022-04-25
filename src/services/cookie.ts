import config from '../modules/config'
import * as jwt from 'jsonwebtoken'
import { User, UserInterface, UserJWT } from '../types/user'

class CookieService {
    public verify<T>(example: T, cookie: T): boolean {
        if (example === cookie) return true
        if (example == null || cookie == null) return false
        if (Object.keys(example).length !== Object.keys(cookie).length) return false

        for (let i = 0; i < Object.keys(example).length; ++i) {
            if (Object.keys(example)[i] !== Object.keys(cookie)[i])
                return false
        }

        return true
    }

    public generateUserJWT(user: User): UserJWT {
        let data: UserJWT = user.getPayloadForAuthJWT()
        data.iat = (new Date()).getTime() + (parseInt(config.keys.jwt_expire_time)) * 1000

        return data
    }


    public encode(cookie: object): string {
        return jwt.sign(cookie, config.keys.jwt_public)
    }

    public decode<T>(hash: string): T {
        return JSON.parse(JSON.stringify(jwt.verify(hash, config.keys.jwt_public)))
    }
}

const cookieService: CookieService = new CookieService()

export default cookieService