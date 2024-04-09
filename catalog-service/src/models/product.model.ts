export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly description?: string,
    public readonly imageUrl?: string
  ) {}
}
