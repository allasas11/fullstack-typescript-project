const { MongoClient } = require('mongodb')
const process = require('process')

const client = new MongoClient(process.env.DB_URI)

let db

async function connectToDB() {
    try {
        await client.connect()
        db = client.db(process.env.DB_NAME)
        console.log('Connected to MongoDB')
    } catch(error) {
        console.error('Error connecting to MongoDB: ', error)
        process.exit(1)
    }
}

function getDB() {
    if(!db) {
        throw new Error('Database is not initialized')
    }

    return db
}

module.exports = { connectToDB, getDB } 

