const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware/auth.js");

const bookingController = require("../controllers/booking.js");



// CREATE BOOKING

router.post(
  "/listings/:id/book",
  isLoggedIn,
  wrapAsync(bookingController.createBooking)
);



// GET USER BOOKINGS

router.get(
  "/bookings",
  isLoggedIn,
  wrapAsync(bookingController.getUserBookings)
);



// CANCEL BOOKING

router.delete(
  "/bookings/:id",
  isLoggedIn,
  wrapAsync(bookingController.cancelBooking)
);



// CONFIRM BOOKING (OPTIONAL)

router.put(
  "/bookings/:id/confirm",
  isLoggedIn,
  wrapAsync(bookingController.confirmBooking)
);

//bookins for owner
router.get(
  "/owner/bookings",
  isLoggedIn,
  wrapAsync(bookingController.getOwnerBookings)
);


module.exports = router;