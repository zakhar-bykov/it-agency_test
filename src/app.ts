import config from './modules/config'

import express from 'express'

import middlewares from './express.middlewares'
import routes from './express.routes'

const app: express.Application = express()

app.set('env', config.app.env)
app.set('view engine', 'pug')
app.set('views', __dirname + '/../views/')

app.use(middlewares)
app.use(routes)

/* const middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('middleware')
    next()
}

const controller = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('controller')
    res.sendStatus(200)
}

app.get('/', middleware, controller) */

export default app