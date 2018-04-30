import UserProfile from '../models/UserProfile'
import SocketEvent from '../models/SocketEvent'

class SocketManager {
    init(io) {
        this.io = io
        this.io.on('connection', socket => {
            socket.on('connect_auth', (client: UserProfile) => {
                try {
                    socket.join(`session_${client.user.gid}`)
                    client.chats.forEach(id => socket.join(`chat_${id}`))
                    client.contacts.forEach(id => socket.join(`user_${id}`))
                } catch (e) {
                    console.info(e)
                }
            })
        })
    }

    sendEvent(target: string, event: SocketEvent) {
        setTimeout(() => this.io.to(target).emit(event.type, event.data))
    }
}

export default new SocketManager()
