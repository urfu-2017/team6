import express from 'express'
import next from 'next'

import setupMiddleware from './middlewares'
import apiRouter from './server/routes/api'
import config from './config'

const app = next({ dev: config.NODE_ENV !== 'production' })

const start = async () => {
    await app.prepare()

    setupMiddleware(express())
        .use('/api/v1', apiRouter)
        .get('/', (req, res) => app.render(req, res, '/', req.query))
        .listen(config.PORT)
}

start()
