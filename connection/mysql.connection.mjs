import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: process.env.DATABASE,
  user: process.env.MYSQL || 'root' ,
  password: process.env.PASSWORD,
});

const connect = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to MySQl!');
  });
}

export { connect ,con};
