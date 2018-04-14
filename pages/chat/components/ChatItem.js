import React from 'react'
import {connect} from 'react-redux'
import GroupIcon from 'react-icons/lib/md/group'
import RemoveIcon from 'react-icons/lib/md/clear'
import Message from '../../../models/Message'
import Chat from '../../../models/Chat'
import UserInfo from '../../../models/UserInfo'
import { REMOVE_ACTION } from '../../../actions/chatsActions'

type Props = {
    chat: Chat,
    selected: boolean,
    select: Function,
    removeChat: Function,
    message: Message,
    members: Object,
}

export class ChatItem extends React.Component<Props> {
    onRemoveClick = () => {
        this.props.removeChat(this.props.chat)
    }

    render() {
        const { chat, message, members } = this.props
        const author: UserInfo = (message && members[message.authorGid]) || {}
        return (
            <div
                onClick={() => this.props.select(chat.common.id)}
                className={this.props.selected ? 'menu__row menu__row-selected' : 'menu__row'}
            >
                <div onClick={this.onRemoveClick} className="menu-row__remove"><RemoveIcon/></div>
                <p className="menu-row__title">
                    <GroupIcon/> {chat.common.name}
                </p>
                <p className="menu-row__message">
                    {message ? <p><b>{author.name || '...'}:</b> {message.text}</p> : <i>сообщений нет</i>}
                </p>
            </div>
        )
    }
}

export default connect((state, { chat: { common: { id } } }) => ({
    members: state.chatsMembers,
    message: state.messages[id] && state.messages[id][
        state.messages[id].length - 1
    ]
}), dispatch => ({
    removeChat: (payload: Chat) => dispatch({ type: REMOVE_ACTION, payload })
}))(ChatItem)
