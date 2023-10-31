// Include the express module
const express = require("express");

// App
const app = express();

// Router
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.send("This is the home page");
});


// About page route
router.get('/about/', (req, res) => {
    res.send("This is the about page");
});

/*
// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, {"Content-Type": "text/plain"});

    // Send the response body "Hello World"
    res.end("Hello World!");
});
*/

// Serving static files
app.use('/', express.static('src'));

// Mount the router at the middleware handling path (in this case the home page)
app.use('/', router);

// Handling errors (must be called after all other app.use() and routes calls)
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Somthing broke...");
});

/* Note that HTTP404 and other "error" status codes are not treated as errors.
So we use the following: */
app.use((req, res, next) => {
    res.status(404).send("This page doesn't exist...");
});

// Export modules
module.exports = router;

// Prints a log once the server starts listening
const listener = app.listen(process.env.PORT || 8000, () => {
    console.log('Server running at ' + listener.address().port);
});