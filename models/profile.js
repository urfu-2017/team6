import ProfileInfo from './profileInfo'

export default class Profile extends ProfileInfo {
    constructor({ gid, name, phone, avatar, chats, contacts }) {
        super({ gid, name, phone, avatar })

        this.chats = chats
        this.contacts = contacts
    }
}
