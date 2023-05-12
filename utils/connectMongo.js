// This helper establish the connection between Mongoose & Mongo

import mongoose from 'mongoose'

const connectMongo = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('==> SUCCESS : Our DB and Mongoose successfully connected! <==')
    } catch (error) {
        console.log('Error in connecting to MongoDB', error)
    }
}

export default connectMongo
