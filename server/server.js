import next from 'next'
import express from 'express'

import config from '../config'
import apiRouter from './routes/api'
import authRouter from './routes/auth'
import setupMiddleware from './middlewares/index'

const app = next({ dev: config.NODE_ENV !== 'production' })

const start = async () => {
    await app.prepare()

    setupMiddleware(express())
        .use('/', authRouter(app))
        .use('/api/v1', apiRouter)
        .listen(config.PORT)
}

start()
