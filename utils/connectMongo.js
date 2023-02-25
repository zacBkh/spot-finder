// This helper establish the connection between Mongoose & Mongo

import mongoose from "mongoose";

import { MongoClient } from "mongodb";
import clientPromise from "../lib/mongodb";
const connectMongo = async () => {
  try {
    // const client = await MongoClient.connect(process.env.MONGO_URI);
    const clientaa = await clientPromise;
    console.log(
      "==> SUCCESS : Our DB and Mongoose successfully connected! <=="
    );
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
  }
};

export default connectMongo;
