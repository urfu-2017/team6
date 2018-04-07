import React from 'react'
import { connect } from 'react-redux'

import UserProfile from '../models/UserProfile'

type Props = {
    user: UserProfile
}

class Body extends React.Component<Props> {
    render() {
        return (
            <div>
                {JSON.stringify(this.props.user, null, 2)}
            </div>
        )
    }
}

export default connect(state => ({
    user: state.session
}))(Body)
