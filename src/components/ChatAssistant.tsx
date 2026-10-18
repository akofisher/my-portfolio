import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { copy, type Language } from "../i18n";

type Message = {
  role: "user" | "assistant";
  text: string;
};

function answer(question: string, language: Language) {
  const q = question.toLowerCase();
  const ka = language === "ka";
  if (/contact|email|phone|კონტაქტ|იმეილ|ტელეფონ/.test(q)) return ka ? "აკოსთან დაკავშირება შეგიძლიათ ელფოსტით: akolekveishvili@gmail.com ან ტელეფონით: +995 557 404 359." : "You can reach Ako at akolekveishvili@gmail.com or +995 557 404 359.";
  if (/available|remote|hybrid|work|availability|დასაქმ|დისტანც|ჰიბრიდ/.test(q)) return ka ? "აკო ღიაა დისტანციური და ჰიბრიდული შესაძლებლობებისთვის." : "Ako is available for remote and hybrid opportunities.";
  if (/experience|years|project|გამოცდილ|პროექტ/.test(q)) return ka ? "აკოს აქვს 5+ წლიანი გამოცდილება. მუშაობდა Gifta.ge-ზე, Calendo-ზე, Altera-ზე, IdeoDigital-ზე, NLYC-სა და Mego.ge-ზე; გამოცდილება მოიცავს e-commerce, ჯავშნის სისტემებს, დეშბორდებსა და მობილურ აპებს." : "Ako has 5+ years of experience, including Gifta.ge, Calendo, Altera, IdeoDigital, NLYC, and Mego.ge. His work includes e-commerce, booking systems, dashboards, and mobile apps.";
  if (/skill|react|native|typescript|stack|უნარ|ტექნოლოგ|რეაქტ/.test(q)) return ka ? "ძირითადი ტექნოლოგიებია React Native, React, TypeScript, JavaScript და Next.js. ასევე მუშაობს Node.js, Express, MongoDB, Redux Toolkit, RTK Query, Tailwind CSS და WebSocket-ით." : "Ako’s core stack is React Native, React, TypeScript, JavaScript, and Next.js. He also works with Node.js, Express, MongoDB, Redux Toolkit, RTK Query, Tailwind CSS, and WebSocket.";
  return ka ? "შემიძლია გიპასუხოთ აკოს გამოცდილების, ტექნიკური უნარების, პროექტების, ხელმისაწვდომობისა და საკონტაქტო ინფორმაციის შესახებ." : "I can help with Ako’s experience, technical skills, projects, availability, or contact details.";
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
      setMessages((prev) => [...prev, { role: "assistant", text: answer(input, language) }]);
      setLoading(false);
    }, 250);
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
