import { DefaultPricingRule } from "../constants/defualtPricingRule";
import { PricingRule } from "../interfaces/PricingRule";

export class Checkout {
  pricingRules: PricingRule[];
  scannedItems: string[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
    this.scannedItems = [];
  }

  scan(item: string) {
    this.scannedItems.push(item);
  }
  addFreeItem() {
    const itemCounts = this.getItemCounts();
    itemCounts.forEach((item) => {
      const pricingRule = this.getPricingRule(item.sku);
      if (pricingRule) {
        let { price, discountQuantity, discountPrice, isFreeItem, freeItems } =
          pricingRule;
        const { quantity } = item;
        if (discountQuantity && isFreeItem) {
          if (!freeItems) {
            freeItems = 1;
          }
          const discountedItemsCount = Math.floor(quantity / discountQuantity);
          const remainingItemsCount = quantity % discountQuantity;
          const totalFreeItems = freeItems * discountedItemsCount;
          const isFreeItemsShouldBeAdded =
            remainingItemsCount - (discountQuantity - freeItems) + 1;
          if (isFreeItemsShouldBeAdded > 0) {
            const numberOfFreeItemsToBeAdded =
              discountQuantity - remainingItemsCount;
            console.log(
              `quantity, remainingItemsCount, totalFreeItems,numberOfFreeItemsToBeAdded, updatedQuantity`,
              quantity,
              remainingItemsCount,
              totalFreeItems,
              numberOfFreeItemsToBeAdded,
              quantity + numberOfFreeItemsToBeAdded
            );
            for (let i = 0; i < numberOfFreeItemsToBeAdded; i++) {
              this.scannedItems.push(item.sku);
            }
          }
        }
      }
    });
  }
  total(): number {
    this.addFreeItem();
    const itemCounts = this.getItemCounts();
    let total = 0;

    itemCounts.forEach((item) => {
      const pricingRule = this.getPricingRule(item.sku);
      if (pricingRule) {
        const {
          price,
          discountQuantity,
          discountPrice,
          isFreeItem,
          freeItems,
        } = pricingRule;
        const { quantity } = item;

        if (discountQuantity && discountPrice) {
          const discountedItemsCount = Math.floor(quantity / discountQuantity);
          const discountedTotal = discountedItemsCount
            ? quantity * discountPrice
            : quantity * price;
          console.log(
            `quantity, discountedItemsCount, discountedTotal`,
            quantity,
            discountedItemsCount,
            discountedTotal
          );
          total += discountedTotal;
        } else if (discountQuantity && isFreeItem) {
          const totalPrice = quantity * price;
          const discountedItemsCount = Math.floor(quantity / discountQuantity);
          const totalFreeItems = freeItems
            ? freeItems * discountedItemsCount
            : discountedItemsCount;
          const remainingItemsCount = quantity % discountQuantity;
          const discountedTotal = totalPrice - totalFreeItems * price;
          console.log(
            `quantity, discountedItemsCount, remainingItemsCount, totalFreeItems, discountedTotal`,
            quantity,
            discountedItemsCount,
            remainingItemsCount,
            totalFreeItems,
            discountedTotal
          );
          total += discountedTotal;
        } else {
          total += quantity * price;
        }
      }
    });

    return total;
  }

  getItemCounts(): { sku: string; quantity: number }[] {
    const itemCounts: { sku: string; quantity: number }[] = [];

    this.scannedItems.forEach((item) => {
      const index = itemCounts.findIndex((count) => count.sku === item);
      if (index !== -1) {
        itemCounts[index].quantity++;
      } else {
        itemCounts.push({ sku: item, quantity: 1 });
      }
    });

    return itemCounts;
  }

  getPricingRule(sku: string): PricingRule | undefined {
    return this.pricingRules.find((rule) => rule.sku === sku);
  }
}
