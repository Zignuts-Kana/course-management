const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'course_management',
  user: 'root',
  password: 'Root@123',
});

function connect() {
  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to MySQl!');
  });
}

module.exports = { connect ,con};
