const app = require("../src/app")
const connectToDB = require("../src/config/database")

let databaseConnection

module.exports = async (req, res) => {
    try {
        databaseConnection ||= connectToDB()
        await databaseConnection
        return app(req, res)
    } catch (error) {
        databaseConnection = undefined
        console.error("Database connection failed", error)
        return res.status(500).json({ message: "Unable to connect to the database" })
    }
}
