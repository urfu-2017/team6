import React from 'react'
import { connect } from 'react-redux'
import LinesEllipsis from 'react-lines-ellipsis'
import MarkdownRenderer from 'react-markdown-renderer'
import ForwardIcon from 'react-icons/lib/fa/mail-forward'
import HrundelIcon from 'react-icons/lib/io/social-octocat'
import ReactTooltip from 'react-tooltip'
import EmojiPicker from './EmojiPicker'
import Message from '../server/models/Message'
import UserInfo from '../server/models/UserInfo'
import avatarByGid from '../utils/avatarByGid'
import { metaParse } from '../utils/metaparse'
import { SHOW_PROFILE_MODAL } from '../actions/uiActions'
import { statuses as status } from '../reducers/messagesReducer'
import { EDIT_ACTION } from '../actions/messagesActions'
import ForwardedMessage from './ForwardedMessage'

type Props = {
    gid: number,
    users: Object,
    modified: number,
    message: Message,
    mine: Boolean,
    showProfile: Function,
    onLoad: Function,
    updateMessage: Function,
    onSelectMessage: Function
}

type State = {
    metadata: Object[]
}

const markdownOptions = {
    preset: 'default',
    html: false,
    linkify: true,
    typographer: true,
    quotes: '“”‘’'
}

class MessageItem extends React.Component<Props, State> {
    state = { metadata: [], selected: false }

    showEmojiPicker = () => this.emojiPicker.toggle()

    selectMessage = () => {
        const selected = !this.state.selected

        this.setState({ selected })

        if (this.props.onSelectMessage) {
            this.props.onSelectMessage(this.props.message, selected)
        }
    }

    reactionInfo = emoji => {
        const { message, users } = this.props
        const reactors = message.reactions[emoji]

        return reactors.map(gid => users[gid] && users[gid].name)
            .filter(Boolean)
            .join(', ')
    }

    isMyReaction = emoji => {
        const { message: { reactions }, gid } = this.props
        const myReaction = reactions[emoji] && reactions[emoji].includes(gid)

        return myReaction ? { border: '1px solid #8eb3b387', background: '#9dd2d663' } : {}
    }

    addReaction = emoji => {
        if (this.emojiPicker.isVisible()) {
            this.emojiPicker.toggle()
        }

        const { message, gid } = this.props
        const reactions = message.reactions || {}
        const reactors = reactions[emoji] || []

        if (!reactors.includes(gid)) {
            reactions[emoji] = [...reactors, gid]
            message.reactions = reactions
            this.props.updateMessage(message)
        }
    }

    async componentDidMount() {
        const response = await metaParse(this.props.message)

        if (response) {
            this.setState({ metadata: response }, this.props.onLoad)
        }
    }

    renderMetadata = (data, index) => (
        <a key={index} href={data.url} target="_blank">
            <div className="link-metadata">
                <div className="link-metadata__image">
                    <img src={data.image}/>
                </div>
                <div className="link-metadata__body">
                    <p className="link-metadata__body_title">{data.title}</p>
                    <p className="link-metadata__body_description">
                        {data.description && (
                            <LinesEllipsis
                                text={data.description}
                                maxLine="2"
                                ellipsis="..."
                                trimRight
                                basedOn="letters"
                            />
                        )}
                    </p>
                    <p className="link-metadata__body_url">{data.url}</p>
                </div>
            </div>
        </a>
    )

    render() {
        const { message, users, modified } = this.props
        const { metadata, selected } = this.state

        const author: UserInfo = users[message.authorGid] || {}
        const reactions: Object = Object.keys(message.reactions || {})
        const messageClassName = `${this.props.mine ? 'message message-right' : 'message'}${selected ? ' message-selected' : ''}`
        return (
            <div
                style={{ opacity: message.status === status.PENDING ? 0.5 : 1 }}
                className={messageClassName}
                onClick={this.selectMessage}
            >
                <div className="message__avatar" onClick={() => this.props.showProfile(author)}>
                    <img src={avatarByGid(message.authorGid, modified)} title={author.name}/>
                </div>
                <div className="message-box__body">
                    {reactions.length > 0 && (
                        <div className="message-box__reactions">
                            {reactions.map(emoji => (
                                <span
                                    key={emoji}
                                    style={this.isMyReaction(emoji)}
                                    data-tip={this.reactionInfo(emoji)}
                                    onClick={() => this.addReaction(emoji)}
                                >
                                    {emoji} {message.reactions[emoji].length}
                                    <ReactTooltip place="top" effect="float" />
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="message-wrapper">
                        <div className="message-box">
                            {message.text && (
                                <div className="message-box__text">
                                    <MarkdownRenderer
                                        markdown={message.text}
                                        options={markdownOptions}
                                    />
                                </div>
                            )}
                            {message.imgUrl && (
                                <div className="message-box__img">
                                    <img onLoad={this.props.onLoad} src={message.imgUrl}/>
                                </div>
                            )}
                            {metadata.length > 0 && (
                                <div className="message_box__metadata">
                                    {metadata.map(this.renderMetadata)}
                                </div>
                            )}
                            {message.forwarded.length > 0 && (
                                <div className="message_box__forwarded">
                                    {message.forwarded.map(message => (
                                        <ForwardedMessage key={message._id} message={message}/>
                                    ))}
                                </div>
                            )}
                        </div>
                        <span className="message-emoji-button" onClick={this.showEmojiPicker}><HrundelIcon/></span>
                        <span className="message-emoji-button"><ForwardIcon/></span>
                        <div className="message-emoji-picker">
                            <EmojiPicker
                                onSelect={emoji => this.addReaction(emoji.native)}
                                ref={ref => this.emojiPicker = ref}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    gid: state.session.user.gid,
    users: state.chatsMembers,
    modified: state.session.modified
}), dispatch => ({
    showProfile: payload => dispatch({ type: SHOW_PROFILE_MODAL, payload }),
    updateMessage: payload => dispatch({ type: EDIT_ACTION, payload })
}))(MessageItem)
