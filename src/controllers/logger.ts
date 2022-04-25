import log from '../modules/log'

import { Request as Req, Response as Res, NextFunction as Next } from 'express'

export const logger = (req: Req, res: Res, next: Next): any => {
    log('info', 'server', 'new request: ' + req.method + ' ' + req.originalUrl)
    next()
}