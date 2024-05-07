// Import required modules
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./services/db');
const { Admin } = require("./models/admin");

// Create express app
const app = express();

// Add static files location
app.use(express.static("static"));

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set the sessions
app.use(session({
  secret: 'secretkeytravelblog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// PUG TEMPLATING ENGINE
app.set('view engine', 'pug');
app.set('views', './app/views');

// Define routes and their corresponding functionality
app.get("/", function(req, res) {
    // Get latest blog posts
    const sql = 'SELECT post_id, title, LEFT(content, 60) AS content FROM blog_posts ORDER BY post_id DESC LIMIT 3';
    db.query(sql).then(results => {
        res.render("index", { results: results });
    });
});

// Route for about page 
app.get('/about', (req, res) => {
    res.render('about');
});

// Route for contact page 
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route for displaying all categories
app.get('/destinations', (req, res) => {
    var sql = 'SELECT destination_id, name FROM destinations';
    db.query(sql)
        .then(destinations => {
            res.render("destinations", { destinations: destinations });
        });
});

// Route for handling requests to /destinations/:post_id
app.get('/destination-posts/:id', (req, res) => {
    const destination_id = req.params.id;
    // Query the database to fetch posts associated with the selected destination
    const sql = "SELECT bp.post_id, bp.title, LEFT(bp.content, 60) AS content, bp.destination_id FROM blog_posts bp WHERE destination_id = ?";
    db.query(sql, [destination_id]).then(results => {
        res.render("destination-posts", { results: results });
    });
});

// Route for displaying all categories
app.get('/categories', (req, res) => {
    var sql = 'SELECT category_id, name FROM categories';
    db.query(sql)
        .then(categories => {
            res.render("categories", { categories: categories });
        });
});

// Route for handling requests to //:post_id
app.get('/category-posts/:id', (req, res) => {
    const category_id = req.params.id;
    // Query the database to fetch posts associated with the selected destination
    const sql = "SELECT bp.post_id, bp.title, LEFT(bp.content, 60) as content FROM blog_posts bp JOIN posts_categories pc ON bp.post_id = pc.post_id JOIN categories c ON pc.category_id = c.category_id WHERE c.category_id = ?";
        // Render the page with the posts data
        db.query(sql, [category_id])
        .then(results => {
            console.log(results);
            res.render("category-posts", {results:results})
     })
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
    var postSql = "SELECT * FROM blog_posts WHERE post_id = ?"

     db.query(postSql, [postId])
        .then(results => {
     //res.send(results)
            res.render("single-post", {title: results[0].title, content: results[0].content})
     })

});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    const sql = 'SELECT * FROM blog_posts';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results);
    });
});

/* Pages that will be shown after authentication */

// Route for dashboard page 
app.get('/dashboard/:username/:admin_id', (req, res) => {
    var admin_id = req.params.admin_id;
    var username = req.params.username;
    let userDetails = [admin_id, username];

    console.log(userDetails);
    sql = 'SELECT * FROM categories;';
db.query(sql).then(results => {

  sql2 = 'SELECT * FROM destinations;';
  db.query(sql2).then(results2 => {
    sql3 = 'SELECT * from blog_posts;';
    db.query(sql3).then(postsData => {
        
        res.render("dashboard", {results:results, results2: results2, postsData: postsData, userDetails:userDetails});
    })
  })
});
});

// Login
app.get('/login', function (req, res) {
    res.render('login');
});

// Logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
});

// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
    
    params = req.body;

    var admin = new Admin(params.email);
    try {
        uId = await admin.getIdFromEmail();
        if (uId) {
            match = await admin.authenticate(params.password);
            if (match) {
                //console.log("success")
                
                username = await admin.getUserNameFromEmail();
                
                req.session.username = username;
                req.session.admin_id = uId;
                req.session.loggedIn = true;
                console.log(req.session.id);

              //  res.redirect('/dashboard/'+req.session.username+'/'+req.session.admin_id);
                res.redirect('/dashboard/'+username+'/'+uId);
            }
            else {
                // TODO improve the user journey here
                res.send('invalid password');
            }
        }
        else {
            res.send('invalid email');
        }

    } catch (err) {
        console.error(`Error while comparing `, err.message);
    }

});

// Create a route for root - /
app.get("/dashboard", function(req, res) {
    console.log(req.session);
    if (req.session.username) {
        res.redirect('/dashboard/'+username+'/'+uId);
    } else {
        res.redirect('/login');
    }
    res.end();
});

// Create a route for update-post - /
app.get("/update-post", function(req, res) {
    console.log(req.session);
    if (req.session.username) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
    res.end();
});

// Route for add new post page
app.get('/add-new-post', (req, res) => {
    res.render('/add-new-post');
});

// Route for update post page    
app.get('/update-post/:username/:admin_id/:id', (req, res) => {
    var admin_id = req.params.admin_id;
    var username = req.params.username;
    let userDetails = [admin_id, username];

    var postId = req.params.id;
    var postSql = "select * from blog_posts where post_id = ?"

     db.query(postSql, [postId]).then(results => {
     //res.send(results)
        res.render("update-post", {post_id:results[0].post_id, title: results[0].title, content:results[0].content, userDetails:userDetails})
     })
});

//Route for adding a new post
app.post('/add-post-form', async (req, res) => {
  const { title, content, destination, categories } = req.body;
  
  const insertPostQuery = 'INSERT INTO blog_posts (title, content, destination_id) VALUES (?, ?, ?)';
  const postValues = [title, content, destination];
  const postResult = await db.query(insertPostQuery, postValues);

  const postId = postResult.insertId;

  // Insert categories into the posts_categories table
  if (Array.isArray(categories) && categories.length > 0) {
    const insertCategoriesPromises = categories.map(category => {
      const insertCategoryQuery = 'INSERT INTO posts_categories (post_id, category_id) VALUES (?, ?)';
      const categoryValues = [postId, category];
      return db.query(insertCategoryQuery, categoryValues);
    });
  
    await Promise.all(insertCategoriesPromises);
  }
  console.log("post added successfully");
  res.redirect("dashboard");
    });
  
//Route for updating posts
app.post('/update-post-form', async (req, res) => {
  //  var postId = req.params.postId;
  const { title, content, post_id } = req.body;
    const query = 'UPDATE blog_posts SET title = ?, content = ? WHERE post_id = ?';
    const values = [title, content, post_id];
    
    // Delete the post from the database
    var result = await db.query(query, values);
    console.log(result);
    res.redirect("dashboard");
    });
  
    
//Route for deleting posts
app.post('/delete-post', async (req, res) => {
  //  var postId = req.params.postId;
  const post_id = req.body.post_id;
  console.log(post_id);
    
    // Delete the post from the database
    var query = 'DELETE FROM blog_posts WHERE post_id = ?';
    var result = await db.query(query, [post_id]);
    console.log(result);
    res.redirect("dashboard");
    });
  
  
  // Start server on port 3000
  app.listen(3000,function(){
      console.log(`Server running at http://127.0.0.1:3000/`);
  });
  
  /* Test */
