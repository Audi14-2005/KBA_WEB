"use client"

import { motion, type MotionProps } from "framer-motion"
import type React from "react"

type PageTransitionProps = {
    children: React.ReactNode
    className?: string
} & MotionProps

export function PageTransition({ children, className, ...props }: PageTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}


