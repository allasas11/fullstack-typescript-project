//FUNCTIONS

const { ObjectId } = require("mongodb")
const { getDB } = require("../db")

//GET
async function getStudents() {
    const db = getDB()
    const students = await db.collection('students').find().toArray()
    return students
}

//GET
async function getStudentById(id) {
    const db = getDB()
    const student = await db.collection('students').findOne({_id: ObjectId.createFromHexString(id)})
    return student
}

//POST
async function createStudent(body) {
    const db = getDB()
    const response = await db.collection('students').insertOne(body)
    return response
 
}

//UPDATE
async function updateStudent(data) {
    const db = getDB()
    const { id, ...updateData } = data
    const response = await db.collection('students').updateOne({_id: ObjectId.createFromHexString(id)}, { $set: updateData})
    return response
}

//DELETE
async function removeStudent(id) {
    const db = getDB()
    const response = await db.collection('students').deleteOne({_id: ObjectId.createFromHexString(id)})
    return response

    
}


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    removeStudent
}