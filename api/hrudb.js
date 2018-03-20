import fetch from 'node-fetch'
import querystring from 'querystring'

import API_KEY from '../config'

const URL = 'https://hrudb.herokuapp.com/storage/'
const AUTH_HEADER = { Authorization: API_KEY }
const CONTENT_TYPE_HEADER = { 'Content-Type': 'plain/text' }

const _change = async (key, value, method) => {
    const reqUrl = `${URL}${key}`
    const headers = Object.assign({}, AUTH_HEADER, CONTENT_TYPE_HEADER)
    const res = await fetch(reqUrl, { method, headers, body: value })

    return res.status === 201 || res.status === 204
}

const _get = async reqUrl => {
    const headers = Object.assign({}, AUTH_HEADER)
    const res = await fetch(reqUrl, { method: 'GET', headers })

    if (res.status === 200) {
        const value = await res.text()

        return value
    }
}

export const update = async (key, value) => {
    return _change(key, value, 'PUT')
}

export const add = async (key, value) => {
    return _change(key, value, 'POST')
}

export const get = async key => {
    const reqUrl = `${URL}${key}`

    return _get(reqUrl)
}

export const getAll = async (key, options) => {
    options = querystring.stringify(options)
    const reqUrl = `${URL}/all/${options}`

    return _get(reqUrl)
}

export const remove = async key => {
    const reqUrl = `${URL}${key}`
    const headers = Object.assign({}, AUTH_HEADER)
    const res = await fetch(reqUrl, { method: 'DELETE', headers })

    return res.status === 204
}
