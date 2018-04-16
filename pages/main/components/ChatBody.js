import React from 'react'
import {connect} from 'react-redux'
import Message from '../../../server/models/Message'
import MessageItem from './Message'
import ChatHeader from './ChatHeader'
import MessageForm from './MessageForm'
import Chat from '../../../server/models/Chat'

type Props = {
    gid: number,
    chatId: number,
    chat: Chat,
    messages: Message[],
}

class ChatBody extends React.Component<Props> {
    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        if (this.messagesBody) {
            this.messagesBody.scrollTop = this.messagesBody.scrollHeight
        }
    }

    render() {
        if (!this.props.chat) {
            return null
        }

        const messages: Message[] = this.props.messages || []
        return (
            <div className="chat">
                <ChatHeader chat={this.props.chat} />
                <div className="messages" ref={ref => this.messagesBody = ref}>
                    {messages.map(m => <MessageItem
                        key={m.createdAt}
                        message={m}
                        mine={m.authorGid === this.props.gid}
                    />)}
                </div>
                <MessageForm chatId={this.props.chatId} />
            </div>
        )
    }
}

export default connect((state, props) => ({
    gid: state.session.user.gid,
    chat: state.chats[props.chatId],
    messages: state.messages[props.chatId] && [...state.messages[props.chatId]]
}))(ChatBody)
