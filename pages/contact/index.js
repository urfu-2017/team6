import React from 'react'
import {connect, Provider} from 'react-redux'

import Head from 'next/head'
import Router from 'next/router'

import initStore from '../../store'

import UserProfile from '../../models/UserProfile'

import Body from '../../components/Body'

import stylesheet from '../chat/main.css'
import Message from '../../models/Message'
import ChatComponent from '../chat/components/ChatComponent'
import ContactComponent from './components/ContactComponent'

type Props = {
    session: UserProfile,
    contacts: UserInfo[]
}

class ContactPage extends React.Component<Props> {
    constructor() {
        super()
        this.state = { selectedContactId: null}
    }

    componentDidMount() {
        this.props.url.query.id && this.selectContact(this.props.url.query.id)
    }

    static async getInitialProps({ req }) {
        return { session: {} }
    }

    selectChat = chatId => {
        Router.push(`/chat?id=${chatId}`)
    };

    selectContact = contactId => {
        const href = `/contact?id=${contactId}`
        const as = href
        if (contactId !== this.state.selectedContactId) {
            Router.replace(href, as, {shallow: true})
        }
        this.setState({selectedContactId: contactId}, () => this.forceUpdate())
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
                    <Body selectedTab={1} selectContact={this.selectContact} selectedContactId={this.state.selectedContactId} selectChat={this.selectChat} selectedChatId={null}>
                        <ContactComponent />
                    </Body>
                </div>
            </Provider>
        )
    }
}

export default ContactPage
