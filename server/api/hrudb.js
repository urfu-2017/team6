// @flow

import fetch from 'node-fetch'
import querystring from 'querystring'
import { OK, CREATED, NO_CONTENT } from 'http-status-codes'

import config from '../config'

// Class HrudbInteractionError extends Error {
//     constructor() {
//         super('HruDB returned an unexpected answer.')
//     }
// }

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
    headers: any,
    validCodes: Array<number>
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

const TIMEOUT: number = 3000
const ATTEMPT_COUNT: number = 3
const HRUDB_BASE_URL: string = config.HRUDB_BASE_URL
const AUTH_HEADER = { Authorization: config.API_KEY }
const CONTENT_TYPE_HEADER = { 'Content-Type': 'plain/text' }

const _fetchWithTimeout = (request: Request, timeoutMs: number): Promise => {
    let isTimeout: boolean = false
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

const _sendRequest = async (request: Request): Promise => {
    for (let i = 0; i < ATTEMPT_COUNT; i++) {
        try {
            const res = await _fetchWithTimeout(request, TIMEOUT) // eslint-disable-line no-await-in-loop

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
        validCodes: [CREATED, NO_CONTENT]
    }))

    if (!res) {
        // TODO: task queue
    }

    // TODO: clear cache
}

const _get = async (url: string): Promise => {
    const res = await _sendRequest(new Request({
        method: 'GET',
        body: null,
        url,
        headers: AUTH_HEADER,
        validCodes: [OK]
    }))

    if (!res) {
        return undefined
    }

    const json = await res.json()

    if (json.error) {
        throw new HrudbRequestError()
    }

    // TODO: cache

    return json
}

export const update = async (key: string, value: string): Promise<void> =>
    _change(key, value, 'PUT')

export const add = async (key: string, value: string): Promise<void> =>
    _change(key, value, 'POST')

export const remove = async (key: string): Promise<void> =>
    _change(key, null, 'DELETE')

export const get = async (key: string): Promise<string> =>
    _get(`${HRUDB_BASE_URL}${key}`)

export const getAll = async (key: string, options?: Object = {}): Promise<string> =>
    _get(`${HRUDB_BASE_URL}${key}/all?${querystring.stringify(options)}`)
