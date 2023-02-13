import { query } from 'express';
import { con } from '../connection/mysql.connection.mjs';

//get form data
const getTableData = async (req, res) => {
  try {
    let limit = req.query.limit || 7;
    let page = req.query.page || 1;
    let redirectPage;
    
    if (page.includes('redirect')) {
      page = page.replace('redirect/','');
      redirectPage = page.replace('redirect/','');
      console.log("redirectPage:- ",redirectPage);
    }

    con.query(`SELECT * FROM course;`, function (err, result, fields) {
      if (err) {
        return res.status(400).render('pages/errorTemplate.ejs', { err });
      }
      const totalPages = Math.ceil(result.length / parseInt(limit,10));
      const currentPage = parseInt(redirectPage,10)<parseInt(totalPages,10) ? totalPages : parseInt(page,10);
      const nextPage =
        (parseInt(currentPage, 10) + 1) <= totalPages
          ? (parseInt(currentPage, 10) + 1)
          : 0;
      const previousPage =
        (parseInt(currentPage, 10) - 1) < 1 ? 0 : (parseInt(currentPage, 10) - 1);
      const results = result.slice(limit * (currentPage - 1), limit * currentPage);

      return res.render('pages/courseTemplate.ejs', {
        results,
        totalPages,
        currentPage,
        nextPage,
        previousPage,
        page:parseInt(page,10) !== currentPage ? currentPage : parseInt(page,10),
        limit:parseInt(limit,10),
      });
    });
  } catch (error) {
    return res.status(500).send({ Message: error });
  }
};

//function for insert course
const insertCourse = async (req, res) => {
  try {
    let { name, duration, fees } = req.body;

    if (name && duration && fees) {
      con.query(
        `INSERT INTO course (course_name,course_duration,course_fees) VALUES ('${name.replaceAll(" ", "-")}','${duration}',${Math.abs(fees)});`,
        async function (err, result) {
          if (err) {
            return res.status(400).render('pages/errorTemplate.ejs', { err });
          }
          // return await getTableData(req, res);
        }
      );
    }
    return res.status(200).send({Message:'Insert New Course Successfully!'})
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
        `UPDATE course SET course.course_name = '${name.replaceAll(" ", "-")}',course.course_duration = '${duration}',course.course_fees = ${Math.abs(fees)} WHERE course.course_id = ${courseId};`,
        function (err, result) {
          // console.log(result);
          if (err) {
            return res.status(400).render('pages/errorTemplate.ejs', { err });
          }
        }
      );

      // return await getTableData(req, res);
      return res.status(200).send({Message:"Update Course Successfully!"})
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
