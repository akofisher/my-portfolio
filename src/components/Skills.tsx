const skills = [
  "javascript",
  "typescript",
  "reactjs",
  "react native",
  "Three.js",
  "css",
  "scss",
  "tailwindcss",
  "material ui",
  "bootstrap",
  "redux",
  "redux toolkit",
  "redux thunk",
  "redux persist",
  "mobx",
  "react context",
  "rtk query",
  "axios",
  "fetch api",
  "websocket",
  "code splitting",
  "formik",
  "git",
  "github",
  "jira",
  "tempo",
  "android studio",
  "xcode",
  "npm",
  "yarn",
];

export default function Skills() {
  return (
    <section id="skills" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Skills</h2>

        <div className="flex flex-wrap gap-4">
          {skills.map((s) => (
            <span
              key={s}
              className="px-4 cursor-pointer py-2 bg-white shadow rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
