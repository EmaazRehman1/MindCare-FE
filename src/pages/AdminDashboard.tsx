import React, { useState, useEffect } from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Eye,
  ChevronDown
} from 'lucide-react';
import NotificationBadge from '../components/NotificationBadge';

interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  type: 'mood' | 'report';
  mood?: number;
  concernType?: string;
  urgency?: 'low' | 'medium' | 'high';
  date: string;
  description: string;
  isAnonymous?: boolean;
  status: 'new' | 'reviewed' | 'follow-up';
}

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    urgency: 'all',
    status: 'all',
    dateRange: '7'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load mock data
    const mockSubmissions: StudentSubmission[] = [
      {
        id: '1',
        studentId: 'ST001',
        studentName: 'John Doe',
        type: 'report',
        concernType: 'Anxiety or panic attacks',
        urgency: 'high',
        date: new Date().toISOString(),
        description: 'Having frequent panic attacks during exam week. Need immediate support.',
        status: 'new'
      },
      {
        id: '2',
        studentId: 'ST002',
        studentName: 'Anonymous',
        type: 'report',
        concernType: 'Suicidal thoughts',
        urgency: 'high',
        date: new Date(Date.now() - 3600000).toISOString(),
        description: 'Having thoughts of self-harm. Need help but want to remain anonymous.',
        isAnonymous: true,
        status: 'new'
      },
      {
        id: '3',
        studentId: 'ST003',
        studentName: 'Jane Smith',
        type: 'mood',
        mood: 2,
        date: new Date(Date.now() - 7200000).toISOString(),
        description: 'Feeling very down lately. Academic pressure is overwhelming.',
        status: 'reviewed'
      },
      {
        id: '4',
        studentId: 'ST004',
        studentName: 'Mike Johnson',
        type: 'report',
        concernType: 'Academic stress',
        urgency: 'medium',
        date: new Date(Date.now() - 86400000).toISOString(),
        description: 'Struggling to keep up with coursework. Feel like I\'m falling behind.',
        status: 'follow-up'
      },
      {
        id: '5',
        studentId: 'ST005',
        studentName: 'Sarah Wilson',
        type: 'mood',
        mood: 4,
        date: new Date(Date.now() - 172800000).toISOString(),
        description: 'Had a good therapy session today. Feeling more hopeful.',
        status: 'reviewed'
      }
    ];
    
    setSubmissions(mockSubmissions);
    setFilteredSubmissions(mockSubmissions);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = submissions;

    if (selectedFilters.type !== 'all') {
      filtered = filtered.filter(s => s.type === selectedFilters.type);
    }

    if (selectedFilters.urgency !== 'all') {
      filtered = filtered.filter(s => s.urgency === selectedFilters.urgency);
    }

    if (selectedFilters.status !== 'all') {
      filtered = filtered.filter(s => s.status === selectedFilters.status);
    }

    if (selectedFilters.dateRange !== 'all') {
      const days = parseInt(selectedFilters.dateRange);
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(s => new Date(s.date) >= cutoff);
    }

    setFilteredSubmissions(filtered);
  }, [selectedFilters, submissions]);

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-50';
      case 'reviewed': return 'text-green-600 bg-green-50';
      case 'follow-up': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😟', '😐', '😊', '😄'];
    return emojis[mood - 1] || '😐';
  };

  const criticalCount = submissions.filter(s => 
    (s.urgency === 'high' || (s.mood && s.mood <= 2)) && s.status === 'new'
  ).length;

  const newSubmissionsCount = submissions.filter(s => s.status === 'new').length;

  const averageMood = submissions
    .filter(s => s.mood)
    .reduce((sum, s, _, arr) => sum + (s.mood || 0) / arr.length, 0);

  const handleStatusChange = (submissionId: string, newStatus: string) => {
    setSubmissions(prev => 
      prev.map(s => s.id === submissionId ? { ...s, status: newStatus as any } : s)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor student mental health submissions and provide support</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
                  <NotificationBadge count={criticalCount} />
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-green-600">{averageMood.toFixed(1)}/5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Submissions</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-purple-600">{newSubmissionsCount}</p>
                  <NotificationBadge count={newSubmissionsCount} />
                </div>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-lg font-semibold text-gray-900">Student Submissions</h2>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={selectedFilters.type}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="mood">Mood Check-ins</option>
                    <option value="report">Reports</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select
                    value={selectedFilters.urgency}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, urgency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Urgency</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedFilters.status}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select
                    value={selectedFilters.dateRange}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Time</option>
                    <option value="1">Last 24 Hours</option>
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Submissions List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {submission.studentName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.type === 'mood' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {submission.type === 'mood' ? 'Mood Check-in' : 'Report'}
                        </span>
                        {submission.mood && (
                          <span className="text-lg">{getMoodEmoji(submission.mood)}</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {submission.concernType && (
                          <div className="font-medium text-red-600 mb-1">
                            {submission.concernType}
                          </div>
                        )}
                        {submission.description}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.urgency && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(submission.urgency)}`}>
                          {submission.urgency.charAt(0).toUpperCase() + submission.urgency.slice(1)}
                        </span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.date).toLocaleDateString()}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={submission.status}
                        onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full border-0 px-2 py-1 ${getStatusColor(submission.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="follow-up">Follow-up</option>
                      </select>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;