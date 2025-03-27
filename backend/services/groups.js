
const { v4: uuid } = require('uuid')

const path = require('path')

const fs = require('fs')
const { embedData } = require('../lib')


// FUNCTIONS //

function getGroups(query) {
    const filePath = path.join('db', 'groups.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)
    const existingData = JSON.parse(fileContent)

    let formedData = existingData

    if(query) {
        const start = parseInt(query._start ?? '0', 10)
        const limit = parseInt(query._limit ?? '5', 10)
        
        
        if(limit) {   
            const end = start + limit
            formedData = existingData.slice(start, end)
        }
    }

    return formedData

}

function getGroupById(id, query) {
    console.log(query)
    const groups = getGroups()
    const foundData = groups.find(group => group.id === id)

    let formedData = {...foundData}

    if(query) {
        const embed = query._embed

        if(embed) {

            if(Array.isArray(embed)) {
                embed.forEach(item => {
                    formedData = embedData(formedData, item, 'group')
                })
            } else {
                formedData = embedData(formedData, embed, 'group')
            }
        }


    }

    return formedData
}

function createGroup(body) {
    const id = uuid()

    const students = Array.isArray(body.students) ? body.students : body.students ? [body.students] : [];


    const newGroup = {
        ...body,
        students,
        id
    };

    const groups = getGroups()

    groups.push(newGroup)

    const filePath = path.join('db', 'groups.json')
    fs.writeFileSync(filePath, JSON.stringify(groups, null, 2))

    return newGroup
}

function updateGroup(body) {
    const { id, students: bodyStudents, ...rest  } = body

    const groups = getGroups()

    const updatedGroups = groups.map(group => {
        if (group.id === id) {
            const updatedGroup = {
                ...group,
                ...rest,
                students: Array.isArray(bodyStudents) ? bodyStudents : bodyStudents ? [bodyStudents] : []
            };
            return updatedGroup;
        }
        return group
    });

    const filePath = path.join('db', 'groups.json')
    fs.writeFileSync(filePath, JSON.stringify(updatedGroups, null, 2))

    return updatedGroups.find(group => group.id === id)
}

function removeGroup(id) {
    const groups = getGroups();
    const updatedGroups = groups.filter(group => group.id !== id)


    const filePath = path.join('db', 'groups.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedGroups, null, 2))
}

module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    removeGroup
}

