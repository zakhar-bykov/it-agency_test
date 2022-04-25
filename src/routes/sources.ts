import { Router } from 'express'

import * as auth from '../middlewares/auth'
import * as controller from '../controllers/sources'

const router: Router = Router()

router.get('/lib/:file_name', controller.lib)
router.get('/src/:file_name', auth.source(), controller.src)

export default router