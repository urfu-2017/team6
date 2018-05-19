import React from 'react'
import { connect } from 'react-redux'

type Props = {
    preserveRasters: boolean,
    storeKey: string
}

class ThemeSwitch extends React.Component<Props> {
    constructor(props) {
        super(props)

        this.cssOff = ``
        this.cssOn = `html { filter: invert(100%); background: #fefefe; } * { background-color: inherit }`
        this.imgOff = `.profile-card__theme-switch-img { background-image: url('../static/img/day.png'); }`
        this.imgOn = `.profile-card__theme-switch-img { background-image: url('../static/img/night.png'); height: 35px; margin-left: 3px;}`

        if (this.props.preserveRasters) {
            this.css += 'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }'
        }

        this.state = {
            active: false
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            active: !this.state.active
        })
    }

    componentDidMount() {
        if (typeof localStorage !== 'undefined') {
            this.setState({
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
        return (
            <div>
                <button className="profile-card__theme-switch-img" aria-pressed={this.state.active} onClick={this.toggle}>
                </button>
                <style media="screen">
                    {this.state.active ? this.cssOff : this.cssOn}
                    {this.state.active ? this.imgOff : this.imgOn}
                </style>
            </div>
        )
    }
}

export default connect(() => ({
    preserveRasters: true,
    storeKey: 'ThemeSwitch'
}))(ThemeSwitch)
