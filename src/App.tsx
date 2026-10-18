import { useState } from "react";
import Navbar from "./components/NavBar";
import Home from "./sections/Home";
import type { Language } from "./i18n";

function App() {
  const [language, setLanguage] = useState<Language>("en");
  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} />
      <Home language={language} />
    </>
  );
}

export default App;
