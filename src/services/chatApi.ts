export async function sendMessage(message: string) {
  try {
    const res = await fetch("https://ako-chatbot.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) throw new Error("Network response not ok");

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error(err);
    return "გაუგებარი შეცდომა მოხდა.";
  }
}
