const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const Review = require("../models/review");
const express = require('express')
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const router = express.Router({mergeParams: true});
const reviews = require('../controllers/reviews')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;