export interface PricingRule {
  sku: string;
  price: number;
  discountQuantity?: number;
  discountPrice?: number;
  isFreeItem?: boolean;
  freeItems?: number;
}
