import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/contact";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: () => sendMessage(formData),
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(true);
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error || "something went wrong");
      setTimeout(() => {
        setIsError("");
      }, 10000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <main className="min-h-screen" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-center mb-8 text-white">Contact Us</h1>

        <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl  p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">
                Thank you for your message!
              </h2>
              <p className="text-ink-300 mb-6">
                We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-ink-200 hover:text-white font-medium transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-ink-200 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-2xl text-white placeholder:text-ink-400 focus:outline-none focus:border-white/30 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink-200 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-2xl text-white placeholder:text-ink-400 focus:outline-none focus:border-white/30 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-ink-200 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-2xl text-white placeholder:text-ink-400 focus:outline-none focus:border-white/30 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-ink-200 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-2xl text-white placeholder:text-ink-400 focus:outline-none focus:border-white/30 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                  placeholder="Your message..."
                ></textarea>
              </div>
              {/* Error Message */}
              {isError && (
                <div className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-2xl">
                  {isError}
                </div>
              )}

              <div className="flex justify-end ">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex justify-center items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send
                      <FiSend className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};