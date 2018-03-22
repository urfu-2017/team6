import express from 'express'

const router = express.Router()

/* Profile API */
router.get('/profile')
router.patch('/profile')
router.get('/profile/:gid')
router.put('/profile/contacts')

/* Chats API */
router.get('/chat/:id/common')
router.patch('/chat/:id/common')

router.get('/chat/:id/members')
router.put('/chat/:id/members/:gid')
router.delete('/chat/:id/members/:gid')

router.get('/chat/:id/messages')
router.put('/chat/:id/messages')

export default router
