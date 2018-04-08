import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'
import UserProfile from '../models/UserProfile'
import fetch from 'isomorphic-unfetch'

import { FETCH_PROFILE_ACTION } from '../actions/userActions'
import UserInfo from '../models/UserInfo'

type Props = {
    session: UserProfile,
    fetchSelf: Function
}

class Body extends React.Component<Props> {
    componentDidMount() {
        this.socket = io()
        this.props.fetchSelf(this.socket)
    }

    updateProfile = () => {
        const userInfo: UserInfo = { ...this.props.session.user }
        userInfo.bio = `my new bio ${Date.now()}`

        fetch('/api/v1/user', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(userInfo)
        })
    }

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.props.session, null, 2)}</pre>
                <button onClick={this.updateProfile}>update profile</button>
            </div>
        )
    }
}

export default connect(state => ({
    session: state.session
}), dispatch => ({
    fetchSelf: socket => dispatch({ type: FETCH_PROFILE_ACTION, payload: socket })
}))(Body)
