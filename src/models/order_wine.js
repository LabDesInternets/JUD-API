module.exports = (sequelize, DataTypes) => {
  const OrderWine = sequelize.define(
    "OrderWine",
    {
      bottleQuantity: {
        field: "bottle_quantity",
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          notNull: false,
          min: 1,
          max: 6
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
      tableName: "Orders_Wines"
    }
  );

  return OrderWine;
};
