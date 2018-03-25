// @flow

interface ChatInfoType {
    id?: number,
    name: string
}

export default class ChatInfo implements ChatInfoType {
    id: number
    name: string

    constructor({ id = new Date().getTime(), name }: ChatInfoType) {
        this.id = id
        this.name = name
    }
}
