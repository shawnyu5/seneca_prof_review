let mongoose = require("mongoose")
let express = require("express")
let handleBars = require("express-handlebars")

let app = express();
const HTTP_PORT = process.env.port || 8080;

let dataService = require("./data-service")

app.use(express.urlencoded({ extended: true }));

app.engine(
    ".hbs",
    handleBars.engine({
        extname: ".hbs",
        defaultLayout: "main",
        helpers: {}
    })
);

app.set("view engine", ".hbs");
app.use(express.static("public"));

function onStart() {
    dataService.initialize()
        .then(() => {
            console.log("express listening on", HTTP_PORT);
        })
}

app.get("/", function(request, response) {
    response.redirect("/profs");
});

// display all profs
app.get("/profs", function(request, response) {
    dataService.getAllProfs()
        .then((data) => {
            data = [
                {
                    profName: "John",
                    rating: 12
                },
                {
                    profName: "shawn",
                    rating: 13
                }
            ]
            response.render("profs", {
                profs: data
            });
        })
        .catch((error) => {
            console.log("catch");
            response.send(error)
        });
});

// display all courses
app.get("/courses", function(request, response) {
    response.render("courses");
});

// return the reviews for a spesfic course
app.get("/course/:courseName", function(request, response) {
    response.render("single_course");
});

// return reviews for a spesfic prof
app.get("/prof/:name", function(request, response) {
    response.render("single_prof");
});

// return all reviews
app.get("/reviews", function(request, response) {
    response.render("reviews");
});

app.listen(HTTP_PORT, onStart);
