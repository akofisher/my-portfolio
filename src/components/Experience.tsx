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
    <section id="experience" className="max-w-6xl mx-auto p-6 py-20">
      <h2 className="text-3xl font-bold mb-8">Experience</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {experience.map((p) => (
          <div
            key={p.title}
            className="p-6 bg-white cursor-pointer  shadow rounded-2xl hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-600">{p.title}</h3>
            <p className="mt-2 opacity-80">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
