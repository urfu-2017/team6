import React from 'react'
import { connect } from 'react-redux'
import SendIcon from 'react-icons/lib/md/send'
import SmileIcon from 'react-icons/lib/fa/smile-o'
import EmojiPicker from './EmojiPicker'
import Message from '../server/models/Message'
import { SEND_ACTION } from '../actions/messagesActions'

type Props = {
    chatId: number,
    send: Function
}

class MessageForm extends React.Component<Props> {
    showEmojiPicker = e => {
        e.preventDefault()
        this.emojiPicker.toggle()
    }

    onSelectEmoji = emoji => {
        this.inputText.value += emoji.native
    }

    onSubmit = e => {
        e.preventDefault()

        const text: string = this.inputText.value.trim()

        if (text) {
            this.props.send(new Message({ text, chatId: this.props.chatId }))
            this.inputText.value = ''
        }
    }

    render() {
        return (
            <div className="message-form-wrapper">
                <EmojiPicker
                    onSelect={this.onSelectEmoji}
                    ref={ref => this.emojiPicker = ref}/>
                <form className="message-form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="message-form__input"
                        placeholder="Введите сообщение..."
                        ref={ref => this.inputText = ref}
                    />
                    <button type="button" onClick={this.showEmojiPicker} className="button button-send">
                        <SmileIcon/>
                    </button>
                    <button type="submit" onClick={this.onSubmit} className="button button-send">
                        <SendIcon/>
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(null, dispatch => ({
    send: (payload: Message) => dispatch({ type: SEND_ACTION, payload })
}))(MessageForm)
