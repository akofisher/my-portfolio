import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
  title: string;
  desc: string;
  index: number;
};

export default function ExperienceCard({ title, desc, index }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-transform cursor-pointer"
    >
      {/* Gradient glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition pointer-events-none" />

      <h3 className="relative text-xl font-semibold text-blue-600">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed opacity-80">{desc}</p>
    </motion.div>
  );
}
