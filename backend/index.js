const http = require('http')

const messages = []

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    console.log('url :', url)
    console.log('method :', method)
    console.log('messages :', messages)

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html')

        res.write('<html>')
        res.write('<head><title>My page</title></head>')
        res.write(`<body>
                         <h1>Holla!</h1>
                         <ul>
                            <li><a href="/form">form</a></li>
                         </ul>
                   </body`)
        res.write('</html>')

        res.end()
        return
    }

    if(url === '/form') {
        res.setHeader('Content-Type', 'text/html')

        res.write('<html>')
        res.write('<head><title>Form</title></head>')
        res.write(`<body>
                         <h1>Form</h1>
                         <a href="/">Home</a>
                            <form action="/form-submitted" method="POST">
                                <input type="text" name="message"/>
                                <button type="submit">Send</button>
                            </form>
                   </body`)
        res.write('</html>')

        res.end()
        return
    }

    if(url === '/form-submitted' && method === 'POST') {

        const body = []

        req.on('data', chunk => {
            body.push(chunk)
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]

            if(message) {
                messages.push(message)
            }

        })


        res.statusCode = 302
        res.setHeader('Location', '/messages-list')
        res.end()
        return
    }

    // if (url === '/form-success') {
    //     res.setHeader('Content-Type', 'text/html')

    //     res.write('<html>')
    //     res.write('<head><title>Form success page</title></head>')
    //     res.write(`<body>
    //                      <h1>Form submitted successfully !</h1>
    //                      <a href="/">Go back to home page</a>
    //                </body>`)
    //     res.write('</html>')

    //     res.end()
    //     return
    // }

    if (url === '/messages-list') {
        res.setHeader('Content-Type', 'text/html')

        const messagesList = messages.map(message => `<li>${message}</li>`).join('')

        res.write('<html>')
        res.write('<head><title>Messages list page</title></head>')
        res.write(`<body>
                         <h1>Messages list</h1>
                         <ul>${messagesList}</ul>
                         <a href="/form">Add new message</a>
                         <a href="/">Go back to home page</a>
                   </body>`)
        res.write('</html>')

        res.end()
        return
    }



    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>404: not found</title></head>')
    res.write('<body><h1>Page not found</h1><p>Looking for: ' + url + '</p><a href="/">Go back to home page</a></body')
    res.write('</html>')

    res.end()
    return
})

server.listen(5005, () => console.log('Server is running on http://localhost:5005'))


