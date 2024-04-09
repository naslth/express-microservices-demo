import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: ICatalogRepository;
  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }
  async createProduct(input: Product): Promise<Product> {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }
  async updateProduct(input: Product): Promise<Product> {
    const data = await this._repository.update(input);
    return data;
  }
  async deleteProduct(id: number) {
    const data = await this._repository.delete(id);
    return data;
  }
  async getProducts(limit: number, offset: number): Promise<Product[]> {
    const products = await this._repository.find(limit, offset);
    return products;
  }
  async getProductById(id: number): Promise<Product> {
    const product = await this._repository.findById(id);
    return product;
  }
}
