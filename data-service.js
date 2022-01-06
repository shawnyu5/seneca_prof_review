require("dotenv").config();
const Sequelize = require("sequelize");

// var sequelize = new Sequelize('database', 'user', 'password',
let sequelize = new Sequelize(
  process.env.DB_Database,
  process.env.DB_User,
  process.env.DB_Password,
  {
    host: "localhost",
    dialect: "postgres",
    port: process.env.DB_Port,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
    logging: false,
  }
);

let Profs = sequelize.define("Profs", {
    name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    subjects: Sequelize.STRING
});

let Reviews = sequelize.define("Reviews", {
    title: Sequelize.STRING,
    rating: Sequelize.STRING,
    review: Sequelize.STRING
});

Profs.hasMany(Reviews, {
   foreignkey: "profName"
});

Reviews.belongsTo(Profs);

// syncs database
module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
       // sequelize.drop()
        sequelize.sync()
            .then(function() {
                resolve();
            });
    });
}

module.exports.getAllProfs = function() {
    return new Promise(function(resolve, reject) {
        Profs.findAll()
            .then(function(data) {
                resolve(data);
            })
            .catch((error) => {
                console.log(error)
                reject("Unable to retrieve all profs");
            })
    });
  });
};

module.exports.findProf = function(name) {
    return new Promise(function(resolve, reject) {
        Profs.findAll({
            profName: name
        })
          .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject(`No prof with ${name} found`);
            })
    });
}

module.exports.addReview = function(review) {
    return new Promise(function(resolve, reject) {
       console.log("name is " + review.profName)
        Reviews.create({
            title: review.reviewTitle,
            rating: review.reviewRating,
            review: review.reviewText,
            // profName: review.profName
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log(error)
                reject(error);
            });
    });
};

