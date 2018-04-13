import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'
import UserProfile from '../models/UserProfile'
import fetch from 'isomorphic-unfetch'

import { FETCH_PROFILE_ACTION } from '../actions/userActions'
import UserInfo from '../models/UserInfo'
import Menu from './Menu'
import Chat from '../models/Chat'
import Modal from 'react-responsive-modal'

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
    constructor() {
        super()
        this.state = {
            addChatModalOpen: false,
            addContactModalOpen: false
        }
    }

    componentDidMount() {
        this.socket = io()
        this.props.fetchSelf(this.socket)
    }

    onChatAddClick = () => {
        this.setState({addChatModalOpen: true})
    }

    onConctactAddClick = () => {
        this.setState({addContactModalOpen: true})
    }

    onChatAddClose = () => {
        this.setState({addChatModalOpen: false})
    }

    onContactAddClose = () => {
        this.setState({addContactModalOpen: false})
    }

    onChatAdd = () => {
        this.onChatAddClose()
    }

    onConctactAdd = () => {
        this.onConctactAddClose()
    }

    render() {
        return (
            <div className="main">
                <Menu chats={this.props.chats} contacts={this.props.contacts}
                    selectedChatId={this.props.selectedChatId} selectChat={this.props.selectChat}
                    selectedContactId={this.props.selectedContactId} selectContact={this.props.selectContact}
                    onAddChatClick={this.onChatAddClick} onAddContactClick={this.onConctactAddClick}
                    selectedTab={this.props.selectedTab}/>
                <div className="content">
                    { this.props.children }
                </div>

                <Modal onClose={this.onChatAddClose} open={this.state.addChatModalOpen}>
                    <div className="modal-content">
                        <h2>Создать чат</h2>
                        <div>
                            <label>
                                Название
                                <input type="text" />
                            </label>
                        </div>
                        <div>
                            <button onClick={this.onChatAdd} className="button button-success">Добавить</button>
                        </div>
                    </div>
                </Modal>

                <Modal onClose={this.onContactAddClose} open={this.state.addContactModalOpen}>
                    <div className="modal-content">
                        <h2>Создать контакт</h2>
                        <div>
                            <label>
                                Github ID
                                <input type="text" />
                            </label>
                            <label>
                                Имя
                                <input type="text" />
                            </label>
                        </div>
                        <div>
                            <button className="button button-success">Добавить</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(state => ({
    session: state.session,
    chats: [
        {
            common: {
                name: 'a',
                id: 1
            },
            members: [1, 2],
            owner: 1
        }, {
            common: {
                name: 'a2',
                id: 2
            },
            members: [1, 2],
            owner: 1
        }
    ],
    contacts: [
        {

            name: 'a',
            gid: 1,
            bio: 'bio',
            email: 'asd@asd.asd',
            avatar: 'sad'
        },
        {

            name: 'a2',
            gid: 2,
            bio: 'bio',
            email: 'asd@asd.asd',
            avatar: 'sad'
        }
    ]
}), dispatch => ({
    fetchSelf: socket => dispatch({ type: FETCH_PROFILE_ACTION, payload: socket })
}))(Body)
