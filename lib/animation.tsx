import { Transition, Variants } from "framer-motion";

// PostHog tactile spring transitions
export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const momentumSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

export const floatUp: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: spring },
};

export const subtlePop: Variants = {
  hidden: { scale: 0.985, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: spring },
};

export const hoverLift = {
  y: -2,
  transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
};
