const express=require("express");
const router= express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/expressError.js");
const { reviewSchema}=require("../schema.js");
const Review= require("../models/review.js");
const Listing=require("../models/listing.js");
const { validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")

// post Review Rout
router.post("/",
  isLoggedIn,
  validateReview,
    wrapAsync(reviewController.createREview))
// delete Review Rout
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
   wrapAsync(reviewController.destroyREview));

module.exports=router;