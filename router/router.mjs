import express from 'express';
import {courseRouter}  from './course.router.mjs';
import {aboutRouter}  from './about.router.mjs';
import {contactUsRouter} from './contactUs.router.mjs';

const Router = express.Router();

Router.get('/', (req, res) => {
  res.render('pages/homeTemplate.ejs');
});

Router.use('/course', courseRouter);

Router.use('/about',aboutRouter);

Router.use('/contactUs',contactUsRouter);

export { Router };
