import { copy, type Language } from "../i18n";

export default function About({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <section id="about" className="max-w-6xl mx-auto p-6 py-20">
      <h2 className="text-3xl font-bold mb-6">{t.aboutTitle}</h2>

      <p className="leading-relaxed opacity-80 max-w-3xl">
        {t.about}
      </p>
    </section>
  );
}
