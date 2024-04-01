// src/index.js
import express, { Express, Request, Response } from "express";
import catalogRouter from "./api/catalog.routes";

const app: Express = express();
app.use(express.json());


app.use("/", catalogRouter);


export default app;