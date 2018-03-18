import React from "react";

export default class ProfileInfo extends React.Component {
    state = { greeting: 'Hello world!' }

    render() {
        return (
            <div>
                {this.state.greeting}
            </div>
        )
    }
}