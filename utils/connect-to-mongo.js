// This helper establish the connection between Mongoose & Mongo

import mongoose from 'mongoose'

const connectMongo = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log('Error in connecting Mongoose to MongoDB', error)
    }
}

export default connectMongo
