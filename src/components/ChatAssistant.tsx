import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const PERSONA = `
You are an AI assistant on a portfolio website representing Ako (Akaki Lekveishvili). 
Your audience is HRs, recruiters, and hiring managers, so be professional and respectful.

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
      const res = await fetch("https://chatbot-ypfo.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: PERSONA },
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: "user", content: input },
          ],
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.choices[0]?.message?.content || "No response";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I have a lot of work to do, write to me in 2 minutes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-[90vw] max-w-xs sm:w-80 h-[70vh] sm:h-96 bg-white shadow-xl rounded-xl mt-2 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-blue-600 text-white p-3 font-semibold">
              Chat with Ako's Assistant
              <button
                onClick={() => setOpen(false)}
                className="text-white font-bold hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
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

            {/* Input */}
            <div className="flex border-t p-2 gap-2 bg-white">
              <input
                className="flex-1 border rounded-lg px-3 py-2 outline-none text-sm sm:text-base focus:ring-2 focus:ring-blue-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
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
