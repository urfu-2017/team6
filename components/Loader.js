import React from 'react'
import { connect } from 'react-redux'

type Props = {
    restored: boolean,
    children: any
}

class Loader extends React.Component<Props> {
    render() {
        if (!this.props.restored) {
            return (
                <div className="preloader">
                    <div>
                        <img src="/static/img/ripple.svg" />
                        <p className="preloader__title">k1logram</p>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default connect(state => ({
    restored: state.ui.restored
}))(Loader)
