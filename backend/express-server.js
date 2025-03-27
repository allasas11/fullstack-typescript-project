const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true}))

const messages = [
    'labas',
    'hello',
    'bonjour',
    'salut'
]

app.get('/form', (req, res, next) => {
    res.send(`
            <div>
                <h1>Form:</h1>
                <a href="/">Home</a>
                <form action="/form-submitted" method="POST">
                    <input type="text" name="message"/>
                    <button type="submit">Send</button>
                </form>
            </div>
        `)
})


app.get('/messages', (req, res, next) => {

    const messagesList = messages.map(message => `<li>${message}</li>`).join('')

    res.send(`
        <div>
            <h1>Messages list</h1>
            <ul>${messagesList}</ul>
            <a href="/form">Add new message</a>
            <a href="/">Go back to home page</a>
        </div>
        `)
})



app.get('/', (req, res, next) => {
    res.send(`
            <div>
                <h1>Salut para todos !</h1>
                <ul>
                    <li><a href="/form">form</a></li>
                </ul>
            </div>
        `)
})



app.post('/form-submitted', (req, res, next) => {
    console.log(req.body)
    const { message } = req.body

    if(message) {
        messages.push(message)
    }

    res.redirect('/messages')
})


app.get('*', (req, res, next) => {
    res.send(`
        <div>
            <h1>Page not found</h1>
            <a href="/">Go back to home page</a>
        </div>
        `)
})

const PORT = 4005
app.listen(PORT, () => console.log('Server is running on http://localhost:4005'))