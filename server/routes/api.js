import express from 'express'

const router = express.Router()

router.get('/profile/:gid', (req, res) => res.json({ gid: req.params.gid }))

export default router
