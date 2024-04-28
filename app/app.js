// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));
const bodyParser = require('body-parser');


//PUG TEMPLATING ENGINE
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Models- user
const { User } = require("./models/user");

// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Create a route for root - /
app.get("/", function(req, res) {    sql = 'select post_id, title, LEFT(content, 60) AS content from blog_posts ORDER BY post_id DESC LIMIT 3';
db.query(sql).then(results => {
    res.render("index", {results:results})
})
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
app.get('/categories/:id', (req, res) => {
    var categoryId = req.params.id;
    var sql = 'select post_id, title, LEFT(content, 60) AS content from blog_posts where post_id = ?';
    db.query(sql, [categoryId]).then(results => {
        res.render("categories", { results: results });
    });
});

// Route for categories - DB
app.get("/categories-db/:id", function(req, res){
    var categoryId = req.params.id;
    var sql = 'SELECT bp.post_id, bp.title, LEFT(bp.content, 60) AS content FROM blog_posts bp INNER JOIN posts_categories pc ON bp.post_id = pc.post_id WHERE pc.category_id = ?';
    var output = "<div>";

    db.query(sql, [categoryId]).then(results => {
        for(var post of results) {
            output += "<div class='post'>";
            output += "<h2>" + post.title + "</h2>";
            output += "</div>";
        }
        output += "</div>";
        res.send(output);
    });
});



// Route for destinations page 
app.get('/destinations/:id', (req, res) => {
    var destinationId = req.params.id;
    var sql = 'select post_id, title, LEFT(content, 60) AS content from blog_posts where post_id = ?';
    db.query(sql, [destinationId]).then(results => {
        res.render("destinations", { results: results });
    });
});


// Route for destinations - DB
app.get("/destinations-db", function(req, res){
    var sql = 'SELECT * FROM destinations';
    var output = "<div>";

    db.query(sql).then(results => {
        for(var destination of results) {
            output += "<div class='destination'>";
            output += "<h2>" + destination.name + "</h2>";
            output += "</div>";
        }
        output += "</div>";
        res.send(output);
    });
});



// Route for all posts page 
app.get('/all-posts', (req, res) => {
    sql = 'select post_id, title, LEFT(content, 60) AS content from blog_posts';
db.query(sql).then(results => {
    res.render("all-posts", {results:results})
})
});


// Route for All Posts - DB
app.get("/all-posts-db", function(req, res){
    sql = 'select * from blog_posts';
    var output = "<div>";
db.query(sql).then(results => {
 
    for( var row of results ){
        output += "<div class='home-blog-post'>";
        output += "<a href='single-post/"+row.post_id+"'>"+row.title+"</a>";
        output += "<p>"+row.content+"</p>";
        output += "</div>";
    }
    output += "</div>";
    res.send(output)

});
})


// Route for single-post page 
app.get('/single-post/:id', (req, res) => {
    var postId = req.params.id;
    var postSql = "select * from blog_posts where post_id = ?"

     db.query(postSql, [postId]).then(results => {
     //res.send(results)
        res.render("single-post", {title: results[0].title, content:results[0].content})
     })

});


// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from blog_posts';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

/* Pages that will be shown after authentication */

// Route for dashboard page 
app.get('/dashboard', (req, res) => {
    sql = 'SELECT c.name AS category_name, d.name AS destination_name FROM categories c INNER JOIN destinations d ON c.category_id = d.destination_id;';
db.query(sql).then(results => {
    sql2 = 'SELECT * from blog_posts;';
    db.query(sql2).then(postsData => {
        
        res.render("dashboard", {results:results, postsData: postsData});
    })
});
});

// Login
app.get('/login', function (req, res) {
    res.render('login');
});

// Route for add new post page 
app.get('/add-new-post', (req, res) => {
    res.render('add-new-post');
});

// Route for update post page 
app.get('/update-post/:id', (req, res) => {
    var postId = req.params.id;
    var postSql = "select * from blog_posts where post_id = ?"

     db.query(postSql, [postId]).then(results => {
     //res.send(results)
        res.render("update-post", {post_id:results[0].post_id, title: results[0].title, content:results[0].content})
     })
});
//Route to handle updation of post
app.post('/update-post-form', (req, res) => {
  const { title, content, post_id } = req.body;

  // Prepare the SQL UPDATE query
  const query = 'UPDATE blog_posts SET title = ?, content = ? WHERE post_id = ?';
  const values = [title, content, post_id];

  // Execute the SQL query
  db.query(query, values, (err, result) => {
    if (err) throw err;

    console.log(`Updated ${result.affectedRows} row(s)`);
    res.redirect('/dashboard'); // Redirect to the admin page or any other desired route
  });
});



app.get('/delete-post/:postId', (req, res) => {
    var postId = req.params.postId;
  
    // Delete the post from the database
    var query = 'DELETE FROM blog_posts WHERE post_id = ?';
    db.query(query, [postId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating blog post');
      } else{
        console.log(`Updated ${result.affectedRows} row(s)`);
        res.redirect('/dashboard'); // Redirect to the admin page or any other desired route
      }
  });
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});

/* Test */