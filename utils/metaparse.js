// @flow
import APIClient from '../api/index'
import Message from '../models/Message'

export const metaParse = async function ({ message }: {
    message: Message
}) {
    if (isUrl(message.text)) {
        return APIClient.fetchMeta(message)
    }
}

function isUrl(value: string) {
    return !value || (new RegExp('^(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?$', 'i')).test(value)
}
