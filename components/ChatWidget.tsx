
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../geminiService';

// Simple event-based trigger for external components
let triggerBookingFn: () => void;
export const triggerBooking = () => triggerBookingFn && triggerBookingFn();

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Ayubowan! Welcome to OceanView Boutique Hotel. I'm your virtual receptionist. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize external trigger
  useEffect(() => {
    triggerBookingFn = () => {
      setIsOpen(true);
      handleExternalBookingRequest();
    };
  }, [messages, isLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleExternalBookingRequest = async () => {
    // Check if we already started a booking flow to avoid duplication
    if (messages.some(m => m.text.toLowerCase().includes("book a stay"))) return;

    const intentText = "I would like to book a stay at your hotel.";
    const userMsg: Message = { role: 'user', text: intentText };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    const response = await sendMessageToGemini(messages, intentText);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleSend = async (manualInput?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessageToGemini([...messages, userMsg], textToSend);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-slate-200 animate-fade-in">
          {/* Header */}
          <div className="bg-cyan-700 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-xl border-2 border-cyan-500">
                  <i className="fa-solid fa-hotel"></i>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-cyan-700"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Booking Assistant</h3>
                <p className="text-[10px] text-cyan-100 uppercase tracking-widest font-bold">
                  AI-Powered Concierge
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-cyan-600 p-2 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-cyan-700 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Actions (Optional but helpful) */}
          {!isLoading && messages.length < 3 && !isOpen && (
             <div className="px-4 pb-2 bg-slate-50 flex space-x-2 overflow-x-auto">
               <button 
                onClick={() => handleSend("Tell me about room prices")}
                className="whitespace-nowrap bg-white border border-cyan-200 text-cyan-700 text-[10px] font-bold uppercase px-3 py-1 rounded-full hover:bg-cyan-50 transition-colors"
               >
                 Room Prices
               </button>
               <button 
                onClick={() => handleSend("What time is check-in?")}
                className="whitespace-nowrap bg-white border border-cyan-200 text-cyan-700 text-[10px] font-bold uppercase px-3 py-1 rounded-full hover:bg-cyan-50 transition-colors"
               >
                 Check-in Time
               </button>
             </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex space-x-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your reply here..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-600 outline-none placeholder-slate-400"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white p-3 rounded-xl transition-all w-12 h-12 flex items-center justify-center shadow-lg active:scale-90"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group w-16 h-16 bg-cyan-700 hover:bg-cyan-800 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95 relative"
      >
        {isOpen ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-comment-dots"></i>}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-md">
            1
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
