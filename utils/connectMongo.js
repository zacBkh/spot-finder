import mongoose from 'mongoose';


// This helper establish the connection between Mongoose & Mongo


const connectMongo = async () => {

    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("==> SUCCESS : Our DB and Mongoose successfully connected! <==");

    } catch (error) {
        console.log("ERROR", error)
    }

};

export default connectMongo;










