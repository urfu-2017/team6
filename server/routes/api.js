import express from 'express'
import * as profile from '../controllers/profile'

const router = express.Router()

/* Profile API */
router.get('/user/:gid', profile.fetchUser)
router.patch('/user', profile.updateUser)
router.patch('/user/contacts', profile.updateContacts)
router.patch('/user/chats', profile.updateChats)

export default router
