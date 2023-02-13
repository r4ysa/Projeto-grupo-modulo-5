const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//Models
const Tabelaitem = require('./models/Tabelaitem ')
const Usuario = require('./models/Usuario')

// Routes
const itemsRoutes = require('./routes/itemsRoutes')
const usuRoutes = require('./routes/usuRoutes')

//Controller
const ItemController = require('./controllers/ItemsController')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber respostas do body
app.use(express.urlencoded({
    extended: true,
}))


app.use(express.json())

//session middleware
app.use(
    session({
        name: "session",
        secret: "mySecret1234",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

//public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {
    if (req.session.usuarioid) {
        res.locals.session = req.session
    }
    next()
})

//Routes
app.use('/items', itemsRoutes)
app.use('/', usuRoutes)

app.get('/', ItemController.exibirHomeDashboard)

conn
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))