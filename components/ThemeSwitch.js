import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
    preserveRasters: boolean,
    storeKey: string
}

class ThemeSwitch extends Component<Props> {
    constructor(props) {
        super(props)

        this.css = `html { filter: invert(100%); background: #fefefe; } * { background-color: inherit }`

        if (this.props.preserveRasters) {
            this.css += 'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }'
        }

        this.supported = this.isDeclarationSupported('filter', 'invert(100%)')

        this.state = {
            active: false
        }

        this.toggle = this.toggle.bind(this)
    }

    isDeclarationSupported(property, value) {
        if (typeof window !== 'undefined') {
            const prop = property + ':'
            const el = document.createElement('test')
            const mStyle = el.style
            el.style.cssText = prop + value
            return mStyle[property]
        }
    }

    toggle() {
        this.setState({
            active: !this.state.active
        })
    }

    componentDidMount() {
        if (typeof localStorage !== 'undefined') {
            this.setState({
                supported: this.isDeclarationSupported('filter', 'invert(100%)'),
                active: localStorage.getItem(this.props.storeKey) || false
            })
        }
    }

    componentDidUpdate() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.props.storeKey, this.state.active)
        }
    }

    render() {
        if (!this.supported) {
            return null
        }

        return (
            <div>
                <button className="profile-card__theme-switch-img" aria-pressed={this.state.active} onClick={this.toggle}>
                </button>
                <style media={this.state.active ? 'screen' : 'none'}>
                    {this.state.active ? this.css.trim() : this.css}
                </style>
            </div>
        )
    }
}

export default connect(() => ({
    preserveRasters: true,
    storeKey: 'ThemeSwitch'
}))(ThemeSwitch)
