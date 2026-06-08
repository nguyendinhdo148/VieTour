import { API, URL } from "@/utils/constant";
import axios from "axios";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: `👋 Xin chào! Tôi là Dining Assistant.\n\nTôi có thể giúp bạn:\n• Tìm kiếm nhà hàng, quán ăn ngon\n• Cập nhật chương trình ưu đãi, voucher\n• Hỗ trợ đặt bàn nhanh chóng\n• Gợi ý món ăn theo sở thích\n\n🔗 Xem danh sách ưu đãi: ${URL}/programs\n\nBạn muốn tìm kiếm món gì hôm nay?`,
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
          text: "Có lỗi kết nối hệ thống. Vui lòng thử lại sau.",
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
                    Dining Assistant
                    <span className="ml-1 inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </h3>
                  <p className="text-xs text-blue-500 font-medium">
                    Trợ lý AI tư vấn ẩm thực & đặt bàn
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
                        className={`text-xs mt-1.5 ${
                          msg.from === "user" ? "text-blue-100" : "text-gray-400"
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
                      <span className="text-xs">Đang tìm kiếm</span>
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
                  placeholder="Nhập món ăn, tên quán hoặc mức giá..."
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

// ==============================
// CUSTOM PARSER: Xử lý chuỗi AI trả về
// ==============================

// Hàm xử lý Markdown cơ bản (Bold và Links) an toàn
function renderInlineMarkdown(text: string) {
  const boldParts = text.split(/(\*\*.*?\*\*)/g);
  return boldParts.map((part, index) => {
    // In đậm: **nội dung**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-blue-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Xử lý link markdown: [text](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
    const linkParts = part.split(linkRegex);

    if (linkParts.length > 1) {
      const elements = [];
      for (let i = 0; i < linkParts.length; i += 3) {
        elements.push(<span key={`text-${i}`}>{linkParts[i]}</span>);
        if (i + 1 < linkParts.length) {
          const linkText = linkParts[i + 1];
          const linkUrl = linkParts[i + 2];
          elements.push(
            <a
              key={`link-${i}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900 mx-1"
            >
              {linkText}
            </a>
          );
        }
      }
      return <span key={index}>{elements}</span>;
    }

    // Xử lý link trần: https://...
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const plainUrlParts = part.split(urlRegex);
    return (
      <span key={index}>
        {plainUrlParts.map((sub, j) =>
          urlRegex.test(sub) ? (
            <a
              key={`url-${j}`}
              href={sub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline break-all hover:text-blue-900"
            >
              {sub}
            </a>
          ) : (
            <span key={`plain-${j}`}>{sub}</span>
          )
        )}
      </span>
    );
  });
}

function renderBotMessage(text: string) {
  // === 1. NẾU LÀ KẾT QUẢ TÌM KIẾM NHÀ HÀNG / CHƯƠNG TRÌNH ===
  if (text.includes("### 🍽️ Tìm thấy")) {
    const headerMatch = text.match(/### 🍽️ ([^\n]+)/);
    const headerText = headerMatch ? headerMatch[1].replace(/\*\*/g, "") : "Kết quả tìm kiếm:";

    const items = [];
    // Tách các khối data nhà hàng bằng regex
    const blockRegex = /\*\*(\d+)\.\s(.*?)\*\*\r?\n(.*?)\r?\n🔗\s\[(.*?)\]\((.*?)\)/g;
    let match;
    while ((match = blockRegex.exec(text)) !== null) {
      items.push({
        stt: match[1],
        title: match[2].replace(/\*\*/g, ""),     // VD: Khuyến mãi tại Sushi
        details: match[3].replace(/\*\*/g, ""),   // VD: 💰 Mức giá... • 📍 Hà Nội
        url: match[5],                            // Link chi tiết
      });
    }

    return (
      <div className="p-0">
        <div className="mb-3 font-bold text-blue-800 text-[15px] flex items-center leading-snug">
          <span className="mr-1.5 text-lg">🍽️</span>
          {headerText}
        </div>
        
        <div className="flex flex-col gap-3">
          {items.map((item, idx) => {
            const isInternal =
              item.url.startsWith("/program/detail/") ||
              item.url.startsWith("/job/detail/") ||
              item.url.startsWith(window.location.origin);
              
            const path = item.url.startsWith(window.location.origin)
              ? item.url.replace(window.location.origin, "")
              : item.url;

            return (
              <div
                key={idx}
                className="bg-blue-50/80 rounded-xl p-3 shadow-sm flex flex-col text-[14.5px] border border-blue-100 transition-colors hover:bg-blue-50"
              >
                {/* Dòng tên chương trình */}
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="w-5 h-5 mt-0.5 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-[11px] shrink-0">
                    {item.stt}
                  </span>
                  <span className="font-semibold text-blue-900 leading-snug text-left">
                    {item.title}
                  </span>
                </div>
                
                {/* Dòng mô tả (giá, vị trí) */}
                <div className="pl-7 flex flex-col gap-1.5">
                  <span className="text-gray-600 text-[13px] leading-relaxed">
                    {item.details}
                  </span>
                  
                  {/* Nút xem chi tiết */}
                  {isInternal ? (
                    <Link
                      to={path}
                      className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-100/50 hover:bg-blue-200/50 w-fit px-2.5 py-1 rounded-md font-medium text-[13px] transition-colors duration-200"
                    >
                      <span>🔗</span> Xem chi tiết và Đặt bàn
                    </Link>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-100/50 hover:bg-blue-200/50 w-fit px-2.5 py-1 rounded-md font-medium text-[13px] transition-colors duration-200"
                    >
                      <span>🔗</span> Xem chi tiết và Đặt bàn
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-xs text-blue-500 italic">
          💡 Bạn có thể hỏi thêm về khu vực, mức giá...
        </div>
      </div>
    );
  }

  // === 2. NẾU LÀ ĐOẠN CHAT / TƯ VẤN THÔNG THƯỜNG ===
  const parts = text.split("\n");
  return (
    <div className="flex flex-col gap-1">
      {parts.map((line, idx) => (
        <div key={idx} className="min-h-[1.25rem] text-[15px]">
          {renderInlineMarkdown(line)}
        </div>
      ))}
    </div>
  );
}

export default Chatbot;