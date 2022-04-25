import { Router } from 'express'

import sourceRouter from './routes/sources'
import viewRouter from './routes/views'
import apiRouter from './routes/api.v1'

const router: Router = Router()

router.use('/', viewRouter)
router.use('/s', sourceRouter)
router.use('/api', apiRouter)

export default router