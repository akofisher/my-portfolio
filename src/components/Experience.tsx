import ExperienceCard from "./ExperienceCard";

const experience = [
  {
    title: "Calendo Web Application",
    desc: "Developed a complete web application from scratch to production. Built reusable UI architecture and scalable component systems using ReactJS and JavaScript.",
    link: "",
  },
  {
    title: "Altera Web & Mobile Applications",
    desc: "Built full web and mobile applications from zero to production. Designed scalable architecture, UI systems, and API integrations using ReactJS, React Native, TypeScript, and JavaScript.",
    link: "",
  },
  {
    title: "LeoYourSkincare Mobile App",
    desc: "Led a complete rewrite of the app on the newest React Native version. Implemented new state management, redesigned UI, and added new functionalities and API integrations.",
    link: "",
  },
  {
    title: "EspressoClub Mobile App",
    desc: "Developed the entire mobile application from scratch, including folder structure, UI system, state management, API handling, and reusable dynamic components using React Native, JavaScript, and TypeScript.",
    link: "",
  },
  {
    title: "NLYC Projects (PSP Pharmacy, BetliveClub, BlueChipSport)",
    desc: "Delivered features for multiple web and mobile applications using ReactJS and React Native with TypeScript and JavaScript.",
    link: "",
  },
  {
    title: "Mego.ge Web & Mobile Frontend",
    desc: "Sole frontend developer for web and mobile applications. Built complete UI, state management, and integrations using ReactJS, React Native, JavaScript, and TypeScript.",
    link: "",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Experience
      </h2>

      <div className="grid md:grid-cols-2 gap-8 perspective-[1200px]">
        {experience.map((item, i) => (
          <ExperienceCard
            key={item.title}
            title={item.title}
            desc={item.desc}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
