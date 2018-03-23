import React from 'react'
import PropTypes from 'prop-types'

export default class MainPage extends React.Component {
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

MainPage.propTypes = {
    user: PropTypes.object
}
