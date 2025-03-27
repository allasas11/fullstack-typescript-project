const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')

// FUNCTIONS //

function getSubjects() {
    const filePath = path.join('db', 'subjects.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
}

function getSubjectById(id) {
    const subjects = getSubjects()
    return subjects.find(subject => subject.id === id)
}

function createSubject(body) {
    const id = uuid()

    const programmingLanguages = Array.isArray(body.programmingLanguages)
        ? body.programmingLanguages
        : body.programmingLanguages
        ? [body.programmingLanguages]
        : []

    const newSubject = {
        id,
        name: body.name,
        description: body.description,
        programmingLanguages,
        lecturerId: body.lecturerId
    }

    const subjects = getSubjects()
    subjects.push(newSubject)

    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, JSON.stringify(subjects, null, 2))

    return newSubject
}

function updateSubject(body) {
    const { id, programmingLanguages: bodyProgrammingLanguages, ...rest } = body

    const subjects = getSubjects()

    const updatedSubjects = subjects.map(subject => {
        if (subject.id === id) {
            return {
                ...subject,
                ...rest,
                programmingLanguages: Array.isArray(bodyProgrammingLanguages)
                    ? bodyProgrammingLanguages
                    : bodyProgrammingLanguages
                    ? [bodyProgrammingLanguages]
                    : []
            }
        }
        return subject
    })

    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, JSON.stringify(updatedSubjects, null, 2))

    return updatedSubjects.find(subject => subject.id === id)
}

function removeSubject(id) {
    const subjects = getSubjects()
    const updatedSubjects = subjects.filter(subject => subject.id !== id)

    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, JSON.stringify(updatedSubjects, null, 2))
}

module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    removeSubject
}


