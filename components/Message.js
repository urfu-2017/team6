import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'
import Chat from '../models/Chat'
import fetch from 'isomorphic-unfetch'

import { FETCH_PROFILE_ACTION } from '../actions/userActions'
import UserInfo from '../models/UserInfo'
import Message from '../models/Message'

type Props = {
    message: Message,
    mine: Boolean
}

class MessageItem extends React.Component<Props> {

    render() {
        let {message} = this.props
        return (
            <div className={this.props.mine ? "message message-right" : "message"}>
                <div className="message__author">
                    {message.authorGid}
                </div>
                <div className="message__box">
                    <div className="message__text">
                        {message.text}
                    </div>
                    <div className="message__time">
                        {message.createdAt}
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageItem
