import config from '../modules/config'

import mongoose, { model, Schema, Model, Document } from 'mongoose'

import autoIncrement from 'mongoose-auto-increment'
autoIncrement.initialize(mongoose.createConnection(config.mongo.url))

import { UserInterface } from '../types/user'

export interface UserDocument extends UserInterface, Document {
    _id: string
    id: number
    login: string
    email: string
    password: string
    registerDate: Date
}

const UserSchema: Schema = new Schema<UserDocument>({
    id: { type: Number, index: true, unic: true },
    login: { type: String },
    email: { type: String },
    password: { type: String },
    registerDate: { type: Date },
})

UserSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    field: 'id',
    startAt: 1
})

export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema, 'users')

export default UserModel