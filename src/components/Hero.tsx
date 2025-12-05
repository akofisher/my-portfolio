import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold"
      >
        Hi, I'm <span className="text-blue-600">Ako</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-lg opacity-80 max-w-xl"
      >
        ReactJS & React Native Developer — crafting high-performance apps with
        clean architecture.
      </motion.p>

      <a
        href="#experience"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        View My Work
      </a>
    </section>
  );
}
