import React from 'react'
import MembersIcon from 'react-icons/lib/md/group'
import TitleIcon from 'react-icons/lib/md/local-offer'
import Chat from '../server/models/Chat'
import ChatMembersModal from './ChatMembersModal'

type Props = {
    chat: Chat
}

type State = {
    membersModalVisible: boolean
}

export default class ChatHeader extends React.Component<Props, State> {
    state = { membersModalVisible: false }

    toggleMembersModal = () => {
        this.setState({ membersModalVisible: !this.state.membersModalVisible })
    }

    render() {
        const { chat } = this.props
        return (
            <div className="chat-info">
                <p className="chat-info__name">
                    <TitleIcon/> {chat.common.name}
                </p>
                <div className="chat-info__members">
                    <a href="#" onClick={this.toggleMembersModal}>
                        <MembersIcon/> {chat.members.length} участников
                    </a>
                </div>

                <ChatMembersModal
                    chatId={chat._id}
                    onClose={this.toggleMembersModal}
                    visible={this.state.membersModalVisible}
                />
            </div>
        )
    }
}
