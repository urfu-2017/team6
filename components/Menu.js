import React from 'react'
import PlusIcon from 'react-icons/lib/md/plus-one'
import { connect } from 'react-redux'

import ChatMenuItem from './ChatMenuItem'
import ContactMenuItem from './ContactMenuItem'
import ProfileCard from './ProfileCard'

import Chat from '../server/models/Chat'
import UserInfo from '../server/models/UserInfo'

type Props = {
    chats: Chat[],
    contacts: UserInfo[]
}

export class Menu extends React.Component<Props> {
    render() {
        const contactsArray: UserInfo[] = Object.values(this.props.contacts)
        const chatsArray: Chat[] = Object.values(this.props.chats)
        return (
            <div className="menu">
                <ProfileCard/>

                <div className="menu__chats">
                    <div className="menu__chats_divider">
                        Группы
                        <PlusIcon className="menu__chats_plus"/>
                    </div>
                    {chatsArray.map(chat => (
                        <ChatMenuItem
                            key={chat.common.id}
                            chat={chat}
                        />
                    ))}

                    <div className="menu__chats_divider">
                        Контакты
                        <PlusIcon className="menu__chats_plus"/>
                    </div>
                    {contactsArray.map(contact => (
                        <ContactMenuItem
                            key={contact.gid}
                            contact={contact}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    chats: state.chats,
    contacts: state.contacts
}))(Menu)
