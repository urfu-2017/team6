import React from 'react'

export default class App extends React.Component {
    state = { greeting: 'Hello world!' }

    render() {
    	return (
    		<div>
    			{this.state.greeting}
    		</div>
    	)
    }
}
