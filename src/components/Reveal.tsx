"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & {
  as?: "div" | "li" | "section";
  delay?: number;
  y?: number;
  once?: boolean;
};

export default function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  once = true,
  children,
  ...rest
}: Props) {
  const Tag = as === "li" ? motion.li : as === "section" ? motion.section : motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...(rest as HTMLMotionProps<"div"> & HTMLMotionProps<"li"> & HTMLMotionProps<"section">)}
    >
      {children}
    </Tag>
  );
}
