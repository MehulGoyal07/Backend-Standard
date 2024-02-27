import 'dotenv/config';
// import { Mongoose } from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";

// Importing from separate logic


connectDB();



// Direct Approach

// import express from "express";

// const app = express();

// // Below is an IIFE code and semicolon is put in starting to make a clean code
// // The process is asynchronous
// (async () => {
//   // try catch to handle errors if any
//   try {
//     // Way of connecting may refer documentation
//     // The response may take time that's why await used
//     await Mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//     // app using express to listen for any error while woking with DB
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
