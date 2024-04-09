import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: number): void;
  find(limit: number, offset: number): Promise<Product[]>;
  findById(id: number): Promise<Product>;
}
