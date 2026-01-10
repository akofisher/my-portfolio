import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = ["Home", "About", "Skills", "Experience", "Contact"];

  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md shadow z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <a
          onClick={() => {
            window.location.href = "#home";
            window.location.reload();
          }}
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

        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-600"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-white px-6 pb-4 flex flex-col gap-4 shadow">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="block py-2"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
