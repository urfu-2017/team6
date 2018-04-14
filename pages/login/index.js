import React from 'react'
import Link from 'next/link'
import stylesheet from './login.css'

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className="login_page">
                <main className="main">
                    <h1 className="main_hello">Hello!</h1>
                    <Link href="/auth">
                        <a>
                            <button className="main_login">GitHub</button>
                        </a>
                    </Link>
                </main>
                <footer className="footer">
                    <p className="footer_copyright">&copy;Team6</p>
                    <a className="footer_github_link" href="https://github.com/">Link to GitHub</a>
                </footer>
                <style dangerouslySetInnerHTML={{ __html: stylesheet.toString() }} />
            </div>
        )
    }
}
