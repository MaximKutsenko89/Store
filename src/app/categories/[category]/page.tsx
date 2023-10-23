import type { Metadata, ResolvingMetadata } from "next";
import { fetchData } from "@/services/index";
import { formatCategory } from "@/utils";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Response } from "@/types/types";
import { AnimatedTitle } from "@/components/AnimatedTitle/AnimatedTitle";
import styles from "@/components/ProductsList/productList.module.scss";

type Props = {
   params: { category: string };
   searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
   { params, searchParams }: Props,
   parent: ResolvingMetadata
): Promise<Metadata> {
   return {
      title: params.category[0].toUpperCase() + params.category.slice(1),
   };
}

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
