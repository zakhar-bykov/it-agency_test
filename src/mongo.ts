import config from './modules/config'
import log from './modules/log'

import mongoose, { Connection } from 'mongoose'

const connection = async () => await mongoose.createConnection(config.mongo.url).asPromise()

// (err: any): void => { if (err) { throw err } else log('info', 'app', 'Mongo connected') }

export default connection