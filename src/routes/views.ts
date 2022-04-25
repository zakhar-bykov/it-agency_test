import { Router } from 'express'

import { UserAuthType } from '../types/user'

import * as auth from '../middlewares/auth'
import * as controller from '../controllers/views'

const router: Router = Router()

router.get('/', auth.view([UserAuthType.authed]), controller.index)
router.get('/login', auth.view([UserAuthType.guest]), controller.login)
router.get('/register', auth.view([UserAuthType.guest]), controller.register)

export default router