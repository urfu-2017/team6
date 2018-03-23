import fetch from 'node-fetch'
import querystring from 'querystring'
import { OK, CREATED, NO_CONTENT } from 'http-status-codes'

import { API_KEY, HRUDB_BASE_URL } from '../../config'

const AUTH_HEADER = { Authorization: API_KEY }
const CONTENT_TYPE_HEADER = { 'Content-Type': 'plain/text' }

const _change = async (key, value, method) => {
    const reqUrl = `${HRUDB_BASE_URL}${key}`
    const headers = { ...AUTH_HEADER, ...CONTENT_TYPE_HEADER }
    const res = await fetch(reqUrl, { method, headers, body: value })

    return res.status === CREATED || res.status === NO_CONTENT
}

const _get = async reqUrl => {
    const headers = { ...AUTH_HEADER }
    const res = await fetch(reqUrl, { method: 'GET', headers })

    if (res.status === OK) {
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
    const reqUrl = `${HRUDB_BASE_URL}${key}`

    return _get(reqUrl)
}

export const getAll = async (key, options) => {
    options = querystring.stringify(options)
    const reqUrl = `${HRUDB_BASE_URL}/all/${options}`

    return _get(reqUrl)
}

export const remove = async key => {
    const reqUrl = `${HRUDB_BASE_URL}${key}`
    const headers = { ...AUTH_HEADER }
    const res = await fetch(reqUrl, { method: 'DELETE', headers })

    return res.status === NO_CONTENT
}
