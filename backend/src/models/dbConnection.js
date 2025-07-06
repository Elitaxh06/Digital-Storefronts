import { Pool } from "pg";
import config from "../config.js";

export const dbSettings = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    ssl: config.db.ssl  
}

const pool = new Pool(dbSettings)

export const getConnection = async (req, res) => {
    try{
        const client = await pool.connect()
        return client
    }catch(error) {
        console.log('Hubo un error en la conexion con la base de datos', error)
        res.status(500).send(json({ error: error}))
    }
}
