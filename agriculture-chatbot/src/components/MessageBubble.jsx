const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  
  // Format text with line breaks and simple markdown
  const formatText = (text) => {
    if (!text) return text;
    
    // Split text by newlines and map to paragraphs
    const paragraphs = text.split('\n').map((paragraph, index) => {
      // Handle bullet points
      if (paragraph.startsWith('• ')) {
        return <li key={index} className="ml-4">{paragraph.substring(2)}</li>;
      }
      
      // Handle numbered lists
      if (/^\d+\./.test(paragraph)) {
        return <li key={index} className="ml-4">{paragraph.replace(/^\d+\.\s*/, '')}</li>;
      }
      
      // Handle horizontal rules
      if (paragraph === '---') {
        return <hr key={index} className="my-2 border-gray-600" />;
      }
      
      // Handle headers
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="font-bold text-lg mt-2">{paragraph.substring(4)}</h3>;
      }
      
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="font-bold text-xl mt-3">{paragraph.substring(3)}</h2>;
      }
      
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="font-bold text-2xl mt-4">{paragraph.substring(2)}</h1>;
      }
      
      // Regular paragraph
      if (paragraph.trim() !== '') {
        return <p key={index} className="mb-2">{paragraph}</p>;
      }
      
      // Empty line
      return <div key={index} className="mb-2">&nbsp;</div>;
    });
    
    // Group list items
    const groupedElements = [];
    let currentList = [];
    
    paragraphs.forEach((element, index) => {
      if (element && element.type === 'li') {
        currentList.push(element);
      } else {
        if (currentList.length > 0) {
          groupedElements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
          currentList = [];
        }
        if (element) {
          groupedElements.push(element);
        }
      }
    });
    
    if (currentList.length > 0) {
      groupedElements.push(<ul key="list-final" className="list-disc ml-4 mb-2">{currentList}</ul>);
    }
    
    return groupedElements;
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} transition-all`}
    >
      <div
        className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
          isUser
            ? "bg-teal-600 text-white rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-bl-none"
        }`}
      >
        <div className="whitespace-pre-wrap">
          {formatText(text)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;