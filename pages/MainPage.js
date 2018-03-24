import React from 'react'
import UserProfile from '../models/UserProfile'

type Props = {
    user: UserProfile
}

type State = {
    counter: number
}

export default class MainPage extends React.Component<Props, State> {
    static async getInitialProps({ req }) {
        return { user: req.user }
    }

    state = { counter: 1 }

    componentDidMount() {
        setInterval(() => {
            this.setState({ counter: this.state.counter + 1 })
        }, 10)
    }

    render() {
        return (
            <div>
                {this.state.counter}
                <pre>
                    {JSON.stringify(this.props.user, null, 2)}
                </pre>
            </div>
        )
    }
}
