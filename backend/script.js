
// const casual = require('casual')
// const colors = require('colors')
const si = require('systeminformation')

// function getInfo() {
//     const city = casual.city.length
//     const address = casual.address
//     const state = casual.state
//     const country = casual.country
//     return `${address.underline}, ${city}, ${state}, ${country.bgBlue.yellow}`
// }

// console.log(colors.red(getInfo()))
// console.log(colors.green('Holla!'))

// si.cpu().then(data => {
//     const { manufacturer, brand } = data

//     const result = `CPU: ${manufacturer}, ${brand}.`

//     console.log(result.blue.bgWhite)

// })


// si.graphics().then(data => {
//     const { vendor, model } = data.controllers[0]

//     const result = `GPU: ${vendor}, ${model}`

//     console.log(result.white.bgBlue)
// })


// si.mem().then(data => {

//     const { total, free, used } = data

//     const totalGB = (total / (1024 * 1024 * 1024)).toFixed(2)
//     const freeGB = (free / (1024 * 1024 * 1024)).toFixed(2)
//     const usedGB = (used / (1024 * 1024 * 1024)).toFixed(2)
    
//     const result = `Memory: ${totalGB} GB, Free: ${freeGB} GB, Used: ${usedGB} GB`
    
//     console.log(result.blue.bgWhite)
// })




const getSpecs = async() => {

    const cpu = await si.cpu()
    const gpu = await si.graphics()
    const ram = await si.mem()


    const { manufacturer, brand } = cpu
    const { vendor, model } = gpu.controllers[0]
    const { total, free, used } = ram

    const totalGB = (total / (1024 * 1024 * 1024)).toFixed(2)
    const freeGB = (free / (1024 * 1024 * 1024)).toFixed(2)
    const usedGB = (used / (1024 * 1024 * 1024)).toFixed(2)

    const result = `CPU: ${manufacturer}, ${brand}.`
    const result1 = `Memory: ${totalGB} GB, Free: ${freeGB} GB, Used: ${usedGB} GB`
    const result2 = `GPU: ${vendor}, ${model}`

    console.log(result.blue.bgWhite)
    console.log(result1.white.bgBlue)
    console.log(result2.blue.bgWhite)


}

getSpecs()