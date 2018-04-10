// @flow

import LRU from 'lru-cache'
import fetch from 'node-fetch'
import querystring from 'querystring'
import { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND } from 'http-status-codes'

import config from '../config'

class HrudbTimeoutError extends Error {
    constructor() {
        super('HruDB exceeded time limit.')
    }
}

class HrudbRequestError extends Error {
    constructor() {
        super('Invalid request.')
    }
}

interface RequestType {
    method: string,
    body: ?string,
    url: string,
    headers: Object,
    successCodes: Array<number>,
    errorCodes: Array<number>
}

class Request {
    constructor({ method, body, url, headers, validCodes }: RequestType) {
        this.method = method
        this.body = body
        this.url = url
        this.headers = headers
        this.validCodes = validCodes
    }
}

const TIMEOUT = 3000
const ATTEMPT_COUNT = 3
const HRUDB_BASE_URL = config.HRUDB_BASE_URL
const AUTH_HEADER = { Authorization: config.API_KEY }
const CONTENT_TYPE_HEADER = { 'Content-Type': 'plain/text' }

const CACHE = LRU({
    max: 1024 * 1024 * 1024, // 1 Gb of ascii strings,
    length: (str: string) => str.length,
    maxAge: 1000 * 60 * 60 // 1 hour
})

const _fetchWithTimeout = (request: Request, timeoutMs: number): Promise<Object> => {
    let isTimeout = false
    const fetchData = {
        method: request.method,
        headers: request.headers
    }

    if (request.body) {
        fetchData.body = request.body
    }

    return new Promise((res, rej) => {
        const timeout = setTimeout(() => {
            isTimeout = true
            rej(new HrudbTimeoutError())
        }, timeoutMs)

        fetch(request.url, fetchData)
            .then(resp => {
                clearTimeout(timeout)
                if (!isTimeout) {
                    res(resp)
                }
            })
            .catch(err => {
                if (isTimeout) {
                    return
                }
                rej(err)
            })
    })
}

const _sendRequest = async (request: Request): Promise<Object> => {
    for (let i = 0; i < ATTEMPT_COUNT; i++) {
        try {
            const res = await _fetchWithTimeout(request, TIMEOUT) // eslint-disable-line no-await-in-loop

            if (request.errorCodes.includes(res.status)) {
                throw new HrudbRequestError()
            }

            if (request.validCodes.includes(res.status)) {
                return res
            }
        } catch (err) {
            if (err.name !== 'HrudbTimeoutError') {
                throw err
            }
        }
    }
}

const _change = async (key: string, value: ?string, method: string): Promise<void> => {
    const res = await _sendRequest(new Request({
        method,
        body: value,
        url: `${HRUDB_BASE_URL}${key}`,
        headers: { ...AUTH_HEADER, ...CONTENT_TYPE_HEADER },
        validCodes: [CREATED, NO_CONTENT],
        errorCodes: [BAD_REQUEST]
    }))

    if (!res) {
        // TODO: task queue
    }

    CACHE.del(key)
}

const _get = async (key: string, all: boolean = false, options: Object): Promise<Object> => {
    if (CACHE.has(key)) {
        return JSON.parse(CACHE.get(key))
    }

    const url: string = all ?
        `${HRUDB_BASE_URL}${key}/all?${querystring.stringify(options)}` :
        `${HRUDB_BASE_URL}${key}`

    const res = await _sendRequest(new Request({
        method: 'GET',
        body: null,
        url,
        headers: AUTH_HEADER,
        validCodes: [OK],
        errorCodes: [BAD_REQUEST, NOT_FOUND]
    }))

    if (!res) {
        throw new HrudbTimeoutError()
    }

    const json = await res.json()

    CACHE.set(key, JSON.stringify(json))

    return json
}

export const update = (key: string, value: string): Promise<void> =>
    _change(key, value, 'PUT')

export const add = (key: string, value: string): Promise<void> =>
    _change(key, value, 'POST')

export const remove = (key: string): Promise<void> =>
    _change(key, null, 'DELETE')

export const get = (key: string): Promise<Object> =>
    _get(key)

export const getAll = (key: string, options?: Object = {}): Promise<Object> =>
    _get(key, true, options)
