import { Request as Req, Response as Res, NextFunction as Next } from 'express'

export const index = (req: Req, res: Res, next: Next): any => {
    res.render('index', { viewName: 'index' })
}

export const login = (req: Req, res: Res, next: Next): any => {
    res.render('login', { viewName: 'login' })
}

export const register = (req: Req, res: Res, next: Next): any => {
    res.render('register', { viewName: 'register' })
}