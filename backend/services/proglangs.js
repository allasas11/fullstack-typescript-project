const { ObjectId } = require("mongodb")
const { getDB } = require("../db")


async function getProgrammingLanguages() {
    const db = getDB()
    const programmingLanguages = await db
                                            .collection('programminglanguages')
                                            .find()
                                            .toArray()
    return programmingLanguages
}


async function getProgrammingLanguageById(id) {
    const db = getDB()
    const programmingLanguage = await db
                                            .collection('programminglanguages')
                                            .findOne({ _id: ObjectId.createFromHexString(id) })
    return programmingLanguage
}


async function createProgrammingLanguage(body) {
    const db = getDB()
    const response = await db
                                .collection('programminglanguages')
                                .insertOne(body)
    return response
}


async function updateProgrammingLanguage(data, id) {
    const db = getDB()
    const response = await db
                                .collection('programminglanguages')
                                .updateOne(
                                    { _id: ObjectId.createFromHexString(id) },
                                    { $set: data }
                                )
    return response
}


async function removeProgrammingLanguage(id) {
    const db = getDB()
    const response = await db
                                .collection('programminglanguages')
                                .deleteOne({ _id: ObjectId.createFromHexString(id) })
    return response
}

module.exports = {
    getProgrammingLanguages,
    getProgrammingLanguageById,
    createProgrammingLanguage,
    updateProgrammingLanguage,
    removeProgrammingLanguage
}