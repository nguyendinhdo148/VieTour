import { API } from "@/utils/constant";
import axios from "axios";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Xin chào! Tôi là VieJobs Assistant.\n\nTôi có thể giúp bạn:\n• Gợi ý việc làm phù hợp\n• Tạo CV chuyên nghiệp\n• Tư vấn kỹ năng phỏng vấn\n• Tra cứu lương ngành nghề\n• Giải đáp thắc mắc về tuyển dụng\n\n🔗 Xem danh sách việc làm tại VieJobs: http://localhost:5173/jobs\n🔗 Tạo CV tại VieJobs: http://localhost:5173/resume\n\nBạn muốn bắt đầu với điều gì ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input, timestamp: new Date() };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/ai/chat_with_ai`, {
        message: input,
      });
      const answer = res.data.answer;
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text: answer || "Xin lỗi, tôi chưa thể trả lời lúc này.",
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
          timestamp: new Date(),
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-br from-blue-100 to-blue-300 border border-blue-200 rounded-full shadow-lg p-1 transition-transform hover:scale-110 hover:shadow-xl"
        onClick={() => setOpen((o) => !o)}
        aria-label="Mở chatbot"
        style={{ boxShadow: "0 2px 8px rgba(25,118,210,0.12)" }}
      >
        <img
          src="/chat-icon.webp"
          alt="Chatbot"
          className="size-12 rounded-full transition-transform hover:scale-110"
        />
      </button>
      {open && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/30 z-50"
            aria-label="Đóng chatbot"
          />
          {/* Chat window */}
          <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] max-h-[540px] bg-white rounded-3xl shadow-2xl flex flex-col z-[1001] border border-blue-100 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <img
                  src="/chat-icon.webp"
                  alt=""
                  className="size-11 rounded-full border-2 border-blue-200 shadow"
                />
                <div>
                  <h3 className="font-bold text-blue-900 text-lg flex items-center gap-1">
                    VieJobs Assistant
                    <span className="ml-1 inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </h3>
                  <p className="text-xs text-blue-500 font-medium">
                    Trợ lý AI tìm việc thông minh
                  </p>
                </div>
              </div>
              <button
                className="border-none bg-transparent text-2xl cursor-pointer text-blue-400 hover:text-blue-700 transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Đóng chatbot"
              >
                ×
              </button>
            </div>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gradient-to-b from-blue-50/60 to-white/80 custom-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[85%] px-4 py-3 shadow-sm
                      ${
                        msg.from === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md"
                          : "bg-white text-gray-800 border border-blue-100 rounded-2xl rounded-bl-md"
                      }
                      transition-all duration-200
                    `}
                    style={{
                      boxShadow:
                        msg.from === "user"
                          ? "0 2px 8px #1976d233"
                          : "0 1px 6px #90caf933",
                    }}
                  >
                    {msg.from === "bot" ? (
                      renderBotMessage(msg.text)
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                    )}
                    {msg.timestamp && (
                      <p
                        className={`text-xs mt-1 ${
                          msg.from === "user"
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 text-blue-400">
                      <span className="text-xs">Đang trả lời</span>
                      <div className="flex gap-1">
                        <div className="size-1 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="size-1 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="size-1 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input Form */}
            <form
              onSubmit={sendMessage}
              className="p-4 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-white rounded-b-3xl"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-200 text-sm bg-white focus:bg-blue-50 shadow-sm"
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="submit"
                  className={`
                    px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                    flex items-center justify-center min-w-[3rem]
                    ${
                      loading || !input.trim()
                        ? "bg-blue-100 text-blue-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transform cursor-pointer"
                    }
                  `}
                  disabled={loading || !input.trim()}
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </div>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #e3eafc;
              border-radius: 8px;
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(40px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-fade-in {
              animation: fade-in 0.35s cubic-bezier(.4,0,.2,1);
            }
          `}</style>
        </>
      )}
    </>
  );
};

function renderBotMessage(text: string) {
  if (text.startsWith("Dưới đây là một số việc làm")) {
    const lines = text.split("\n").filter(Boolean);
    const jobs = [];
    for (let i = 1; i < lines.length; i += 2) {
      const titleLine = lines[i];
      const linkLine = lines[i + 1] || "";
      const titleMatch = titleLine.match(/^(\d+)\. (.+)$/);
      const linkMatch = linkLine.match(/Xem chi tiết: (.+)$/);
      if (titleMatch && linkMatch) {
        jobs.push({
          stt: titleMatch[1],
          info: titleMatch[2],
          url: linkMatch[1],
        });
      }
    }
    return (
      <div className="p-0">
        <div className="mb-2 font-semibold text-blue-700 text-[15.5px] flex items-center">
          <span className="mr-1.5">📝</span>
          {lines[0]}
        </div>
        <div className="flex flex-col gap-3">
          {jobs.map((job, idx) => {
            const isInternal =
              job.url.startsWith("/jobs/description/") ||
              job.url.startsWith(window.location.origin + "/jobs/description/");
            const path = job.url.startsWith(window.location.origin)
              ? job.url.replace(window.location.origin, "")
              : job.url;
            return (
              <div
                key={idx}
                className="bg-blue-50 rounded-lg px-4 py-2 shadow-sm flex flex-col text-[15px] border border-blue-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-xs shrink-0">
                    {job.stt}
                  </span>
                  <span className="font-semibold text-blue-900 text-[15px] leading-tight text-left">
                    {job.info}
                  </span>
                </div>
                <div className="pl-7">
                  {isInternal ? (
                    <Link
                      to={path}
                      className="text-blue-700 underline font-medium text-[14px] mt-1 flex items-center gap-1 transition-colors duration-200 hover:text-blue-900 break-all"
                    >
                      <span className="inline-block text-base">🔗</span> Xem chi
                      tiết
                    </Link>
                  ) : (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline font-medium text-[14px] mt-1 flex items-center gap-1 transition-colors duration-200 hover:text-blue-900 break-all"
                    >
                      <span className="inline-block text-base">🔗</span> Xem chi
                      tiết
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  // Nếu không phải danh sách job, render từng dòng riêng biệt
  const urlRegex = /(https?:\/\/[^\s]+|\/jobs\/description\/\w+)/g;
  const parts = text.split("\n");
  return (
    <div className="flex flex-col gap-1">
      {parts.map((line, idx) => {
        const subparts = line.split(urlRegex);
        return (
          <div key={idx}>
            {subparts.map((part, i) => {
              if (urlRegex.test(part)) {
                const isRelative = part.startsWith("/jobs/description/");
                const href = isRelative ? window.location.origin + part : part;
                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline font-semibold break-all hover:text-blue-900"
                  >
                    {part}
                  </a>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Chatbot;
