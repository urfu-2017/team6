import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Message from '../server/models/Message'
import MessageItem from './Message'
import ChatHeader from './ChatHeader'
import MessageForm from './MessageForm'
import Chat from '../server/models/Chat'
import computeId from '../server/utils/cantor-pairing'
import { SELECT_CHAT_ACTION } from '../actions/uiActions'

type Props = {
    gid: number,
    contacts: number[],
    chat: Chat,
    chatId: number,
    messages: Message[],
    reset: Function
}

class ChatBody extends React.Component<Props> {
    state = { dragzone: false }

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

    dragzoneShow = () => !this.state.dragzone && this.setState({ dragzone: true })

    dragzoneHide = () => this.state.dragzone && this.setState({ dragzone: false })

    dropFile = files => {
        if (this.messageForm) {
            this.messageForm.attachImage(files[0])
        }

        this.dragzoneHide()
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
            <Dropzone
                disableClick
                accept=".jpeg,.jpg,.png,.gif,.bmp"
                onDrop={this.dropFile}
                onDragEnter={this.dragzoneShow}
                onDragLeave={this.dragzoneHide}
                className="dropzone"
            >
                {this.state.dragzone && <div className="message-form-dropzone">Переместите изображение сюда...</div>}
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
                    <MessageForm
                        ref={ref => ref && (this.messageForm = ref.getWrappedInstance())}
                        chatId={chatId}
                    />
                </div>
            </Dropzone>
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
