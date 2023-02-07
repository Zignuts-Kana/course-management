const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection/mysql.connection');
const {Router} = require('./router/router');
require('dotenv').config();
const app = express();

//PORT for server
const port = process.env.PORT;

//set view engine of ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

//Run Connect function to connect server
connection.connect();

//connect to all router file
app.use('/app',Router);


//listern to port
app.listen(port);


//log for get conformed
console.log(`Sever listening on port : http://localhost:${port}/app`);