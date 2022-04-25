import config from '../modules/config'
import log from '../modules/log'
import checkAuth from '../utils/checkAuth'

import { User, UserJWT } from '../types/user'
import { UserModel, PhotoModel, AlbumModel } from '../models'

import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import userService from '../services/user'

export const deleteAlbum = async (req: Req, res: Res, next: Next) => {
    if (!req.body.id)
        return res.status(400).send('wrong params')

    const user: User = userService.getUser()
    await userService.tryAuth(user, req, res)

    let albumsQuery = { ownerId: user.getId(), $or: [] }
    let photosQuery = { ownerId: user.getId(), $or: [] }
    let albumsOr = []
    let photosOr = []

    if (req.body.id.replaceAll(' ', '').search(',') !== -1) {
        albumsOr = req.body.id.split(',').map((e: any) => {
            if (parseInt(e))
                return { id: parseInt(e) }
        })

        photosOr = req.body.id.split(',').map((e: any) => {
            if (parseInt(e))
                return { albumId: parseInt(e) }
        })
    } else {
        albumsOr = [{ id: req.body.id }]
        photosOr = [{ albumId: req.body.id }]
    }

    albumsQuery.$or = albumsOr
    photosQuery.$or = photosOr

    const deletedAlbums = await AlbumModel.deleteMany(albumsQuery)
    const deletedPhotos = await PhotoModel.deleteMany(photosQuery)
    res.status(200).send({albums: deletedAlbums, photos: deletedPhotos})
}

export const changeAlbumTitle = async (req: Req, res: Res, next: Next) => {
    if (!req.body.albumid || !req.body.new_album_name)
        return res.status(400).send('wrong params')

    const user: User = userService.getUser()
    await userService.tryAuth(user, req, res)

    const updatedAlbum = await AlbumModel.updateOne({ ownerId: user.getId(), id: req.body.albumid }, { title: req.body.new_album_name })

    return res.status(200).send(updatedAlbum)
}