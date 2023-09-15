import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { removeFormCart, updatedCartByCount } from '@/redux/cartReducer'
import { useAppDispatch } from '@/redux/hooks'
import { priceFormatter, priceWithDiscount } from '@/utils'
import Image from 'next/image'
import type { Product } from '@/types/types'
// @ts-ignore
import { toast } from 'react-toastify'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import styles from './Cart.module.scss'

export const CartListItem = ({
    price, count, discountPercentage, id, thumbnail, title,
}: Product) => {

    const finalPrice = price * (count as number)
    const finalPriceWithDiscount = priceWithDiscount(finalPrice, discountPercentage)
    const [updatedCount, setUpdatedCount] = useState<number>(count as number)
    const dispatch = useAppDispatch()

    function removeHandler(title: string, id: number) {
        dispatch(removeFormCart(id))
        toast.warn(`${title} removed from cart!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            icon: <ProductionQuantityLimitsIcon />
        })
    }
    useEffect(() => {
        dispatch(updatedCartByCount({
            id,
            count: updatedCount
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedCount])

    const animations = {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: 0.5 },
    };
    return (
        <motion.li
            {...animations}
            className={styles.cartListItem}
            layout
        >
            <Image
                className={styles.cartListImage}
                width={100}
                height={100}
                src={thumbnail || ''}
                alt={title}
            />
            <div className={styles.cartListInfo}>
                <h3 className={styles.cartListTitle}>{title} </h3>
                <div className={styles.cartListPrice}>{priceFormatter(finalPriceWithDiscount)}</div>

            </div>
            <div className={styles.cartListCount}>
                <button
                    className={styles.cartListCountButton}
                    onClick={() => setUpdatedCount(prev => prev === 1 ? prev : prev - 1)}
                >
                    -
                </button>&nbsp;
                {updatedCount}
                &nbsp; <button
                    className={styles.cartListCountButton}
                    onClick={() => setUpdatedCount(prev => prev + 1)}
                >
                    +
                </button>
            </div>
            <span
                className={styles.cartListCloseBtn}
                onClick={() => removeHandler(title, id)}
            >
                &times;
            </span>
        </motion.li>
    )
}
