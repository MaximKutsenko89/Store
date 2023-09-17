'use client'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { cartState } from "@/redux/cartReducer"
import { toggleCartIsOpen } from '@/redux/cartReducer'
import { priceFormatter, priceWithDiscount } from '@/utils'
import { Button } from '../Button/Button'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { AnimatePresence, motion, } from 'framer-motion'
import { CartListItem } from './CartListItem'
import clsx from 'clsx'
import styles from './Cart.module.scss'

export const Cart = () => {
    const { cart, cartIsOpen } = useAppSelector(cartState)

    const productsInCart = cart.reduce((accum, elem) => accum += (elem.count as number), 0)

    const totalPrice = cart.reduce((accum, elem) => {
        const price = priceWithDiscount(elem.price, elem.discountPercentage)
        accum += (price * (elem.count as number))
        return accum
    }, 0)

    const dispatch = useAppDispatch()

    function overlayClickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = event.target as HTMLDivElement
        if (target.dataset.name !== 'overlay') {
            return false
        } else {
            dispatch(toggleCartIsOpen())
        }
    }
    const cartAnimations = {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
    }
    const overlayAnimations = {
        initial: { opacity: 0, },
        animate: { opacity: 1, },
        exit: { opacity: 0, },
        transition: { duration: 0.5 },
    }
    if (cart.length === 0) {
        return (
            <AnimatePresence>
                {cartIsOpen && (
                    <motion.div
                        {...overlayAnimations}
                        className={styles.cartOverlay}
                        onClick={overlayClickHandler}
                        data-name='overlay'
                    >
                        <motion.div
                            className={clsx(styles.cart, styles.cartCenter)}
                            {...cartAnimations}
                        >
                            <ProductionQuantityLimitsIcon
                                style={{ width: 100, height: 100 }}
                            />
                            <h2 className='title'>Cart is empty</h2>
                            <Button
                                fullWidth
                                center
                                variant='button'
                                border={false}
                                onClick={() => dispatch(toggleCartIsOpen())}
                            >
                                Continue shopping
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence>
            {cartIsOpen && (
                <motion.div
                    {...overlayAnimations}
                    className={styles.cartOverlay}
                    onClick={overlayClickHandler}
                    data-name='overlay'
                >
                    <motion.div
                        className={styles.cart}
                        {...cartAnimations}
                        transition={{ duration: 0.5 }}
                    >

                        <div className={styles.cartWrap}>
                            <ul className={styles.cartList}>
                                <AnimatePresence>
                                    {cart.map((product) => {
                                        return (
                                            <CartListItem {...product} key={product.id} />
                                        )
                                    })}
                                </AnimatePresence>
                            </ul>
                            <div className={styles.cartInfo}>
                                <div className={styles.cartInfoInner}>
                                    <span
                                        className={styles.cartListCloseBtn}
                                        onClick={() => dispatch(toggleCartIsOpen())}
                                    >
                                        &times;
                                    </span>
                                    <h3>{productsInCart} product{productsInCart > 1 ? 's' : ''} <br />
                                        Total price: {priceFormatter(totalPrice)}</h3>
                                    <Button
                                        variant='button'
                                        center
                                        fullWidth
                                        loading={false}
                                        border={true}
                                    >
                                        Order
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
