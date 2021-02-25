
const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('student_data.sqlite3', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


let sql = "insert into student(name, class, class_time) values ($name, $class, $class_time)";
var params = {
    $name:'Christa',
    $class:'CWB119',
    $class_time:'11:30'
}

db.run(sql, params, (err) => {
    if (err) {
	throw err;
    }
    console.log("insert successful");
});


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
