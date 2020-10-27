/* eslint-disable no-param-reassign */
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        field: "id_client",
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4,
          notNull: true
        }
      },
      id_gender: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      lastName: {
        field: "last_name",
        type: DataTypes.STRING(45),
        allowNull: false
      },
      firstName: {
        field: "first_name",
        type: DataTypes.STRING(45),
        allowNull: false
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      delivery_address: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      zipcode_delivery: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      country: {
        type: DataTypes.STRING(40),
        allowNull: true
      },
      billing_address: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      zipcode_billing: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      id_subscription: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      id_role: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
          notNull: true
        }
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
          notNull: true
        }
      }
    },
    {
      tableName: "Clients"
    }
  );
  User.associate = models => {
    User.hasMany(models.Order);
  };

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  return User;
};
