import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import { fetchChatbotResponse } from '../api/chatbot';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotPageProps {
  initialMessage?: string; // Optional initial message from reported action
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ initialMessage }) => {
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: '1',
  //     content: initialMessage || "Hello! I'm here to provide mental health support and guidance. How are you feeling today?",
  //     isBot: true,
  //     timestamp: new Date()
  //   },
  // ]);
  const location = useLocation();
   const [messages, setMessages] = useState<Message[]>(() => {

    // Get initial message from location state or use default
    const initialMsg = "Hello! I'm here to provide mental health support and guidance. How are you feeling today?";
    
    return [{
      id: '1',
      content: initialMsg,
      isBot: true,
      timestamp: new Date()
    }];
  });
  const [inputMessage, setInputMessage] = useState(location.state?.initialMessage || '');
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  // If initialMessage changes (passed from props), add it to messages
  useEffect(() => {
    if (initialMessage) {
      setMessages([
        {
          id: Date.now().toString(),
          content: initialMessage,
          isBot: true,
          timestamp: new Date()
        }

      ]);
    }
  }, [initialMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Fetch response from API
      const response = await fetchChatbotResponse(inputMessage);
      
      // Add bot response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.reply,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      
      // Fallback response if API fails
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again later or contact a mental health professional if you need immediate support.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header/>
      <div className="bg-white border-b shadow-sm px-6 py-4 w-full flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Bot className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Mental Health Support</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Online • Available 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[80%] ${
                message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {message.isBot ? (
                    <Bot className="h-4 w-4 text-green-600" />
                  ) : (
                    <User className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                
                <div className="flex flex-col">
                  <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                    message.isBot 
                      ? 'bg-white border text-gray-800 rounded-bl-md' 
                      : 'bg-blue-500 text-white rounded-br-md'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className={`text-xs mt-1 px-2 ${
                    message.isBot ? 'text-gray-500' : 'text-gray-500 text-right'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-green-600" />
                </div>
                <div className="bg-white border px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                rows={1}
                disabled={isTyping}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isTyping ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            This AI provides general mental health support. For emergencies, contact crisis services immediately.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;