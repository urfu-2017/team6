// @flow

import fetch from 'node-fetch'
import querystring from 'querystring'
import { OK, CREATED, NO_CONTENT } from 'http-status-codes'

import config from '../config'

const API_KEY = config.API_KEY
const HRUDB_BASE_URL = config.HRUDB_BASE_URL

class HrudbInteractionError extends Error {
    constructor() {
        super('HruDB returned an unexpected answer.')
    }
}

const AUTH_HEADER = { Authorization: API_KEY }
const CONTENT_TYPE_HEADER = { 'Content-Type': 'plain/text' }

const _change = async (key: string, value: ?string, method: string): Promise<void> => {
    const reqUrl = `${HRUDB_BASE_URL}${key}`
    const headers = { ...AUTH_HEADER, ...CONTENT_TYPE_HEADER }
    const res = await fetch(reqUrl, { method, headers, body: value })

    if (res.status !== CREATED && res.status !== NO_CONTENT) {
        throw new HrudbInteractionError()
    }
}

const _get = async (reqUrl: string): Promise<string> => {
    const res = await fetch(reqUrl, { method: 'GET', headers: AUTH_HEADER })

    if (res.status !== OK) {
        throw new HrudbInteractionError()
    }

    return res.text()
}

export const update = async (key: string, value: string): Promise<void> =>
    _change(key, value, 'PUT')

export const add = async (key: string, value: string): Promise<void> =>
    _change(key, value, 'POST')

export const remove = async (key: string): Promise<void> =>
    _change(key, null, 'DELETE')

export const get = async (key: string): Promise<string> =>
    _get(`${HRUDB_BASE_URL}${key}`)

export const getAll = async (key: string, options: Object): Promise<string> =>
    _get(`${HRUDB_BASE_URL}${key}/all?${querystring.stringify(options)}`)
