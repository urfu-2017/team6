import React from 'react'
import { Provider } from 'react-redux'

import Head from 'next/head'
import Router from 'next/router'

import initStore from '../../store'

import Body from '../../components/Body'
import ChatComponent from './components/ChatComponent'

import UserProfile from '../../models/UserProfile'
import Message from '../../models/Message'

import stylesheet from './main.css'

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

    state = { selectedChatId: null}

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

        this.setState({ selectedChatId: chatId }, () => this.forceUpdate())
    }

    selectContact = contactId => Router.push(`/contact?id=${contactId}`)

    render() {
        return (
            <Provider store={initStore(this.props.session)}>
                <div className="root">
                    <Head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>Kilogram Messenger</title>
                        <style dangerouslySetInnerHTML={{ __html: stylesheet.toString() }} />
                    </Head>
                    <Body
                        selectedTab={0}
                        selectChat={this.selectChat}
                        selectedChatId={this.state.selectedChatId}
                        selectContact={this.selectContact}
                        selectedContactId={null}
                    >
                        <ChatComponent />
                    </Body>
                </div>
            </Provider>
        )
    }
}
