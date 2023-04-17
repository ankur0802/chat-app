const express = require('express');
const { sendMessage, allMessages } = require('../controllers/messageControllers');
const { isAuthenticatedUser } = require('../middleware/authMiddle');


const router = express.Router()

router.route('/').post(isAuthenticatedUser, sendMessage)
router.route('/:chatId').get(isAuthenticatedUser, allMessages)

module.exports = router;