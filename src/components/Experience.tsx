import ExperienceCard from "./ExperienceCard";
import { copy, experiences, type Language } from "../i18n";

export default function Experience({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        {t.experienceTitle}
      </h2>

      <div className="grid md:grid-cols-2 gap-8 perspective-[1200px]">
        {experiences[language].map(([title, desc], i) => (
          <ExperienceCard
            key={title}
            title={title}
            desc={desc}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
