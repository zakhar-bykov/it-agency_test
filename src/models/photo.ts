import config from '../modules/config'

import mongoose, { model, Schema, Model, Document } from 'mongoose'

import autoIncrement from 'mongoose-auto-increment'
autoIncrement.initialize(mongoose.createConnection(config.mongo.url))

import { PhotoInterface } from '../types/photo'

export interface PhotoDocument extends PhotoInterface, Document {
    _id: string
    id: number
    ownerId: number
    albumId: number
    title: string
    url: string
    thubnailUrl: string
}

const PhotoSchema: Schema = new Schema<PhotoDocument>({
    id: { type: Number, index: true, unic: true },
    ownerId: { type: Number },
    albumId: { type: Number },
    title: { type: String },
    url: { type: String },
    thubnailUrl: { type: String },
})

PhotoSchema.plugin(autoIncrement.plugin, {
    model: 'photos',
    field: 'id',
    startAt: 1
})

export const PhotoModel: Model<PhotoDocument> = model<PhotoDocument>('Photo', PhotoSchema, 'photos')

export default PhotoModel