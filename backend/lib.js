const path = require('path')
const fs = require('fs')

const pluralize = require('pluralize')

function embedData(data, key, parentKey) {

    if(Array.isArray(data)) {
        const formedData =  data.map(item => {
            const embedId = item[key + 'Id']

            const fileName = pluralize(key) + '.json'
    
            const filePath = path.join('db', fileName)
            let foundItem = null
    
            if (fs.existsSync(filePath)) {
                try {
                    const fileContent = fs.readFileSync(filePath)
                    const existingData = JSON.parse(fileContent)
    
                    if (!Array.isArray(existingData)) {
                        console.error('existingData is not an array:', existingData)
                        return {
                             ...item,
                              [key]: []
                        }
                    }
    
                    foundItem = existingData.find(entry => entry.id === embedId)
                } catch (error) {
                    console.error('Error reading or parsing file:', error)
                    return { 
                        ...item,
                         [key]: [] 
                    }
                }
            }
    
    
            return {
                ...item,
                [key]: foundItem || [] 
            }
        })


        return formedData  
    }

    const embedId = data[key + 'Id']

    console.log(key)
    console.log(data)
    console.log(embedId)

    const filePath = path.join('db', key + '.json')
    let foundItems = []

    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath)
        const items = JSON.parse(fileContent)
        console.log(items)
        console.log(data.id)
        foundItems = items.filter(item => item[parentKey + 'Id'] === data.id)
    }

    return { 
        ...data,
         [key]: foundItems 
    }

}

module.exports = {
    embedData
}