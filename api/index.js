// @flow

import fetch from 'isomorphic-unfetch'

import UserProfile from '../models/UserProfile'

const BASE_URL = '/api/v1'
const BASE_OPTIONS = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
}

export default class APIClient {
    static async fetchSelf(): Promise<UserProfile> {
        const response = await fetch(`${BASE_URL}/user`, BASE_OPTIONS)
        return response.json()
    }
}
