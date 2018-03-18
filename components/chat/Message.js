import React from 'react'

export default class Message extends React.Component {
    state = { greeting: 'Hello world!' }

    render() {
        return (
            <div>
                {this.state.greeting}
            </div>
        )
    }
}
