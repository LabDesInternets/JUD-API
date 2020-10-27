/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Clients", {
      id_client: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      id_gender: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      birth_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING(15)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(150)
      },
      delivery_address: {
        allowNull: true,
        type: Sequelize.STRING(45)
      },
      zipcode_delivery: {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING(40)
      },
      billing_address: {
        allowNull: true,
        type: Sequelize.STRING(45)
      },
      zipcode_billing: {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      id_subscription: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      id_role: {
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
    return queryInterface.dropTable("Clients");
  }
};
