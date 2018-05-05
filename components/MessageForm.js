import React from 'react'
import { connect } from 'react-redux'
import SendIcon from 'react-icons/lib/md/send'
import SmileIcon from 'react-icons/lib/fa/smile-o'
import ImageIcon from 'react-icons/lib/io/image'
import Dropzone from 'react-dropzone'

import EmojiPicker from './EmojiPicker'
import Message from '../server/models/Message'
import { SEND_ACTION } from '../actions/messagesActions'

import ImageCompressor from '../utils/image-compressor'

type Props = {
    chatId: number,
    send: Function
}

type State = {
    dragzone: boolean,
    imgData: string
}

class MessageForm extends React.Component<Props, State> {
    state = { dragzone: false, imgData: null }

    compressor = new ImageCompressor(
        document.createElement('canvas'), // eslint-disable-line
        document.createElement('img') // eslint-disable-line
    )

    dragzoneShow = () => !this.state.dragzone && this.setState({ dragzone: true })

    dragzoneHide = () => this.state.dragzone && this.setState({ dragzone: false })

    showEmojiPicker = e => {
        e.preventDefault()
        this.emojiPicker.toggle()
    }

    selectEmoji = emoji => this.inputText.value += emoji.native

    attachImage = image => {
        const imgSrc = URL.createObjectURL(image) // eslint-disable-line
        this.compressor.run(imgSrc, imgData => this.setState({ imgData, dragzone: false }))
    }

    submit = e => {
        e.preventDefault()

        const text: string = this.inputText.value.trim()

        if (text || this.state.imgData) {
            this.props.send(new Message({ text, imgUrl: this.state.imgData, chatId: this.props.chatId }))
            this.inputText.value = ''
            this.setState({ imgData: null })
        }
    }

    render() {
        return (
            <Dropzone
                disableClick
                accept=".jpeg,.jpg,.png,.gif,.bmp"
                onDrop={files => this.attachImage(files[0])}
                onDragEnter={this.dragzoneShow}
                onDragLeave={this.dragzoneHide}
                style={{ width: '100%' }}
            >
                <div className="message-form-wrapper">
                    {this.state.dragzone && <div className="message-form-dropzone">Переместите изображение сюда...</div>}
                    {this.state.imgData && <img className="message-form-img" src={this.state.imgData}/>}
                    <EmojiPicker
                        onSelect={this.selectEmoji}
                        ref={ref => this.emojiPicker = ref}/>
                    <input
                        ref={ref => this.inputImage = ref}
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={event => this.attachImage(event.target.files[0])}
                        style={{ display: 'none' }}
                    />
                    <form className="message-form" onSubmit={this.submit}>
                        <button type="button" onClick={() => this.inputImage.click()} className="button button-send">
                            <ImageIcon/>
                        </button>
                        <input
                            type="text"
                            className="message-form__input"
                            placeholder="Введите сообщение..."
                            ref={ref => this.inputText = ref}
                        />
                        <button type="button" onClick={this.showEmojiPicker} className="button button-send">
                            <SmileIcon/>
                        </button>
                        <button type="submit" onClick={this.submit} className="button button-send">
                            <SendIcon/>
                        </button>
                    </form>
                </div>
            </Dropzone>
        )
    }
}

export default connect(null, dispatch => ({
    send: (payload: Message) => dispatch({ type: SEND_ACTION, payload })
}))(MessageForm)
