import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageCircle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { uploadDailyCheckin } from '../api/dailyCheckin';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get current user

const MoodCheckinForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user from auth context
  const [mood, setMood] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const moodEmojis = [
    { emoji: '😢', label: 'Very Sad', value: 'Very Sad', color: 'text-red-500' },
    { emoji: '😟', label: 'Sad', value: 'Sad', color: 'text-orange-500' },
    { emoji: '😐', label: 'Neutral', value: 'Neutral', color: 'text-yellow-500' },
    { emoji: '😊', label: 'Happy', value: 'Happy', color: 'text-green-500' },
    { emoji: '😄', label: 'Very Happy', value: 'Very Happy', color: 'text-blue-500' }
  ];

  const stressLevels = [
    'No stress',
    'Mild stress', 
    'Moderate stress',
    'High stress',
    'Overwhelming stress'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mood === 0) return;
    
    // Prepare data according to your schema
    const formData = {
      user: user?.id, // Include user ID from auth context
      mood: moodEmojis[mood - 1].value, // Convert to string value
      sleepHours,
      stressLevel: stressLevels[stressLevel], // Convert to string value
      notes
    };

    setIsSubmitting(true);
    try {
      await uploadDailyCheckin(formData);
      setShowSuccess(true);
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/chatbot');
      }, 2000);
    } catch (error) {

      console.error('Error uploading daily check-in:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center max-w-md">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Check-in Complete!</h2>
          <p className="text-gray-600">
            Thank you for taking time to check in on your mental health. Your entry has been saved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Daily Mood Check-in</h1>
            </div>
            <p className="mt-2 text-gray-600">
              Take a moment to reflect on how you're feeling today. Your responses help us better support your wellbeing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Mood Selection */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                How are you feeling today?
              </label>
              <div className="grid grid-cols-5 gap-4">
                {moodEmojis.map((moodOption, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMood(index + 1)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      mood === index + 1
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{moodOption.emoji}</div>
                    <div className={`text-sm font-medium ${moodOption.color}`}>
                      {moodOption.label}
                    </div>
                  </button>
                ))}
              </div>
              {mood === 0 && (
                <p className="mt-2 text-sm text-red-600">Please select your mood to continue.</p>
              )}
            </div>

            {/* Sleep Hours */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                How many hours did you sleep last night?
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium min-w-[4rem] text-center">
                  {sleepHours}h
                </div>
              </div>
            </div>

            {/* Stress Level */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                What's your stress level today?
              </label>
              <div className="space-y-2">
                {stressLevels.map((level, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="stress"
                      value={index}
                      checked={stressLevel === index}
                      onChange={() => setStressLevel(index)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-lg font-medium text-gray-900 mb-4">
                Tell us more about your day
              </label>
              <div className="relative">
                <MessageCircle className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="comment"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What's on your mind? Share any thoughts, experiences, or concerns from today..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Your responses are confidential and help our team provide better support.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={mood === 0 || isSubmitting || !notes.trim()}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Check-in'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MoodCheckinForm;