export const fadeIn = (direction: string, delay: number) => ({
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0, delay: 0 },
  viewport: { once: true },
});
