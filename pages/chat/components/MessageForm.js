import Message from '../../../models/Message'
import React from 'react'

class MessageForm extends React.Component<Props> {
    onMessageChange = e => {
        this.setState({message: e.target.value})
    }

    render() {
        return (
            <div className="message-form">
                <textarea onChange={this.onMessageChange}>

                </textarea>
                <button className="button button-success">Отправить</button>
            </div>
        )
    }
}

export default MessageForm
