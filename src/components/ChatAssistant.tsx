import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { copy, type Language } from "../i18n";

type Message = {
  role: "user" | "assistant";
  text: string;
};

type KnowledgeTopic = {
  terms: string[];
  en: string;
  ka: string;
};

const KNOWLEDGE: KnowledgeTopic[] = [
  {
    terms: ["experience", "year", "background", "career", "senior", "mid", "გამოცდილ", "წელი", "კარიერ"],
    en: "Ako has 5+ years of professional experience delivering production web and mobile applications. His roles include Founder & Full-Stack Developer at Gifta.ge, freelance full-stack work, and engineering roles at Calendo, Altera, IdeoDigital, NLYC, and Mego.ge.",
    ka: "აკოს აქვს 5+ წლიანი პროფესიული გამოცდილება რეალურ გარემოში გამოყენებული ვებ და მობილური აპლიკაციების შექმნაში. მუშაობდა Gifta.ge-ზე, ფრილანსზე, Calendo-ში, Altera-ში, IdeoDigital-ში, NLYC-სა და Mego.ge-ში.",
  },
  {
    terms: ["skill", "stack", "technology", "react", "react native", "typescript", "javascript", "უნარ", "ტექნოლოგ", "რეაქტ"],
    en: "His core stack is React Native, React, TypeScript, JavaScript, and Next.js. He also works with Redux Toolkit, RTK Query, REST APIs, WebSocket, Node.js, Express, MongoDB, Mongoose, Tailwind CSS, Material UI, Formik, Yup, Git, Android Studio, and Xcode.",
    ka: "აკოს ძირითადი ტექნოლოგიებია React Native, React, TypeScript, JavaScript და Next.js. ასევე მუშაობს Redux Toolkit-ით, RTK Query-თი, REST API-ებით, WebSocket-ით, Node.js-ით, Express-ით, MongoDB-ით, Tailwind CSS-ით, Android Studio-თი და Xcode-ით.",
  },
  {
    terms: ["project", "portfolio", "built", "product", "gifta", "calendo", "altera", "project", "პროექტ", "გააკეთ", "შექმნ"],
    en: "Ako has built e-commerce platforms, booking and scheduling systems, clinic-management software, dashboards, real-time interfaces, and iOS/Android apps. At Gifta.ge, he owns a web and mobile gifting platform built with Next.js, React Native, Node.js, Express, and MongoDB.",
    ka: "აკოს შექმნილი აქვს ელექტრონული კომერციის პლატფორმები, ჯავშნისა და განრიგის სისტემები, კლინიკების მართვის პროგრამები, დეშბორდები, რეალურ დროში მონაცემების ინტერფეისები და iOS/Android აპლიკაციები. Gifta.ge-ზე ის ქმნის ვებ და მობილურ პლატფორმას Next.js, React Native, Node.js, Express და MongoDB-ით.",
  },
  {
    terms: ["backend", "full stack", "node", "express", "database", "mongodb", "api", "ბექენდ", "სერვერ", "მონაცემ"],
    en: "Alongside frontend work, Ako develops full-stack features with Node.js, Express, MongoDB, and Mongoose. He integrates REST APIs and WebSockets, builds authenticated flows and dashboards, and has experience with cloud hosting and deployment workflows.",
    ka: "Frontend გამოცდილების გარდა, აკო ქმნის Full-stack ფუნქციონალს Node.js, Express, MongoDB და Mongoose-ით. მუშაობს REST API და WebSocket ინტეგრაციებზე, ავტორიზებულ პროცესებზე, დეშბორდებსა და Cloud ჰოსტინგზე.",
  },
  {
    terms: ["mobile", "ios", "android", "app store", "google play", "მობილურ", "ანდროიდ", "აპლიკაცი"],
    en: "Ako specialises in React Native and has delivered iOS and Android applications. His experience includes app architecture, reusable components, API handling, state management, Android Studio, Xcode, App Store, and Google Play release workflows.",
    ka: "აკო სპეციალიზდება React Native-ში და შექმნილი აქვს iOS და Android აპლიკაციები. მისი გამოცდილება მოიცავს აპის არქიტექტურას, მრავალჯერად კომპონენტებს, API-ებთან მუშაობას, მდგომარეობის მართვას, Android Studio-ს, Xcode-სა და App Store/Google Play რელიზებს.",
  },
  {
    terms: ["available", "availability", "hire", "job", "remote", "hybrid", "opportunity", "დასაქმ", "დისტანც", "ჰიბრიდ", "ვაკანს"],
    en: "Ako is open to remote and hybrid opportunities. For a role or project discussion, you can contact him directly at akolekveishvili@gmail.com or +995 557 404 359.",
    ka: "აკო ღიაა დისტანციური და ჰიბრიდული შესაძლებლობებისთვის. ვაკანსიის ან პროექტის შესახებ შეგიძლიათ დაუკავშირდეთ: akolekveishvili@gmail.com ან +995 557 404 359.",
  },
  {
    terms: ["contact", "email", "phone", "linkedin", "reach", "კონტაქტ", "იმეილ", "ტელეფონ", "ლინკდინ"],
    en: "You can contact Ako at akolekveishvili@gmail.com or +995 557 404 359. His LinkedIn is linked in the Contact section below.",
    ka: "აკოსთან დაკავშირება შეგიძლიათ ელფოსტით: akolekveishvili@gmail.com ან ტელეფონით: +995 557 404 359. LinkedIn ბმული მოცემულია ქვემოთ, კონტაქტის სექციაში.",
  },
  {
    terms: ["education", "university", "language", "english", "georgian", "education", "განათლებ", "უნივერსიტეტ", "ენა", "ინგლის"],
    en: "Ako holds a Bachelor of Business & Technology from Ilia State University. He speaks Georgian natively, and English and Russian at B2 level.",
    ka: "აკოს აქვს ილიას სახელმწიფო უნივერსიტეტის ბიზნესისა და ტექნოლოგიების ბაკალავრის ხარისხი. ქართული მისი მშობლიური ენაა; ინგლისურსა და რუსულს ფლობს B2 დონეზე.",
  },
];

function getResponse(question: string, messages: Message[], language: Language) {
  const normalised = question.toLocaleLowerCase();
  const isGeorgian = /[\u10A0-\u10FF]/.test(question) || language === "ka";
  const greeting = /^(hi|hello|hey|გამარჯობა|გაგიმარჯოს)/.test(normalised.trim());
  const matches = KNOWLEDGE
    .map((topic) => ({ topic, score: topic.terms.reduce((total, term) => total + (normalised.includes(term) ? 1 : 0), 0) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (greeting && matches.length === 0) {
    return isGeorgian
      ? "გამარჯობა! მე ვარ აკოს პორტფოლიოს ასისტენტი. შეგიძლიათ მკითხოთ მისი გამოცდილების, ტექნოლოგიების, პროექტების, ხელმისაწვდომობის ან საკონტაქტო ინფორმაციის შესახებ."
      : "Hello! I’m Ako’s portfolio assistant. Ask me about his experience, technical stack, projects, availability, or contact details.";
  }

  if (matches.length > 0) {
    const answers = matches.map(({ topic }) => isGeorgian ? topic.ka : topic.en);
    return answers.join("\n\n");
  }

  const hasConversation = messages.some((message) => message.role === "assistant");
  return isGeorgian
    ? hasConversation
      ? "ამ კითხვაზე ზუსტი ინფორმაცია ჩემს მონაცემებში არ მაქვს და არ მინდა ვარაუდი გავაკეთო. შემიძლია უფრო კონკრეტულად გიპასუხოთ აკოს გამოცდილების, React/React Native სტეკის, პროექტების, დასაქმების ფორმატის ან კონტაქტის შესახებ."
      : "ამ საკითხზე ზუსტი ინფორმაცია არ მაქვს, ამიტომ არ მინდა არაზუსტი პასუხი მოგცეთ. შემიძლია დაგეხმაროთ აკოს გამოცდილების, ტექნოლოგიების, პროექტების, ხელმისაწვდომობის ან კონტაქტის შესახებ."
    : hasConversation
      ? "I don’t have verified information for that, so I don’t want to guess. I can give more detail about Ako’s experience, React/React Native stack, projects, work preferences, or contact details."
      : "I don’t have verified information for that, so I don’t want to guess. You can ask about Ako’s experience, technologies, projects, availability, or contact details.";
}

export default function ChatAssistant({ language }: { language: Language }) {
  const t = copy[language];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    window.setTimeout(() => {
      const reply = getResponse(input, messages, language);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setLoading(false);
    }, Math.min(900, 350 + input.length * 8));
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {open ? null : (
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition sm:px-5 sm:py-2.5"
        >
          {t.chatbot}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-[90vw] max-w-xs sm:w-80 h-[70vh] sm:h-96 bg-white shadow-xl rounded-xl mt-2 flex flex-col overflow-hidden border border-gray-200"
          >
            <div className="flex justify-between items-center bg-blue-600 text-white p-3 font-semibold">
              {t.chatbot}
              <button
                onClick={() => setOpen(false)}
                className="text-white font-bold hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50 flex flex-col">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] break-words p-3 rounded-xl text-left ${
                    m.role === "user"
                      ? "bg-blue-600 text-white self-end rounded-tr-none"
                      : "bg-gray-200 text-gray-900 self-start rounded-tl-none"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <div className="italic text-gray-500 text-sm">
                  Assistant is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex border-t p-2 gap-2 bg-white">
              <input
                className="flex-1 border rounded-lg px-3 py-2 outline-none text-sm sm:text-base focus:ring-2 focus:ring-blue-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.typeMessage}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                {t.send}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
