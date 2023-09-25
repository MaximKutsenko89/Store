"use client";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { themeState } from "@/redux/themeReducer";

export const ToastCustomContainer = () => {
   const { theme } = useAppSelector(themeState);
   return (
      <ToastContainer
         position={toast.POSITION.BOTTOM_LEFT}
         autoClose={2000}
         pauseOnHover={true}
         theme={theme}
         pauseOnFocusLoss={true}
         transition={Slide}
      />
   );
};
