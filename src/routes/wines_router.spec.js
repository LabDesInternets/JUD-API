/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-require */
// const chai = require('chai');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const request = require("supertest");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const uuid = require("uuid/v4");

chai.use(chaiHttp);
chai.use(sinonChai);

// const uuid = require("uuid/v4");
const { OK } = require("../helpers/status_code");

const server = require("../server");
// const { Wine } = require("../models");
const winesController = require("../controllers/wines_controller");



describe("Routers :: winesRouter", () => {
  afterEach((done) => {
    sinon.restore()
    done()
  })
  describe("GET /wines", () => {

    it("should return the right object (= wines) which represent all the bottles of wine in the shop", (done) => {
      const getAllWinesStub = sinon
        .stub(winesController, "getAllWines")
        .returns({ wines: [] });

      // const response = await request(server).get("/api/wines");
      chai.request(server)
        .get("/api/wines")
        .end((error, response) => {
          expect(getAllWinesStub).to.be.calledOnce;
          // sinon.assert.calledOnce(getAllWinesStub);
          expect(response.statusCode).to.equal(OK);
          expect(response.body).to.have.property('wines');
          expect(response.body.wines).to.be.an("array");
          expect(response.body.wines.length).to.equal(0);
          done();
        });
    });
  });
  describe("GET /wines/:id", () => {
    it("should return the right object  (= wine) which represent the bottle of wine selected", async () => {
      const id = uuid();
      const getOneWineStub = sinon
        .stub(winesController, "getOneWine")
        .returns({ wine: [] });

      const response = await request(server).get(`/api/wines/${id}`)
      expect(getOneWineStub).to.be.calledOnce;
      expect(response.body).to.have.property('wine');
      expect(response.body.wine).to.be.an("array");
      expect(response.body.wine.length).to.equal(0);
    })
  });
});


  // beforeEach((done) => {
  //   Wine.destroy({ where: {}, truncate: true })
  //   done();
  // })

/* fake data wines */
// const wines = [
//   {
//     id: uuid(),
//     region: "Vallée du Rhône",
//     appelation: "Côtes du Rhône",
//     domaine: "Domaine du Coulet",
//     vigneron: "Matthieu Barret",
//     cuvee: "Petit ours",
//     millesime: 2016,
//     wineCategory: "rouge",
//     publicPrice: 14,
//     memberPrice: 12,
//     winePic: "/api/images/wines_pics/bulle.jpg"
//   },
//   {
//     id: uuid(),
//     region: "Touraine",
//     appelation: "Côtes du Rhône",
//     domaine: "Domaine du Tue Boeuf",
//     vigneron: "Le clos du Tue-Boeuf",
//     cuvee: "La Guerrerie",
//     millesime: null,
//     wineCategory: "rouge",
//     publicPrice: 22,
//     memberPrice: 20,
//     winePic: "/api/images/wines_pics/chateau_beausejour.jpg"
//   }
// ]
// await Wine.bulkCreate(wines);
// console.log(wines);