const Router = require('express').Router();
const courseController = require('../controller/course.controller');


// Router.get('/',(req,res)=>{
//     res.render('pages/courseTemplate.ejs');
// })

Router.get('/',courseController.getTableData);

Router.post('/create',courseController.insertCourse);

module.exports = { courseRouter: Router };
