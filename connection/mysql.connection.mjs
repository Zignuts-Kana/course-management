import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
  host : process.env.MYSQLHOST || '15.206.7.200',
  port: process.env.MYSQLPORT || 3310,
  database: process.env.MYSQLDATABASE || 'kanabhaiv',
  user: process.env.MYSQLUSER || 'kanabhaiv' ,
  password: process.env.MYSQLPASSWORD || 'dR4cNK1jfANPB6Ds17mY',
});

const connect = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to MySQl!');
  });
}

export { connect ,con};
