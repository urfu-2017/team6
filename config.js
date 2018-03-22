import dotenv from 'dotenv'
dotenv.config()

export default {
    API_KEY: process.env.API_KEY,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    HRUDB_BASE_URL: 'https://hrudb.herokuapp.com/storage/'
}
