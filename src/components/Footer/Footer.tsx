"use client";
import { FC } from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer: FC = () => {
   const year = new Date().getFullYear();

   return (
      <footer className={styles.footer}>
         <div className="container">
            <div className={styles.footerWrap}>
               <div className={styles.footerLogo}>
                  <Link href={"/"}>Home</Link>
               </div>
               <div>© {year}</div>
               <div className={styles.footerLink}>
                  API provided by{" "}
                  <a href="https://dummyjson.com/" target="_blank">
                     dummyjson.com
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
};
