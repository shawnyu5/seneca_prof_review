let mongoose = require("mongoose")
let express = require("express")

let app = express();
let HTTP_PORT = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));

function onStart() {
    console.log("express listening on", HTTP_PORT);
}

app.listen(HTTP_PORT, onStart);
