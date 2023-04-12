const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroup,  removeFromGroup,addToGroup } = require('../controllers/chatControllers');
const { isAuthenticatedUser } = require('../middleware/authMiddle');

const router = express.Router()

router.route('/').post(isAuthenticatedUser, accessChat).get(isAuthenticatedUser, fetchChats)
router.route('/group').post(isAuthenticatedUser, createGroupChat)
router.route('/rename').put(isAuthenticatedUser, renameGroup)
router.route('/groupadd').put(isAuthenticatedUser, addToGroup)
router.route('/groupremove').put(isAuthenticatedUser, removeFromGroup)




module.exports = router;