const Router = require('express').Router();

Router.get('/', (req, res) => {
  res.render('pages/aboutTemplate.ejs');
});

module.exports = { aboutRouter: Router };
