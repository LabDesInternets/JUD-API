/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("wines", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      region: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      appelation: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      domaine: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      vigneron: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      cuvee: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      millesime: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      wine_category: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      public_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      member_price: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      occasion: {
        allowNull: true,
        type: Sequelize.STRING(45)
      },
      label: {
        allowNull: true,
        type: Sequelize.STRING(45)
      },
      public_rating: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      public_critic: {
        allowNull: true,
        type: Sequelize.STRING(200)
      },
      wine_pic: {
        allowNull: true,
        type: Sequelize.STRING(150)
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(300)
      },
      gustatory_category: {
        allowNull: true,
        type: Sequelize.STRING(45)
      },
      starred_wine: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("wines");
  }
};
