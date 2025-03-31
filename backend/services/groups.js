const { ObjectId } = require("mongodb")
const { getDB } = require("../db")

async function getGroups() {
    const db = getDB()
    const groups = await db
                            .collection('groups')
                            .find()
                            .toArray()
    return groups

    // return await db 
    //                 .collection('groups')
    //                 .aggregate([
    //                     {
    //                         $match: { students:{ $exists: true,  $not: { $size: 0 } } }
    //                     },
    //                     {
    //                         $lookup: {
    //                             from: 'students',
    //                             localField: 'students',
    //                             foreignField: '_id',
    //                             as: 'studentsData'
    //                         }
    //                     },
    //                     {
    //                         $addFields: {
    //                             students: '$studentsData'
    //                         }
    //                     },
    //                     {
    //                         $project: {
    //                             studentsData: 0,
    //                             'students.groupId': 0
    //                         }
    //                     }
    //                 ])
    //                 .toArray()
}

async function getGroupById(id) {
    const db = getDB()
    const group = await db
                            .collection('groups')
                            .findOne({ _id: ObjectId.createFromHexString(id) })
                            // .aggregate([
                            //     {
                            //         $match: {
                            //              _id: ObjectId.createFromHexString(id) 
                            //         }
                            //     },
                            //     {
                            //         $lookup: {
                            //             from: 'students',
                            //             localField: 'students',
                            //             foreignField: '_id',
                            //             as: 'studentsData'
                            //         }
                            //     },
                            //     {
                            //         $addFields: {
                            //             students: '$studentsData'
                            //         }
                            //     },
                            //     {
                            //         $project: {
                            //             studentsData: 0,
                            //             'students.groupId': 0
                            //         }
                            //     }

                            // ])
                            // .next()
    return group
}

async function createGroup(body) {
    const db = getDB()
    const response = await db.collection('groups').insertOne(body)
    return response
}

async function updateGroup(data, id) {
    const db = getDB()
    const response = await db.collection('groups').updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: data }
    );
    return response
}

async function removeGroup(id) {
    const db = getDB()
    const response = await db.collection('groups').deleteOne({ _id: ObjectId.createFromHexString(id) })
    return response
}

async function getStudentsByGroup(id) {
    const db = getDB()

    const group = await db  
                            .collection('groups')
                            .findOne({_id: ObjectId.createFromHexString(id)}, { projection: { name: 1, description: 1 } })

    if (!group) {
        throw new Error('Group not found');
    }

    const students = await db
                            .collection('students')
                            .aggregate([
                                {
                                    $match: {
                                        groupId: ObjectId.createFromHexString(id)
                                    }
                                },
                                {
                                    $project: {
                                        name: 1,
                                        surname: 1,
                                        age: 1
                                    }
                                }
                            ])
                            .toArray()

    return {
        ...group,
        students
    }

}


module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    removeGroup,
    getStudentsByGroup
}