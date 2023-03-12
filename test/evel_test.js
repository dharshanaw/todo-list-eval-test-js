import { expect } from "chai";
import supertest from "supertest";
import { generateRandDescription } from "./test_utils";

var request = null;
var toDoId = null;
before("init test", () => {
  const YAML = require("yamljs");
  const ymlConfig = YAML.load("./config.yaml");
  request = supertest(ymlConfig.endpoint);
});

// Add item to todo list test case implemetation
describe("ToDoItem Add todo item test", () => {
  it("POST /api/todoItem/", () => {
    const data = {
      description: generateRandDescription(),
    };

    return request
      .post("todoItems")
      .send(data)
      .then((res) => {
        expect(res.status).equal(201);
        expect(res.body).not.to.be.empty;
        toDoId = res.body;
      });
  });

  it("GET /api/todoItem/:id", () => {
    return request.get(`todoItems/${toDoId}`).then((res) => {
      expect(res.status).equal(200);
      expect(res.body.id).to.be.equal(toDoId);
    });
  });
});

// Edit exiting item with put method and check the payload
describe("Edit existing todo item test", () => {
    var  newDescription = `${generateRandDescription()}-mod`;
    it("PUT /api/todoItems:id", () => {
        const data = {
          id: toDoId,
          description: newDescription,
          isCompleted: false,
        };
        return request
          .put(`todoItems/${toDoId}`)
          .send(data)
          .then((res) => {
            expect(res.status).equal(204);
          });
      });
    
      it("GET /api/todoItem/:id", () => {
        return request.get(`todoItems/${toDoId}`).then((res) => {
          expect(res.status).equal(200);
          expect(res.body.id).to.be.equal(toDoId);
          expect(res.body.description).to.be.equal(newDescription);
          console.log(res.body);
        });
      });
});

//Get all todo items
describe("ToDoItem", () => {
  var body = null;
  it("GET /api/todoItems", () => {
    return request.get("todoItems").then((res) => {
      console.log(res.body);
      expect(res.status).equal(200);
    
     // const filteredData=res.body.filter(object=>object.id===toDoId);
      // body = JSON.parse(res.body);
       console.log(body);
     // expect(res.body).to.have.any(toDoId);
    });
  });

});
