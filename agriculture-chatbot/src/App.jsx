import { useState } from "react";
import ChatBox from "./components/ChatBox";
import Home from "./pages/Home";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center relative">
      {!showChat ? (
        <Home onStart={() => setShowChat(true)} />
      ) : (
        <>
          <ChatBox />
          <button
            onClick={() => setShowChat(false)}
            className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg text-sm flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Home
          </button>
        </>
      )}
    </div>
  );
}

export default App;