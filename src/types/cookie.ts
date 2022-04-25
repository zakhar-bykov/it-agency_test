export interface Cookies {
    [key: string]: string | number | boolean | object
}

export interface Cookie {
    // type: string
}

export interface JWT extends Cookie {
    iat: number
}
