import { useState, useCallback, memo } from 'react';
import { MessageSquareText, Users, Clock, Zap } from 'lucide-react';
import DashboardContainer from './shared/DashboardContainer';
import MetricsGrid from './shared/MetricsGrid';
import AgentCard from './shared/AgentCard';
import WidgetContainer from './WidgetContainer';
import { Metric, GradientStyle, AgentMetrics } from './types';

// Move static data outside component to prevent recreation on each render
const METRICS: Metric[] = [
  {
    label: 'Live Conversations',
    value: '1,234',
    change: '+15%',
    icon: MessageSquareText,
    gradient: 'from-purple-500 to-pink-500' as GradientStyle,
  },
  {
    label: 'Total Users',
    value: '45.2K',
    change: '+8%',
    icon: Users,
    gradient: 'from-purple-400 to-pink-400' as GradientStyle,
  },
  {
    label: 'Avg. Response Time',
    value: '1.2s',
    change: '+20%',
    icon: Clock,
    gradient: 'from-purple-500 to-pink-500' as GradientStyle,
  },
  {
    label: 'Response Success Rate',
    value: '98.5%',
    change: '+2.1%',
    icon: Zap,
    gradient: 'from-purple-400 to-pink-400' as GradientStyle,
  },
];

const AGENTS = [
  {
    id: 1,
    name: 'Customer Success Agent',
    description: '24/7 customer support assistant',
    status: 'Active' as const,
    metrics: {
      'Response Rate': '98%',
      'Avg. Response': '30s',
      'Customer Satisfaction': '4.8/5',
      'Active Chats': '24/7',
    } as AgentMetrics,
    icon: MessageSquareText,
    gradient: 'from-purple-500 to-pink-500' as GradientStyle,
  },
  {
    id: 2,
    name: 'Sales Agent',
    description: 'Automated sales & lead generation',
    status: 'Active' as const,
    metrics: {
      'Conversion Rate': '32%',
      'Leads/Day': '145',
      'Satisfaction': '4.7/5',
      'Avg. Response Time': '15s',
    } as AgentMetrics,
    icon: MessageSquareText,
    gradient: 'from-purple-400 to-pink-400' as GradientStyle,
  },
  {
    id: 3,
    name: 'Support Agent',
    description: 'Technical support & troubleshooting',
    status: 'Active' as const,
    metrics: {
      'Resolution Rate': '92%',
      'Tickets/Day': '250',
      'CSAT Score': '4.9/5',
      'Avg. Handling Time': '4m',
    } as AgentMetrics,
    icon: MessageSquareText,
    gradient: 'from-purple-500 to-pink-500' as GradientStyle,
  },
];

// Memoize the dashboard container props to prevent unnecessary re-renders
const DASHBOARD_PROPS = {
  title: "AI Chat Agents",
  subtitle: "Manage your AI chat agents",
  icon: MessageSquareText,
  gradient: 'from-purple-500 to-pink-500' as GradientStyle,
  buttonLabel: "New Chat Agent"
};

const ChatDashboard = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);

  // This callback is good as is, already memoized correctly
  const handleAgentClick = useCallback((id: number) => {
    setActiveChat(prev => (prev === id ? null : id));
  }, []);

  // Memory optimization: pre-calculate if widget should be shown
  const isWidgetOpen = activeChat !== null;

  return (
    <>
      <DashboardContainer {...DASHBOARD_PROPS}>
        {/* Metrics Grid - using the correct props format */}
        <MetricsGrid metrics={METRICS} />

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {AGENTS.map(agent => (
            <AgentCard
              key={agent.id}
              {...agent}
              isActive={activeChat === agent.id}
              onClick={() => handleAgentClick(agent.id)}
              actionLabel="Start Chat"
            />
          ))}
        </div>
      </DashboardContainer>

      {/* Only render the widget container when needed */}
      {isWidgetOpen && (
        <WidgetContainer 
          isOpen={true}
          onClose={() => setActiveChat(null)}
          mode="chat"
        />
      )}
    </>
  );
};

export default memo(ChatDashboard);