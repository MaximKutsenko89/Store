'use client'
import { slideUpVariants } from '@/utils/animationVariants';
import { motion } from 'framer-motion';

export const AnimatedTitle = ({ children, tagName }:
    { children: React.ReactNode, tagName: 'h1' | 'h2' | 'h3' | 'h4' }) => {

    const TagName = `${tagName}` as keyof JSX.IntrinsicElements

    return (
        <TagName className='overflowed'>
            <motion.div
                initial="hidden"
                animate="show"
                variants={slideUpVariants(0.5)}
                className="title"
            >
                {children}
            </motion.div>
        </TagName>
    )
}
