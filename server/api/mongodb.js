// @flow

import mongoose from 'mongoose'

import config from '../config'
import UserProfile from '../models/UserProfile'

class Entity {
    constructor(name, collection, schema) {
        this.name = name
        this.schema = schema
        this.collection = collection
        this.Model = mongoose.model(name, schema, collection)
    }

    getAll(): Promise<Array<any>> {
        return this.Model.find()
    }

    get(id: number): Promise<any> {
        return this.Model.findOne({ id })
    }

    remove(id: number): Promise<void> {
        this.Model.remove({ id })
    }

    async updateOrCreate(id: number, obj: any): Promise<void> {
        const model = await this.Model.find({ id })

        if (!model) {
            return new this.Model(this._format(obj))
        }

        model.update(this._format(obj))
    }

    _format(obj: any): any {
        return obj
    }
}

class User extends Entity {
    constructor() {
        super('user', 'users', mongoose.Schema({
            id: Number,
            name: String,
            bio: String,
            email: String,
            avatar: String,
            contacts: [Number],
            chats: [Number]
        }))
    }

    _format(profile: UserProfile): any {
        return {
            id: profile.user.id,
            name: profile.user.name,
            bio: profile.user.bio,
            email: profile.user.email,
            avatar: profile.user.avatar,
            contacts: profile.contacts,
            chats: profile.chats
        }
    }
}

class Chat extends Entity {
    constructor() {
        super('chat', 'chats', mongoose.Schema({
            id: Number,
            name: String,
            owner: Number,
            members: [Number]
        }))
    }

    _format(chat: Chat): any {
        return {
            id: chat.common.id,
            name: chat.common.name,
            owner: chat.owner,
            members: chat.members
        }
    }
}

class Message extends Entity {
    constructor() {
        super('message', 'messages', mongoose.Schema({
            text: String,
            chatId: Number,
            authorGid: Number,
            avatar: String,
            createdAt: Date
        }))
    }

    _format(message: Message): any {
        return { ...message }
    }
}

export const user = new User()
export const chat = new Chat()
export const message = new Message()

export const start = async () => {
    await mongoose.connect(config.MONGODB_URL)
}

export const end = async () => {
    await mongoose.disconnect()
}
