'use strict'

class Chat {
    constructor({ id, name, messages, participants }) {
        this.id = id;
        this.name = name;
        this.messages = messages;
        this.participants = participants;
    }
}

module.exports = Chat;
