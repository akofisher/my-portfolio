import { useState } from "react";
import { copy, type Language } from "../i18n";

export default function Navbar({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  const [open, setOpen] = useState(false);
  const navIds = ["home", "about", "skills", "experience", "contact"];
  const navItems = copy[language].nav;

  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md shadow z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <a
          href="#home"
          className="text-2xl font-bold text-blue-600"
        >
          Ako.dev
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden
             w-12 h-12
             flex items-center justify-center
             text-2xl
             rounded-lg
             active:scale-95
             transition"
          aria-label="Open menu"
        >
          ☰
        </button>

        <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6">
          {navItems.map((item, index) => (
            <li key={navIds[index]}>
              <a
                href={`#${navIds[index]}`}
                className="hover:text-blue-600"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-white px-6 pb-4 flex flex-col gap-4 shadow">
          {navItems.map((item, index) => (
            <li key={navIds[index]}>
              <a
                href={`#${navIds[index]}`}
                className="block py-2"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
          <li><LanguageSwitch language={language} setLanguage={setLanguage} /></li>
        </ul>
      )}
    </nav>
  );
}

function LanguageSwitch({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  return <div className="flex rounded-lg border border-blue-200 overflow-hidden text-sm">
    <button onClick={() => setLanguage("en")} className={`px-2 py-1 ${language === "en" ? "bg-blue-600 text-white" : "bg-white"}`}>EN</button>
    <button onClick={() => setLanguage("ka")} className={`px-2 py-1 ${language === "ka" ? "bg-blue-600 text-white" : "bg-white"}`}>ქა</button>
  </div>;
}
