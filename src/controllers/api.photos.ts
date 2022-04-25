import log from '../modules/log'

import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import axios from 'axios'

import { User } from '../types/user'
import { PhotoModel, AlbumDocument, AlbumModel, PhotoDocument } from '../models'

import userService from '../services/user'


export const loadPhotos = async (req: Req, res: Res, next: Next) => {
    const user: User = userService.getUser()
    await userService.tryAuth(user, req, res)

    const axiosResponse = await axios.get('http://jsonplaceholder.typicode.com/photos')

    const from = Math.floor(Math.random() * 5000)
    const to   = from + Math.floor(Math.random() * 10 + 2)
    const slicedResult = axiosResponse.data.slice(from, to)

    const numOfAlbums: number = await AlbumModel.countDocuments()

    const album: AlbumDocument = await AlbumModel.create({
        ownerId: user.getId(),
        title: (numOfAlbums ?? 0) + 1
    })

    const loadedPhotos: Array<PhotoDocument> = slicedResult.map((e: any, i: number) => {
        delete e.id
        e.ownerId = user.getId(),
        e.albumId = album.id
        return e
    })

    const insertedPhotos = await PhotoModel.create(loadedPhotos)

    res.status(200).send(insertedPhotos)
}

export const getPhotos = (req: Req, res: Res, next: Next) => {
    if (!req.query.page || !req.query.maxcount)
        return res.status(400).send('wrong params')

    const page: number = parseInt(req.query.page as string ?? '')
    const maxcount: number = parseInt(req.query.maxcount as string ?? '')

    let query = {}

    if (req.query.ownerid)
        query = { ownerId: req.query.ownerid }

    PhotoModel.find(query, (err: any, result: Array<any>) => {
        if (err) {
            log('error', 'database', err.message)
            return res.sendStatus(500)
        } else
            return res.status(200).send(result)
    }).skip(page > 1 ? (page - 1) * maxcount : 0).limit(maxcount)
}

export const deletePhotos = async (req: Req, res: Res, next: Next) => {
    if (!req.body.id)
        return res.status(400).send('wrong params')

    const user: User = userService.getUser()
    await userService.tryAuth(user, req, res)

    let query = { ownerId: user.getId(), $or: [] }
    let or = []

    if (req.body.id.replaceAll(' ', '').search(',') !== -1) {
        or = req.body.id.split(',').map((e: any) => {
            if (parseInt(e))
                return { id: parseInt(e) }
        })
    } else {
        or = [{ id: req.body.id }]
    }

    query.$or = or

    const deletedPhotos = await PhotoModel.deleteMany(query)
    res.status(200).send(deletedPhotos)
}