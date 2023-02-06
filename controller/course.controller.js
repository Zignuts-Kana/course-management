const { con } = require('../connection/mysql.connection');

//get form data
async function getTableData(req, res) {
  try {
    con.query(`SELECT * FROM course;`, function (err, result, fields) {
      if (err) {
        return res.status(400).send({ Error: err });
      }
      return res.render('pages/courseTemplate.ejs', { results: result });
    });
    // console.log(response);
    return res.render('pages/courseTemplate.ejs');
  } catch (error) {
    return res.status(500).send({ Message: error });
  }
}

//function for insert course
async function insertCourse(req, res) {
  try {
    const { name, duration, fees } = req.body;

    if (name && duration && fees) {
      con.query(
        `INSERT INTO course (course_name,course_duration,course_fees) VALUES ('${name}','${duration}',${fees});`,
        function (err, result) {
          if (err) {
            return res.status(400).send({ Error: err });
          }
        }
      );

      return res.status(200).send({ Message: 'New Course Added Sucessfully!' });
    }
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
}

//function for edit course by index

//function for delete course by index

//export function
module.exports = { insertCourse, getTableData };
