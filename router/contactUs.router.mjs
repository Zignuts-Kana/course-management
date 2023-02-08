import express from 'express';

const contactUsRouter = express.Router();

contactUsRouter.get('/', (req, res) => {
  res.render('pages/contactUsTemplate.ejs');
});

export { contactUsRouter };
