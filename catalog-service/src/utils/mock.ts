import { Factory } from "rosie";
import { Product } from "../models/product.model";
import { faker } from "@faker-js/faker";
export const ProductFactory = new Factory<Product>()
  .attr("id", faker.number.int({ min: 1, max: 1000 }))
  .attr("name", faker.commerce.productName())
  .attr("price", +faker.commerce.price({ min: 1 }))
  .attr("imageUrl", "test.png")
  .attr("stock", faker.number.int({ min: 10, max: 100 }))
  .attr("description", faker.commerce.productDescription());
