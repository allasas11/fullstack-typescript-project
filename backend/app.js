require('dotenv').config()
require('./db')

const express = require('express')
const path = require('path')

const process = require('process')

var pluralize = require('pluralize')
console.log(pluralize('group'))


const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())
app.use(express.json())

// API routes //

const studentApiRoutes = require('./api/students')
const groupsApiRoutes = require('./api/groups')
const proglangsApiRoutes = require('./api/proglangs')
const lecturersApiRoutes = require('./api/lecturers')
const subjectsApiRoutes = require('./api/subjects')


// Routes 
const studentsRoutes = require('./routes/students')
const groupsRoutes = require('./routes/groups')
const proglangsRouter = require('./routes/proglangs')
const lecturersRouter = require('./routes/lecturers')
const subjectsRouter = require('./routes/subjects')



// API routes //

app.use('/api/students', studentApiRoutes)
app.use('/api/groups', groupsApiRoutes)
app.use('/api/proglangs', proglangsApiRoutes)
app.use('/api/lecturers', lecturersApiRoutes)
app.use('/api/subjects', subjectsApiRoutes)

// Routes 

app.use('/', studentsRoutes)
app.use('/', groupsRoutes)
app.use('/', proglangsRouter)
app.use('/', lecturersRouter)
app.use('/', subjectsRouter)

app.set('view engine', 'ejs')
app.set('vies', path.join('views'))

app.use(express.static('public'))

app.locals.backendSiteTitle = 'BE project'
app.locals.currentDate = new Date().getFullYear()


//HOME 
app.get('/', (req, res) => {
    res.render('app')
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on ${PORT}.`))
