import next from 'next'
import express from 'express'

import config from './config'
import apiRouter from './routes/api'
import authRouter from './routes/auth'
import setupMiddleware from './middlewares'

const app = next({ dev: config.NODE_ENV !== 'production' })
const requestHandler = app.getRequestHandler()

const start = async () => {
    await app.prepare()

    setupMiddleware(express())
        .use('/', authRouter(app))
        .use('/api/v1', apiRouter)
        .get('*', requestHandler)
        .listen(config.PORT)
}

start()
