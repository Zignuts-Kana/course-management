const { con } = require('../connection/mysql.connection');

//get form data
async function getTableData(req, res) {
  try {
    con.query(`SELECT * FROM course;`, function (err, result, fields) {
      if (err) {
        return res.status(400).render('pages/errorTemplate.ejs', { err });
      }
      return res.render('pages/courseTemplate.ejs', { results: result });
    });
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
            return res.status(400).render('pages/errorTemplate.ejs', { err });
          }
        }
      );

      return res.status(200).send({ Message: 'New Course Added Sucessfully!' });
    }
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
}

//function for get edit page or render page
async function getPageWithCourseId(req, res) {
  try {
    const { courseId } = req.params;
    con.query(
      `SELECT * FROM course WHERE course.course_id = ${parseInt(
        courseId,
        10
      )};`,
      function (err, result, fields) {
        if (err) {
          return res.status(400).render('pages/errorTemplate.ejs', { err });
        }
        // console.log(result);
        return res.render('pages/editTemplate.ejs', { result });
      }
    );
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
}

//function for edit course by index
async function editCourseByCourseId(req, res) {
  try {
    const { name, duration, fees } = req.body;
    const { courseId } = req.params;

    if (name && duration && fees) {
      con.query(
        `UPDATE course SET course.course_name = '${name}',course.course_duration = '${duration}',course.course_fees = ${fees} WHERE course.course_id = ${courseId};`,
        function (err, result) {
          // console.log(result);
          if (err) {
            return res.status(400).render('pages/errorTemplate.ejs', { err });
          }
        }
      );

      return res.status(200).send({ Message: 'Course Updated Sucessfully!' });
    }
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
}

//function for render Add course page
const getAddCoursePage = async (req, res) => {
  try {
    return res.status(200).render('pages/createTemplate.ejs')
  } catch (error) {
    return res.status(500).send({Error:error})
  }
};

//function for delete course by index
async function deleteCourseByCourseId(req, res) {
  try {
    const {courseId} = req.params;
    con.query(
      `DELETE FROM course WHERE course.course_id = ${parseInt(courseId)};`,
      function (err, result) {
        if (err) {
          return res.status(400).render('pages/errorTemplate.ejs', { err });
        }
      }
    );

    return res.status(200).send({Message:`Delete column with courseId :- ${courseId} Successfully!`})
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
}
//export function
module.exports = {
  insertCourse,
  getTableData,
  editCourseByCourseId,
  deleteCourseByCourseId,
  getPageWithCourseId,
  getAddCoursePage
};
