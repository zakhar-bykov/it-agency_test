import { Router } from 'express'

import { UserAuthType } from '../types/user'

import * as auth from '../middlewares/auth'
import * as controllers from '../controllers'


const router: Router = Router()

router.post('/login', auth.api([UserAuthType.guest]), controllers.users.login)
router.post('/logout', auth.api([UserAuthType.authed]), controllers.users.logout)
router.post('/register', auth.api([UserAuthType.guest]), controllers.users.register)

router.get('/get-photos', controllers.photos.getPhotos)
router.put('/load-photos', auth.api([UserAuthType.authed]), controllers.photos.loadPhotos)
router.delete('/delete-photos', auth.api([UserAuthType.authed]), controllers.photos.deletePhotos)

router.delete('/delete-album', auth.api([UserAuthType.authed]), controllers.albums.deleteAlbum)
router.patch('/change-album-title', auth.api([UserAuthType.authed]), controllers.albums.changeAlbumTitle)

export default router