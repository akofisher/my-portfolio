export default function Contact() {
  return (
    <section id="contact" className="bg-gray-100 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Contact Me</h2>

        <p className="mt-4 opacity-80">
          Interested in working together? Let’s talk.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href="mailto:akolekveishvili@gmail.com"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            akolekveishvili@gmail.com
          </a>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
            <a
              href="https://wa.me/995557404359"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white rounded-full hover:opacity-90 transition"
            >
              WhatsApp
            </a>

            <a
              href="viber://chat?number=995557404359"
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:opacity-90 transition"
            >
              Viber
            </a>

            <a
              href="https://www.linkedin.com/in/akaki-lekveishvili-4a5094183"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-700 text-white rounded-full hover:opacity-90 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
