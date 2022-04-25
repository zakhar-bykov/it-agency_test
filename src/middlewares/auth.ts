import config from '../modules/config'

import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import path from 'path'

import { View, ViewActionType } from '../types/view'
import { AllowedUserAuthTypes, User, UserAuthType, UserJWT, _UserJWT } from '../types/user'

import cookieService from '../services/cookie'
import userService from '../services/user'
import viewService from '../services/view'


export function view(options?: object) {
    return async (req: Req, res: Res, next: Next) => {
        if (!viewService.isView(req.path))
            return config.views.onCake.action === ViewActionType.redirect ? res.redirect(config.views.onCake.url) : res.sendStatus(404)

        const view: View = viewService.getView(req.path)
        const user: User = userService.getUser()

        await userService.tryAuth(user, req, res)

        if (!view.getAllowedAuthTypes().includes(user.getAuthType())) {
            const viewAction = view.getAuthTypeNotIncludesAction()
            return viewAction.action === ViewActionType.redirect ? res.redirect(viewAction.url) : res.sendStatus(404)
        } else {
            return next()
        }
    }
}

export function source(options?: object) {
    return async (req: Req, res: Res, next: Next) => {
        const host: string = req.get('host') ?? 'host'
        const referer: string = req.get('referer') ?? 'referer'
        const fileName: string = path.basename(path.basename(req.path), path.extname(req.path))

        if (!(referer).includes(host))
            return res.sendStatus(403)

        if (!viewService.isView('/' + (fileName === 'index' ? '' : fileName)))
            return res.sendStatus(403)

        const view: View = viewService.getView('/' + (fileName === 'index' ? '' : fileName))
        const user: User = userService.getUser()

        await userService.tryAuth(user, req, res)

        if (view.getAllowedAuthTypes().includes(user.getAuthType()))
            return next()
        else
            return res.sendStatus(403)
    }
}


export function api(allowedUserAuthTypes?: AllowedUserAuthTypes) {
    return async (req: Req, res: Res, next: Next) => {
        if (allowedUserAuthTypes) {
            const user: User = userService.getUser()

            await userService.tryAuth(user, req, res)

            if (user.getAuthType() === UserAuthType.authed && !allowedUserAuthTypes.includes( user.getAuthType() ))
                return res.status(406).send('already logged in')
            else if (user.getAuthType() === UserAuthType.guest && !allowedUserAuthTypes.includes( user.getAuthType() ))
                return res.status(409).send('not logged in')
            else
                return next()
        } else {
            return next()
        }
    }
}