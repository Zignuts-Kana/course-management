const Router = require('express').Router();
const courseController = require('../controller/course.controller');


// Router.get('/',(req,res)=>{
//     res.render('pages/courseTemplate.ejs');
// })

//route for fatch data from mysql send to ejs
Router.get('/',courseController.getTableData);

//route for render Add course ejs template
Router.get('/create',courseController.getAddCoursePage);

//route for Add course to database
Router.post('/create',courseController.insertCourse);

//route for render edit course ejs template
Router.get('/edit/:courseId',courseController.getPageWithCourseId);

//route for store edited course to database
Router.post('/edit/:courseId',courseController.editCourseByCourseId);

//route for delete course from database
Router.get('/delete/:courseId',courseController.deleteCourseByCourseId);

module.exports = { courseRouter: Router };
