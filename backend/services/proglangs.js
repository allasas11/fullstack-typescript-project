const { ObjectId } = require("mongodb")
const { getDB } = require("../db")


async function getProgrammingLanguages() {
    const db = getDB()
    const programmingLanguages = await db
                                            .collection('programminglanguages')
                                            .aggregate([
                                                {
                                                  $lookup: {
                                                    from: "students",
                                                    localField: "_id",
                                                    foreignField: "interests",
                                                    as: "interestedStudents",
                                                  },
                                                },
                                                {
                                                  $addFields: {
                                                    students: "$interestedStudents",
                                                  },
                                                },
                                                {
                                                  $project: {
                                                    name: 1,
                                                    description: 1,
                                                    students: {
                                                      _id: 1,
                                                      name: 1,
                                                      surname: 1,
                                                      age: 1,
                                                    },
                                                  },
                                                },
                                              ])
                                            .toArray()
    return programmingLanguages
}


async function getProgrammingLanguageById(id) {
    const db = getDB()
    const programmingLanguage = await db
                                            .collection('programminglanguages')
                                            .aggregate([
                                                {
                                                  $match: { _id: ObjectId.createFromHexString(id) }
                                                },
                                                {
                                                  $lookup: {
                                                    from: "students",
                                                    localField: "_id",
                                                    foreignField: "interests",
                                                    as: "interestedStudents",
                                                  },
                                                },
                                                {
                                                  $addFields: {
                                                    students: "$interestedStudents",
                                                  },
                                                },
                                                {
                                                  $project: {
                                                    name: 1,
                                                    description: 1,
                                                    students: {
                                                      _id: 1,
                                                      name: 1,
                                                      surname: 1,
                                                      age: 1,
                                                    },
                                                  },
                                                },
                                              ])
                                              .next()
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