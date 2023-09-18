import type { Product, Response } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
   baseQuery: fetchBaseQuery({ baseUrl: `https://dummyjson.com/products/` }),
   endpoints: (builder) => ({
      fetchCategoriesList: builder.query<string[], void>({
         query: () => "categories",
      }),
      fetchCategory: builder.query<Response, string>({
         query: (category) => `category/${category}`,
      }),
      fetchProductsByLimit: builder.query<Response, number>({
         query: (limit) => `?limit=${limit}&skip=0`,
      }),
      fetchAllProducts: builder.query<Response, void>({
         query: () => "?limit=0",
      }),
      fetchProductsByValue: builder.query<Response, string>({
         query: (value) => `search?q=${value}`,
      }),
      fetchSingleProduct: builder.query<Product, number>({
         query: (value) => `${value}`,
      }),
   }),
});

export const {
   useFetchCategoriesListQuery,
   useFetchCategoryQuery,
   useFetchProductsByLimitQuery,
   useFetchAllProductsQuery,
   useFetchProductsByValueQuery,
   useFetchSingleProductQuery,
} = api;
