export const fadeIn = (direction, delay) => ({
  initial: { opacity: 0, y: direction === "up" ? 40 : -40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 },
});
