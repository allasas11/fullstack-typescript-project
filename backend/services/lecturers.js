const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');


function getLecturers() {
    const filePath = path.join('db', 'lecturers.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent);
}

function saveLecturers(lecturers) {
    const filePath = path.join('db', 'lecturers.json')
    fs.writeFileSync(filePath, JSON.stringify(lecturers, null, 2))
}


function getLecturersList() {
    const lecturers = getLecturers()
    console.log('Fetched lecturers:', lecturers)
    return lecturers;
}


function getLecturerById(id) {
    const lecturers = getLecturers()
    return lecturers.find(lecturer => lecturer.id === id)
}


function createLecturer(body) {
    const id = uuid()

    const age = body.age !== undefined ? Number(body.age) : null

    const subjectIds = Array.isArray(body.subjectIds)
        ? body.subjectIds
        : body.subjectIds
        ? [body.subjectIds]
        : []

    const groupIds = Array.isArray(body.groupIds)
        ? body.groupIds
        : body.groupIds
        ? [body.groupIds]
        : []

    if (subjectIds.length === 0 || groupIds.length === 0) {
        throw new Error('You must select at least one subject and one group.')
    }

    const newLecturer = {
        id,
        name: body.name,
        surname: body.surname,
        age,
        subjectIds,
        groupIds
    }

    const lecturers = getLecturersList()
    lecturers.push(newLecturer)
    saveLecturers(lecturers)

    return newLecturer
}


function updateLecturer(body) {
    const { id, ...rest } = body

    const age = rest.age !== undefined ? Number(rest.age) : undefined

    const subjectIds = Array.isArray(rest.subjectIds)
        ? rest.subjectIds
        : rest.subjectIds
        ? [rest.subjectIds]
        : []

    const groupIds = Array.isArray(rest.groupIds)
        ? rest.groupIds
        : rest.groupIds
        ? [rest.groupIds]
        : []

    if (subjectIds.length === 0 || groupIds.length === 0) {
        throw new Error('You must select at least one subject and one group.');
    }

    const lecturers = getLecturers()

    const updatedLecturers = lecturers.map(lecturer => {
        if (lecturer.id === id) {
            return {
                ...lecturer,
                ...rest,
                age: age !== undefined ? age : lecturer.age,
                subjectIds,
                groupIds
            }
        }
        return lecturer
    })

    saveLecturers(updatedLecturers)

    return updatedLecturers.find(lecturer => lecturer.id === id)
}


function removeLecturer(id) {
    const lecturers = getLecturers()
    const updatedLecturers = lecturers.filter(lecturer => lecturer.id !== id)

    saveLecturers(updatedLecturers)
}

module.exports = {
    getLecturersList,
    getLecturerById,
    createLecturer,
    updateLecturer,
    removeLecturer
}