const mongoose = require('mongoose');

const express = require('express');
const http = require('http');
const app = express();

let server = http.createServer(app);

app.use(express.json());

const evento = require('./routers/evento');
const silla = require('./routers/silla');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/evento', evento);
app.use('/api/silla', silla);

const port = process.env.PORT || 3003;
server.listen(port, () => console.log('Escuchando Puerto: ' + port));

mongoose.connect(
    `mongodb+srv://lesly:${process.env.MONGOPASS}@cluster0.g3yej.mongodb.net/controlTeatro?retryWrites=true&w=majority&appName=Cluster0`    )
.then(() => console.log('Conectado a MongoDb'))
.catch(error =>

    console.log(error));
