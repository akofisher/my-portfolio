export type Language = "en" | "ka";

export const copy = {
  en: {
    nav: ["Home", "About", "Skills", "Experience", "Contact"],
    heroTitle: "Hi, I'm Ako",
    heroText: "Senior React Native / React Developer and full-stack JavaScript developer.",
    downloadCv: "Download CV",
    aboutTitle: "About me",
    about: "I’m Akaki Lekveishvili, a software developer with 5+ years of experience building production web and mobile applications. I work with React Native, React, TypeScript, and Next.js, and take products from architecture and reusable UI systems through API integration, backend development, cloud deployment, and iOS/Android releases. My experience includes e-commerce, booking and scheduling, clinic management, dashboards, and real-time interfaces.",
    skillsTitle: "Technical skills",
    experienceTitle: "Professional experience",
    contactTitle: "Let's work together",
    contactText: "Available for remote and hybrid opportunities.",
    chatbot: "Ask Ako's assistant",
    typeMessage: "Ask about experience, skills, or availability…",
    send: "Send",
    cvEn: "English CV",
    cvKa: "ქართული CV",
  },
  ka: {
    nav: ["მთავარი", "ჩემ შესახებ", "უნარები", "გამოცდილება", "კონტაქტი"],
    heroTitle: "გამარჯობა, მე აკო ვარ",
    heroText: "Senior React Native / React დეველოპერი და Full-stack JavaScript დეველოპერი.",
    downloadCv: "CV-ის ჩამოტვირთვა",
    aboutTitle: "ჩემ შესახებ",
    about: "მე ვარ აკაკი ლეკვეიშვილი, პროგრამული უზრუნველყოფის დეველოპერი 5+ წლიანი გამოცდილებით. ვქმნი რეალურ გარემოში გამოყენებულ ვებ და მობილურ აპლიკაციებს React Native, React, TypeScript და Next.js ტექნოლოგიებით. პროექტს ვუძღვები არქიტექტურის დაგეგმვიდან და მრავალჯერადი UI კომპონენტებიდან API ინტეგრაციამდე, Backend-ის განვითარებამდე, Cloud განთავსებამდე და iOS/Android რელიზებამდე. ჩემი გამოცდილება მოიცავს ელექტრონულ კომერციას, ჯავშნის სისტემებს, კლინიკების მართვის პროგრამებს, ადმინისტრაციულ პანელებსა და რეალურ დროში მონაცემების ინტერფეისებს.",
    skillsTitle: "ტექნიკური უნარები",
    experienceTitle: "სამუშაო გამოცდილება",
    contactTitle: "მოდი ვიმუშაოთ ერთად",
    contactText: "ღია ვარ დისტანციური და ჰიბრიდული შესაძლებლობებისთვის.",
    chatbot: "ჰკითხეთ აკოს ასისტენტს",
    typeMessage: "იკითხეთ გამოცდილების, უნარების ან ხელმისაწვდომობის შესახებ…",
    send: "გაგზავნა",
    cvEn: "English CV",
    cvKa: "ქართული CV",
  },
} as const;

export const experiences = {
  en: [
    ["Founder & Full-Stack Developer — Gifta.ge", "May 2026 – Present · Founded and developed a web and mobile gifting platform using Next.js, React Native, Node.js, Express, MongoDB, and Google Cloud."],
    ["Freelance Full-Stack Developer", "Jul 2025 – Present · Delivering custom web and mobile applications, responsive dashboards, API-driven flows, validation, and state management."],
    ["Frontend Software Engineer — Calendo", "Jan 2025 – Jul 2025 · Built a React booking and scheduling application from the ground up with responsive forms and Laravel API integrations."],
    ["Frontend Software Engineer — Altera", "Oct 2023 – Jan 2025 · Developed production web and mobile applications with React, React Native, TypeScript, reusable components, APIs, and validation."],
    ["React Native Developer — IdeoDigital", "Aug 2023 – Aug 2024 · Led the LeoYourSkincare rewrite and built the EspressoClub app from scratch."],
    ["React & React Native Developer — NLYC / Mego.ge", "Oct 2021 – Mar 2023 · Delivered web and mobile features, UI systems, reusable components, and API integrations."],
  ],
  ka: [
    ["დამფუძნებელი და Full-stack დეველოპერი — Gifta.ge", "2026 წლის მაისი – დღემდე · ვქმნი ნივთების გაცვლისა და გაჩუქების ვებ და მობილურ პლატფორმას Next.js, React Native, Node.js, Express, MongoDB და Google Cloud-ით."],
    ["Freelance Full-stack დეველოპერი", "2025 წლის ივლისი – დღემდე · ვქმნი კლიენტებისთვის ვებ და მობილურ აპლიკაციებს, ადაპტირებულ პანელებს, API-ზე დაფუძნებულ ფუნქციებსა და ვალიდაციას."],
    ["Frontend Software Engineer — Calendo", "2025 წლის იანვარი – ივლისი · ნულიდან შევქმენი React-ზე დაფუძნებული ჯავშნისა და განრიგის მართვის ვებ აპლიკაცია."],
    ["Frontend Software Engineer — Altera", "2023 წლის ოქტომბერი – 2025 წლის იანვარი · ვავითარებდი რეალურ გარემოში გამოყენებულ ვებ და მობილურ აპლიკაციებს React და React Native-ით."],
    ["React Native დეველოპერი — IdeoDigital", "2023 წლის აგვისტო – 2024 წლის აგვისტო · ვუხელმძღვანელე LeoYourSkincare-ის განახლებას და ნულიდან შევქმენი EspressoClub."],
    ["React და React Native დეველოპერი — NLYC / Mego.ge", "2021 წლის ოქტომბერი – 2023 წლის მარტი · ვქმნიდი ვებ და მობილურ ფუნქციონალს, UI სისტემებსა და API ინტეგრაციებს."],
  ],
} as const;
