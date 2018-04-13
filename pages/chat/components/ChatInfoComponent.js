import Message from '../../../models/Message'
import React from 'react'
import Chat from '../../../models/Chat'

type Props = {
    chatInfo: Chat
}

class MessageItem extends React.Component<Props> {
    render() {
        const {chatInfo} = this.props
        return (
            <div className="chat__info">
                <div className="chat__name">
                    {chatInfo.common.name}
                </div>
                <div className="chat__members">
                    {chatInfo.members && chatInfo.members.length || 0}
                </div>
            </div>
        )
    }
}

export default MessageItem
