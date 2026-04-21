const mongoose = require("mongoose");

const Url = process.env.ATLASDB_URL //"mongodb://localhost:27017/wanderlust"


const conectDb=async()=>{
   try {
    mongoose.connect(Url);
   } catch (error) {
    console.log("error connecting to db");
    console.log(error);
   } 
   }

module.exports=conectDb;