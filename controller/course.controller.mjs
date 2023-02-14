import { INTEGER } from "sequelize";
import { con } from "../connection/mysql.connection.mjs";
import {
  findAllCourseHelper,
  findOneCourseHelper,
  insertCourseHelper,
  deleteCourseHelper,
  updateCourseHelper,
} from "../helpers/course.helper.mjs";

//get form data
const getTableData = async (req, res) => {
  try {
    let limit = req.query.limit || 7;
    let page = req.query.page || 1;
    let redirectPage;

    if (typeof page !== "number" && page.includes("redirect")) {
      page = page.replace("redirect/", "");
      redirectPage = page.replace("redirect/", "");
    }

    const result = await findAllCourseHelper();
    const totalPages = Math.ceil(result.length / parseInt(limit, 10));
    const currentPage =
      parseInt(redirectPage, 10) < parseInt(totalPages, 10)
        ? totalPages
        : parseInt(page, 10);
    const nextPage =
      parseInt(currentPage, 10) + 1 <= totalPages
        ? parseInt(currentPage, 10) + 1
        : 0;
    const previousPage =
      parseInt(currentPage, 10) - 1 < 1 ? 0 : parseInt(currentPage, 10) - 1;
    const results = result.slice(
      limit * (currentPage - 1),
      limit * currentPage
    );

    return res.render("pages/courseTemplate.ejs", {
      results,
      totalPages,
      currentPage,
      nextPage,
      previousPage,
      page:
        parseInt(page, 10) !== currentPage ? currentPage : parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  } catch (error) {
    return res.status(500).send({ Message: error });
  }
};

//function for insert course
const insertCourse = async (req, res) => {
  try {
    let { name, duration, fees } = req.body;

    await insertCourseHelper({
      course_name: name.replaceAll(" ", "-"),
      course_fees: Math.abs(fees),
      course_duration: duration,
    });
    return res.status(200).send({ Message: "Insert New Course Successfully!" });
  } catch (error) {
    return res.status(500).send({ Error: "Error from insertCourse!" });
  }
};

//function for get edit page or render page
const getPageWithCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    const result = await findOneCourseHelper({
      where: { course_id: courseId },
    });
    return res.render("pages/editTemplate.ejs", { result });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

//function for edit course by index
const editCourseByCourseId = async (req, res) => {
  try {
    const { name, duration, fees } = req.body;
    const { courseId } = req.params;

    await updateCourseHelper({
      course_name: name.replaceAll(" ", "-"),
      course_fees: Math.abs(fees),
      course_duration: duration,
      where: { course_id: parseInt(courseId,10) },
    });

    return res.status(200).send({ Message: "Update Course Successfully!" });
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

//function for render Add course page
const getAddCoursePage = async (req, res) => {
  try {
    return res.status(200).render("pages/createTemplate.ejs");
  } catch (error) {
    return res.status(500).send({ Error: error });
  }
};

//function for delete course by index
const deleteCourseByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    await deleteCourseHelper({ where: { course_id: courseId } });

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
