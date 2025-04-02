const { ObjectId } = require("mongodb")
const { getDB } = require("../db")


async function getSubjects() {
    const db = getDB()
    const subjects = await db
                                .collection('subjects')
                                .aggregate([
                                  {
                                    $lookup: {
                                      from: "programminglanguages",
                                      localField: "programmingLanguages",
                                      foreignField: "_id", 
                                      as: "programmingLanguages" 
                                    }
                                  },
                                  {
                                    $project: {
                                      _id: 1,
                                      name: 1,
                                      description: 1,
                                      programmingLanguages: {
                                        _id: 1,
                                        name: 1,
                                        description: 1
                                      }
                                    }
                                  }
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
                                $match: { _id: ObjectId.createFromHexString(id) } 
                              },
                              {
                                $lookup: {
                                  from: "programminglanguages",
                                  localField: "programmingLanguages",
                                  foreignField: "_id",
                                  as: "programmingLanguages"
                                }
                              },
                              {
                                $lookup: {
                                  from: "lecturers",
                                  localField: "_id",
                                  foreignField: "subjects",
                                  as: "lecturers"
                                }
                              },
                              {
                                $project: {
                                  _id: 1,
                                  name: 1,
                                  description: 1,
                                  programmingLanguages: {
                                    _id: 1,
                                    name: 1,
                                    description: 1
                                  },
                                  lecturers: {
                                    _id: 1,
                                    name: 1,
                                    surname: 1,
                                    age: 1
                                  }
                                }
                              }
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