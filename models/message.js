export default class Message {
    constructor({ text, creationDate, updateDate, authorGid }) {
        this.text = text
        this.creationDate = creationDate
        this.updateDate = updateDate
        this.authorGid = authorGid
    }
}
