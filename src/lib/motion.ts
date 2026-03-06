import type { Variants } from "framer-motion";

export const viewportOnce = { once: true, amount: 0.2 } as const;

export const staggerContainer = (delay = 0, stagger = 0.12): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

export const fadeUp = (distance = 24, duration = 0.55): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const fadeIn = (duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const slideIn = (x = 32, duration = 0.55): Variants => ({
  hidden: { opacity: 0, x },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});
