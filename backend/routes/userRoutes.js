const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/userControllers');

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)


module.exports = router;