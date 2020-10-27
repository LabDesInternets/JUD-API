/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-require */
const chai = require('chai');
const { expect } = require('chai');
const sinon = require("sinon");
const uuid = require("uuid/v4");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);


const winesController = require("./wines_controller");

const db = require("../models");

const Wine = db.Wine;

const { NOT_FOUND } = require("../helpers/status_code");

describe("Controllers :: winesController", () => {


  describe("#getWines", () => {
    afterEach((done) => {
      sinon.restore()
      done()
    })
    it('should return the right object', async () => {
      // Given
      const id = uuid();

      const wines = [
        {
          id,
          cuvee: "Petit ours",
          domaine: "Tue-Boeuf",
          winePic: "/api/image/petitOurs",
          publicPrice: 18
        },
        {
          id,
          cuvee: "Giac'Potes",
          domaine: "Gachiano",
          winePic: "/api/image/Gachiano",
          publicPrice: 20
        }
      ]

      const createReturnObject = {
        ...wines
      };

      const expectedObject = {
        ...wines
      };

      const createStub = sinon
        .stub(Wine, 'findAll')
        .returns(createReturnObject);

      // When
      const createdObject = await winesController.getAllWines();

      // Then
      expect(createStub).to.be.calledOnce;
      expect(createdObject).to.deep.equal(expectedObject);

    });
    it("should throw a notFoundError when no wines are found", async () => {

      const createStub = sinon
        .stub(Wine, 'findAll')
        .returns();

      try {
        const response = await winesController.getAllWines()
        expect(createStub).to.be.calledOnce;
      } catch (error) {
        expect(error.status).to.equal(NOT_FOUND);
        expect(error.name).to.equal('NotFoundError');
        expect(error.status).to.equal(404);
      }

      //.catch(error => console.log("l erreur est", error))


    })
  });


});