import { motion } from "framer-motion";
import type React from "react";
import { useInView } from "react-intersection-observer";

type Direction = "up" | "down" | "left" | "right"
interface Props {
    children: React.ReactNode,
    direction?: Direction,
    delay?: number,
    duration?: number
}


export default function FadeInSection({ children, delay=0, direction="up", duration=1 }: Props) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
    const directions: Record<Direction, {y:number, x:number}> = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { y: 0, x: 30 },
        right: { y: 0, x: -30 },
    }
    const offset = directions[direction]
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...offset }}
            animate={inView ? {opacity: 1, x: 0, y: 0} : {}}
            transition={{ duration ,delay, ease: "easeOut"}}
        >
            {children}
        </motion.div>
    )
}