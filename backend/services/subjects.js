const { ObjectId } = require("mongodb")
const { getDB } = require("../db")


async function getSubjects() {
    const db = getDB()
    const subjects = await db
                                .collection('subjects')
                                .aggregate([
                                    {
                                      $lookup: {
                                        from: "lecturers",
                                        localField: "lecturerId",
                                        foreignField: "_id",
                                        as: "lecturer",
                                      },
                                    },
                                    {
                                      $unwind: "$lecturer", 
                                    },
                                    {
                                      $project: {
                                        name: 1,
                                        description: 1,
                                        lecturer: {
                                          _id: 1,
                                          name: 1,
                                          surname: 1,
                                          age: 1,
                                        },
                                      },
                                    },
                                  ])
                                .toArray()
    return subjects
}


async function getSubjectById(id) {
    const db = getDB()
    const subject = await db
                            .collection('subjects')
                            .aggregate([
                                {
                                  $match: { _id: ObjectId.createFromHexString(id) },
                                },
                                {
                                  $lookup: {
                                    from: "lecturers",
                                    localField: "lecturerId",
                                    foreignField: "_id",
                                    as: "lecturer",
                                  },
                                },
                                {
                                  $unwind: "$lecturer",
                                },
                                {
                                  $project: {
                                    name: 1,
                                    description: 1,
                                    lecturer: {
                                      _id: 1,
                                      name: 1,
                                      surname: 1,
                                      age: 1,
                                    },
                                  },
                                },
                            ])
                            .next()
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