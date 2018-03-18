import React from 'react'
import ChatTab from "../components/chat/ChatTab";
import ChatsList from "../components/chat/ChatsList";

export default class StartPage extends React.Component {
    state = { greeting: 'Hello world!' }

    render() {
    	<Route path="/chats">
			<ChatsList/>
			<ChatTab/>
		</Route>
    	return (
    		<div>
    			{this.state.greeting}
    		</div>
    	)
    }
}
