const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

// helper function
const calculateNights = (start, end) => {
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

// CREATE BOOKING
module.exports.createBooking = async (req, res) => {

    const { id } = req.params;
    const { checkIn, checkOut, guests, phone } = req.body;

    //  validation
    if (!checkIn || !checkOut || !phone) {
      req.flash("error", "All fields are required");
      return res.redirect(`/listings/${id}`);
    }

    //  phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
      req.flash("error", "Enter valid 10-digit phone number");
      return res.redirect(`/listings/${id}`);
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start >= end) {
      req.flash("error", "Invalid date range");
      return res.redirect(`/listings/${id}`);
    }

    if (start < new Date().setHours(0,0,0,0)) {
      req.flash("error", "Past dates not allowed");
      return res.redirect(`/listings/${id}`);
    }

    //  listing check
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    //overlap check 
    const existingBooking = await Booking.findOne({
      listing: id,
      status: { $ne: "cancelled" },
      $or: [
        {
          checkIn: { $lt: end },
          checkOut: { $gt: start },
        },
      ],
    });

    if (existingBooking) {
      req.flash("error", "Selected dates are already booked");
      return res.redirect(`/listings/${id}`);
    }

    // nights calculation
    const nights = calculateNights(start, end);
    if (nights <= 0) {
      req.flash("error", "Invalid stay duration");
      return res.redirect(`/listings/${id}`);
    }

    const totalPrice = nights * listing.price;

    //create booking 
    const newBooking = new Booking({
      listing: id,
      user: req.user._id,
      checkIn: start,
      checkOut: end,
      guests: guests || 1,
      phone, 
      totalPrice,
      status: "confirmed",
      paymentStatus: "pending",
    });

    await newBooking.save();

    req.flash("success", "Booking successful!");
    res.redirect("/bookings");

};


// GET USER BOOKINGS
module.exports.getUserBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.render("bookings/index", { bookings });
};


// CANCEL BOOKING
module.exports.cancelBooking = async (req, res) => {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      req.flash("error", "Booking not found");
      return res.redirect("/bookings");
    }

    if (!booking.user.equals(req.user._id)) {
      req.flash("error", "Unauthorized action");
      return res.redirect("/bookings");
    }

    if (booking.status === "cancelled") {
      req.flash("error", "Booking already cancelled");
      return res.redirect("/bookings");
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Booking cancelled successfully");
    res.redirect("/bookings");

  
};


// CONFIRM BOOKING
module.exports.confirmBooking = async (req, res) => {

    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      req.flash("error", "Booking not found");
      return res.redirect("/bookings");
    }

    booking.status = "confirmed";
    booking.paymentStatus = "paid";

    await booking.save();

    req.flash("success", "Booking confirmed");
    res.redirect("/bookings");

};

module.exports.getOwnerBookings = async (req, res) => {

    const listings = await Listing.find({ owner: req.user._id });
    const listingIds = listings.map((l) => l._id);

    const bookings = await Booking.find({
      listing: { $in: listingIds },
      status: { $ne: "cancelled" },
    })
      .populate("listing")
      .populate("user");

    //  STATS CALCULATION
    const totalListings = listings.length;
    const totalBookings = bookings.length;

    const totalEarnings = bookings.reduce((sum, b) => {
      return sum + b.totalPrice;
    }, 0);

    res.render("bookings/owner", {
      bookings,
      totalListings,
      totalBookings,
      totalEarnings,
    });

};