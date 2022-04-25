import config from './modules/config'
import log from './modules/log'

import mongoose from 'mongoose'
import app from './app'

const server = require('http').createServer(app)

server.listen( config.server.port, () => log('info', 'app', 'Exress server running on port: ' + config.server.port.toString()) )
mongoose.connect( config.mongo.url || '', (err: any): void => { if (err) { throw err } else log('info', 'app', 'Mongo connected') })

export default server