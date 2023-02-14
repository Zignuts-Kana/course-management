import express from 'express';
import bodyParser from 'body-parser';
import {Course} from "./models/course.model.mjs"
// import {connect} from './connection/mysql.connection.mjs';
import {Router} from './router/router.mjs';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//PORT for server
const port = process.env.PORT;

//set view engine of ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

//Run Connect function to connect server
// connect();

//Run Course Model to connect Course
Course;

//connect to all router file
app.use('/app',Router);


//listern to port
app.listen(port);


//log for get conformed
console.log(`Sever listening on port : http://localhost:${port}/app`);