import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import Header from '../components/Header';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm here to provide mental health support and guidance. How are you feeling today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  useEffect(() => {
    // scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety')) {
      return "I understand you're feeling anxious. Try this breathing exercise: Breathe in for 4 counts, hold for 4, breathe out for 6. Anxiety is temporary and you can get through this. What specific situation is making you feel anxious?";
    }
    
    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      return "I'm sorry you're feeling down. It's okay to feel sad sometimes - it's a normal human emotion. Have you been able to talk to anyone about how you're feeling? Sometimes sharing with friends, family, or a counselor can help.";
    }
    
    if (message.includes('stress') || message.includes('stressed')) {
      return "Stress can be overwhelming, but there are ways to manage it. Try breaking big tasks into smaller ones, take regular breaks, and practice self-care. What's causing the most stress for you right now?";
    }
    
    if (message.includes('sleep') || message.includes('tired')) {
      return "Good sleep is crucial for mental health. Try to maintain a regular sleep schedule, avoid screens before bed, and create a relaxing bedtime routine. Are you having trouble falling asleep or staying asleep?";
    }
    
    if (message.includes('help') || message.includes('support')) {
      return "I'm here to help! If you need professional support, consider reaching out to a counselor or therapist. You can also contact the crisis helpline at 1-800-273-8255 if you need immediate support. What kind of help are you looking for?";
    }
    
    if (message.includes('thank')) {
      return "You're very welcome! Remember, taking care of your mental health is a sign of strength, not weakness. I'm always here if you need to chat. Is there anything else I can help you with today?";
    }
    
    // Default responses
    const defaultResponses = [
      "Thank you for sharing that with me. Can you tell me more about how you're feeling?",
      "I hear you. It sounds like you're going through a challenging time. What do you think would help you feel better?",
      "That's important to acknowledge. Sometimes just talking about our feelings can be helpful. How long have you been feeling this way?",
      "I appreciate you opening up. Remember that it's okay to not be okay sometimes. What support do you have in your life right now?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

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

    // Simulate bot typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Add bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: generateBotResponse(inputMessage),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header/>
      <div className="bg-white border-b border-gray-200 px-6 py-4">

        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Mental Health Support</h1>
            <p className="text-sm text-gray-600">Available 24/7 for guidance and support</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isBot ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.isBot ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {message.isBot ? (
                  <Bot className="h-4 w-4 text-blue-600" />
                ) : (
                  <User className="h-4 w-4 text-gray-600" />
                )}
              </div>
              
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isBot 
                  ? 'bg-white border border-gray-200 text-gray-900' 
                  : 'bg-blue-600 text-white'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isBot ? 'text-gray-500' : 'text-blue-100'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... Press Enter to send"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={1}
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isTyping ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            This AI assistant provides general mental health support. For urgent situations, please contact emergency services or a crisis helpline.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;