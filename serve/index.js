const express = require('express');
const bodyParser = require('body-parser');  
const mysql = require('mysql');
const app = express();

app.use(require('./Tools/cors').cors);
app.use(require('./author/').cookie);
app.use(require('./author/').session);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/user', require('./Controller/UserController'));
app.listen(81, () => {
    console.log('81!');
});
