const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review= require("./review.js");
const { ref, string } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  category: {
  type: String,
  enum: [
    "Trending",
    "Rooms",
    "Cities",
    "Mountains",
    "Castles",
    "Pools",
    "Camping",
    "Beach",
    "Nature",
    "Snow",
    "Villas",
    "Boats",
    "Forest"
  ]
},
  reviews: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if (listing){
  //review delete
await  Review.deleteMany({_id:{$in: listing.reviews} });
//booking delete
await Booking.deleteMany({ listing: listing._id });
}
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
