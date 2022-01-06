require("dotenv").config()
const Sequelize = require('sequelize');

let sequelize = new Sequelize(
    process.env.DB_Database,
    process.env.DB_User,
    process.env.DB_Password,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: process.env.DB_Port,
        dialectOptions: {
            ssl: { rejectUnauthorized: false }
        },
        query: { raw: true },
        logging: false
    });


let Team = sequelize.define("Teams", {
   name: Sequelize.STRING,
});

let Player = sequelize.define("Player", {
   name: Sequelize.STRING,
   number: Sequelize.INTEGER
});

Team.hasMany(Player, {
  foreignKey: 'clubId'
});
Player.belongsTo(Team);

sequelize.sync()
.then(() => {
   console.log("synced")
   Player.create({
      name: "Shawn",
      number: 10,
      clubId: 09
   })
})
