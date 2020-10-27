module.exports = (sequelize, DataTypes) => {
  const Wine = sequelize.define(
    "Wine",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4,
          notNull: true
        }
      },
      region: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [5, 45]
        }
      },
      appelation: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [2, 45]
        }
      },
      domaine: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [2, 45]
        }
      },
      vigneron: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [2, 45]
        }
      },
      cuvee: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [2, 45]
        }
      },
      millesime: {
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          notNull: false,
          min: 4,
          max: 4
        }
      },
      wineCategory: {
        field: "wine_category",
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [2, 45]
        }
      },
      publicPrice: {
        field: "public_price",
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          min: 2,
          max: 6
        }
      },
      memberPrice: {
        field: "member_price",
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          notNull: false,
          min: 2,
          max: 6
        }
      },
      occasion: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [2, 45]
        }
      },
      label: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [2, 45]
        }
      },
      publicRating: {
        field: "public_rating",
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          notNull: false,
          min: 2,
          max: 4
        }
      },
      publicCritic: {
        field: "public_critic",
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [0, 200]
        }
      },
      winePic: {
        field: "wine_pic",
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [0, 150]
        }
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [0, 300]
        }
      },
      gustatoryCategory: {
        field: "gustatory_category",
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          len: [0, 45]
        }
      },
      starredWine: {
        field: "starred_wine",
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          notNull: false,
          min: 0,
          max: 1
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
      tableName: "wines"
    }
  );
  Wine.associate = models => {
    Wine.belongsToMany(models.Order, { through: "Order_Wine" });
  };
  return Wine;
};
