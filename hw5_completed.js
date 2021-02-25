
var http = require('http');
var querystring = require('querystring');

//Exercise 0 - run a GET request and print the status code
var option = {
    hostname : "localhost" ,
    port : 8000 ,
    method : "GET",
    path : "/"
} 

var request = http.request(option , function(resp){
    resp.on("data",function(respData){
	var status_code = resp.statusCode;	
        console.log(status_code);
	console.log(respData.toString());
    }) 
})
request.end();


var form_data = {
    'name':'Joe',
    'city':'Boulder',
    'phone':'303-333-3333'
};

var post_data = querystring.stringify(form_data);

//Exercise 0.1 - run a POST request with the form_data
var option = {
    hostname : "localhost" ,
    port : 8000 ,
    method : "POST",
    path : "/"
}

var request = http.request(option , function(resp){
    resp.on("data",function(respData){
	var status_code = resp.statusCode;	
        console.log(status_code);
	console.log(respData.toString());
    }) 
})
request.write(post_data)
request.end();

// Exercise 1 - run a POST request to path /test1
// that contains the following form fields:
//    - name
//    - phone
//    - email

// ensure you get a status code 200

var option = {
    hostname : "localhost" ,
    port : 8000 ,
    method : "POST",
    path : "/test1",
    data:form_data
}

var form_data = {
    'name':'Joe',
    'address':'123 Pine St',
    'email':'something@gmail.com',
    'phone':'303-333-3333'
}

var post_data = querystring.stringify(form_data);

var request = http.request(option , function(resp){
    resp.on("data",function(respData){
	var status_code = resp.statusCode;	
        console.log(status_code);
	console.log(respData.toString());
    }) 
})
request.write(post_data);
request.end();

// Exercise 2 - run a GET request to path /test2
// and parse the response as JSON into a data array
// get the 'token' field and save it in a variable for Exercise 3

var option = {
    hostname : "localhost" ,
    port : 8000 ,
    method : "GET",
    path : "/test2"
} 

var token = null;
var request = http.request(option , function(resp){
    let data = "";
    resp.on("data",function(chunk){
	data += chunk.toString();
    });
    resp.on('end', () => {
	var json_data = JSON.parse(data);
	token = json_data['token'];
	console.log(token);
    });
})
request.end();


// Exercise 3 - run a POST request to path /test3
// that contains the token you got in Exercise 2
// ensure you get a 200 status code

var option = {
    hostname : "localhost" ,
    port : 8000 ,
    method : "POST",
    path : "/test3"
} 

var form_data = {
    'token':'abc123'
}
var post_data = querystring.stringify(form_data);
var request = http.request(option , function(resp){
    if (resp.statusCode != 200) {
	console.log(resp.statusCode, "bad status code");
    } else {
	console.log("token was okay");
    }
})
request.write(post_data)
request.end();


