const { ObjectId } = require("mongodb")
const { getDB } = require("../db")


async function getLecturers() {
    const db = getDB()
    const lecturers = await db
                                .collection('lecturers')
                                .find()
                                .toArray()
    return lecturers
}


async function getLecturerById(id) {
    const db = getDB()
    const lecturer = await db
                                .collection('lecturers')
                                .findOne({ _id: ObjectId.createFromHexString(id) })
    return lecturer
}


async function createLecturer(body) {
    const db = getDB()
    const response = await db
                                .collection('lecturers')
                                .insertOne(body)
    return response
}


async function updateLecturer(data, id) {
    const db = getDB()
    const response = await db
                                .collection('lecturers')
                                .updateOne(
                                    { _id: ObjectId.createFromHexString(id) },
                                    { $set: data }
                                )
    return response
}


async function removeLecturer(id) {
    const db = getDB()
    const response = await db
                                .collection('lecturers')
                                .deleteOne({ _id: ObjectId.createFromHexString(id) })
    return response
}

module.exports = {
    getLecturers,
    getLecturerById,
    createLecturer,
    updateLecturer,
    removeLecturer
}