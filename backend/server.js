const http = require('http')
const si = require('systeminformation')


// const server = https.createServer()

// const requestListener = (req, res) => {
    
// }

// https.createServer(function(req, res) {

// })


const getCPUspecs = async() => {
    const cpu = await si.cpu()
    const { manufacturer, brand } = cpu
    return `CPU: ${manufacturer}, ${brand}.`
}

const getGPUspecs = async() => {
    const gpu = await si.graphics()
    const { vendor, model } = gpu.controllers[0]
    return `GPU: ${vendor}, ${model}`
}

const getRAMspecs = async() => {

    const ram = await si.mem()
    const { total, free, used } = ram

    const totalGB = (total / (1024 * 1024 * 1024)).toFixed(2)
    const freeGB = (free / (1024 * 1024 * 1024)).toFixed(2)
    const usedGB = (used / (1024 * 1024 * 1024)).toFixed(2)

    return `Memory: ${totalGB} GB, Free: ${freeGB} GB, Used: ${usedGB} GB`
}

const server = http.createServer(async (req, res) => {

    console.log('url ', req.url)
    console.log('body ', req.body)
    // console.log('headers ', req.headers)
    
    res.setHeader('Content-Type', 'text/html')
    if(req.url === '/specs') {

        res.write('<html>')
        res.write('<head><title>Specifications</title></head>')
        res.write('<body>')
        res.write('<h1>Specifications</h1>')
        res.write('<a href="/">Home</a>')
        res.write('<a href="/specs/cpu">CPU</a>')
        res.write('<a href="/specs/gpu">GPU</a>')
        res.write('<a href="/specs/ram">RAM</a>')

        res.write('</body>')
        res.write('</html>')
        
        res.end()
        return
    } 

    if(req.url === '/specs/cpu') {

        res.write('<html>')
        res.write('<head><title>CPU page</title></head>')
        res.write('<body>')
        res.write('<h1>CPU</h1>')
        res.write('<a href="/specs">Specifications</a>')
        res.write('<p>' + await getCPUspecs() + '</p>')
        res.write('</body>')
        res.write('</html>')
        
        res.end()
        return
    }

    if(req.url === '/specs/gpu') {

        res.write('<html>')
        res.write('<head><title>GPU page</title></head>')
        res.write('<body>')
        res.write('<h1>GPU</h1>')
        res.write('<a href="/specs">Specifications</a>')
        res.write('<p>' + await getGPUspecs() + '</p>')
        res.write('</body>')
        res.write('</html>')
        
        res.end()
        return
    }

    if(req.url === '/specs/ram') {

        res.write('<html>')
        res.write('<head><title>RAM page</title></head>')
        res.write('<body>')
        res.write('<h1>RAM</h1>')
        res.write('<a href="/specs">Specifications</a>')
        res.write('<p>' + await getRAMspecs() + '</p>')
        res.write('</body>')
        res.write('</html>')
        
        res.end()
        return
    }

        res.write('<html>')
        res.write('<head><title>RAM page</title></head>')
        res.write('<body>')
        res.write('<h1>Home</h1>')
        res.write('<a href="/specs">Specs</a>')
        res.write('</body>')
        res.write('</html>')
        
        res.end()


})

server.listen(3005, () => console.log('Server is running on http://localhost:3005'))