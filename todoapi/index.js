const express = require('express'),
    app = express(),
    port = 8080,
    bodyParser = require('body-parser'),
    todoRoutes = require('./routes/todos');


    app.use(express.json({limit: '20mb'}));
    app.use(express.urlencoded({ extended: true, limit: '20mb' }));
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/views'));
    

app.get('/', function(req, res) {
    res.sendFile('index.html');
})

app.use('/api/todos', todoRoutes);

app.listen( 8080, function() {
    console.log('\n\nWe are up and running');
})

