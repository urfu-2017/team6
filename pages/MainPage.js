import React from 'react'
import fetch from 'isomorphic-unfetch'
import UserProfile from '../models/UserProfile'

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

    getUserById = async (id: number) => {
        const response = await fetch(`/api/v1/users`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([id, id, id])
        })

        const userInfo = await response.json()

        console.info(userInfo)
    }

    changeUserBio = async (bio: string) => {
        const response = await fetch(`/api/v1/user`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...this.state.user.user, bio })
        })

        this.setState({ user: await response.json()})
    }

    render() {
        return (
            <div>
                <span>My Profile: </span>
                <pre>
                    {JSON.stringify(this.state.user, null, 2)}
                </pre>

                <input type="number" ref={ref => this.inputUserId = ref}/>
                <button onClick={() => this.getUserById(this.inputUserId.value)}>
                    Get user info
                </button>

                <input type="text" ref={ref => this.inputUserBio = ref}/>
                <button onClick={() => this.changeUserBio(this.inputUserBio.value)}>
                    Change user bio
                </button>
            </div>
        )
    }
}
