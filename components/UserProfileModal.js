import React from 'react'
import { connect } from 'react-redux'

import Modal from 'react-responsive-modal'
import { Dot } from 'react-animated-dots'

import API from '../api'
import UserInfo from '../server/models/UserInfo'

import { CLOSE_PROFILE_MODAL, entities } from '../actions/uiActions'
import { UPLOAD_AVATAR_SUCCESS } from '../actions/userActions'
import avatarByGid from '../utils/avatarByGid'

type Props = {
    gid: number,
    modified: number,
    data: { user: UserInfo, visible: boolean },
    uploadSuccess: Function,
    closeModal: Function
}

type State = {
    uploading: boolean
}

class UserProfileModal extends React.Component<Props, State> {
    state = { uploading: false }

    onChange = () => this.inputFile.click()

    onSelect = async e => {
        this.setState({ uploading: true })

        try {
            await API.uploadAvatar(this.props.gid, e.target.files[0])
            this.setState({ uploading: false })
            this.props.uploadSuccess()
        } catch (e) {
            this.setState({ uploading: false })
        }
    }

    render() {
        const { user, visible } = this.props.data

        if (!visible) {
            return null
        }

        return (
            <Modal onClose={this.props.closeModal} open={true}>
                <div className="modal-content">
                    <p className="modal-content_title">{user.name}</p>
                    <div className="modal-user-profile">
                        {user.gid === this.props.gid ? (
                            <div style={{ position: 'relative' }}>
                                <img
                                    onClick={this.onChange}
                                    title="Изменить аватарку"
                                    className="modal-user-profile__avatar hoverable"
                                    src={avatarByGid(user.gid, this.props.modified)}/>
                                <input
                                    ref={ref => this.inputFile = ref}
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={this.onSelect}
                                />
                                {this.state.uploading && (
                                    <div className="modal-user-profile__avatar_uploading">
                                        <p>Загрузка
                                            <Dot>.</Dot>
                                            <Dot>.</Dot>
                                            <Dot>.</Dot>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : <img className="modal-user-profile__avatar" src={avatarByGid(user.gid)} />}
                        <div>
                            <p>{user.bio}</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default connect(state => ({
    gid: state.session.user.gid,
    modified: state.session.modified,
    data: state.ui[entities.PROFILE_MODAL]
}), dispatch => ({
    uploadSuccess: () => dispatch({ type: UPLOAD_AVATAR_SUCCESS }),
    closeModal: () => dispatch({ type: CLOSE_PROFILE_MODAL })
}))(UserProfileModal)
