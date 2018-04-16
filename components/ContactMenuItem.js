import React from 'react'
import { connect } from 'react-redux'
import RemoveIcon from 'react-icons/lib/md/clear'

import UserInfo from '../server/models/UserInfo'

import { SELECT_CHAT_ACTION } from '../actions/uiActions'
import { REMOVE_ACTION } from '../actions/contactsActions'

type Props = {
    contact: UserInfo,
    selected: boolean,
    selectChat: Function,
    removeContact: Function
}

class ContactMenuItem extends React.Component<Props> {
    onSelectChat = () => this.props.selectChat(this.props.contact.gid)
    onRemoveClick = () => this.props.removeContact(this.props.contact.gid)

    render() {
        const { contact, selected } = this.props
        const message = null
        return (
            <div onClick={this.onSelectChat} className={selected ? 'menu__row menu__row-selected' : 'menu__row'}>
                <div onClick={this.onRemoveClick} className="menu-row__remove"><RemoveIcon/></div>
                <p className="menu-row__title">
                    {contact.name}
                </p>
                <div className="menu-row__message">
                    {message ? <p>{message.text}</p> : <i>сообщений нет</i>}
                </div>
            </div>
        )
    }
}

export default connect((state, { contact }: { contact: UserInfo }) => ({
    selected: state.ui.selectedChatId === contact.gid
}), dispatch => ({
    selectChat: payload => dispatch({ type: SELECT_CHAT_ACTION, payload }),
    removeContact: (gid: number) => dispatch({ type: REMOVE_ACTION, payload: [gid] })
}))(ContactMenuItem)
