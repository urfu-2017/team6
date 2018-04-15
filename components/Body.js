import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'

import Menu from './Menu'
import ChatFormModal from './ChatFormModal'
import ContactFormModal from './ContactFormModal'
import UserProfileModal from './UserProfileModal'

import * as userActions from '../actions/userActions'
import UserProfile from '../models/UserProfile'

type Props = {
    initialSession: Function,
    fetchSelf: Function,
    session: UserProfile,
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

    componentWillMount() {
        this.props.initialSession(this.props.session)
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
        return (
            <div className="main">
                <Menu
                    selectedChatId={this.props.selectedChatId}
                    selectChat={this.props.selectChat}
                    onAddChatClick={this.onChatAddClick}
                    onAddContactClick={this.onContactAddClick}
                    selectedTab={this.props.selectedTab}
                />

                <div className="content">
                    {this.props.children}
                </div>

                <ChatFormModal
                    onClose={this.onChatAddClose}
                    visible={this.state.addChatModalOpen}
                />

                <ContactFormModal
                    onClose={this.onContactAddClose}
                    visible={this.state.addContactModalOpen}
                />

                <UserProfileModal/>
            </div>
        )
    }
}

export default connect(null, dispatch => ({
    initialSession: payload => dispatch({ type: userActions.INITIAL_SESSION_ACTION, payload }),
    fetchSelf: socket => dispatch({ type: userActions.FETCH_PROFILE_ACTION, payload: socket })
}))(Body)
