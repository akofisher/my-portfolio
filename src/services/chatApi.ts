export async function sendMessage(message: string) {
  const res = await fetch("https://ako-chatbot.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.reply;
}
