import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: ICatalogRepository;
  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }
  createProduct(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  updateProduct(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(id: number): void {
    throw new Error("Method not implemented.");
  }
  getAllProducts(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  getProducts(limit: number, offset: number): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  getProductById(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
