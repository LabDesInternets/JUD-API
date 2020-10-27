const winesCatalog = require("../seeds/202002241600-wines-catalog");

/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("wines", winesCatalog);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("wines", null, {});
  }
};
