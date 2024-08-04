require('dotenv').config() // FICHIER .ENV

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/db')
const { isActiveRoute } = require('./server/helpers/routeHelpers') // liens home / about / contact


const app = express()
const PORT = 5000 || process.env.port

// CONNECT TO DB
connectDB()

// Middleware
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method')) // ajoute method dans action dans les form 

app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    // cookie: { maxAge: new Date ( Date.now() + (3600000))}
}))

app.use(express.static('public'))

// TEMPLATING ENGINE
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.locals.isActiveRoute = isActiveRoute

app.use('/', require('./server/routes/main')) // index
app.use('/', require('./server/routes/admin')) // admin

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})