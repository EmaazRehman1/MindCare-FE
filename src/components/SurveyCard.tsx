import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';

interface SurveyCardProps {
  date: string;
  mood: number;
  comment?: string;
  onClick?: () => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ date, mood, comment, onClick }) => {
  const getMoodEmoji = (score: number) => {
    const emojis = ['😢', '😟', '😐', '😊', '😄'];
    return emojis[score - 1] || '😐';
  };

  const getMoodColor = (score: number) => {
    const colors = [
      'text-red-500',
      'text-orange-500', 
      'text-yellow-500',
      'text-green-500',
      'text-blue-500'
    ];
    return colors[score - 1] || 'text-gray-500';
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        <div className="text-2xl">
          {getMoodEmoji(mood)}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm font-medium text-gray-700">Mood:</span>
        <span className={`text-sm font-semibold ${getMoodColor(mood)}`}>
          {mood}/5
        </span>
      </div>

      {comment && (
        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p className="line-clamp-2">{comment}</p>
        </div>
      )}
    </div>
  );
};

export default SurveyCard;