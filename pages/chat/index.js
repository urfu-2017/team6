import React from 'react'
import { Provider } from 'react-redux'

import Head from 'next/head'
import Router from 'next/router'

import initStore from '../../store'

import Body from '../../components/Body'
import ChatBody from './components/ChatBody'

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

    selectContact = contactId => {
        const href = `/contact?id=${contactId}`

        if (contactId !== this.state.selectedContactId) {
            Router.replace(href, href, { shallow: true })
        }

        this.setState({ selectedContactId: contactId })
    }

    render() {
        return (
            <Provider store={initStore(this.props.session)}>
                <div className="root">
                    <Head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>Kilogram Messenger</title>
                        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
                    </Head>
                    <Body
                        selectedTab={0}
                        selectChat={this.selectChat}
                        selectedChatId={this.state.selectedChatId}
                        selectContact={this.selectContact}
                        selectedContactId={this.state.selectedContactId}
                    >
                        <ChatBody chatId={Number(this.state.selectedChatId)}/>
                        <style dangerouslySetInnerHTML={{ __html: stylesheet.toString() }} />
                    </Body>
                </div>
            </Provider>
        )
    }
}
