// @flow

import Cache from 'lru-cache'
import mongoose from 'mongoose'

import config from '../config'
import UserProfile from '../models/UserProfile'

const LRUCache: Cache = new Cache({
    max: 100000,
    maxAge: 1000 * 60 * 60
})

class EntityNotFoundError extends Error {}

class Entity<T> {
    name: string
    collection: string
    Model: Object

    constructor(name, collection, schema) {
        this.name = name
        this.collection = collection
        this.Model = mongoose.model(name, schema, collection)
    }

    getAll(options? = { limit: 50, offset: 0, where: {} }): Promise<Array<T>> {
        return this.Model.find(options.where)
            .skip(options.offset)
            .limit(options.limit)
            .exec()
    }

    async get(_id: number): Promise<T> {
        const key = `${this.Model.collection.name}_${_id}`
        const cached = LRUCache.get(key)

        if (cached) {
            return cached
        }

        const model: T = await this.Model.findOne({ _id })

        if (!model) {
            throw new EntityNotFoundError(`${this.constructor.name}: entity with id=${_id} not found`)
        }

        LRUCache.set(key, model)

        return model
    }

    remove(_id: number): Promise<void> {
        LRUCache.del(`${this.Model.collection.name}_${_id}`)
        return this.Model.remove({ _id })
    }

    async updateOrCreate(_id: number, obj: T): Promise<void> {
        const model = await this.Model.findOne({ _id })

        if (!model) {
            const entity = new this.Model(obj)
            return entity.save()
        }

        LRUCache.del(`${this.Model.collection.name}_${_id}`)

        return model.update(obj)
    }

    static create<S>(name, collection, schema) {
        return new class extends Entity<S> {
            constructor() {
                super(name, collection, schema)
            }
        }()
    }
}

export const userModel: Entity<UserProfile> = Entity.create('user', 'users', mongoose.Schema({
    _id: Number,
    user: mongoose.Schema({
        gid: Number,
        name: String,
        bio: String,
        email: String,
        avatar: String
    }),
    contacts: [Number],
    chats: [Number]
}))

export const chatModel = Entity.create('chat', 'chats', mongoose.Schema({
    _id: Number,
    common: mongoose.Schema({
        name: String,
        createdAt: Number
    }),
    owner: Number,
    members: [Number]
}))

export const messageModel = Entity.create('message', 'messages', mongoose.Schema({
    _id: Number,
    text: String,
    chatId: Number,
    authorGid: Number,
    createdAt: Number
}))

export const connect = () => mongoose.connect(config.MONGODB_URL, { autoReconnect: true })
export const disconnect = () => mongoose.disconnect()
