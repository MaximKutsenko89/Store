"use client";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useScrollProgress } from "@/utils/hooks";
import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";

const Circle = styled(motion.div)`
   width: 50px;
   height: 50px;
   border-radius: 50%;
   border: 3px solid;
   background: var(--uiBackground);
   position: fixed;
   bottom: 5%;
   right: 5%;
   z-index: 999;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
`;
export const ScrollToTop = () => {
   const progress = useScrollProgress();
   function clickHandler() {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }
   return (
      <>
         {progress > 10 && (
            <AnimatePresence>
               <Circle
                  onClick={clickHandler}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
               >
                  <ArrowUpwardIcon />
               </Circle>
            </AnimatePresence>
         )}
      </>
   );
};
