import express, { NextFunction, Request, Response } from "express";
import { CatalogRepository } from "../repository/catalog.repository";
import { CatalogService } from "../services/catalog.service";
const catalogRouter = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

catalogRouter.post(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await catalogService.createProduct(req.body);
    return res.status(201).json(data);
  }
);

export default catalogRouter;
