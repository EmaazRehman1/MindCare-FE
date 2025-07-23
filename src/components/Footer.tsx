import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-400" />
              <span className="text-xl font-bold">MindCare</span>
            </div>
            <p className="text-gray-400 text-sm">
              Supporting student mental health through technology and compassion.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Crisis Helpline</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mental Health Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Self-Care Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support Groups</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>Crisis Line: 1-800-273-8255</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>emergency@mindcare.edu</span>
              </div>
              <div className="mt-4 p-3 bg-red-900 rounded-lg">
                <p className="text-red-200 text-xs">
                  If you're in immediate danger, please call 911 or go to your nearest emergency room.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 MindCare. All rights reserved. Made with care for student wellbeing.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;