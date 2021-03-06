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
  profName: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});

let Reviews = sequelize.define("Reviews", {
  rating: Sequelize.STRING,
  review: Sequelize.STRING,
});

// syncs database
module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    sequelize.sync().then(function () {
      resolve();
    });
  });
};

module.exports.getAllProfs = function () {
  return new Promise(function (resolve, reject) {
    Profs.findAll()
      .then(function (data) {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject("Unable to retrieve all profs");
      });
  });
};
