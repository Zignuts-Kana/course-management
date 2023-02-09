import { query } from 'express';
import { con } from '../connection/mysql.connection.mjs';

//get form data
const getTableData = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 7;
    const page = parseInt(req.query.page) || 1;
    const id = req.query && req.query.id ? req.query.id : undefined;
    console.log('id:- ', id);

    con.query(`SELECT * FROM course;`, function (err, result, fields) {
      if (err) {
        return res.status(400).render('pages/errorTemplate.ejs', { err });
      }
      const totalPages = Math.ceil(result.length / limit);
      let currentPage;
      if (id) {
        currentPage = Math.ceil(id / limit)>totalPages ? totalPages:Math.ceil(id / limit);
      } else {
        currentPage = page;
      }
      const nextPage =
        parseInt(currentPage, 10) + 1 <= totalPages
          ? parseInt(currentPage, 10) + 1
          : 0;
      const previousPage =
        parseInt(currentPage, 10) - 1 < 1 ? 0 : parseInt(currentPage, 10) - 1;
      const results = result.slice(limit * (page - 1), limit * page);

      return res.render('pages/courseTemplate.ejs', {
        results,
        totalPages,
        currentPage,
        nextPage,
        previousPage,
        page,
        limit,
      });
    });
  } catch (error) {
    return res.status(500).send({ Message: error });
  }
};

//function for insert course
const insertCourse = async (req, res) => {
  try {

     // history.back() for last page










    console.log('here');
    const { name, duration, fees } = req.body;
    console.log('here2');
    let temp = req;
    console.log(temp.query);

    if (name && duration && fees) {
      con.query(
        `INSERT INTO course (course_name,course_duration,course_fees) VALUES ('${name}','${duration}',${fees});`,
        async function (err, result) {
          if (err) {
            return res.status(400).render('pages/errorTemplate.ejs', { err });
          }
          // console.log(result.insertId);
          temp.query['id'] = result.insertId;
          console.log(temp.query);
          return await getTableData(req, res);
        }
      );
    }
  } catch (error) {
    return res.status(500).send({ Error: 'Error from insertCourse!' });
  }
};

//function for get edit page or render page
const getPageWithCourseId = async (req, res) => {
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
};

//function for edit course by index
const editCourseByCourseId = async (req, res) => {
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

      return await getTableData(req, res);
    }
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

//function for render Add course page
const getAddCoursePage = async (req, res) => {
  try {
    return res.status(200).render('pages/createTemplate.ejs');
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

//function for delete course by index
const deleteCourseByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    con.query(
      `DELETE FROM course WHERE course.course_id = ${parseInt(courseId)};`,
      function (err, result) {
        if (err) {
          return res.status(400).render('pages/errorTemplate.ejs', { err });
        }
      }
    );
    return res.status(200).send({
      Message: `Delete column with courseId :- ${courseId} Successfully!`,
    });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};
//export function
export default {
  insertCourse,
  getTableData,
  editCourseByCourseId,
  deleteCourseByCourseId,
  getPageWithCourseId,
  getAddCoursePage,
};
