let databaseConnection
let app
let connectToDB

module.exports = async (req, res) => {
    if (req.url === "/health" || req.url?.startsWith("/health?")) {
        return res.status(200).json({ status: "ok" })
    }

    try {
        app ||= require("../src/app")
        connectToDB ||= require("../src/config/database")
        databaseConnection ||= connectToDB()
        await databaseConnection
        return app(req, res)
    } catch (error) {
        databaseConnection = undefined
        console.error("Serverless function startup failed", {
            message: error.message,
            stack: error.stack
        })
        return res.status(500).json({ message: "The API could not start. Check the Vercel function logs." })
    }
}
