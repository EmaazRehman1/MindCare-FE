import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SurveyCard from '../components/SurveyCard';
import { 
  Plus, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Brain,
  Heart,
  BookOpen,
  Users
} from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  comment?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);

  useEffect(() => {
    // Load mock data
    const mockMoods: MoodEntry[] = [
      {
        id: '1',
        date: new Date().toISOString(),
        mood: 4,
        comment: 'Feeling great after my morning workout!'
      },
      {
        id: '2', 
        date: new Date(Date.now() - 86400000).toISOString(),
        mood: 3,
        comment: 'Had a challenging day with exams but feeling okay.'
      },
      {
        id: '3',
        date: new Date(Date.now() - 172800000).toISOString(),
        mood: 5,
        comment: 'Excellent day! Got great feedback on my project.'
      }
    ];
    setRecentMoods(mockMoods);
    
    // Check if user already checked in today
    const today = new Date().toDateString();
    const todayEntry = mockMoods.find(entry => 
      new Date(entry.date).toDateString() === today
    );
    setTodayCheckedIn(!!todayEntry);
  }, []);

  const averageMood = recentMoods.length > 0 
    ? Math.round((recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length) * 10) / 10
    : 0;

  const wellnessTips = [
    "Take a 10-minute walk outside to boost your mood",
    "Practice deep breathing exercises when feeling overwhelmed",
    "Stay hydrated - aim for 8 glasses of water daily",
    "Connect with a friend or family member today"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            How are you feeling today? Let's check in on your mental wellbeing.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-blue-600">{averageMood}/5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Check-ins</p>
                <p className="text-2xl font-bold text-green-600">{recentMoods.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Streak</p>
                <p className="text-2xl font-bold text-purple-600">7 days</p>
              </div>
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Support Used</p>
                <p className="text-2xl font-bold text-orange-600">12x</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Check-in */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Check-in</h2>
              {!todayCheckedIn ? (
                <div className="text-center py-8">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ready for your daily check-in?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Take a moment to reflect on how you're feeling today.
                  </p>
                  <Link
                    to="/mood-checkin"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Start Check-in</span>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    You've already checked in today!
                  </h3>
                  <p className="text-gray-600">
                    Come back tomorrow for your next check-in.
                  </p>
                </div>
              )}
            </div>

            {/* Recent Mood History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Check-ins</h2>
                <Link 
                  to="/mood-history" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              {recentMoods.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentMoods.slice(0, 4).map((mood) => (
                    <SurveyCard
                      key={mood.id}
                      date={mood.date}
                      mood={mood.mood}
                      comment={mood.comment}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No check-ins yet. Start your first one today!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/chatbot"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Talk to AI Support</span>
                </Link>
                
                <Link
                  to="/report"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Brain className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900">Report a Concern</span>
                </Link>
                
                <Link
                  to="/resources"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Mental Health Resources</span>
                </Link>
              </div>
            </div>

            {/* Wellness Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Wellness Tips</h3>
              <div className="space-y-3">
                {wellnessTips.slice(0, 2).map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="bg-blue-600 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-red-700 mb-4">
                If you're in crisis or having thoughts of self-harm, please reach out immediately.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors w-full">
                Call Crisis Hotline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;