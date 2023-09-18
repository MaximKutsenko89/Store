export function formatCategory(str: string) {
   const result = str
      .split("-")
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(" ");

   return result;
}

export function priceFormatter(number: number) {
   const formattedNumber = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
   }).format(number);
   return formattedNumber;
}

export function priceWithDiscount(
   price: number,
   discountPercentage: number
): number {
   const discount = discountPercentage / 100;
   const discountAmount = price * discount;
   const finalPrice = price - discountAmount;
   return Math.ceil(finalPrice);
}
