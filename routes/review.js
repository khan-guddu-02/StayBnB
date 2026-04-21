const express=require("express");
const router= express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner , isReviewAuthor } = require("../middleware/auth.js");
const { validateListing , validateReview} = require("../middleware/validate.js");
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