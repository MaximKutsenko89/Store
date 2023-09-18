"use client";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { scaleVariants } from "@/utils/animationVariants";

const Stars = styled.div`
   margin-bottom: 1.42rem;
   text-align: center;
`;
const Star = styled(motion.div)`
   display: inline-block;
   vertical-align: middle;
`;

export const RatingCreator = ({ rating }: { rating: number }) => {
   let stars = 0;

   if (rating < 4.5) {
      stars = 4;
   } else if (rating >= 4.5 && rating <= 4.7) {
      stars = 4.5;
   } else if (rating > 4.7) {
      stars = 5;
   }

   const fullStars = Math.floor(stars);
   const hasHalfStar = stars % 1 !== 0;

   return (
      <Stars>
         {Array.from({ length: fullStars }, (_, i) => (
            <Star
               key={i}
               initial="hidden"
               animate="show"
               variants={scaleVariants(0.2 * (i + 1), 0.2 * i)}
            >
               <StarIcon key={i} fontSize="large" />
            </Star>
         ))}
         {hasHalfStar && (
            <Star
               initial="hidden"
               animate="show"
               variants={scaleVariants(0.5, 0.2 * fullStars)}
            >
               <StarHalfIcon fontSize="large" />
            </Star>
         )}
         {stars === 4 && (
            <Star
               initial="hidden"
               animate="show"
               variants={scaleVariants(0.5, 0.2 * fullStars)}
            >
               <StarBorderIcon fontSize="large" />
            </Star>
         )}
         <Star
            initial="hidden"
            animate="show"
            variants={scaleVariants(0.6, 0.2 * fullStars)}
         >
            Rating : {rating}
         </Star>
      </Stars>
   );
};
