//FUNCTIONS

const { ObjectId } = require("mongodb")
const { getDB } = require("../db")

//GET
async function getStudents() {
    const db = getDB()
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
                                    },
                                    {
                                        $lookup: {
                                          from: "programminglanguages",
                                          localField: "interests",
                                          foreignField: "_id",
                                          as: "detailedInterests",
                                        },
                                      },
                                      {
                                        $addFields: {
                                          interests: "$detailedInterests"
                                        }
                                      },
                                      {
                                        $project: {
                                          detailedInterests: 0
                                        }
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
                                    },
                                    {
                                        $lookup: {
                                          from: "programminglanguages",
                                          localField: "interests",
                                          foreignField: "_id",
                                          as: "detailedInterests",
                                        },
                                      },
                                      {
                                        $addFields: {
                                          interests: "$detailedInterests"
                                        }
                                      },
                                      {
                                        $project: {
                                          detailedInterests: 0
                                        }
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

// Function for filtering using link - dynamic filtering mechanism
async function getStudentsBy(key, value) {
    const db = getDB()

        let queryValue = value

        if (key === "age") {

            queryValue = Number(value)
        } else if (key === "groupId") {

            queryValue = ObjectId.createFromHexString(value)
        }
    

        const res = await db
                            .collection('students')
                            .find({ [key]: queryValue })
                            .toArray()

    return res 
}

async function getStudentGroups(studentId) {
  const db = getDB()


  const groups = await db
    .collection("groups")
    .aggregate([
      {
        $match: {
          students: ObjectId.createFromHexString(studentId)
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
        },
      },
    ])
    .toArray()

  return groups
}

async function getStudentLecturers(studentId) {
  const db = getDB();

  const lecturer = await db
    .collection("students")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(studentId)
        }
      },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group"
        }
      },
      {
        $unwind: "$group",
      },
      {
        $lookup: {
          from: "lecturers",
          localField: "group.lecturerId",
          foreignField: "_id",
          as: "lecturer",
        },
      },
      {
        $unwind: "$lecturer",
      },
      {
        $project: {
          _id: "$lecturer._id",
          name: "$lecturer.name",
          surname: "$lecturer.surname",
          age: "$lecturer.age",
        },
      },
    ])
    .next()

  if (!lecturer) {
    throw new Error("Lecturer not found")
  }

  return lecturer;
}

async function getStudentSubjects(studentId) {
  const db = getDB()

  const subjects = await db
    .collection("students")
    .aggregate([
      { $match: { _id: ObjectId.createFromHexString(studentId) } },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group"
        }
      },
      { 
        $unwind: "$group" 
      },
      {
        $lookup: {
          from: "subjects",
          localField: "group.lecturerId",
          foreignField: "lecturerId",
          as: "subjects"
        }
      },
      {
        $project: {
          _id: 0,
          subjects: {
            _id: 1,
            name: 1,
            description: 1,
          },
        },
      },
    ])
    .next()

  return subjects
}



module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    removeStudent,
    getStudentsBy,
    getStudentGroups,
    getStudentLecturers,
    getStudentSubjects
}