import React from "react";

export default class MessageBox extends React.Component {
    state = { greeting: 'Hello world!' }

    render() {
        return (
            <div>
                {this.state.greeting}
            </div>
        )
    }
}
