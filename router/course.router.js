const Router = require('express').Router();
const courseController = require('../controller/course.controller');


// Router.get('/',(req,res)=>{
//     res.render('pages/courseTemplate.ejs');
// })

Router.get('/',courseController.getTableData);

Router.post('/create',courseController.insertCourse);

Router.post('/edit/:courseId',courseController.editCourseByCourseId);

Router.get('/edit/:courseId',courseController.getPageWithCourseId);

Router.delete('/delete/:courseId',courseController.deleteCourseByCourseId);

module.exports = { courseRouter: Router };
