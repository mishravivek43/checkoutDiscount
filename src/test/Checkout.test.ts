import { describe, it, expect } from "@jest/globals";
import { Checkout } from "../models/Checkout";
import { PricingRule } from "../interfaces/PricingRule";
// import { Checkout, PricingRule } from "./Checkout";

describe("Checkout", () => {
  const pricingRules: PricingRule[] = [
    {
      sku: "op10",
      price: 849.99,
    },
    {
      sku: "op11",
      price: 949.99,
      discountQuantity: 4,
      discountPrice: 899.99,
    },
    {
      sku: "buds",
      price: 129.99,
      discountQuantity: 3,
      isFreeItem: true,
      freeItems: 1,
    },
    {
      sku: "wtch",
      price: 229.99,
    },
  ];

  it("calculates total correctly with 3 for 2 deal for buds", () => {
    const co = new Checkout(pricingRules);
    co.scan("buds");
    co.scan("op10");
    co.scan("buds");
    co.scan("buds");
    const total = co.total();
    expect(total).toEqual(1109.97);
  });

  it("calculates total correctly with 3 for 2 deal for buds", () => {
    const co = new Checkout(pricingRules);
    co.scan("buds");
    co.scan("buds");
    co.scan("buds");
    const total = co.total();
    expect(total).toEqual(259.98);
  });

  it("calculates total correctly with 3 for 2 deal and one free bud for buds", () => {
    const co = new Checkout(pricingRules);
    co.scan("buds");
    co.scan("buds");
    co.scan("buds");
    co.scan("buds");
    const total = co.total();
    expect(total).toEqual(389.97);
  });

  it("calculates total correctly with bulk discount for op11", () => {
    const co = new Checkout(pricingRules);
    co.scan("op11");
    co.scan("op11");
    co.scan("op11");
    co.scan("op11");
    const total = co.total();
    expect(total).toEqual(3599.96);
  });
  it("calculates total correctly with bulk discount for op11", () => {
    const co = new Checkout(pricingRules);
    co.scan("wtch");
    co.scan("op11");
    co.scan("op11");
    co.scan("op11");
    co.scan("buds");
    co.scan("buds");
    co.scan("op11");
    co.scan("op11");
    const total = co.total();
    expect(total).toEqual(4989.92);
  });
  it("calculates total correctly without any discounts", () => {
    const co = new Checkout(pricingRules);
    co.scan("op10");
    co.scan("wtch");
    const total = co.total();
    expect(total).toEqual(1079.98);
  });
});
