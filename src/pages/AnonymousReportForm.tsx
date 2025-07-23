import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';

const AnonymousReportForm: React.FC = () => {
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [concernType, setConcernType] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const concernTypes = [
    'Academic stress',
    'Anxiety or panic attacks',
    'Depression or low mood',
    'Relationship issues',
    'Family problems',
    'Financial stress',
    'Eating disorders',
    'Substance abuse',
    'Self-harm thoughts',
    'Suicidal thoughts',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Can wait a few days', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Should be addressed soon', color: 'text-yellow-600' },
    { value: 'high', label: 'High - Needs immediate attention', color: 'text-red-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concernType || !description.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Redirect after showing success message
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center max-w-md">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-4">
            Thank you for reaching out. Your report has been received and will be reviewed by our mental health team.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              {isAnonymous 
                ? "Your report was submitted anonymously as requested."
                : "Our team may reach out to you for follow-up support."
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Report a Concern</h1>
            </div>
            <p className="mt-2 text-gray-600">
              Share any mental health concerns safely and confidentially. Our trained counselors will review your report and provide appropriate support.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Anonymous Toggle */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isAnonymous ? (
                    <EyeOff className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <h3 className="font-medium text-blue-900">Anonymous Reporting</h3>
                    <p className="text-sm text-blue-700">
                      {isAnonymous 
                        ? "Your identity will remain completely confidential"
                        : "Our team may contact you for follow-up support"
                      }
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAnonymous ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAnonymous ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Concern Type */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                What type of concern would you like to report?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {concernTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="concernType"
                      value={type}
                      checked={concernType === type}
                      onChange={(e) => setConcernType(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {!concernType && (
                <p className="mt-2 text-sm text-red-600">Please select a concern type.</p>
              )}
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                How urgent is this concern?
              </label>
              <div className="space-y-3">
                {urgencyLevels.map((level) => (
                  <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value={level.value}
                      checked={urgency === level.value}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className={`font-medium ${level.color}`}>{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-900 mb-3">
                Please describe your concern in detail
              </label>
              <textarea
                id="description"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share as much detail as you're comfortable with. Include any specific incidents, feelings, or circumstances that are concerning you..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                The more information you provide, the better we can help you.
              </p>
            </div>

            {/* Emergency Notice */}
            {urgency === 'high' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-red-900">Immediate Support Available</h3>
                    <p className="text-sm text-red-700 mt-1">
                      If you're in immediate danger or having thoughts of self-harm, please contact:
                    </p>
                    <ul className="text-sm text-red-700 mt-2 space-y-1">
                      <li>• Emergency Services: 911</li>
                      <li>• Crisis Text Line: Text HOME to 741741</li>
                      <li>• National Suicide Prevention Lifeline: 1-800-273-8255</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={!concernType || !description.trim() || isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting Report...</span>
                  </div>
                ) : (
                  'Submit Report'
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

export default AnonymousReportForm;