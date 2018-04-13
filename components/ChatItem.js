import React from "react";
import Chat from "../models/Chat";
import {connect} from "react-redux";

type Props = {
    chat: Chat,
    selected: Boolean,
    select: Function,
    lastMessage: Message
}

export class ChatItem extends React.Component<Props> {
    componentDidMount() {
    }

    render() {
        return (
            <div onClick={() => this.props.select(this.props.chat.common.id)} className={this.props.selected ? "menu__row menu__row-selected" : "menu__row"}>
                <div className="chat-item__title">
                    {this.props.chat.common.name}
                </div>
                <div className="chat-item__message">
                    {this.props.lastMessage.authorGid}: {this.props.lastMessage.text}
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    lastMessage: {
        text: "last message long messagen very very long message oh yeah this is message dog is eating cat is eating\nline break <br /> tag it should be very long shit it should be even longer cat dog",
        authorGid: 1
    }
}))(ChatItem)