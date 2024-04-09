import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  update(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): void {
    throw new Error("Method not implemented.");
  }
  find(limit: number, offset: number): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
