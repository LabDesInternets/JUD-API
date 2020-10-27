const uuid = require("uuid/v4");
const { Order, Wine } = require("../models");
// const { NotFoundError } = require("../helpers/errors");

const ordersController = {
  getAllOrders: async () => {

    const orders = await Order.findOne({
      where: { id: "18d2b162-c10c-4ff6-8091-e32787096838" },
      include: Wine
    });

    // const orders = await Order.findAll({
    //   // order: [["last_name"]],
    //   attributes: [
    //     "id_order",
    //     "id_client",
    //     "order_quantity",
    //     "order_total_cost"
    //   ],
    //   raw: true
    // });

    return orders;
  },

  addNewOrder: async data => {
    const { idClient, quantity, totalCost, idWine } = data;
    const newOrder = await Order.create(
      {
        id: uuid(),
        idClient,
        quantity,
        totalCost,
        wines: [
          {
            idWine
          }
        ]
      },
      {
        include: Wine
      }
    );
    return newOrder;
  }
};

module.exports = ordersController;
