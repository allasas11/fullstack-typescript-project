const { ObjectId } = require("mongodb")
const { getDB } = require("../db")


async function getSubjects() {
    const db = getDB()
    const subjects = await db
                                .collection('subjects')
                                .find()
                                .toArray()
    return subjects
}


async function getSubjectById(id) {
    const db = getDB()
    const subject = await db
                            .collection('subjects')
                            .findOne({ _id: ObjectId.createFromHexString(id) })
    return subject
}


async function createSubject(body) {
    const db = getDB()
    const response = await db
                            .collection('subjects')
                            .insertOne(body)
    return response
}


async function updateSubject(data, id) {
    const db = getDB()
    const response = await db
                                .collection('subjects')
                                .updateOne(
                                    { _id: ObjectId.createFromHexString(id) },
                                    { $set: data }
                                )
    return response
}


async function removeSubject(id) {
    const db = getDB()
    const response = await db
                                .collection('subjects')
                                .deleteOne({ _id: ObjectId.createFromHexString(id) })
    return response
}

module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    removeSubject
}