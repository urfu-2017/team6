import React from 'react'
import { connect } from 'react-redux'
import UserProfile from '../server/models/UserProfile'

type Props = {
    session: UserProfile,
    restored: boolean,
    children: any
}

class Loader extends React.Component<Props> {
    render() {
        if (this.props.restored && this.props.session) {
            return this.props.children
        }

        return (
            <div className="preloader">
                <div>
                    <img src="/static/img/ripple.svg" />
                    <p className="preloader__title">k1logram</p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    session: state.session,
    restored: state.ui.restored
}))(Loader)
