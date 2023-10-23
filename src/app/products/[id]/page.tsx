import { SingleProduct } from "@/components/SingleProduct/SingleProduct";
import { fetchData } from "@/services";
import { Product } from "@/types/types";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
   params: { id: number };
   searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
   { params, searchParams }: Props,
   parent: ResolvingMetadata
): Promise<Metadata> {
   const data = await fetchData<Product>(`${params.id}`);

   return {
      title: data.title,
   };
}
export default async function Product({ params }: { params: { id: number } }) {
   const data = await fetchData<Product>(`${params.id}`);
   return (
      <main>
         <div className="container">
            <SingleProduct product={data} />
         </div>
      </main>
   );
}
