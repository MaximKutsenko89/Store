"use client";
import styled from "@emotion/styled";
import { useScrollProgress } from "@/utils/hooks";

const Progress = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   z-index: 9999;
   background: #ff0000;
   height: 4px;
   z-index: 9999;
`;

export const ScrollProgress = () => {
   const progress = useScrollProgress();

   return <Progress style={{ width: `${progress}%` }} />;
};
