import {connect} from "react-redux";
import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import Chat from "../models/Chat";
import ChatItem from "./ChatItem";
import UserInfo from "../models/UserInfo";
import ContactItem from "./ContactItem";

type Props = {
    chats: Chat[],
    contacts: UserInfo[],
    selectedChatId: Number,
    selectChat: Function,
    selectedContactId: Number,
    selectContact: Function,
    onAddChatClick: Function,
    onAddContactClick: Function,
    selectedTab: Number
}

export class Menu extends React.Component<Props> {
    constructor() {
        super()
        this.state = {
            selectedTab: null
        }
    }

    componentDidMount() {
        this.selectTab(this.props.selectedTab)
    }

    selectTab = tab => this.setState({selectedTab: tab})

    onAddClick = () => {
        if (this.state.selectedTab === 0)
            this.props.onAddChatClick()
        else
            this.props.onAddContactClick()
    }

    render() {
        return (
            <div className="menu">
                <Tabs defaultIndex={this.props.selectedTab } onSelect={this.selectTab}>
                    <TabList>
                        <Tab>Chats</Tab>
                        <Tab>Contacts</Tab>
                        <button className="button" onClick={this.onAddClick}>Добавить</button>
                    </TabList>

                    <TabPanel>
                        {this.props.chats.map(c => <ChatItem select={this.props.selectChat} key={c.common.id} chat={c} selected={this.props.selectedChatId == c.common.id}/>)}
                    </TabPanel>
                    <TabPanel>
                        {this.props.contacts.map(c => <ContactItem key={c.gid} contact={c} select={this.props.selectContact} selected={this.props.selectedContactId == c.gid} />)}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default Menu