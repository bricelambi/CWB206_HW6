
var sqlite3 = require('sqlite3');
var http = require('http');
var querystring = require('querystring');
var url = require('url');

var sqlite_fname = "student_data.sqlite3"
let db = new sqlite3.Database(sqlite_fname, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


var server = http.createServer ( function(request,response){

    var path = request.url.split('/')[1]
    console.log(path);
    if (path.startsWith("search")) {
	console.log("search path", request.url, request.method);
	handleSearch(request, response);
    } else if (path.startsWith("student")) {
	//STUDENT: Use the function you create below to handle the a POST to /student that will create a new student
    } else {
	response.writeHead(404, {"Content-Type":"text\plain"});
	response.end("Undefined request.");
    }
});


//STUDENT: Create a new handler function here for accepting form data to create a new student in the database
// ensure the proper parameters are provided, name, class, class_time
function handleStudent(request, response) {
    if(request.method == "POST")
    {
        let form_data = "";
        request.on('data', (chunk) => {
            form_data += chunk.toString();
        });
        request.on('end', () => {
	    var data = querystring.parse(form_data);
            console.log(form_data, data);
	    if (!data['class'] || !data['name'] || !data['class_time']) { //change these form fields
                response.writeHead(400);
                response.end('missing required form fields');
            } else {
		
            }
        });
    }

}


function handleSearch(request, response) {
    if (request.method != 'GET') {
	response.writeHead(400, {"Content-Type":"text\plain"});
	response.end("Undefined request.");	
    }
    const url = new URL(request.url, 'http://localhost:8000');
    // Parse the URL query. The leading '?' has to be removed before this.
    const queryObject = querystring.parse(url.search.substr(1));
    
    console.log(queryObject);
    
    if (!queryObject['name']) {
	nameQuery = '';
    } else {
	nameQuery = queryObject['name'];
    }
    
    let sql = "SELECT DISTINCT name FROM student where name like $like_query ORDER BY name";
    //let sql = "SELECT DISTINCT name FROM student where name like '%" + nameQuery + "%' ORDER BY name";
    var params = {
	$like_query:`${nameQuery}%`
    };
    db.all(sql, params, (err, rows) => {
	if (err) {
	    console.log(err);
	    response.writeHead(500, {"Content-Type":"text/plain", "Access-Control-Allow-Origin": "*"});
	    response.end("error executing query");
	}
	var searchResults = [];
	if (rows) {
	    rows.forEach((row) => {
		searchResults.push({
		    'name':row.name
		});
	    });
	}
	var data_str = JSON.stringify(searchResults);
	response.writeHead(200, {"Content-Type":"application/json", "Access-Control-Allow-Origin": "*"});
	response.end(data_str);
    });
}

server.listen(8000);
console.log("Server running on port 8000");
