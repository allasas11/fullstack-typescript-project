
const { v4: uuid } = require('uuid')

const path = require('path')
const fs = require('fs')
const { embedData } = require('../lib')


//FUNCTIONS


//GET
function getStudents(query) {
    const filePath = path.join('db', 'students.json')

    if(!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const existingData = JSON.parse(fileContent)

    let formedData = existingData

    if(query) {
        const start = parseInt(query._start ?? '0', 10)
        const limit = query._limit ? parseInt(query._limit, 10) : null
        
        if (limit !== null) {
            const end = start + limit
            formedData = existingData.slice(start, end)
        } else {
            formedData = existingData.slice(start)
        }

        const embed = query._embed

        if(embed) {

            if(Array.isArray(embed)) {
                embed.forEach(item => {
                    formedData = embedData(formedData, item)
                })
            } else {
                formedData = embedData(formedData, embed)
            }
        }


    }

    return formedData

}

//GET
function getStudentById(id) {

    const filePath = path.join('db', 'students.json')

    if(!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const students = JSON.parse(fileContent)

    const foundStudent = students.find(student => student.id === id )

    return foundStudent


}

//POST
function createStudent(body) {
    const id = uuid()

    const interests = []
    
    if(body.interests) {
        if(typeof body.interests === 'string') {
            interests.push(body.interests)
        } else {
            interests.push(...body.interests)

        }
    }

    const newStudent = { 
        ...body,
        age: body.age !== undefined ? Number(body.age) : null,
        interests,
        id
    }

    const students = getStudents()

    students.push(newStudent)

    const stringifiedData = JSON.stringify(students, null, 2)

    const filePath = path.join('db', 'students.json')
    fs.writeFileSync(filePath, stringifiedData)
 
    return newStudent
}

//UPDATE
function updateStudent(body) {
    const { id, interests: bodyInterests, age, ...rest } = body;

    const students = getStudents();

    const updatedStudents = students.map(student => {
        if (student.id === id) {
            const interests = Array.isArray(bodyInterests)
                ? bodyInterests
                : bodyInterests
                ? [bodyInterests]
                : [];

            return {
                ...student,
                ...rest,
                age: age !== undefined ? Number(age) : student.age,
                interests,
            };
        }
        return student;
    });

    const filePath = path.join('db', 'students.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedStudents, null, 2));

    return updatedStudents.find(student => student.id === id);
}

//DELETE
function removeStudent(id) {
    const students = getStudents()
    const updatedStudents = students.filter(student => student.id !== id)

    const stringifiedData = JSON.stringify(updatedStudents, null, 2)

    const filePath = path.join('db', 'students.json')
    fs.writeFileSync(filePath, stringifiedData)
    
}


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    removeStudent
}