"use client";

import { motion, type Variants } from "framer-motion";

type AnimatedDivProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedDiv({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
}: AnimatedDivProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
