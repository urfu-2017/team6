import React from 'react'

export default class MainPage extends React.Component {
    state = { greeting: 'Main SPA page' }

    render() {
        return (
            <div>
                {this.state.greeting}
            </div>
        )
    }
}
