import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'

import Menu from './Menu'
import Chat from '../models/Chat'
import ChatFormModal from './ChatFormModal'
import ContactFormModal from './ContactFormModal'

import UserProfile from '../models/UserProfile'
import UserInfo from '../models/UserInfo'

import * as userActions from '../actions/userActions'

type Props = {
    session: UserProfile,
    chats: Chat[],
    contacts: UserInfo[],
    fetchSelf: Function,
    children: React.Children,
    selectedTab: Number,
    selectChat: Function,
    selectedChatId: number,
    selectContact: Function,
    selectedContactId: number
}

class Body extends React.Component<Props> {
    state = {
        addChatModalOpen: false,
        addContactModalOpen: false
    }

    componentDidMount() {
        this.socket = io()
        this.props.fetchSelf(this.socket)
    }

    onChatAddClick = () => this.setState({ addChatModalOpen: true })

    onContactAddClick = () => this.setState({ addContactModalOpen: true })

    onChatAddClose = () => this.setState({ addChatModalOpen: false })

    onContactAddClose = () => this.setState({ addContactModalOpen: false })

    onChatAdd = () => this.onChatAddClose()

    onContactAdd = () => this.onContactAddClose()

    render() {
        const contactsArray = Object.values(this.props.contacts)
        const chatsArray = Object.values(this.props.chats)
        return (
            <div className="main">
                <Menu
                    chats={chatsArray}
                    contacts={contactsArray}
                    selectedChatId={this.props.selectedChatId}
                    selectChat={this.props.selectChat}
                    selectedContactId={this.props.selectedContactId}
                    selectContact={this.props.selectContact}
                    onAddChatClick={this.onChatAddClick}
                    onAddContactClick={this.onContactAddClick}
                    selectedTab={this.props.selectedTab}
                />

                <div className="content">
                    { this.props.children }
                </div>

                <ChatFormModal
                    onClose={this.onChatAddClose}
                    visible={this.state.addChatModalOpen}
                />

                <ContactFormModal
                    onClose={this.onContactAddClose}
                    visible={this.state.addContactModalOpen}
                />
            </div>
        )
    }
}

export default connect(state => ({
    session: state.session,
    chats: state.chats,
    contacts: state.contacts
}), dispatch => ({
    fetchSelf: socket => dispatch({ type: userActions.FETCH_PROFILE_ACTION, payload: socket })
}))(Body)
