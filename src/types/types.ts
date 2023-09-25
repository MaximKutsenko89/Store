import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type ThemeContextType = {
   theme: "dark" | "light";
};
export type ButtonProps = {
   children: React.ReactNode;
   variant: "button" | "link";
   href?: string;
   border: boolean;
   onClick?: () => void;
   loading?: boolean;
   disabled?: boolean;

   fullWidth?: boolean;
   icon?: boolean;
   cartBtn?: boolean;
   center?: boolean;
   centerBottom?: boolean;
   transparent?: boolean;
};

export type Response = {
   products: Product[];
   total: number;
};

export type Product = {
   id: number;
   title: string;
   description: string;
   price: number;
   discountPercentage: number;
   rating?: number;
   stock?: number;
   brand?: string;
   category?: string;
   thumbnail?: string | StaticImport;
   images?: string[];
   count?: number;
};

export type CartState = {
   cart: Product[];
   cartIsOpen: boolean;
};
