'use client'
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleCartIsOpen } from "@/redux/cartReducer";
import { cartState } from "@/redux/cartReducer";

export function useScrollProgress() {
    const { scrollY } = useScroll()
    const [progress, setProgress] = useState(0)
    if (typeof window !== "undefined") {
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMotionValueEvent(scrollY, "change", (value) => {
            setProgress(value / (fullHeight - windowHeight) * 100)

        })
    }
    return progress
}
type ButtonClickHandler = () => void

export function useCartButtonHandler(id: number, title: string, icon: React.ReactNode)
    : [ButtonClickHandler, boolean] {
    const [productAdded, setProductAdded] = useState<boolean>(false)
    const { cart, cartIsOpen } = useAppSelector(cartState)
    const dispatch = useAppDispatch()
    function successClickHandler() {
        setProductAdded(true)
        toast.success(`${title} added to cart!`, {
            icon,
            toastId: id,
            onClose: () => setProductAdded(false)
        })
        if (cart.length === 0) {
            dispatch(toggleCartIsOpen())
        }
    }
    return [successClickHandler, productAdded]
}