import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import type { Language } from "../i18n";

export default function Home({ language }: { language: Language }) {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero language={language} />
      <About language={language} />
      <Skills language={language} />
      <Experience language={language} />
      <Contact language={language} />
    </main>
  );
}
