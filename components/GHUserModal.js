import React from 'react'

export default class GHUserModal extends React.Component {
    state = { greeting: 'Hello world!' }

    render() {
        return (
            <div>
                {this.state.greeting}
            </div>
        )
    }
}
