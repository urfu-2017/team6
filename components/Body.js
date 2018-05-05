import React from 'react'
import { connect } from 'react-redux'
import { Dot } from 'react-animated-dots'

import io from 'socket.io-client'

import Menu from './Menu'
import ChatFormModal from './ChatFormModal'
import ContactFormModal from './ContactFormModal'
import UserProfileModal from './UserProfileModal'
import ChatBody from './ChatBody'

import UserProfile from '../server/models/UserProfile'

import * as userActions from '../actions/userActions'
import * as uiActions from '../actions/uiActions'

type Props = {
    im: number,
    invite: number,
    restored: boolean,
    online: boolean,
    session: UserProfile,
    initialSession: Function,
    fetchSelf: Function,
    selectChat: Function
}

type State = {
    connected: boolean
}

export let socket

class Body extends React.Component<Props, State> {
    state = { connected: false }

    updateState = () => this.setState({ connected: !this.state.connected })

    componentWillMount() {
        this.props.initialSession(this.props.session)
    }

    componentDidMount() {
        const { selectChat, fetchSelf, im, invite } = this.props

        this.socket = io()
        socket = this.socket
        socket.on('connect', this.updateState)
        socket.on('disconnect', this.updateState)

        fetchSelf(invite)
        selectChat(im || invite)
    }

    render() {
        return (
            <div>
                {(!this.state.connected || !this.props.online) && (
                    <div className="line-offline">
                        <span>Нет подключения
                            <Dot>.</Dot>
                            <Dot>.</Dot>
                            <Dot>.</Dot>
                        </span>
                    </div>
                )}
                <div className="main">
                    <Menu/>
                    <div className="content">
                        <ChatBody/>
                    </div>
                    <ChatFormModal/>
                    <ContactFormModal/>
                    <UserProfileModal/>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    online: state.offline.online
}), dispatch => ({
    initialSession: payload => dispatch({ type: userActions.INITIAL_SESSION_ACTION, payload }),
    fetchSelf: invite => dispatch({ type: userActions.FETCH_PROFILE_ACTION, payload: invite }),
    selectChat: payload => dispatch({ type: uiActions.SELECT_CHAT_ACTION, payload })
}))(Body)
