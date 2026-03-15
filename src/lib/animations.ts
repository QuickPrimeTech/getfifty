export const cardAnim = {
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};
