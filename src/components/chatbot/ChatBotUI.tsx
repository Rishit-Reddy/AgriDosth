import { useState } from 'react';
import { XCircleIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
// import chatbotAvatar from '../../assets/chatbotAvatar.png'; // Assuming you have an avatar image
import '..//../assets/css/ChatbotUI.css';

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);
  const handleMessageChange = (event:any) => setMessage(event.target.value);
  const handleSendMessage = () => {
    console.log("Message Sent: ", message); // Placeholder for sending message
    setMessage(''); // Clear input after sending
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={toggleChat} className="bg-green-500 text-while p-3 rounded-full hover:bg-green-600 focus:outline-none shadow-lg">
        {isOpen ? <XCircleIcon className="h-6 w-6" /> : <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-green-500 rounded-lg shadow-lg w-80">
          <div className="flex items-center mb-4">
            {/* <img src={} alt="Chatbot Avatar" className="h-10 w-10 rounded-full mr-3" /> */}
            <h2 className="font-semibold text-white text-lg">Ask CropNeeds AI</h2>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="overflow-y-auto h-64 bg-gray-100 p-2 rounded-lg">
              {/* Display messages here */}
              <p className="text-gray-600 text-sm">Hello! How can I assist you today?</p>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotUI;
