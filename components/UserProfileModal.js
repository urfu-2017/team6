import React from 'react'
import { connect } from 'react-redux'
import UserInfo from '../models/UserInfo'
import Modal from 'react-responsive-modal'
import { CLOSE_PROFILE } from '../actions/viewActions'

type Data = {
    user: UserInfo,
    isShow: boolean
}

type Props = {
    data: Data,
    closeModal: Function
}

class ProfileView extends React.Component<Props> {
    onCloseModal = () => this.props.closeModal()

    render() {
        const { user, isShow } = this.props.data
        return (
            <Modal onClose={this.onCloseModal} open={isShow}>
                <div className="modal-content">
                    <p className="modal-content_title">{user.name}</p>
                    <p>{user.bio}</p>
                    <p>{user.email}</p>
                </div>
            </Modal>
        )
    }
}

export default connect(state => ({
    data: state.viewModalProfile
}), dispatch => ({
    closeModal: () => dispatch({ type: CLOSE_PROFILE })
}))(ProfileView)
