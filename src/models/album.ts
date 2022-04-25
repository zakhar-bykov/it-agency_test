import config from '../modules/config'

import mongoose, { model, Schema, Model, Document } from 'mongoose'

import autoIncrement from 'mongoose-auto-increment'
autoIncrement.initialize(mongoose.createConnection(config.mongo.url))

import { AlbumInterface } from '../types/album'

export interface AlbumDocument extends AlbumInterface, Document {
    _id: string
    id: number
    ownerId: number
    title: string
}

const AlbumSchema: Schema = new Schema<AlbumDocument>({
    id: { type: Number, index: true, unic: true },
    ownerId: { type: Number },
    title: { type: String },
})

AlbumSchema.plugin(autoIncrement.plugin, {
    model: 'albums',
    field: 'id',
    startAt: 1
})

export const AlbumModel: Model<AlbumDocument> = model<AlbumDocument>('Album', AlbumSchema, 'albums')

export default AlbumModel