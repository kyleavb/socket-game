require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/passportConfig');
var isLoggedIn = require('./middleware/isLoggedIn');
var flash = require('connect-flash');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/public/'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
})

var port = process.env.PORT

app.get('/', (req, res)=>{
    console.log('GET - /');
    res.render('index');
});

app.get('/about', (req, res)=>{
    console.log('GET - /about');
    res.render('about');
});

app.get('/signup', (req, res)=>{
    console.log('GET - /signup');
    res.render('signup')
});

app.get('/profile', isLoggedIn, (req, res)=>{
    console.log('GET - /profile');
    res.render('profile')
})

app.get('/login', (req, res)=>{
    console.log('GET - /login');
    res.render('login');
});

app.use('/auth', require('./controllers/auth'));
app.use('/game', require('./controllers/game'));

var server = app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
});

module.exports = server;