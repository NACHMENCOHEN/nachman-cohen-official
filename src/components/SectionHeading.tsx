import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
    className="text-center mb-16"
  >
    <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">{title}</h2>
    {subtitle && (
      <p className="text-muted-foreground font-body max-w-lg mx-auto">{subtitle}</p>
    )}
  </motion.div>
);

export default SectionHeading;
