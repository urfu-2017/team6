import express from 'express'

import * as profile from '../controllers/profile'
import * as chats from '../controllers/chats'

const router = express.Router()

/* Profile API */
router.get('/user', profile.fetchSelf)
router.post('/users', profile.fetchAllUsers)
router.get('/user/:gid', profile.fetchUser)
router.patch('/user', profile.updateUser)
router.patch('/user/contacts', profile.updateContacts)
router.patch('/user/chats', profile.updateChats)

/* Chats API */
router.get('/chats/:id', chats.fetchChat)
router.put('/chats', chats.createChat)
router.patch('/chats', chats.updateChatInfo)
router.delete('/chats/:id', chats.deleteChat)
router.put('/chats/members', chats.addMemberChat)
router.delete('/chats/members', chats.deleteMemberChat)

export default router
