import { ICatalogRepository } from "../../interface/catalogRepository";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { ProductFactory } from "../../utils/mock";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";


const mockProduct = (data?: any) => {
  return {
    name: faker.commerce.productName(),
    id: 123,
    price: +faker.commerce.price(),
    stock: faker.number.int({ min: 10, max: 100 }),
    imageUrl: "test.png",
    description: faker.commerce.productDescription(),
    ...data,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });
  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });
  describe("createProduct", () => {
    test("should create a product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct();
      const result = await service.createProduct(reqBody);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
        description: expect.any(String),
        imageUrl: expect.any(String),
      });
    });

    test("should throw error with unable create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct();
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product"
      );
    });

    test("should throw error with existed product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct();
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exists"))
        );
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "product already exists"
      );
    });
  });

  describe("updateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({ price: 100 });
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject(reqBody);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );
      await expect(service.updateProduct({} as Product)).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("getAllProducts", () => {
    test("should get all products", async () => {
      const service = new CatalogService(repository);
      const randomTotal = faker.number.int({ min: 10, max: 50 });
      const products = ProductFactory.buildList(randomTotal);
      jest
        .spyOn(repository, "findAll")
        .mockImplementationOnce(() => Promise.resolve(products));
      const result = await service.getAllProducts();
      expect(result.length).toEqual(randomTotal);
      expect(result).toMatchObject(products);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      jest
        .spyOn(repository, "findAll")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );
      await expect(service.getAllProducts()).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const products = ProductFactory.buildList(randomLimit);
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));
      const result = await service.getProducts(randomLimit, 0);
      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(products);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );
      await expect(service.getProducts(0, 0)).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("getProductById", () => {
    test("should get product by id", async () => {
      const service = new CatalogService(repository);
      const product = ProductFactory.build();
      jest
        .spyOn(repository, "findById")
        .mockImplementationOnce(() => Promise.resolve(product));
      const result = await service.getProductById(product.id);
      expect(result).toMatchObject(product);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      jest
        .spyOn(repository, "findById")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );
      await expect(service.getProductById(0)).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("deleteProduct", () => {
    test("should delete product by id", async () => {
      const service = new CatalogService(repository);
      const product = ProductFactory.build();
      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id }));
      const result = await service.deleteProduct(product.id);
      expect(result).toMatchObject({
        id: product.id,
      });
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );
      await expect(service.deleteProduct(0)).rejects.toThrow(
        "product does not exist"
      );
    });
  });
});
