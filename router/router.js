const Router = require('express').Router();
const { courseRouter } = require('./course.router');

Router.get('/', (req, res) => {
  res.render('pages/homeTemplate.ejs');
});

Router.use('/course', courseRouter);

module.exports = { Router };
