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
      .catch(() => {
         console.log("connection to data base failed");
      })
}

app.get("/", function(request, response) {
   response.redirect("/profs");
});

// return reviews for a spesfic prof
app.get("/prof/", function(request, response) {
   let prof = request.query.name
   console.log(prof);
   if(!prof) {
      response.redirect("/profs");
      return
   }

   dataService.findProf(prof)
      .then((data) => {
         // NOTE: hard coded data for testing
         data = {
            name: "John",
            rating: 12,
            review: "Great prof!!!"
         };

         response.render("single_prof", {
            prof: data
         })
      })
      .catch(() => {
         response.render("single_prof", {
            error: "No prof found"
         })
      });
});

// adds review to data base
app.post("/reviews/submit", function(request, response) {
   let review = request.body;
   dataService.addReview(review)
      .then(() => {
         response.send(review);
      })
      .catch((error) => {
         response.send(error)
      });
})


// display all profs
app.get("/profs", function(request, response) {
   dataService.getAllProfs()
      .then((data) => {
         // NOTE: hard coded data for testing
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


// return all reviews
app.get("/reviews", function(request, response) {
   response.render("reviews");
});

app.get("/submit", function(request, response) {
   response.render("submit");
});

app.post("/submit", function(request, response) {
   console.log(request.body);
});

app.listen(HTTP_PORT, onStart);
