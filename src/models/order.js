module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        field: "id_order",
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4,
          notNull: true
        }
      },
      idClient: {
        field: "UserId",
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4,
          notNull: true
        }
      },
      quantity: {
        field: "order_quantity",
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: false,
          min: 1,
          max: 6
        }
      },
      totalCost: {
        field: "order_total_cost",
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: false,
          min: 1
        }
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
      tableName: "Orders"
    }
  );
  Order.associate = models => {
    Order.belongsTo(models.User);
    Order.belongsToMany(models.Wine, { through: "Order_Wine" });
  };

  return Order;
};
