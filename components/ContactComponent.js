import {connect} from "react-redux";
import Message from "../models/Message";
import React from "react";
import UserProfile from "../models/UserProfile";
import MessageItem from "./Message";
import ChatInfoComponent from "./ChatInfoComponent";
import MessageForm from "./MessageForm";

type Props = {
    contact: UserInfo,
}

class ContactComponent extends React.Component<Props> {
    render() {
        return <div className="contact">
            <div className="contact__avatar">
                <img src="https://cdn-images-1.medium.com/max/1600/1*4a2I2WSsdbcIaXw6jRAgNg.png" alt="avatar" />
            </div>
            <div className="contact__info">
                <a href={`https://github.com/${this.props.contact.gid}`}>
                    {this.props.contact.gid} on Github
                </a>
            </div>
            <div className="contact__info">
                {this.props.contact.name}
            </div>
            <div className="contact__info">
                {this.props.contact.bio}
            </div>
        </div>
    }
}

export default connect(state => ({
    contact: {
        gid: 12,
        name: "contact",
        bio: "Бандит, грабитель банков и дрессировщик собак",
        email: "dog@dog.dog"
    }
}))(ContactComponent)
