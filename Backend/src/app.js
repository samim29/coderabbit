const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error("Origin not allowed by CORS"))
    },
    credentials: true
}))

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, req, res, next) => {
    console.error("Request failed", {
        method: req.method,
        path: req.originalUrl,
        origin: req.get("origin"),
        message: err.message
    })

    if (err.message === "Origin not allowed by CORS") {
        return res.status(403).json({ message: "This frontend origin is not allowed to call the API." })
    }

    return res.status(500).json({ message: "Internal server error" })
})



module.exports = app
