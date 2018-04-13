import React from "react";
import Chat from "../models/Chat";
import {connect} from "react-redux";
import UserInfo from "../models/UserInfo";

type Props = {
    contact: UserInfo,
    selected: Boolean,
    select: Function
}

export class ContactItem extends React.Component<Props> {
    componentDidMount() {
    }

    render() {
        return (
            <div onClick={() => this.props.select(this.props.contact.gid)} className={this.props.selected ? "menu__row menu__row-selected" : "menu__row"}>
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