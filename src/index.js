import "dotenv/config";
// import { Mongoose } from "mongoose";
// import { DB_NAME } from "./constants";
import { app } from "./app.js";
import connectDB from "./db/index.js";

// Importing from separate logic

connectDB()
  .then(() => {
    // Till now only we are connected to the DB
    // Now we have to start our server using app
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection failed : ", err);
  });

// Direct Approach

// import express from "express";

// const app = express();

//  Below is an IIFE code and semicolon is put in starting to make a clean code
//  The process is asynchronous
// (async () => {
//  try catch to handle errors if any
//   try {
//  Way of connecting may refer documentation
// The response may take time that's why await used
//     await Mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

// app using express to listen for any error while woking with DB
//     app.on("error", (error) => {
//       console.log("ERROR : ", error);
//       throw error;
//     })

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on ${process.env.PORT}`);
//     })
//   } catch (error) {
//     console.error("ERROR : ", error);
//     throw error;
//   }
// })();
