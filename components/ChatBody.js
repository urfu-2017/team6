import React from 'react'
import { connect } from 'react-redux'
import Message from '../server/models/Message'
import MessageItem from './Message'
import ChatHeader from './ChatHeader'
import MessageForm from './MessageForm'
import Chat from '../server/models/Chat'
import computeId from '../server/utils/cantor-pairing'
import {SELECT_CHAT_ACTION} from '../actions/uiActions'

type Props = {
    gid: number,
    contacts: number[],
    chat: Chat,
    chatId: number,
    messages: Message[],
    reset: Function
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

    checkDialogExist = () => {
        const { contacts, chat, chatId, gid } = this.props
        const exist: boolean = contacts.map(id => computeId(gid, id)).includes(chatId)

        if (!exist && !chat) {
            this.props.reset()
        }

        return exist || chat
    }

    render() {
        const { messages, chat, chatId, gid } = this.props
        if (!chatId || !this.checkDialogExist()) {
            return (
                <div className="chat">
                    <span className="chat__not-selected">Выберите диалог для общения</span>
                </div>
            )
        }

        return (
            <div className="chat">
                {chat && <ChatHeader chat={chat} />}
                <div className="messages" ref={ref => this.messagesBody = ref}>
                    {messages.map(message => (
                        <MessageItem
                            key={message.createdAt}
                            mine={message.authorGid === gid}
                            message={message}
                            onLoad={this.scrollToBottom}
                        />
                    ))}
                </div>
                <MessageForm chatId={chatId}/>
            </div>
        )
    }
}

export default connect(state => ({
    gid: state.session.user.gid,
    contacts: state.session.contacts,
    chat: state.chats[state.ui.selectedChatId],
    chatId: state.ui.selectedChatId,
    messages: (state.messages[state.ui.selectedChatId] && [...state.messages[state.ui.selectedChatId]]) || []
}), dispatch => ({
    reset: () => dispatch({ type: SELECT_CHAT_ACTION, payload: null })
}))(ChatBody)
