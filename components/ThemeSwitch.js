import React from 'react'

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
            this.cssOn += 'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }'
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
        if (localStorage) {
            this.setState({
                active: localStorage[this.props.storeKey] === 'true' || false
            })
        }
    }

    componentDidUpdate() {
        if (localStorage) {
            localStorage[this.props.storeKey] = this.state.active
        }
    }

    render() {
        return (
            <div>
                <button className="profile-card__theme-switch-img" aria-pressed={this.state.active} onClick={this.toggle}>
                </button>
                <style media="screen">
                    {this.state.active ? this.cssOn : this.cssOff}
                    {this.state.active ? this.imgOn : this.imgOff}
                </style>
            </div>
        )
    }
}

ThemeSwitch.defaultProps = {
    preserveRasters: true,
    storeKey: 'ThemeSwitch'
}

export default ThemeSwitch
