import React from 'react'
import { connect } from 'react-redux'

import Modal from 'react-responsive-modal'

import API from '../api'
import * as contactsActions from '../actions/contactsActions'

import UserInfo from '../models/UserInfo'

type Props = {
    onClose: Function,
    visible: boolean,
    addContact: Function
}

type State = {
    user: UserInfo,
    message: string
}

class ContactFormModal extends React.Component<Props, State> {
    state = { user: null, message: null }

    onUserSearch = () => {
        const gid: number = Number(this.inputGithubID.value)

        if (gid) {
            API.fetchContacts([gid])
                .then(response => this.setState({ user: response[gid], message: null }))
                .catch(() => this.setState({ message: 'Пользователь не найден' }))
        }
    }

    onContactAdd = () => {
        this.props.addContact(this.state.user)
        this.props.onClose()
    }

    render() {
        return (
            <Modal onClose={this.props.onClose} open={this.props.visible}>
                <div className="modal-content">
                    <h2>Новый контакт</h2>
                    <div>
                        Github ID
                        <input type="number" ref={ref => this.inputGithubID = ref} />
                    </div>
                    <div>
                        <button onClick={this.onUserSearch} className="button button-success">Найти</button>
                    </div>
                    {this.state.message && (
                        <div>{this.state.message}</div>
                    )}

                    {this.state.user && (
                        <div>
                            <p>{JSON.stringify(this.state.user, null, 2)}</p>
                            <button onClick={this.onContactAdd}>Добавить</button>
                        </div>
                    )}
                </div>
            </Modal>
        )
    }
}

export default connect(null, dispatch => ({
    addContact: (user: UserInfo) => dispatch({ type: contactsActions.ADD_ACTION, payload: [user] })
}))(ContactFormModal)
