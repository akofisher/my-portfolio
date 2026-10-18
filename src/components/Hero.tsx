import { motion } from "framer-motion";
import ChatAssistant from "./ChatAssistant";
import HeroBackground from "./HeroBackground";
import { copy, type Language } from "../i18n";

export default function Hero({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* 3D Background */}
      <HeroBackground />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold"
      >
        {t.heroTitle}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-lg opacity-80 max-w-xl"
      >
        {t.heroText}
      </motion.p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={`${import.meta.env.BASE_URL}Akaki_Lekveishvili_2026_EN.pdf`} download className="px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">{t.cvEn}</a>
        <a href={`${import.meta.env.BASE_URL}Akaki_Lekveishvili_2026_KA.pdf`} download className="px-5 py-3 border border-blue-600 text-blue-700 rounded-full hover:bg-blue-50 transition">{t.cvKa}</a>
      </div>

      <ChatAssistant language={language} />
    </section>
  );
}
