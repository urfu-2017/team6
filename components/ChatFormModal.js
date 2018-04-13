import React from 'react'
import { connect } from 'react-redux'

import Modal from 'react-responsive-modal'

import * as chatsActions from '../actions/chatsActions'

import Chat from '../models/Chat'
import ChatInfo from '../models/ChatInfo'

type Props = {
    onClose: Function,
    visible: boolean,
    createChat: Function
}

class ChatFormModal extends React.Component<Props> {
    onChatCreate = () => {
        const name: string = this.inputName.value

        if (name) {
            this.props.createChat(new Chat({ common: new ChatInfo({ name }) }))
            this.props.onClose()
        }
    }

    render() {
        return (
            <Modal onClose={this.props.onClose} open={this.props.visible}>
                <div className="modal-content">
                    <h2>Новый чат</h2>
                    <div>
                        Название
                        <input type="text" ref={ref => this.inputName = ref} />
                        <button onClick={this.onChatCreate} className="button button-success">Создать</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default connect(null, dispatch => ({
    createChat: (payload: Chat) => dispatch({ type: chatsActions.CREATE_ACTION, payload })
}))(ChatFormModal)
