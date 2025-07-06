import express from "express"
import cors from "cors"
import morgan from "morgan"
import routes from "./routes/admins.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

export default app