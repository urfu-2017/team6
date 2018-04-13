import React from 'react'
import {connect, Provider} from 'react-redux'

import Head from 'next/head'
import Router from 'next/router'

import initStore from '../../store'

import UserProfile from '../../models/UserProfile'

import Body from '../../components/Body'

import stylesheet from "../main/main.css";
import Message from "../../models/Message";
import ChatComponent from "../../components/ChatComponent";

type Props = {
    session: UserProfile,
    messages: Message[]
}

class ChatPage extends React.Component<Props> {
    constructor() {
        super()
        this.state = { selectedChatId: null}
    }

    componentDidMount() {
        this.props.url.query.id && this.selectChat(this.props.url.query.id)
    }

    static async getInitialProps({ req }) {
        return { session: {}  }
    }

    selectChat = chatId => {
        const href = `/chat?id=${chatId}`
        const as = href
        if (chatId !== this.state.selectedChatId)
            Router.replace(href, as, {shallow: true})
        this.setState({selectedChatId: chatId}, () => this.forceUpdate())
    };

    selectContact = contactId => {
        Router.push(`/contact?id=${contactId}`)
    }

    render() {
        return (
            <Provider store={initStore(this.props.session)}>
                <div className="root">
                    <Head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="stylesheet" href="/_next/static/style.css" />
                        <title>Kilogram Messenger</title>
                        <style dangerouslySetInnerHTML={{ __html: stylesheet.toString() }} />
                    </Head>
                    <Body selectedTab={0} selectChat={this.selectChat} selectedChatId={this.state.selectedChatId} selectContact={this.selectContact} selectedContactId={null}>
                        <ChatComponent />
                    </Body>
                </div>
            </Provider>
        )
    }
}

export default ChatPage
