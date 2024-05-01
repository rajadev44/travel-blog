// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));
const bodyParser = require('body-parser');

// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretkeytravelblog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


//PUG TEMPLATING ENGINE
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Models- user
const { Admin } = require("./models/admin");

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
    const sql = "SELECT bp.post_id, bp.title, LEFT(bp.content, 60) as content, bp.admin_id FROM blog_posts bp JOIN posts_destinations pd ON bp.post_id = pd.post_id JOIN destinations d ON pd.destination_id = d.destination_id WHERE d.destination_id = ?";
        // Render the page with the posts data
        db.query(sql, [destination_id])
        .then(results => {
            console.log(results);
            res.render("destination-posts", {results:results})
     })
});



// Route for displaying all categories
app.get('/categories', (req, res) => {
    var sql = 'SELECT category_id, name FROM categories';
    db.query(sql)
        .then(categories => {
            res.render("categories", { categories: categories });
        });
});

// Route for handling requests to /destinations/:post_id
app.get('/category-posts/:id', (req, res) => {
    const category_id = req.params.id;
    // Query the database to fetch posts associated with the selected destination
    const sql = "SELECT bp.post_id, bp.title, LEFT(bp.content, 60) as content, bp.admin_id FROM blog_posts bp JOIN posts_categories pc ON bp.post_id = pc.post_id JOIN categories c ON pc.category_id = c.category_id WHERE c.category_id = ?";
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
    // Assumes a table called test_table exists in your database
    sql = 'select * from blog_posts';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

/* Pages that will be shown after authentication */

// Route for dashboard page 
app.get('/dashboard/:username/:admin_id', (req, res) => {
    var admin_id = req.params.admin_id;
    var username = req.params.username;
    let userDetails = [admin_id, username];

    console.log(userDetails);

    sql = 'SELECT c.category_id, c.name AS category_name, d.destination_id, d.name AS destination_name FROM categories c INNER JOIN destinations d ON c.category_id = d.destination_id;';
db.query(sql).then(results => {
    sql2 = 'SELECT * from blog_posts;';
    db.query(sql2).then(postsData => {
        
        res.render("dashboard", {results:results, postsData: postsData, userDetails:userDetails});
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




// Route for add new post page // app.post('add-new-post', (req, res) ->
app.get('/add-new-post', (req, res) => {
    res.render('/add-new-post');
});

app.post('/add-post-form', async (req, res) => {
    const { title, content, destinationsArray, categoriesArray } = req.body;
  
    console.log('req.body:', req.body);
  
    try {
      // Insert the blog post into the blog_posts table
      const insertPostQuery = 'INSERT INTO blog_posts (title, content) VALUES (?, ?)';
      const postValues = [title, content];
      const postResult = await db.query(insertPostQuery, postValues);
      const postId = postResult.insertId;
  
      // Insert destinations into the post_destinations table
      if (Array.isArray(destinationsArray) && destinationsArray.length > 0) {
        const insertDestinationsPromises = destinationsArray.map(destination => {
          const insertDestinationQuery = 'INSERT INTO post_destinations (post_id, destination_id) VALUES (?, ?)';
          const destinationValues = [postId, destination];
          return db.query(insertDestinationQuery, destinationValues);
        });
  
        await Promise.all(insertDestinationsPromises);
      }
  
      // Insert categories into the posts_categories table
      if (Array.isArray(categoriesArray) && categoriesArray.length > 0) {
        const insertCategoriesPromises = categoriesArray.map(category => {
          const insertCategoryQuery = 'INSERT INTO posts_categories (post_id, category_id) VALUES (?, ?)';
          const categoryValues = [postId, category];
          return db.query(insertCategoryQuery, categoryValues);
        });
  
        await Promise.all(insertCategoriesPromises);
      }
  
      console.log('Blog post added successfully');
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Error adding blog post:', err);
      res.status(500).send('Error adding blog post');
    }
  });
  
/*
app.post('/add-post-form', (req, res) => {
    const { title, content } = req.body;
    const destinationsArray = req.body.destinations instanceof Array ? req.body.destinations : [req.body.destinations];
    const categoriesArray = req.body.categories instanceof Array ? req.body.categories : [req.body.categories];
  
    console.log(req.body);

    
    // Insert the blog post into the blog_posts table
    const insertPostQuery = 'INSERT INTO blog_posts (title, content) VALUES (?, ?)';
    const postValues = [title, content];
  
    db.query(insertPostQuery, postValues, (err, postResult) => {
        db.query(insertPostQuery, postValues, (err, postResult) => {
            if (err) {
              console.error('Error inserting blog post:', err);
              res.status(500).send('Error adding blog post');
            } else {
              const postId = postResult.insertId;
              console.log('Blog post inserted with ID:', postId);
        
              // Insert destinations into the post_destinations table
              const insertDestinationsPromises = destinationsArray.map(destination => {
                return new Promise((resolve, reject) => {
                  const insertDestinationQuery = 'INSERT INTO post_destinations (post_id, destination_id) VALUES (?, ?)';
                  const destinationValues = [postId, destination];
        
                  db.query(insertDestinationQuery, destinationValues, (err, destinationResult) => {
                    if (err) {
                      console.error('Error inserting destination:', err);
                      reject(err);
                    } else {
                      console.log('Destination inserted for post ID:', postId);
                      resolve();
                    }
                  });
                });
              });
        
              Promise.all(insertDestinationsPromises)
                .then(() => {
                  // Insert categories into the posts_categories table
                  const insertCategoriesPromises = categoriesArray.map(category => {
                    return new Promise((resolve, reject) => {
                      const insertCategoryQuery = 'INSERT INTO posts_categories (post_id, category_id) VALUES (?, ?)';
                      const categoryValues = [postId, category];
        
                      db.query(insertCategoryQuery, categoryValues, (err, categoryResult) => {
                        if (err) {
                          console.error('Error inserting category:', err);
                          reject(err);
                        } else {
                          console.log('Category inserted for post ID:', postId);
                          resolve();
                        }
                      });
                    });
                  });
        
                  return Promise.all(insertCategoriesPromises);
                })
                .then(() => {
                  console.log('Blog post added successfully');
                  res.redirect('/dashboard');
                })
                .catch(err => {
                  console.error('Error adding blog post:', err);
                  res.status(500).send('Error adding blog post');
                });
            }
          });
        });
    });

    */

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
//Route to handle updation of post
app.post('/update-post-form', (req, res) => {
  const { title, content, post_id } = req.body;

  // Prepare the SQL UPDATE query
  const query = 'UPDATE blog_posts SET title = ?, content = ? WHERE post_id = ?';
  const values = [title, content, post_id];

  // Execute the SQL query
  db.query(query, values, (err, result) => {
    if (err){throw err}
    else{
    res.redirect('/dashboard');
} // Redirect to the admin page or any other desired route
  });
});



app.post('/delete-post', (req, res) => {
  //  var postId = req.params.postId;
  const post_id = req.body.post_id;
console.log(post_id);
    
    // Delete the post from the database
    var query = 'DELETE FROM blog_posts WHERE post_id = ?';
    db.query(query, [post_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating blog post');
      } else{
        console.log('Post deleted');
        res.redirect('/dashboard'); // Redirect to the admin page or any other desired route
      }
  });
  
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});

/* Test */