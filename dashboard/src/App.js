import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, MessageCircle, CheckCircle, XCircle, 
  AlertCircle, Activity, BarChart3, PieChart as PieChartIcon,
  Download, Upload, RefreshCw
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('overview');

  // Combined data: Sawwaf (130) + Razan (245) + Agent Data 1 (75) + Agent Data 2 (28) + New Data 3 (85) + New Data 4 (85) = 648 conversations
  const dashboardData = {
    overview: {
      totalConversations: 648,
      averageConfidence: 42.8,
      processedDate: '2025-01-27',
      assignee: 'Sawwaf + Razan + Agent Analysis - Combined'
    },
    effectiveness: {
      reengagement: { yes: 452, no: 196 },
      sale: { yes: 51, no: 597 },
      botCanDo: { yes: 495, no: 153 }
    },
    labels: [
      { name: 'No response from client', value: 279, percentage: 43.0 },
      { name: 'No matching maids found', value: 139, percentage: 21.4 },
      { name: 'Agent intervened for follow-up', value: 43, percentage: 6.6 },
      { name: 'Department transfers', value: 35, percentage: 5.4 },
      { name: 'Client requests for human', value: 25, percentage: 3.9 },
      { name: 'Contract exceptions', value: 20, percentage: 3.1 },
      { name: 'Bot issues & wrong info', value: 26, percentage: 4.0 },
      { name: 'Price & payment issues', value: 12, percentage: 1.8 },
      { name: 'Fully handled by bot', value: 4, percentage: 0.6 },
      { name: 'Other patterns', value: 28, percentage: 4.3 }
    ],
    patterns: [
      { name: 'No Response', value: 279, color: '#FF6B6B' },
      { name: 'No Matching Maids', value: 139, color: '#4ECDC4' },
      { name: 'Agent Follow-up', value: 43, color: '#45B7D1' },
      { name: 'Department Transfers', value: 35, color: '#96CEB4' },
      { name: 'Client Requests', value: 25, color: '#FFEAA7' },
      { name: 'Contract Exceptions', value: 20, color: '#DDA0DD' },
      { name: 'Other Patterns', value: 28, color: '#A8E6CF' }
    ],
    confidenceDistribution: [
      { range: '0-20%', count: 102, color: '#FF6B6B' },
      { range: '20-40%', count: 178, color: '#FFA726' },
      { range: '40-60%', count: 136, color: '#66BB6A' },
      { range: '60-80%', count: 58, color: '#42A5F5' },
      { range: '80-100%', count: 37, color: '#AB47BC' }
    ]
  };

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData(dashboardData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Comprehensive Analysis Dashboard</h1>
                <p className="text-sm text-gray-500">Sawwaf + Razan + Agent Data - 648 Conversations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['overview', 'effectiveness', 'patterns', 'details'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedView === view
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedView === 'overview' && <OverviewView data={data} />}
        {selectedView === 'effectiveness' && <EffectivenessView data={data} />}
        {selectedView === 'patterns' && <PatternsView data={data} />}
        {selectedView === 'confidence' && <ConfidenceView data={data} />}
        {selectedView === 'details' && <DetailsView data={data} />}
      </main>
    </div>
  );
}

// Overview Component
function OverviewView({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Conversations"
          value={data.overview.totalConversations}
          icon={MessageCircle}
          color="blue"
          trend="+398%"
        />
        <MetricCard
          title="Average Confidence"
          value={`${data.overview.averageConfidence}%`}
          icon={Activity}
          color="green"
          trend="+6%"
        />
        <MetricCard
          title="Reengagement Rate"
          value="69.8%"
          icon={TrendingUp}
          color="purple"
          trend="+9%"
        />
        <MetricCard
          title="Bot Success Rate"
          value="76.4%"
          icon={CheckCircle}
          color="indigo"
          trend="+11%"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Label Distribution" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.labels}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage, index }) => {
                  // Only show labels for top 4 categories
                  if (index < 4) {
                    return `${name} (${percentage}%)`;
                  }
                  return ''; // No label for smaller slices
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.labels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Effectiveness Overview" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Reengagement', YES: data.effectiveness.reengagement.yes, NO: data.effectiveness.reengagement.no },
              { name: 'Sale', YES: data.effectiveness.sale.yes, NO: data.effectiveness.sale.no },
              { name: 'Bot Can Do', YES: data.effectiveness.botCanDo.yes, NO: data.effectiveness.botCanDo.no }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="YES" fill="#00C49F" />
              <Bar dataKey="NO" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.div>
  );
}

// Effectiveness Component
function EffectivenessView({ data }) {
  const effectivenessData = [
    {
      name: 'Reengagement',
      yes: data.effectiveness.reengagement.yes,
      no: data.effectiveness.reengagement.no,
      yesPercentage: (data.effectiveness.reengagement.yes / 648 * 100).toFixed(1),
      noPercentage: (data.effectiveness.reengagement.no / 648 * 100).toFixed(1)
    },
    {
      name: 'Sale',
      yes: data.effectiveness.sale.yes,
      no: data.effectiveness.sale.no,
      yesPercentage: (data.effectiveness.sale.yes / 648 * 100).toFixed(1),
      noPercentage: (data.effectiveness.sale.no / 648 * 100).toFixed(1)
    },
    {
      name: 'Bot Can Do',
      yes: data.effectiveness.botCanDo.yes,
      no: data.effectiveness.botCanDo.no,
      yesPercentage: (data.effectiveness.botCanDo.yes / 648 * 100).toFixed(1),
      noPercentage: (data.effectiveness.botCanDo.no / 648 * 100).toFixed(1)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {effectivenessData.map((item, index) => (
          <div key={item.name} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.name}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">YES</span>
                <span className="text-lg font-bold text-green-600">{item.yes}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.yesPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">NO</span>
                <span className="text-lg font-bold text-red-600">{item.no}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.noPercentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChartCard title="Effectiveness Trends" className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={effectivenessData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="yes" stackId="1" stroke="#00C49F" fill="#00C49F" />
            <Area type="monotone" dataKey="no" stackId="1" stroke="#FF8042" fill="#FF8042" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </motion.div>
  );
}

// Patterns Component
function PatternsView({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Pattern Distribution" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.patterns}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.patterns.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Pattern Analysis" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.patterns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pattern Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.patterns.map((pattern, index) => (
            <div key={pattern.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: pattern.color }}
              />
              <div>
                <p className="font-medium text-gray-900">{pattern.name}</p>
                <p className="text-sm text-gray-500">{pattern.value} conversations</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Confidence Component
function ConfidenceView({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Confidence Distribution" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.confidenceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Confidence Trends" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.confidenceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confidence Analysis</h3>
        <div className="space-y-4">
          {data.confidenceDistribution.map((item, index) => (
            <div key={item.range} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-gray-900">{item.range}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-gray-900">{item.count}</span>
                <span className="text-sm text-gray-500">
                  {((item.count / 648) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Details Component
function DetailsView({ data }) {
  const uncategorizedPatterns = [
    { pattern: "Client got mad", count: 8, percentage: 1.2 },
    { pattern: "Chasing customer", count: 4, percentage: 0.6 },
    { pattern: "Consumer asked about the training hours", count: 4, percentage: 0.6 },
    { pattern: "Customer was asking about nannies breaking the rules", count: 3, percentage: 0.5 },
    { pattern: "First Message by Agent", count: 3, percentage: 0.5 },
    { pattern: "Reference check with their previous employer in dubai", count: 2, percentage: 0.3 },
    { pattern: "Consumer Requested Scheduling Interview", count: 2, percentage: 0.3 },
    { pattern: "Two system transfers", count: 1, percentage: 0.2 },
    { pattern: "Fully handled by bot", count: 1, percentage: 0.2 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Uncategorized Patterns (28 cases - 4.3%)</h3>
        <p className="text-sm text-gray-600 mb-6">Detailed breakdown of patterns that don't fit into the main categories</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pattern Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uncategorizedPatterns.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                    {item.pattern}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.pattern.includes('payment') ? 'Price & Payment Issues' :
                     item.pattern.includes('training') ? 'Training Inquiries' :
                     item.pattern.includes('rules') ? 'Policy Questions' :
                     item.pattern.includes('reference') ? 'Background Checks' :
                     item.pattern.includes('scheduling') ? 'Scheduling' :
                     item.pattern.includes('bot') || item.pattern.includes('AI') ? 'Bot Issues' :
                     item.pattern.includes('agent') ? 'Agent Actions' :
                     item.pattern.includes('mad') || item.pattern.includes('chasing') ? 'Client Behavior' :
                     'Miscellaneous'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Uncategorized Patterns by Category" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Client Behavior', value: 12, color: '#FF6B6B' },
                  { name: 'Training Inquiries', value: 4, color: '#4ECDC4' },
                  { name: 'Agent Actions', value: 3, color: '#45B7D1' },
                  { name: 'Background Checks', value: 2, color: '#96CEB4' },
                  { name: 'Scheduling', value: 2, color: '#FFEAA7' },
                  { name: 'System Issues', value: 1, color: '#DDA0DD' },
                  { name: 'Bot Success', value: 1, color: '#A8E6CF' },
                  { name: 'Other', value: 3, color: '#FFB6C1' }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { name: 'Client Behavior', value: 12, color: '#FF6B6B' },
                  { name: 'Training Inquiries', value: 4, color: '#4ECDC4' },
                  { name: 'Agent Actions', value: 3, color: '#45B7D1' },
                  { name: 'Background Checks', value: 2, color: '#96CEB4' },
                  { name: 'Scheduling', value: 2, color: '#FFEAA7' },
                  { name: 'System Issues', value: 1, color: '#DDA0DD' },
                  { name: 'Bot Success', value: 1, color: '#A8E6CF' },
                  { name: 'Other', value: 3, color: '#FFB6C1' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Uncategorized Patterns" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={uncategorizedPatterns.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="pattern" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.div>
  );
}

// Reusable Components
function MetricCard({ title, value, icon: Icon, color, trend }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-sm text-green-600 mt-1">{trend}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default App;



