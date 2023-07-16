import { PricingRule } from "../interfaces/PricingRule";

export const DefaultPricingRule: PricingRule[] = [
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
