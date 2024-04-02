import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    const mockProduct = {
      ...data,
    };
    return Promise.resolve(mockProduct);
  }
  update(data: Product): Promise<Product> {
    return Promise.resolve(data as Product);
  }
  delete(id: number) {
    return Promise.resolve(id);
  }
  findAll(): Promise<Product[]> {
    return Promise.resolve([] as Product[]);
  }
  find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([] as Product[]);
  }
  findById(id: number): Promise<Product> {
    return Promise.resolve({ id } as Product);
  }
}
