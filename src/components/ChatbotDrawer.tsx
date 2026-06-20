import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, Sparkles, AlertCircle, Bot, CornerDownRight, ThumbsUp, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const defaultSuggestions = [
  "How can I become an active volunteer?",
  "Tell me about primary education programs.",
  "Which cities do you currently operate in?",
  "How are donations spent on field projects?",
];

export default function ChatbotDrawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Namaste! 🙏 I am Pankhie, NayePankh's Interactive AI Social Guide. I can share details of our active classrooms, micro health camps, volunteering scopes, or tell you what your support can change. How can I inspire you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: "us_" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsThinking(true);
    setErrorMessage(null);

    try {
      // Build proper chat history context list to send to backend /api/chat statefully
      const contextHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextHistory }),
      });

      if (!res.ok) {
        throw new Error("Pankhie server API responded with fault code.");
      }

      const data = await res.json();
      
      const assistantMsg: Message = {
        id: "as_" + Date.now(),
         role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Could not connect with Pankhie due to network limits. Please check credentials or try again.");
    } finally {
      setIsThinking(false);
    }
  };

  const selectSuggestion = (sug: string) => {
    handleSendMessage(sug);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 text-white cursor-pointer ${
            isOpen
              ? "bg-slate-800 dark:bg-slate-700"
              : "bg-rose-500 hover:bg-rose-600 shadow-rose-500/30 hover:shadow-rose-600/40 hover:-translate-y-1"
          }`}
          id="floating-chatbot-toggle-button"
        >
          {isOpen ? (
            <span className="text-sm font-semibold">Close Guide</span>
          ) : (
            <>
              <div className="relative">
                <Bot className="h-5 w-5 animate-pulse" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <span className="text-sm font-bold tracking-tight">Chat with Pankhie</span>
            </>
          )}
        </button>
      </div>

      {/* Slide-out Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-40 cursor-pointer pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: 80, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-24 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[410px] h-[580px] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col cursor-default"
              id="chatbot-drawer-frame"
            >
              {/* Drawer Header */}
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-950/80 dark:to-slate-900 text-white p-4.5 flex justify-between items-center border-b border-rose-50 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10 relative">
                    <Bot className="h-5.5 w-5.5 text-white" />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-950" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1">
                      Pankhie AI Guide <Sparkles className="h-3.5 w-3.5 text-rose-200 fill-rose-200 animate-pulse" />
                    </h4>
                    <span className="text-[10px] text-rose-100 font-mono tracking-wider uppercase">
                      NayePankh Impact Associate
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 px-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold leading-none cursor-pointer text-white flex items-center justify-center"
                  title="Close Guideline Panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 dark:bg-slate-900/40">
                {messages.map((message) => {
                  const isAssistant = message.role === "assistant";
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[85%] ${isAssistant ? "" : "flex flex-col items-end"}`}>
                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed font-sans shadow-sm ${
                            isAssistant
                              ? "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-slate-850"
                              : "bg-rose-500 text-white rounded-tr-none font-medium"
                          }`}
                        >
                          {/* Render line breaks correctly */}
                          <div className="whitespace-pre-line prose prose-slate max-w-none dark:prose-invert">
                            {message.content}
                          </div>
                        </div>

                        {/* Timestamp or like indicator */}
                        <div className="flex items-center gap-1.5 mt-1 px-1">
                          <span className="text-[9px] text-slate-400 font-mono font-medium">
                            {message.timestamp}
                          </span>
                          {isAssistant && message.id !== "init" && (
                            <button className="text-[10px] text-slate-350 hover:text-rose-400 flex items-center gap-0.5" title="Helpful">
                              <ThumbsUp className="h-2.5 w-2.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* thinking animation bubble */}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-950 p-3.5 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-850 flex items-center gap-1.5 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-rose-400 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[10px] font-mono text-slate-400 ml-1">Pankhie thinking...</span>
                    </div>
                  </div>
                )}

                {/* error message block */}
                {errorMessage && (
                  <div className="p-3 text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-350 border border-amber-200 dark:border-amber-900 rounded-xl flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion tags drawer (only displayed at base or standard intervals) */}
              {messages.length === 1 && (
                <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-50 dark:border-slate-850">
                  <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1.5 px-1.5">
                    Suggested topics
                  </span>
                  <div className="flex flex-col gap-1">
                    {defaultSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => selectSuggestion(sug)}
                        className="text-left py-1.5 px-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-600 dark:text-slate-350 hover:text-rose-600 text-[10px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1 cursor-pointer"
                      >
                        <CornerDownRight className="h-3 w-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{sug}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Drawer Footer Input */}
              <div className="p-3.5 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Pankhie anything about NayePankh..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage(userInput);
                  }}
                  disabled={isThinking}
                  className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 focus:bg-white"
                  id="chatbot-drawer-input"
                />
                <button
                  onClick={() => handleSendMessage(userInput)}
                  disabled={isThinking || !userInput.trim()}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 text-white flex items-center justify-center ${
                    userInput.trim() && !isThinking
                      ? "bg-rose-500 hover:bg-rose-600"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  }`}
                  id="chatbot-send-message-button"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
