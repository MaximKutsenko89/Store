import type { Metadata } from "next";
import { fetchData } from "@/services/index";
import { formatCategory } from "@/utils";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Response } from "@/types/types";
import styles from "@/components/ProductsList/productList.module.scss";
import { AnimatedTitle } from "@/components/AnimatedTitle/AnimatedTitle";

export const metadata: Metadata = {
   title: "Categories",
   description: "Next test",
};

export default async function Category({
   params,
}: {
   params: { category: string };
}) {
   const data = await fetchData<Response>(`category/${params.category}`);
   return (
      <>
         <main className={styles.home}>
            <div className="container">
               <AnimatedTitle tagName="h1">
                  {formatCategory(params.category)}
               </AnimatedTitle>
               <div className={styles.homeInner}>
                  {data &&
                     data.products.map((item) => {
                        return <ProductCard key={item.id} {...item} />;
                     })}
               </div>
            </div>
         </main>
      </>
   );
}
