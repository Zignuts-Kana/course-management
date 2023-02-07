const Router = require('express').Router();
const { courseRouter } = require('./course.router');
const { aboutRouter } = require('./about.router');
const { contactUsRouter } = require('./contactUs.router');

Router.get('/', (req, res) => {
  res.render('pages/homeTemplate.ejs');
});

Router.use('/course', courseRouter);

Router.use('/about',aboutRouter);

Router.use('/contactUs',contactUsRouter);

module.exports = { Router };
