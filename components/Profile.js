import React from 'react'
import { connect } from 'react-redux'
import UserInfo from '../models/UserInfo'
import noavatar from '../utils/noavatar'

type Props = {
    user: UserInfo
}

class Profile extends React.Component<Props> {
    render() {
        const { user } = this.props
        return (
            <div className="profile-card">
                <div className="profile-card__avatar">
                    <img src={noavatar(user.gid)}/>
                </div>
                <div className="profile-card__body">
                    <p className="profile-card__body_name">{user.name}</p>
                    <p className="profile-card__body_bio">{user.bio}</p>
                    <p className="profile-card__body_email">{user.email}</p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.session.user
}))(Profile)
