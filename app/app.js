// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));


//PUG TEMPLATING ENGINE
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    res.render("index");
});

// Route for about page 
app.get('/about', (req, res) => {
    res.render('about');
});

// Route for contact page 
app.get('/contact', (req, res) => {
    res.render('contact');
});


// Route for categories page 
app.get('/categories', (req, res) => {
    res.render('categories');
});


// Route for destinations page 
app.get('/destinations', (req, res) => {
    res.render('destinations');
});


// Route for single-post page 
app.get('/single-post', (req, res) => {
    res.render('single-post');
});


// Route for All Students
app.get("/all-students", function(req, res){
    sql = 'select * from students';
db.query(sql).then(results => {
    console.log(results);
    res.json(results)
});
})

// Task 2, display a formatted list
app.get("/all-students-formatted", function(req, res){
    sql = 'select * from students';
    var output = "<table border='1px'>";
db.query(sql).then(results => {
    for( var row of results ){
        output += "<tr>";
        output += "<td>"+row.id+"</td>";
        output += "<td><a href='./single-student/"+row.id+"'>"+row.name+"</a>"+"</td>";
        output += "</tr>";
    }
    output += "</table>";
    res.send(output)
});
})


// Create a route for testing the db
app.get("/single-student/:id", function(req, res) {
    var stId = req.params.id;
    var stSql = "Select s.name as student, ps.name as programme, ps.id as pcode from Students s JOIN Student_Programme sp on sp.id = s.id JOIN Programmes ps on ps.id = sp.programme WHERE s.id = ?"
    var output ="";
    db.query(stSql, [stId]).then(results => {
        console.log(results);
        res.send(stId);
        
        var pCode = results[0].pcode;
        output += 'Student: ' + results[0].student;
        output += 'Programme: ' + results[0].programme;
        res.send(output);
    })
});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// // MY FUNCTION Create a route for testing the db
// app.get("/db_test", function(req, res) {
//     // Assumes a table called test_table exists in your database
//     sql = 'select * from test_table';
//     db.query(sql).then(results => {

//         results.forEach((row) => {
//             res.write("Person with id "+row.id+" is "+row.name+"\n");
//          })
//          res.send();
//     });
// });




// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});