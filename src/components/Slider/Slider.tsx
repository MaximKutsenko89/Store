import { useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { motion } from "framer-motion";
import Image from "next/image";
import { scaleVariants } from "@/utils/animationVariants";
import styles from "./slider.module.scss";

export const Slider = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  function updateSlide(direction: "next" | "prev") {
    switch (direction) {
      case "next":
        setActiveSlide((prev) => {
          if (prev === images.length - 1) {
            return prev;
          }
          return prev + 1;
        });
        break;
      case "prev":
        setActiveSlide((prev) => {
          if (prev <= 0) {
            return prev;
          }
          return prev - 1;
        });
        break;
      default:
        throw new Error("incorrect type");
    }
  }
  return (
    <>
      <div className={styles.slider}>
        <div style={{ position: "relative" }}>
          <div className={styles.sliderInner}>
            <motion.div
              initial="hidden"
              animate="show"
              variants={scaleVariants(0.5)}
            >
              <Image
                src={images[activeSlide]}
                width={300}
                height={300}
                alt={title}
                className={styles.sliderImg}
                priority
              />
            </motion.div>
          </div>
          <div className={styles.sliderArrows}>
            <div
              className={styles.sliderArrow}
              onClick={() => updateSlide("prev")}
            >
              <ArrowBackIosNewOutlinedIcon
                sx={{ fontSize: 40 }}
                style={{ opacity: activeSlide === 0 ? 0.2 : 1 }}
              />
            </div>
            <div
              className={styles.sliderArrow}
              onClick={() => updateSlide("next")}
            >
              <ArrowForwardIosOutlinedIcon
                sx={{ fontSize: 40 }}
                style={{ opacity: activeSlide === images.length - 1 ? 0.2 : 1 }}
              />
            </div>
          </div>
        </div>

        <div className={styles.sliderSmall}>
          {images.map((item, index) => {
            return (
              <motion.div
                initial="hidden"
                animate="show"
                variants={scaleVariants(0.6)}
                key={index}
              >
                <Image
                  src={item}
                  width={100}
                  height={100}
                  alt={title}
                  onClick={() => setActiveSlide(index)}
                  priority
                  style={{
                    border:
                      activeSlide === index ? "3px solid #ff0000" : "none",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};
