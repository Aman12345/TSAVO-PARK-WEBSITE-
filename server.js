import e from "express";
const app = e();
const port = 5000;

//set the view engine to ejs
app.set("view engine", "ejs");

//in order to use css we need to create a .use
app.use(e.static("public"));

//use the res.render method in expresss to render the HTML as EJS
//index page
app.get("/", (req, res) => {
    res.render("pages/index");
    console.log("WELCOME TO THE HOME PAGE");
});

//contact page
app.get("/contact", (req, res) => {
    res.render("pages/contact");
    console.log("WELCOME TO THE CONTACT PAGE");
});

//about page
app.get("/about", (req, res) => {
    res.render("pages/about");
    console.log("WELCOME TO THE ABOUT PAGE");
});

//safaris page
app.get("/safaris", (req, res) => {
    res.render("pages/safaris");
    console.log("WELCOME TO THE SAFARI PAGE");
});

//error page
app.get("*", (req, res) => {
    res.render("pages/error");
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log(`error while starting the server on ${port}`);
    } else {
        console.log(`App listening on ${port}`);
    }
});