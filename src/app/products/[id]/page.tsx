import { SingleProduct } from "@/components/SingleProduct/SingleProduct";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Product",
   description: "Next test",
};
export default function Product({ params }: { params: { id: number } }) {
   return (
      <main>
         <div className="container">
            <SingleProduct id={params.id} />
         </div>
      </main>
   );
}
