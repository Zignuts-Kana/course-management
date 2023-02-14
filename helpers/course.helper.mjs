import { con } from "../connection/mysql.connection.mjs";
import { Course } from "../models/course.model.mjs";

const findAllCourseHelper = async () => {
  try {
    return await con
      .sync()
      .then(async () => {
        const response = await Course.findAll();
        return response;
      })
      .catch((error) => {
        console.error("Unable to find table data : ", error);
      });
  } catch (error) {
    console.error("Error in courseHelper -> findAllCourseHelper : ", error);
    return error;
  }
};

const insertCourseHelper = async ({
  course_name,
  course_fees,
  course_duration,
}) => {
  try {
    return await con
      .sync()
      .then(async () => {
        const response = await Course.create({
          course_name,
          course_fees,
          course_duration,
        });
        return response;
      })
      .catch((error) => {
        console.error("Unable to insert course in table : ", error);
      });
  } catch (error) {
    console.error("Error in courseHelper -> insertCourseHelper : ", error);
    return error;
  }
};

const findOneCourseHelper = async ({ where }) => {
  try {
    return await con
      .sync()
      .then(async () => {
        const response = await Course.findOne({ where: where });
        return response;
      })
      .catch((error) => {
        console.error("Unable to find row in table : ", error);
      });
  } catch (error) {
    console.error("Error in courseHelper -> findOneCourseHelper : ", error);
    return error;
  }
};

const deleteCourseHelper = async ({ where }) => {
  try {
    return await con
      .sync()
      .then(async () => {
        const response = await Course.destroy({ where: where });
        return response;
      })
      .catch((error) => {
        console.error("Unable to delete row in table : ", error);
      });
  } catch (error) {
    console.error("Error in courseHelper -> deleteCourseHelper : ", error);
    return error;
  }
};

const updateCourseHelper = async ({
  course_name,
  course_fees,
  course_duration,
  where,
}) => {
  try {
    
    return await con
      .sync()
      .then(async () => {
        const response = await Course.update(
          { course_name, course_fees, course_duration },
          { where: where }
        );
        return response;
      })
      .catch((error) => {
        console.error("Unable to update row in table : ", error);
      });
  } catch (error) {
    console.error("Error in courseHelper -> updateCourseHelper : ", error);
    return error;
  }
};

export {
  findAllCourseHelper,
  findOneCourseHelper,
  insertCourseHelper,
  deleteCourseHelper,
  updateCourseHelper,
};
