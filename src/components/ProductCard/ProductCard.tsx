'use client'
import { FC, useRef } from 'react'
import type { Product } from '@/types/types'
import Image from 'next/image'
import { priceFormatter, priceWithDiscount } from '@/utils'
import { Button } from '../Button/Button'
import { motion, useInView } from 'framer-motion';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/navigation'
import { scaleVariants, slideUpVariants } from '@/utils/animationVariants'
import DoneIcon from '@mui/icons-material/Done';
import { useCartButtonHandler } from '@/utils/hooks'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/cartReducer'
import styles from './productCard.module.scss'

export const ProductCard: FC<Product> = (
    { id, title, description, discountPercentage, rating, thumbnail, price }: Product) => {

    const router = useRouter()
    const priceWithDiscountValue = priceWithDiscount(price, discountPercentage)
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, amount: 0.2 })
    const dispatch = useAppDispatch()
    const [successClickHandler, productAdded] = useCartButtonHandler(id, title, <DoneIcon />)

    function buttonClickHandler() {
        successClickHandler()
        dispatch(addToCart({ id, title, description, discountPercentage, rating, thumbnail, price }))
    }
    function cardClickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = event.target as HTMLElement
        if (target.tagName === 'BUTTON' || target.tagName === 'SVG' || target.tagName === 'PATH') {
            return false
        } else {
            router.push(`/products/${id}`)
        }
    }

    return (
        <motion.div
            ref={cardRef}
            initial="hidden"
            animate={isInView && "show"}
            variants={slideUpVariants(0.5)}
            className={styles.card}
            onClick={cardClickHandler}
            data-id={id}
        >

            <div className={styles.cardPrice}>
                <div className={styles.overflowed}>
                    <motion.div
                        initial="hidden"
                        animate={isInView && "show"}
                        variants={slideUpVariants(0.6)}
                        className={styles.cardPriceOld}
                    >
                        Old price :
                        <span>{priceFormatter(price)}</span>
                    </motion.div>
                </div>
                <div className={styles.overflowed}>
                    <motion.div
                        initial="hidden"
                        animate={isInView && "show"}
                        variants={slideUpVariants(0.7)}
                        className={styles.cardPriceNew}
                    >
                        New price : {priceFormatter(priceWithDiscountValue)}
                    </motion.div>
                </div>

            </div>
            <motion.div
                initial="hidden"
                animate={isInView && "show"}
                variants={slideUpVariants(0.8)}
                className={styles.cardImgHolder}
            >
                <Image
                    src={thumbnail || ''}
                    alt={title}
                    className={styles.cardImg}
                    loading='lazy'
                    fill={true}
                />
            </motion.div>

            <h3 className={styles.overflowed}>
                <motion.div
                    initial="hidden"
                    animate={isInView && "show"}
                    variants={slideUpVariants(0.9)}
                    className={styles.cardTitle}
                >
                    {title}
                </motion.div>
            </h3>
            <div className={styles.overflowed}>
                <motion.p
                    initial="hidden"
                    animate={isInView && "show"}
                    variants={slideUpVariants(1)}
                    className={styles.cardDescription}
                >
                    {description}
                </motion.p>
            </div>
            <motion.div
                style={{ marginTop: 'auto' }}
                initial="hidden"
                animate={isInView && "show"}
                variants={scaleVariants(1)}
            >
                <Button
                    border={true}
                    variant='button'
                    className='btn center full-width center-bottom cart-btn'
                    onClick={buttonClickHandler}
                    disabled={productAdded}

                >
                    Add to cart
                    {productAdded ? <DoneIcon /> : <ShoppingCartOutlinedIcon />}
                </Button>
            </motion.div>
        </motion.div>
    )
}
