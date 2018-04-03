import React from 'react'
import Head from 'next/head'

import UserProfile from '../../models/UserProfile'

import stylesheet from './main.css'

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

    state = { user: this.props.user }

    render() {
        return (
            <div className="main">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <title>Kilogram messenger</title>
                    <style dangerouslySetInnerHTML={{ __html: stylesheet.toString() }} />
                </Head>
                <span>My Profile: </span>
                <pre>
                    {JSON.stringify(this.state.user, null, 2)}
                </pre>
            </div>
        )
    }
}
