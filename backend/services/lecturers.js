const { ObjectId } = require("mongodb")
const { getDB } = require("../db")


async function getLecturers() {
    const db = getDB()
    const lecturers = await db
                                .collection('lecturers')
                                .aggregate([
                                  {
                                    $lookup: {
                                      from: "subjects",
                                      localField: "subjects",
                                      foreignField: "_id",
                                      as: "detailedSubjects"
                                    }
                                  },
                                  { 
                                    $addFields: { 
                                      subjects: "$detailedSubjects" 
                                    } 
                                  },
                                  { 
                                    $project: { 
                                      detailedSubjects: 0 
                                    } 
                                  },
                                  {
                                    $lookup: {
                                      from: "groups",
                                      localField: "_id",
                                      foreignField: "lecturerId",
                                      as: "groups"
                                    }
                                  },
                                  {
                                    $project: {
                                      name: 1,
                                      surname: 1,
                                      age: 1,
                                      subjects: {
                                        _id: 1,
                                        name: 1,
                                        description: 1
                                      },
                                      groups: {
                                        _id: 1,
                                        name: 1,
                                        description: 1
                                      }
                                    }
                                  }
                                ])
                                .toArray()
    return lecturers
}


async function getLecturerById(id) {
    const db = getDB()
    const lecturer = await db
                                .collection('lecturers')
                                .aggregate([
                                  { 
                                    $match: { _id: ObjectId.createFromHexString(id) } 
                                  },
                                  {
                                    $lookup: {
                                      from: "subjects", 
                                      localField: "subjects", 
                                      foreignField: "_id", 
                                      as: "detailedSubjects" 
                                    }
                                  },
                                  { 
                                    $addFields: { 
                                      subjects: "$detailedSubjects" 
                                    } 
                                  },
                                  { 
                                    $project: { 
                                      detailedSubjects: 0 
                                    } 
                                  },
                                  {
                                    $lookup: {
                                      from: "groups",
                                      localField: "_id",
                                      foreignField: "lecturerId",
                                      as: "groups"
                                    }
                                  },
                                  {
                                    $project: {
                                      name: 1,
                                      surname: 1,
                                      age: 1,
                                      subjects: {
                                        _id: 1,
                                        name: 1,
                                        description: 1
                                      },
                                      groups: {
                                        _id: 1,
                                        name: 1,
                                        description: 1
                                      }
                                    }
                                  }
                                ])
                                .next()
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

async function getGroupsByLecturer(id) {
  const db = getDB();

  const groups = await db
    .collection("groups")
    .aggregate([
      { 
        $match: { lecturerId: ObjectId.createFromHexString(id) } 
      },
      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "_id",
          as: "detailedStudents"
        }
      },
      { 
        $addFields: { students: "$detailedStudents" } 
      },
      { 
        $project: { detailedStudents: 0 } 
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          students: {
            _id: 1,
            name: 1,
            surname: 1,
            age: 1
          }
        }
      }
    ])
    .toArray()

  return groups
}

async function getStudentsByLecturer(lectorId) {
  const db = getDB();

  const students = await db
    .collection("groups")
    .aggregate([
      { 
        $match: { lecturerId: ObjectId.createFromHexString(lectorId) } 
      },
      { 
        $unwind: "$students" 
      },
      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "_id",
          as: "detailedStudent"
        }
      },
      { 
        $unwind: "$detailedStudent" 
      },
      {
        $project: {
          _id: "$detailedStudent._id",
          name: "$detailedStudent.name",
          surname: "$detailedStudent.surname",
          age: "$detailedStudent.age",
          interests: "$detailedStudent.interests"
        }
      }
    ])
    .toArray()

  return students
}

async function getSubjectsByLecturer(lectorId) {
  const db = getDB();

  const subjects = await db
    .collection("lecturers")
    .aggregate([
      { 
        $match: { _id: ObjectId.createFromHexString(lectorId) } 
      },
      {
        $lookup: {
          from: "subjects", 
          localField: "subjects",
          foreignField: "_id",
          as: "detailedSubjects"
        }
      },

      { 
        $addFields: { subjects: "$detailedSubjects" } 
      },
      { 
        $project: { detailedSubjects: 0 } 
      },
      {
        $project: {
          _id: 0,
          subjects: {
            _id: 1,
            name: 1,
            description: 1,
            programmingLanguages: 1
          }
        }
      }
    ])
    .toArray()

  return subjects.length > 0 ? subjects[0].subjects : [];
}


module.exports = {
    getLecturers,
    getLecturerById,
    createLecturer,
    updateLecturer,
    removeLecturer,
    getGroupsByLecturer,
    getStudentsByLecturer,
    getSubjectsByLecturer
}