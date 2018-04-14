import React from 'react'
import { connect } from 'react-redux'
import Message from '../../../models/Message'
import UserInfo from '../../../models/UserInfo'

type Props = {
    users: Object,
    message: Message,
    mine: Boolean
}

class MessageItem extends React.Component<Props> {
    render() {
        const { message, users } = this.props
        const author: UserInfo = users[message.authorGid] || {}
        return (
            <div
                style={{ opacity: message.clusterId < 0 ? 0.5 : 1 }}
                className={this.props.mine ? 'message message-right' : 'message'}
            >
                <div className="message__avatar">
                    <img src={author.avatar} title={author.name}/>
                </div>
                <div className="message-box">
                    <div className="message-box__text">
                        {message.text}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    users: state.chatsMembers
}))(MessageItem)
