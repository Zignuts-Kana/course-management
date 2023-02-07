const Router = require('express').Router();

Router.get('/', (req, res) => {
  res.render('pages/contactUsTemplate.ejs');
});

module.exports = { contactUsRouter: Router };
