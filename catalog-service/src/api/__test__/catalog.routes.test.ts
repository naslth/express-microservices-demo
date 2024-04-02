import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRouter, { catalogService } from "../catalog.routes";
import { ProductFactory } from "../../utils/mock";

const app = express();
app.use(express.json());
app.use(catalogRouter);

const mockRequest = () => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: +faker.commerce.price(),
    imageUrl: "test.png",
  };
};

describe("Catalog Routes", () => {
  describe("POST /products", () => {
    test("should create product successfully", async () => {
      const requestBody = mockRequest();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    test("should response with validation error 400", async () => {
      const requestBody = mockRequest();
      const response = await request(app)
        .post("/products")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test("should response with an internal error code 500", async () => {
      const requestBody = mockRequest();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to create product"))
        );
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });

  describe("PATCH /products/:id", () => {
    test("should update product successfully", async () => {
      const requestBody = mockRequest();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    test("should response with validation error 400", async () => {
      const requestBody = mockRequest();
      const product = ProductFactory.build();
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send({ ...requestBody, price: -1 })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("price must not be less than 1");
    });

    test("should response with an internal error code 500", async () => {
      const requestBody = mockRequest();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to update product"))
        );
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to update product");
    });
  });

  describe("GET /all-products", () => {
    test("should get list all product successfully", async () => {
      const random = faker.number.int({ min: 1, max: 100 });
      const products = ProductFactory.buildList(random);
      jest
        .spyOn(catalogService, "getAllProducts")
        .mockImplementationOnce(() => Promise.resolve(products));
      const response = await request(app)
        .get(`/all-products`)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body.length).toEqual(random);
      expect(response.body).toEqual(products);
    });
  });

  describe("GET /products?limit=a-number&&offset=a-number", () => {
    test("should get list product by range successfully", async () => {
      const random = faker.number.int({ min: 1, max: 100 });
      const products = ProductFactory.buildList(random);
      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve(products));
      const response = await request(app)
        .get(`/products?limit=${random}&&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body.length).toEqual(random);
      expect(response.body).toEqual(products);
    });
  });

  describe("GET /product/:id", () => {
    test("should get product by id successfully", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "getProductById")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .get(`/product/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });
  });

  describe("DELETE /product/:id", () => {
    test("should delete product by id successfully", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve());
      const response = await request(app)
        .delete(`/product/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
    });
  });
});
