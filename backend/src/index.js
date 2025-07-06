import app from "./app.js"
import config from "./config.js"

const puerto = config.server.port

app.listen(puerto, () => {
    console.log(`Server running on port ${puerto}`)
})