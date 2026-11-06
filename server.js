/* ==================================================
   IMPORT MODULES
================================================== */
// Import Express
const express = require("express");
const session = require("express-session");

/* ==================================================
   CREATE EXPRESS APPLICATION
================================================== */
const app = express();


/* ==================================================
   MIDDLEWARE
================================================== */
// Used to read form data
app.use(express.urlencoded({ extended: true }));

// Makes files inside public available
app.use(express.static("public"));


/* ==================================================
   SESSION CONFIGURATION
================================================== */
app.use(session({
    secret: "vonnietreatssecret",
    resave: false,
    saveUninitialized: false
}));

/* ==================================================
   TEMPORARY USER STORAGE
================================================== */
// Simple storage array
let users = [];

/* ==================================================
   REGISTER ROUTE
   Accepts username, email, and password.
================================================== */
app.post("/register", function(req, res) {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    users.push({
        username,
        email,
        password
    });

    res.send(`
<!DOCTYPE html>
<html>

<head>

    <title>Vonnie Treats</title>

    <link rel="stylesheet" href="/styles.css">

</head>

<body>

<!-- Dark Mode -->

    <button id="theme_toggler" class="theme-btn">
        Dark or Light Mode
    </button>

<main class="home-wrapper">

<section class="home-card calling-card">

    <h2>You Have Successfully Registered! 🎉</h2>

    <p>
        Your Vonnie Treats account is now ready.
    </p>

    <a href="/login.html" class="account-btn">
        Go To Login
    </a>

</section>

</main>

<footer class="site-footer">
        © 2026 Vonnie Treats
    </footer>

    <script src="/theme.js"></script>
    <script src="/menu.js"></script>

</body>

</html>
`);
});

/* ==================================================
   LOGIN ROUTE
   Checks username and password.
================================================== */
app.post("/login", function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(user =>
        user.username === username &&
        user.password === password
    );

    if(foundUser) {

        req.session.username = username;

        res.send(`
<!DOCTYPE html>
<html>

<head>

    <title>Vonnie Treats</title>

    <link rel="stylesheet" href="/styles.css">

</head>

<body>

<!-- Dark Mode -->

    <button id="theme_toggler" class="theme-btn">
        Dark or Light Mode
    </button>
    
<main class="home-wrapper">

<section class="home-card calling-card">

    <h2>You Have Successfully Logged In! 🎉</h2>

    <p>
        Welcome back ${username}
    </p>

    <a href="/profile" class="account-btn">
        View Profile
    </a>

</section>

</main>

<footer class="site-footer">
        © 2026 Vonnie Treats
    </footer>

    <script src="/theme.js"></script>
    <script src="/menu.js"></script>
</body>

</html>
        `);

    } else {

        res.send(`
<!DOCTYPE html>
<html>

<head>

    <title>Login Error</title>

    <link rel="stylesheet" href="/styles.css">

</head>

<body>

<main class="home-wrapper">

<section class="home-card calling-card">

    <h2>Login credentials were incorrect</h2>

    <a href="/login.html" class="account-btn">
        Try Again
    </a>

</section>

</main>

<footer class="site-footer">
        © 2026 Vonnie Treats
    </footer>

    <script src="/theme.js"></script>
    <script src="/menu.js"></script>

</body>

</html>
        `);

    }

});

/* ==================================================
   PROFILE ROUTE
================================================== */

app.get("/profile", function(req, res) {

    console.log("NEW PROFILE ROUTE LOADED");

    if(req.session.username) {

        res.send(`

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>Vonnie Treats Profile</title>

    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Quicksand:wght@400;600&family=Nunito:wght@300;400;600&display=swap"
          rel="stylesheet">

    <link rel="stylesheet" href="/styles.css">

</head>

<body>

<!-- Dark Mode -->

    <button id="theme_toggler" class="theme-btn">
        Dark or Light Mode
    </button>

    <!-- Logo -->

    <div class="logo">

        <img src="/images/vonniewebsitepicture.png"
             alt="Vonnie Treats Logo"
             class="logo-img">

        <h1>Vonnie Treats</h1>

    </div>

    <!-- Account Buttons -->

    <div class="account-links">

        <a href="/logout" class="account-btn">
            Logout
        </a>

    </div>

    <header class="site-header"></header>

    <!-- Main Profile Content -->

    <main class="home-wrapper">

        <section class="home-card calling-card">

            <h2>
                Welcome Back, ${req.session.username}!
            </h2>

            <p>
                You are currently logged in to your
                Vonnie Treats account.
            </p>

            <h3>Customer Center</h3>

            <p>
                Use the links below to access everything
                in your bakery account.
            </p>

            <nav class="profile-nav">

                <a href="/customerdashboard.html">
                    <img src="/images/cheesecake.png"
                         class="menu-icon"
                         alt="Dashboard Icon">
                    Customer Dashboard
                </a>

                <a href="/index.html">
                    <img src="/images/brownie.png"
                         class="menu-icon"
                         alt="Home Icon">
                    Home Page
                </a>

                <a href="/menu.html">
                    <img src="/images/bundt cake.png"
                         class="menu-icon"
                         alt="Menu Icon">
                    Browse Our Menu
                </a>

                <a href="/orderform.html">
                    <img src="/images/cinnamon roll.png"
                         class="menu-icon"
                         alt="Order Form Icon">
                    Order Form
                </a>

                <a href="/contact.html">
                    <img src="/images/donut.png"
                         class="menu-icon"
                         alt="Contact Icon">
                    Contact Us
                </a>

                <a href="/about.html">
                    <img src="/images/cupcake.png"
                         class="menu-icon"
                         alt="About Icon">
                    About Vonnie Treats
                </a>

            </nav>

        </section>

    </main>

    <footer class="site-footer">
        © 2026 Vonnie Treats
    </footer>

    <script src="/theme.js"></script>
    <script src="/menu.js"></script>

</body>

</html>

        `);

    } else {

        res.send(`
        <!DOCTYPE html>
        <html>

        <head>
            <title>Login Required</title>
            <link rel="stylesheet" href="/styles.css">
        </head>

        <body>


            <main class="home-wrapper">

            <section class="home-card calling-card">

                <h2>Login Required</h2>

                <p>
                    You must be logged in to view this page.
                </p>

                <a href="/login.html" class="account-btn">
                    Login Here
                </a>

            </section>

            </main>
<footer class="site-footer">
© 2026 Vonnie Treats
</footer>

<script src="/theme.js"></script>
<script src="/menu.js"></script>

        </body>

        </html>
        `);

    }

});

/* ==================================================
   LOGOUT ROUTE
   Destroys session
================================================== */

app.get("/logout", function(req, res) {

    req.session.destroy(function() {

        res.send(`
<!DOCTYPE html>
<html>

<head>

    <title>Logged Out</title>

    <link rel="stylesheet" href="/styles.css">

</head>

<body>

<!-- Dark Mode -->

    <button id="theme_toggler" class="theme-btn">
        Dark or Light Mode
    </button>

<main class="home-wrapper">

<section class="home-card calling-card">

    <h2>You Have Been Logged Out 👋</h2>

    <p>
        Thank you for visiting Vonnie Treats.
    </p>

    <a href="/login.html" class="account-btn">
        Login Again
    </a>

</section>

</main>
<footer class="site-footer">
        © 2026 Vonnie Treats
    </footer>

    <script src="/theme.js"></script>
    <script src="/menu.js"></script>

</body>

</html>
`);

    });

});

/* ==================================================
   START SERVER
================================================== */

app.listen(3000, function() {

    console.log("Server running on http://localhost:3000");

});