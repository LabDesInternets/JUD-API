const { Wine } = require("../models");
const { NotFoundError } = require("../helpers/errors");

const winesController = {
  getAllWines: async () => {
    const wines = await Wine.findAll({
      order: [["cuvee", "ASC"]],
      attributes: ["id", "cuvee", "domaine", "winePic", "publicPrice"],
      raw: true
    });
    if (!wines)
      throw new NotFoundError(
        "Ressource introuvable.",
        "Désolé, nous n'avons pas trouvé la ressource demandée. Vérifiez l'URI et réessayez."
      );
    return wines;
  },

  getOneWine: async id => {
    const wine = await Wine.findByPk(id, {
      attributes: [
        "id",
        "cuvee",
        "domaine",
        "winePic",
        "publicPrice",
        "description"
      ],
      raw: true
    });
    if (!wine)
      throw new NotFoundError(
        "Ressource introuvable.",
        "Désolé, nous n'avons pas trouvé la ressource demandée. Vérifiez l'URI et réessayez."
      );
    return wine;
  }
};

module.exports = winesController;
