'use client'
import { useFetchSingleProductQuery } from '@/redux/api'
import { Loader } from '../Loader/Loader'
import { priceFormatter, priceWithDiscount } from '@/utils/index'
import { Button } from '../Button/Button'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from 'next/link'
import { Slider } from '../Slider/Slider'
import { motion } from 'framer-motion';
import { scaleVariants, slideUpVariants } from '@/utils/animationVariants'
import { AnimatedTitle } from '../AnimatedTitle/AnimatedTitle'
import { RatingCreator } from '../RatingCreator/RatingCreator'
import { useCartButtonHandler } from '@/utils/hooks'
import DoneIcon from '@mui/icons-material/Done';
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/cartReducer'
import { Product } from '@/types/types'
import styles from './SingleProduct.module.scss'

export const SingleProduct = ({ id }: { id: number }) => {

    const { data: product, isLoading, error } = useFetchSingleProductQuery(id)
    const [successClickHandler, productAdded] = useCartButtonHandler(
        (product?.id as number),
        (product?.title as string),
        <DoneIcon />
    )
    const dispatch = useAppDispatch()
    if (error) {
        return <div>{error as string}</div>
    }
    if (isLoading) {
        return <Loader />
    }

    const priceWithDiscountValue = priceWithDiscount(
        (product?.price as number),
        (product?.discountPercentage as number)
    )
    function buttonClickHandler() {
        successClickHandler()
        dispatch(addToCart(product as Product))
    }
    return (
        <div className={styles.product}>
            <AnimatedTitle tagName='h1'>
                {product?.title}
            </AnimatedTitle>
            <h2 className={styles.overflowed}>
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={slideUpVariants(0.7)}
                >
                    Category :&nbsp;
                    <Link
                        href={`/categories/${product?.category}`}
                        style={{ textDecoration: 'underline' }}
                    >
                        {product?.category}
                    </Link>
                </motion.div>

            </h2>
            <div className={styles.productWrap}>
                <Slider
                    images={product?.images || []}
                    title={product?.title || ''}
                />
                <div className={styles.productInfo}>
                    <div className={styles.productPriceWrap}>
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={scaleVariants(0.5)}
                            className={styles.productPrice}
                        >
                            New price:   {priceFormatter(priceWithDiscountValue)}
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={scaleVariants(0.5)}
                            className={styles.productPrice}
                        >
                            Old price:  {priceFormatter(product?.price as number)}
                        </motion.div>
                    </div>
                    <div className={[styles.overflowed, styles.productText].join(' ')}>
                        <motion.p
                            initial="hidden"
                            animate="show"
                            variants={slideUpVariants(0.8)}
                        >
                            {product?.description}.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, porro inventore, laboriosam libero, repudiandae deserunt ipsam qui ipsum quam dolore eos corporis odit fugit!
                        </motion.p>
                    </div>

                    <RatingCreator rating={product?.rating as number} />

                    <Button
                        border={true}
                        variant='button'
                        className='btn center-bottom full-width  cart-btn'
                        disabled={productAdded}
                        onClick={buttonClickHandler}
                    >
                        Add to cart
                        {productAdded ? <DoneIcon /> : <ShoppingCartOutlinedIcon />}
                    </Button>
                </div>
            </div>
        </div>
    )
}
