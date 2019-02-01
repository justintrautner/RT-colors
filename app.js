const express = require("express");
const app = express();

var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const server = app.listen(8000);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.render("index");
});

io.on('connection', function (socket) {
    console.log("*******CONNECTED*******");

    socket.on('green', function () {
        io.emit('setgreen')
    });
    socket.on('blue', function () {
        io.emit('setblue')
    });
    socket.on('pink', function () {
        io.emit('setpink')
    });

});