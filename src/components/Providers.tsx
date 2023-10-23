"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { ScrollToTop } from "./ScrollToTop/ScrollToTop";
import { ToastCustomContainer } from "./ToastCustomContainer";
import { Cart } from "./Cart/Cart";

export function Providers({ children }: { children: ReactNode }) {
   return (
      <Provider store={store}>
         <div className="page-wrapper">
            <Next13ProgressBar
               height="4px"
               color="var(--textColor)"
               showOnShallow
               options={{ showSpinner: false }}
            />
            {children}
            <ScrollToTop />
         </div>
         <ToastCustomContainer />
         <Cart />
      </Provider>
   );
}
