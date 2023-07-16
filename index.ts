import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DefaultPricingRule } from "./src/constants/defualtPricingRule";
import { Checkout } from "./src/models/Checkout";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Health Check");
});
app.post("/getCheckoutTotal", (req: Request, res: Response) => {
  const reqBody = req.body;
  let { items, pricingRule } = reqBody;
  if (!items || items?.length <= 0) {
    res.status(400).send("Items are required");
  }
  if (!pricingRule || pricingRule?.length <= 0) {
    pricingRule = DefaultPricingRule;
  }
  const checkout = new Checkout(pricingRule);
  items.forEach((item: string) => {
    checkout.scan(item);
  });
  const total = checkout.total();
  res.status(200).send({ total });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
