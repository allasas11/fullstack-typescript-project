//FUNCTIONS

const { ObjectId } = require("mongodb")
const { getDB } = require("../db")

//GET
async function getStudents() {
    const db = getDB()
    // const students = await db.collection('students').find({age: { $gte: 25 }}).sort( {age: 1}).limit(5).toArray()
    const students = await db
                                .collection('students')
                                .aggregate([
                                    {
                                        $lookup: {
                                            from: 'groups',
                                            localField: 'groupId',
                                            foreignField: '_id',
                                            as: 'group',
                                        }
                                    },
                                    { 
                                        $unwind: '$group',
                                    }
                                ])
                                .toArray()

    return students
}

//GET
async function getStudentById(id) {
    const db = getDB()
    const student = await db
                                .collection('students')
                                // .findOne({_id: ObjectId.createFromHexString(id)})
                                .aggregate([
                                    {
                                        $match: {
                                            _id: ObjectId.createFromHexString(id) 
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: 'groups',
                                            localField: 'groupId',
                                            foreignField: '_id',
                                            as: 'group'
                                        }
                                    },
                                    { 
                                        $unwind: '$group',
                                    }
                                ])
                                .next()
    return student
}

//POST
async function createStudent(body) {
    const db = getDB()
    const response = await db.collection('students').insertOne({ ...body, groupId: ObjectId.createFromHexString(body.groupId) })
    return response
 
}

//UPDATE
async function updateStudent(data, id) {
    const db = getDB()
    const response = await db
                                .collection('students')
                                .updateOne(
                                    { _id: ObjectId.createFromHexString(id)},
                                    { $set: { ...data, groupId: ObjectId.createFromHexString(data.groupId) }}
                                )
    return response
}

//DELETE
async function removeStudent(id) {
    const db = getDB()
    const response = await db.collection('students').deleteOne({_id: ObjectId.createFromHexString(id)})
    return response

    
}

async function getStudentsBy(key, value) {
    const db = getDB()
    const res = await db.collection('students').find({ [key]: value }).toArray()

    return res 
}


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    removeStudent,
    getStudentsBy
}