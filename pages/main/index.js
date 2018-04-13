import React from 'react'
import { Provider } from 'react-redux'

import Head from 'next/head'
import Link from 'next/link'

import initStore from '../../store'

import UserProfile from '../../models/UserProfile'

import Body from '../../components/Body'

import stylesheet from './main.css'

type Props = {
    session: UserProfile
}

export default class Main extends React.Component<Props> {
    static async getInitialProps({ req }) {
        return { session: req.user }
    }

    render() {
        return (
            <Provider store={initStore(this.props.session)}>
                <div>
                    <Head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="stylesheet" href="/_next/static/style.css" />
                        <title>Kilogram Messenger</title>
                        <style dangerouslySetInnerHTML={{ __html: stylesheet.toString() }} />
                    </Head>
                    <Body>
                        <div>shit</div>
                        <Link href="chat">
                            chat
                        </Link>
                    </Body>
                </div>
            </Provider>
        )
    }
}
