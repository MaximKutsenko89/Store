"use client";
import React, { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
   motion,
   useMotionValueEvent,
   useScroll,
   useTransform,
} from "framer-motion";
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
   const [show, setShow] = useState(false);
   const { scrollYProgress } = useScroll();
   const opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

   useMotionValueEvent(scrollYProgress, "change", (value) => {
      return setShow(value > 0.3);
   });
   function clickHandler() {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }
   return (
      <>
         {show && (
            <Circle onClick={clickHandler} style={{ opacity: opacity }}>
               <ArrowUpwardIcon />
            </Circle>
         )}
      </>
   );
};
