import { useState } from "react";
import MessageBubble from "./MessageBubble";
import axios from "axios";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "👋 Hello! I'm Samarth — your agricultural insights assistant. Ask me anything about rainfall, crop production, or trends!\n\nTry asking questions like:\n• Compare the rainfall in Maharashtra and Karnataka\n• Show me rice production trends\n• Analyze agricultural policy for drought-resistant crops" 
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await axios.post("https://agriculture-chatbot-gmqi.onrender.com/api/query", { query: input });
      
      // Format the response with sources
      let responseText = res.data.answer;
      if (res.data.sources && res.data.sources.length > 0) {
        responseText += "\n\n---\nSources:\n";
        res.data.sources.forEach((source, index) => {
          responseText += `${index + 1}. ${source.name} - ${source.description}\n`;
        });
      }
      
      const botMessage = { sender: "bot", text: responseText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = { 
        sender: "bot", 
        text: "❌ Sorry, I couldn't fetch data right now. Please try again later." 
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const exampleQueries = [
    "Compare rice production in Maharashtra and Karnataka",
    "Show me rainfall trends in Pune district",
    "Analyze policy for promoting drought-resistant crops"
  ];

  const handleExampleClick = (query) => {
    setInput(query);
  };

  return (
    <div className="bg-gray-800 rounded-2xl w-[700px] h-[80vh] flex flex-col shadow-lg border border-gray-700">
      {/* Header */}
      <div className="bg-gray-900 p-4 rounded-t-2xl border-b border-gray-700">
        <h2 className="text-xl font-bold text-teal-400 flex items-center gap-2">
          <span className="bg-teal-500 w-3 h-3 rounded-full"></span>
          Project Samarth
        </h2>
        <p className="text-xs text-gray-400 mt-1">Intelligent Agricultural Insights Assistant</p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 rounded-lg rounded-bl-none p-3 max-w-[75%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Example Queries */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(query)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded cursor-pointer transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3">
        <textarea
          className="flex-1 bg-gray-700 p-3 rounded-lg text-white focus:outline-none resize-none"
          placeholder="Ask about crop production, rainfall trends, or policy analysis..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          rows="1"
        />
        <button
          className={`bg-teal-500 hover:bg-teal-600 px-5 py-3 rounded-lg flex items-center justify-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
