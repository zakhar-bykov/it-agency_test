import express, { Router } from 'express'

import helmet from 'helmet'
// import bodyParser from 'body-parser'
// import multer, { Multer } from 'multer'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import { logger } from './controllers/logger'

const router: Router = Router()

router.use( express.json() )
router.use( express.urlencoded({ extended: true }) )
// router.use( upload.array() )
router.use( cookieParser() )
router.use( session({
    secret: process.env.SESSION_KEY || '',
    resave: true,
    saveUninitialized: true
}))

// router.use(helmet.contentSecurityPolicy())
// router.use(helmet.crossOriginEmbedderPolicy())
// router.use(helmet.crossOriginOpenerPolicy())
// router.use(helmet.crossOriginResourcePolicy())
// router.use(helmet.dnsPrefetchControl())
// router.use(helmet.expectCt())
router.use(helmet.frameguard())
// router.use(helmet.hidePoweredBy())
// router.use(helmet.hsts())
// router.use(helmet.ieNoOpen())
// router.use(helmet.noSniff())
// router.use(helmet.originAgentCluster())
// router.use(helmet.permittedCrossDomainPolicies())
router.use(helmet.referrerPolicy({
    policy: ['origin'],
}))
// router.use(helmet.xssFilter())

router.all('*', logger)

export default router