const express = require('express')
const router = express.Router();
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const {storeReturnTo} = require('../middleware');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', {
        failureRedirect: '/login',
        failureMessage: true
    }), users.login)

router.get('/logout', users.logout)

module.exports = router;