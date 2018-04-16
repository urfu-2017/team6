import React from 'react'
import { Provider } from 'react-redux'

import Head from 'next/head'
import Router from 'next/router'

import initStore from '../../store'

import Body from '../../components/Body'
import ChatBody from './components/ChatBody'

import UserProfile from '../../server/models/UserProfile'
import Message from '../../server/models/Message'

type Props = {
    session: UserProfile,
    messages: Array<Message>,
    url: Object
}

type State = {
    selectedChatId: string
}

export default class Main extends React.Component<Props, State> {
    static async getInitialProps({ req }) {
        return { session: req.user }
    }

    state = {
        selectedChatId: null,
        selectedContactId: null
    }

    componentDidMount() {
        if (this.props.url.query.id) {
            this.selectChat(this.props.url.query.id)
        }
    }

    selectChat = chatId => {
        const href = `/chat?id=${chatId}`

        if (chatId !== this.state.selectedChatId) {
            Router.replace(href, href, { shallow: true })
        }

        this.setState({ selectedChatId: chatId })
    }

    render() {
        return (
            <Provider store={initStore()}>
                <div className="root">
                    <Head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>Kilogram Messenger</title>
                        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
                        <link rel="stylesheet" href="/static/styles/main.css"/>
                    </Head>
                    <Body
                        session={this.props.session}
                        selectedTab={0}
                        selectChat={this.selectChat}
                        selectedChatId={this.state.selectedChatId}
                    >
                        <ChatBody chatId={Number(this.state.selectedChatId)}/>
                    </Body>
                </div>
            </Provider>
        )
    }
}
