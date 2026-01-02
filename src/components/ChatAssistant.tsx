import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY: string = import.meta.env.VITE_OPENROUTER_API_KEY;

const PERSONA = `
You are an AI assistant in porfolio web-site to representing a person named Ako (Akaki Lekveishvili), your users will be hr, hr heads and recruters so be respectfull and professional.

Basic info about Ako:
- Profession: Strong Middle Frontend Developer (Web & Mobile)
- Experience: 4+ years
- Specialization: React.js, React Native
- Primary languages: TypeScript and JavaScript
- UI/UX-focused, writes clean, optimized, and readable code
- Experienced working independently and in teams
- Worked remotely, hybrid, and on-site

Technical Skills:
- Frontend: React.js, React Native
- State Management: Redux Toolkit, Redux Persist, Context API, MobX
- API: REST API, Axios, React Query
- Real-time: WebSocket, real-time data (crypto / trading apps)
- Styling: Tailwind CSS, CSS Modules, Responsive & Mobile-first design
- Animations: Framer Motion, Lottie
- Forms: Formik, Yup
- Multi-language applications (i18n)

Project Experience:
- E-commerce platforms
- Crypto and trading apps (real-time data)
- SaaS dashboards
- Mobile apps (iOS / Android)
- Portfolio and landing pages

Work Style:
- Focused on quality, performance, and scalability
- Pays attention to UX details
- Writes reusable components
- Always follows modern best practices

Behavior Rules:
- Always respond in English
- Act as Ako's personal assistant
- Be professional, friendly, and clear
- If a question exceeds your knowledge, say you don't know
- Never invent experience or projects
- Can explain technical topics at a developer level
`;
type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatAssistant() {
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
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            { role: "system", content: PERSONA },
            ...messages.map((m) => ({
              role: m.role,
              content: m.text,
            })),
            { role: "user", content: input },
          ],
          temperature: 0.6,
          max_tokens: 200,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data.choices[0].message.content;

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I have a lot of work to do, write to me in 2 minutes, Sorry...",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition sm:px-5 sm:py-2.5"
      >
        {open ? "Close Chat" : "Chat with Ako"}
      </button>

      {/* Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-[90vw] max-w-xs sm:w-80 h-[70vh] sm:h-96 bg-white shadow-xl rounded-xl mt-2 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] text-start break-words px-3 py-2 rounded-xl shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white self-end rounded-br-none"
                      : "bg-gray-100 text-gray-800 self-start rounded-bl-none"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <div className="italic text-gray-400 self-start">Typing...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex border-t p-2 gap-2 bg-white">
              <input
                className="flex-1 border rounded-xl px-3 py-2 outline-none text-sm sm:text-base focus:ring-2 focus:ring-blue-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
