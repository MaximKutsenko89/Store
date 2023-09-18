"use client";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import styled from "@emotion/styled";
import Link from "next/link";

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap-reverse;
   gap: 1rem;
   .title {
      margin: 0;
   }
`;
const StyledLink = styled(Link)`
   display: block;
   margin: 0 auto;
   text-align: center;
   font-size: 1.5rem;
   text-decoration: underline;
`;
const Icon = styled.svg`
   width: 200px;
   height: 200px;
   @media (max-width: 630px) {
      width: 100px;
      height: 100px;
   }
`;
export const NotFoundComponent = ({
   title,
   link,
}: {
   title: string;
   link?: boolean;
}) => {
   return (
      <>
         <Wrapper>
            <Icon>
               {" "}
               <ProductionQuantityLimitsIcon />
            </Icon>
            <h1 className="title">{title}</h1>
         </Wrapper>
         {link && <StyledLink href={"/"}>Back to main page</StyledLink>}
      </>
   );
};
