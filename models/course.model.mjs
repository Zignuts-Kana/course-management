import { DataTypes } from "sequelize";
import { con } from "../connection/mysql.connection.mjs";

const Course = con.define(
  "course",
  {
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_fees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

con
  .sync({ alert: true })
  .then(() => {
    console.log("Course table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export { Course };
