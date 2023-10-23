"use client";
import React, { useState } from "react";
import { useFetchProductsByLimitQuery } from "@/redux/api";
import { ProductCard } from "../ProductCard/ProductCard";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { SearchForm } from "../SearchForm/SearchForm";
import { AnimatedTitle } from "../AnimatedTitle/AnimatedTitle";
import styles from "./productList.module.scss";

export const ProductsList = () => {
   const [limit, setLimit] = useState<number>(10);
   const { data, error, isLoading, isFetching } =
      useFetchProductsByLimitQuery(limit);

   if (error) {
      return <div>{error as string}</div>;
   }

   if (isLoading) {
      return <Loader />;
   }

   return (
      <>
         <AnimatedTitle tagName="h1">All Products</AnimatedTitle>
         <SearchForm />
         <div className={styles.homeInner}>
            {data?.products?.map((item) => {
               return <ProductCard key={item.id} {...item} />;
            })}
         </div>
         {limit < 100 && !isLoading && (
            <Button
               loading={isFetching}
               center
               fullWidth
               variant="button"
               border={false}
               onClick={() =>
                  setLimit((prev) => (prev < 100 ? prev + 10 : prev))
               }
            >
               Show more {data && data?.total - limit}
            </Button>
         )}
      </>
   );
};
