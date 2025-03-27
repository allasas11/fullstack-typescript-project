const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')

// FUNCTIONS //

function getProgrammingLanguages() {
    const filePath = path.join('db', 'proglangs.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
}

function getProgrammingLanguageById(id) {
    const programmingLanguages = getProgrammingLanguages()
    return programmingLanguages.find(lang => lang.id === id)
}

function createProgrammingLanguage(body) {
    const id = uuid(); // Generate a unique UUID for the new programming language

    const students = Array.isArray(body.students) ? body.students : body.students ? [body.students] : [];

    const newLanguage = {
        ...body,
        students,
        id
    };

    const programmingLanguages = getProgrammingLanguages()
    programmingLanguages.push(newLanguage);

    const filePath = path.join('db', 'proglangs.json')
    fs.writeFileSync(filePath, JSON.stringify(programmingLanguages, null, 2))

    return newLanguage
}

function updateProgrammingLanguage(body) {
    const { id, students: bodyStudents, ...rest } = body;

    const programmingLanguages = getProgrammingLanguages();

    const updatedLanguages = programmingLanguages.map(lang => {
        if (lang.id === id) {
            return {
                ...lang,
                ...rest,
                students: Array.isArray(bodyStudents) ? bodyStudents : bodyStudents ? [bodyStudents] : []
            };
        }
        return lang;
    });

    const filePath = path.join('db', 'proglangs.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedLanguages, null, 2));

    return updatedLanguages.find(lang => lang.id === id);
}

function removeProgrammingLanguage(id) {
    const programmingLanguages = getProgrammingLanguages();
    const updatedLanguages = programmingLanguages.filter(lang => lang.id !== id);

    const filePath = path.join('db', 'proglangs.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedLanguages, null, 2));
}

module.exports = {
    getProgrammingLanguages,
    getProgrammingLanguageById,
    createProgrammingLanguage,
    updateProgrammingLanguage,
    removeProgrammingLanguage
};