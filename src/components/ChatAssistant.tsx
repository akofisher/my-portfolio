import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { copy, type Language } from "../i18n";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const PERSONA = `You are an AI assistant on the portfolio website of Akaki Lekveishvili (Ako).
Be professional, friendly, and concise. Answer in the language used by the visitor.
Only use these facts; never invent experience, employers, or personal details.

Akaki is a Senior React Native / React Developer and full-stack JavaScript developer with 5+ years of experience. He builds web and mobile applications with React Native, React, TypeScript, JavaScript, Next.js, Node.js, Express, MongoDB, Mongoose, REST APIs, WebSocket, Redux Toolkit, RTK Query, Tailwind CSS, Material UI, Formik, Yup, Git, Google Cloud VM, Android Studio, and Xcode.

His work includes Gifta.ge, freelance full-stack development, Calendo, Altera, IdeoDigital, NLYC, and Mego.ge. He has experience in e-commerce, booking and scheduling, clinic software, dashboards, real-time interfaces, and iOS/Android apps. He is open to remote and hybrid opportunities. Contact: akolekveishvili@gmail.com, +995 557 404 359.`;

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

    try {
      const res = await fetch("https://chatbot-ypfo.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: PERSONA },
            ...messages.map((message) => ({ role: message.role, content: message.text })),
            { role: "user", content: input },
          ],
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No response";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: language === "ka" ? "ასისტენტი დროებით მიუწვდომელია. გთხოვთ, სცადოთ მოგვიანებით ან დაუკავშირდეთ აკოს ელფოსტით." : "The assistant is temporarily unavailable. Please try again later or contact Ako by email.",
      }]);
    } finally {
      setLoading(false);
    }
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
