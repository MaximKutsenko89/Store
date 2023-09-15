export const scaleVariants = (duration: number, delay?: number) => ({
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: { duration, delay } }
})
export const slideUpVariants = (duration: number, delay?: number) => ({
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration, delay } }
})
export const slideDownVariants = (duration: number, delay?: number) => ({
    hidden: { opacity: 0, top: -100 },
    show: { opacity: 1, y: 0, transition: { duration: duration } }
})
export const fadeVariants = (duration: number, delay?: number) => ({
    hidden: { opacity: 0, },
    show: { opacity: 1, transition: { duration, delay } },
})
