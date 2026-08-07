const mongoose = require("mongoose")



async function connectToDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured")
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Database")

    return mongoose.connection
}

module.exports = connectToDB
