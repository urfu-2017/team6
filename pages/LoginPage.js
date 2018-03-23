import React from 'react'
import Link from 'next/link'

export default class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <Link href="/auth"><a>Log In</a></Link>
            </div>
        )
    }
}
