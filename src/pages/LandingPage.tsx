import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, Users, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Daily Mood Tracking",
      description: "Track your emotional well-being with simple, intuitive check-ins"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Support Chat",
      description: "Get instant support and guidance from our AI-powered mental health assistant"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Anonymous Reporting", 
      description: "Report concerns safely and anonymously when you need help"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Professional Support",
      description: "Connect with trained counselors and mental health professionals"
    }
  ];

  // const testimonials = [
  //   {
  //     name: "Sarah M.",
  //     role: "Psychology Student",
  //     content: "MindCare helped me track my mood patterns and connect with support when I needed it most.",
  //     rating: 5
  //   },
  //   {
  //     name: "David L.",
  //     role: "Engineering Student", 
  //     content: "The AI chatbot is incredibly helpful for getting quick mental health tips and coping strategies.",
  //     rating: 5
  //   },
  //   {
  //     name: "Emma R.",
  //     role: "Medical Student",
  //     content: "Being able to report concerns anonymously made me feel safe to seek help during a difficult time.",
  //     rating: 5
  //   }
  // ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MindCare</span>
            </div>
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Mental Health{' '}
              <span className="text-blue-600">Matters</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Track your mood, get AI-powered support, and connect with professional help 
              through our comprehensive student mental health platform.
            </p>
            <div className="space-x-4">
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/login" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to monitor, understand, and improve your mental wellbeing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from students who've found support through MindCare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Care of Your Mental Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using MindCare to improve their wellbeing
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">MindCare</span>
            </div>
            <p className="text-gray-400 mb-4">
              Supporting student mental health through technology and compassion.
            </p>
            <div className="text-sm text-gray-500">
              © 2025 MindCare. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;