import React from 'react'
import UserInfo from '../../../models/UserInfo'

type Props = {
    contact: UserInfo,
}

export class ContactItem extends React.Component<Props> {
    render() {
        return (
            <div className="menu__row">
                <div className="chat-item__title">
                    {this.props.contact.name}
                </div>
                <div className="chat-item__message">
                    {this.props.contact.email}
                </div>
            </div>
        )
    }
}

export default ContactItem
