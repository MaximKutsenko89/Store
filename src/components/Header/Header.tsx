"use client";
import Link from "next/link";
import { useFetchCategoriesListQuery } from "@/redux/api";
import { useState, FC, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { formatCategory } from "@/utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { cartState } from "@/redux/cartReducer";
import { toggleCartIsOpen } from "@/redux/cartReducer";
import clsx from "clsx";
import styles from "./Header.module.scss";

export const Header: FC = () => {
   const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
   const { data: categories } = useFetchCategoriesListQuery();
   const { cart } = useAppSelector(cartState);
   const dispatch = useAppDispatch();
   const productsInCart = cart.reduce(
      (accum, elem) => (accum += elem.count as number),
      0
   );
   const [productsInCartChecked, setProductsInCartChecked] = useState(0);

   useEffect(() => {
      setProductsInCartChecked(productsInCart);
   }, [productsInCart]);

   return (
      <>
         <header className={styles.header}>
            <div className="container">
               <nav className={styles.headerNav}>
                  <Link href={"/"} onClick={() => setCategoriesOpen(false)}>
                     Home
                  </Link>
                  <button
                     onClick={() => setCategoriesOpen((prev) => !prev)}
                     className={styles.headerBtn}
                  >
                     Categories
                     <ArrowDropDownIcon
                        className={clsx(styles.headerArrowClosed, {
                           [styles.headerArrowOpened]: categoriesOpen,
                        })}
                     />
                  </button>
                  <div
                     className={styles.headerIcons}
                     onClick={() => setCategoriesOpen(false)}
                  >
                     <div
                        onClick={() => dispatch(toggleCartIsOpen())}
                        className={styles.headerCartIcon}
                        title="Cart"
                     >
                        <ShoppingCartOutlinedIcon />
                        {productsInCartChecked > 0 && productsInCartChecked}
                     </div>
                     <ThemeSwitcher />
                  </div>
               </nav>
               <AnimatePresence>
                  {categoriesOpen && (
                     <>
                        <motion.ul
                           className={styles.headerList}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.5 }}
                        >
                           {categories &&
                              categories.map((item, index) => {
                                 return (
                                    <li
                                       className={styles.headerListItem}
                                       key={index}
                                       onClick={() => setCategoriesOpen(false)}
                                    >
                                       <Link href={`/categories/${item}`}>
                                          {formatCategory(item)}
                                       </Link>
                                    </li>
                                 );
                              })}
                        </motion.ul>
                        <div
                           className={styles.listOverlay}
                           onClick={() => setCategoriesOpen(false)}
                        ></div>
                     </>
                  )}
               </AnimatePresence>
            </div>
         </header>
      </>
   );
};
