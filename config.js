import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: 8080,
    NODE_ENV: process.env.NODE_ENV,
    API_KEY: process.env.API_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    AUTH_CALLBACK: process.env.AUTH_CALLBACK,
    HRUDB_BASE_URL: 'https://hrudb.herokuapp.com/storage/'
}
