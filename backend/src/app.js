import express from "express"
import cors from "cors"
import morgan from "morgan"
import routes from "./routes/routes.js"

const app = express()

app.use(cors({
    origin: [
        // aqui va la url del frontend en localhost de react con VITE
        "http://localhost:5173",

        // aqui va la url de donde se va a desplegar el frontend
        "https://digital-storefronts.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(morgan("dev"))

app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

export default app