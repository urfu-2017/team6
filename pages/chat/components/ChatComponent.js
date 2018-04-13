import {connect} from 'react-redux'
import Message from '../../../models/Message'
import React from 'react'
import UserProfile from '../../../models/UserProfile'
import MessageItem from './Message'
import ChatInfoComponent from './ChatInfoComponent'
import MessageForm from './MessageForm'

type Props = {
    session: UserProfile,
    messages: Message[],
    chat: Chat,
}

class ChatComponent extends React.Component<Props> {
    render() {
        return <div className="chat">
            <ChatInfoComponent chatInfo={this.props.chat} />
            <div className="messages">
                {this.props.messages.map(m => <MessageItem key={m.id} message={m} mine={m.authorGid === this.props.session.user.gid}/>)}
            </div>
            <MessageForm />
        </div>
    }
}

export default connect(state => ({
    session: {
        user: {
            gid: 0
        }
    },
    messages: [{
        text: 'Shit1111 this is long message very long message even longer then simply long message. I should check the long message case. How the long meddage would fit the message box.',
        chatId: 1,
        authorGid: 0,
        createdAt: 12332311,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 0,
        createdAt: 12332311,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 0,
        createdAt: 12332311,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 0,
        createdAt: 12332311,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }, {
        text: 'Shit1111',
        chatId: 1,
        authorGid: 1,
        createdAt: 1,
        clusterId: 1
    }],
    chat: {
        members: [1, 2, 3],
        owner: 1,
        common: {
            name: 'chat',
            id: 1
        }
    }
}))(ChatComponent)
