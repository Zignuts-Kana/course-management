import express from 'express';
import courseController from '../controller/course.controller.mjs';


// Router.get('/',(req,res)=>{
//     res.render('pages/courseTemplate.ejs');
// })

const courseRouter = express.Router();

//route for fatch data from mysql send to ejs
courseRouter.get('/',courseController.getTableData);

//route for render Add course ejs template
courseRouter.get('/create',courseController.getAddCoursePage);

//route for Add course to database
courseRouter.post('/create',courseController.insertCourse);

//route for render edit course ejs template
courseRouter.get('/edit/:courseId',courseController.getPageWithCourseId);

//route for store edited course to database
courseRouter.post('/edit/:courseId',courseController.editCourseByCourseId);

//route for delete course from database
courseRouter.delete('/delete/:courseId',courseController.deleteCourseByCourseId);

export { courseRouter };
