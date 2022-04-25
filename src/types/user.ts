import { JWT } from './cookie'

export enum UserAuthType {
    guest = 'guest',
    authed = 'authed'
}

export type AllowedUserAuthTypes = Array<UserAuthType>


export interface UserJWT extends JWT {
    id: number
    login: string
    iat: number
}

export const _UserJWT: UserJWT = {
    id: 0,
    login: '',
    iat: 0
}


export interface UserLoginPayload {
    loginEmail: string
    password: string
}

export interface UserRegisterPayload {
    login: string
    email: string
    password: string
}


export interface UserInterface {
    _id: string
    id: number
    login: string
    email: string
    password: string
    registerDate: Date
}


export class User {
    private data: UserInterface
    private authType: UserAuthType

    constructor() {
        this.data = {
            _id: '',
            id: 0,
            login: '',
            email: '',
            password: '',
            registerDate: new Date()
        }

        this.authType = UserAuthType.guest
    }

    public getAuthType(): UserAuthType {
        return this.authType
    }

    public getId(): number {
        return this.data.id
    }

    public getPayloadForAuthJWT(): UserJWT {
        return {
            id: this.data.id,
            login: this.data.login,
            iat: 0
        }
    }


    public auth(user: UserInterface) {
        this.data = user

        this.authType = UserAuthType.authed
    }

    public logout() {
        this.data = {
            _id: '',
            id: 0,
            login: '',
            email: '',
            password: '',
            registerDate: new Date()
        }

        this.authType = UserAuthType.guest
    }
}
