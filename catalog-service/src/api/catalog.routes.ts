import express, { NextFunction, Request, Response } from "express";
import { CatalogRepository } from "../repository/catalog.repository";
import { CatalogService } from "../services/catalog.service";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { RequestValidator } from "../utils/requestValidator";
const catalogRouter = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

catalogRouter.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        req.body
      );
      if (errors) return res.status(400).json(errors);
      const data = await catalogService.createProduct(input);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

catalogRouter.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body
      );
      const id = parseInt(req.params.id) || 0;
      if (errors) return res.status(400).json(errors);
      const data = await catalogService.updateProduct(req.body);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);
catalogRouter.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      const data = await catalogService.getProducts(limit, offset);
      // data.forEach(async (product) => {
      //   const { errors } = await RequestValidator(
      //     CreateProductRequest,
      //     product
      //   );
      //   if (errors) return res.status(400).json(errors);
      // });
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);


catalogRouter.get(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await catalogService.getProductById(id);
      // const { errors } = await RequestValidator(CreateProductRequest, data);
      // if (errors) return res.status(400).json(errors);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

catalogRouter.delete(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await catalogService.deleteProduct(id);
      // const { errors } = await RequestValidator(CreateProductRequest, data);
      // if (errors) return res.status(400).json(errors);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

export default catalogRouter;
