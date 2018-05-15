import React from 'react'
import Message from '../server/models/Message'
import avatarByGid from '../utils/avatarByGid'

type Props = {
    message: Message,
    nested: boolean
}

export default class ForwardedMessage extends React.PureComponent<Props> {
    render() {
        const { message, nested } = this.props
        return (
            <div className={`message-forwarded${nested ? ' forwarded-nested' : ''}`}>
                <img src={avatarByGid(message.authorGid)}/>
                <div className="message-forwarded__body">
                    <p className="message-forwarded__body-name">{message.authorGid}</p>
                    <p>{message.text}</p>
                    {message.forwarded.map(message => (
                        <ForwardedMessage key={message._id} message={message} nested/>
                    ))}
                </div>
            </div>
        )
    }
}
