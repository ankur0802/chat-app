const express = require('express');
const { registerUser, loginUser, logout, allUsers,getUserDetails } = require('../controllers/userControllers');
const { isAuthenticatedUser } = require('../middleware/authMiddle');


const router = express.Router()

router.route('/').post(registerUser).get(isAuthenticatedUser, allUsers)
router.post('/login', loginUser)
router.get('/logout', logout)
router.route('/me').get(isAuthenticatedUser, getUserDetails)


module.exports = router;