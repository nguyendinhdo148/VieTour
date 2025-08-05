const ModernTrending = () => {
  return (
    <div className="flex justify-center">
      <div className="relative float-animation">
        {/* Main container with glassmorphism effect */}
        <div className="w-40 h-40 bg-gradient-to-br from-green-400/20 to-green-600/30 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl pulse-glow border border-green-400/20">
          {/* Inner glow circle */}
          <div className="w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-sm border border-white/10">
            {/* Central trending icon with modern styling */}
            <div className="relative">
              <svg
                className="w-16 h-16 text-green-400 drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              {/* Animated dots */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-300 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -left-8 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg opacity-80 animate-pulse"></div>
        <div
          className="absolute -top-6 -right-6 w-4 h-4 bg-gradient-to-br from-green-300 to-green-400 rounded-full shadow-lg opacity-70 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-4 -right-8 w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg opacity-60 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute -bottom-6 -left-6 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg opacity-75 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Base glow effect */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-green-500/20 rounded-full blur-xl"></div>

        {/* Additional trending elements */}
        <div className="absolute top-1/2 -left-12 w-8 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
        <div className="absolute top-1/2 -right-12 w-8 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-60"></div>
      </div>
    </div>
  );
};

export default ModernTrending;
