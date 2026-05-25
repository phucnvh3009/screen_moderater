import { useState, useEffect } from 'react';
import { 
  Users, 
  CalendarCheck, 
  Bolt, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  MoreVertical, 
  Plus,
  Play,
  Search,
  X
} from 'lucide-react';
import { DashboardStats, RecentActivity } from '../types';

interface DashboardViewProps {
  stats: DashboardStats;
  activities: RecentActivity[];
  onStartReviewQueue: () => void;
  onApproveActivity: (id: string, eventTitle: string) => void;
  onRejectActivity: (id: string, eventTitle: string) => void;
  onAddSystemAlert: () => void;
}

export default function DashboardView({
  stats,
  activities,
  onStartReviewQueue,
  onApproveActivity,
  onRejectActivity,
  onAddSystemAlert
}: DashboardViewProps) {
  // Let's add a state to simulate real-time pulsing or updates of stats
  const [liveStats, setLiveStats] = useState<DashboardStats>(stats);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  useEffect(() => {
    setLiveStats(stats);
  }, [stats]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Small simulated updates
      if (Math.random() > 0.85) {
        setLiveStats(prev => ({
          ...prev,
          activeOrganizers: prev.activeOrganizers + (Math.random() > 0.5 ? 1 : -1),
          serverLoad: Math.min(95, Math.max(10, prev.serverLoad + Math.floor(Math.random() * 5) - 2)),
          apiLatency: Math.min(200, Math.max(15, prev.apiLatency + Math.floor(Math.random() * 7) - 3))
        }));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter activities based on local search
  const filteredActivities = activities.filter(act => {
    if (!localSearchQuery.trim()) return true;
    const query = localSearchQuery.toLowerCase();
    return (
      act.title.toLowerCase().includes(query) ||
      act.subtitle.toLowerCase().includes(query) ||
      (act.type && act.type.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">
            Welcome Back, Alice
          </h1>
          <p className="text-on-surface-variant text-base">
            Here's what's happening in the <span className="text-primary font-bold">EventHub</span> ecosystem today.
          </p>
        </div>

        {/* Local Search input for Dashboard view */}
        <div className="relative w-full md:w-80 group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors duration-200" />
          <input 
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-full pl-10 pr-10 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-on-surface placeholder:text-outline-variant/50 outline-none font-medium font-sans text-xs" 
            placeholder="Search Dashboard logs..."
          />
          {localSearchQuery && (
            <button 
              onClick={() => setLocalSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Pending Events */}
        <div className="glass-surface p-6 rounded-2xl card-glow transition-all group hover:scale-[1.01]">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-outline text-xs font-bold uppercase tracking-widest">
            Total Pending Events
          </h3>
          <p className="text-3xl font-extrabold text-on-surface mt-2 neon-glow">
            {liveStats.pendingEvents}
          </p>
        </div>

        {/* Total Organizers */}
        <div className="glass-surface p-6 rounded-2xl card-glow transition-all group hover:scale-[1.01]">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-outline text-xs font-bold uppercase tracking-widest">
            Total Organizers
          </h3>
          <p className="text-3xl font-extrabold text-on-surface mt-2 neon-glow">
            {liveStats.totalOrganizers.toLocaleString()}
          </p>
        </div>

        {/* Approved Events */}
        <div className="glass-surface p-6 rounded-2xl card-glow transition-all group hover:scale-[1.01]">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-outline text-xs font-bold uppercase tracking-widest">
            Approved Events
          </h3>
          <p className="text-3xl font-extrabold text-on-surface mt-2 neon-glow">
            {liveStats.approvedEvents.toLocaleString()}
          </p>
        </div>

        {/* Active Organizers */}
        <div className="glass-surface p-6 rounded-2xl card-glow transition-all group hover:scale-[1.01]">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Bolt className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-outline text-xs font-bold uppercase tracking-widest">
            Active Organizers
          </h3>
          <p className="text-3xl font-extrabold text-on-surface mt-2 neon-glow">
            {liveStats.activeOrganizers}
          </p>
        </div>
      </div>

      {/* Main Layout Grid (Recent Activity & Side Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Area: Recent Activities list */}
        <div className="lg:col-span-2 glass-surface rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface">Recent Activity</h2>
          </div>

          <div className="divide-y divide-outline-variant/10">
            {filteredActivities.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant font-medium">
                No matching activities found.
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="p-6 flex items-center gap-4 hover:bg-surface-bright/20 transition-colors">
                  {/* User Avatar / Icon */}
                  {activity.avatarUrl ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-primary/20">
                      <img 
                        src={activity.avatarUrl} 
                        alt={activity.avatarAlt || activity.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center shrink-0 border border-outline-variant/20">
                      <ShieldAlert className="w-6 h-6 text-primary" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-on-surface leading-tight">
                      <span className="font-bold">{activity.title}</span> {activity.subtitle}
                    </p>
                    <p className="text-on-surface-variant text-xs mt-1">
                      {activity.time}
                    </p>
                  </div>

                  {/* Actions depending on activity type */}
                  {activity.type === 'event_submitted' ? (
                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => onApproveActivity(activity.id, "Neon Nights Rave")}
                        className="px-3.5 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold hover:bg-primary hover:text-on-primary transition-all duration-200"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => onRejectActivity(activity.id, "Neon Nights Rave")}
                        className="px-3.5 py-1.5 bg-error/10 text-error border border-error/20 rounded-full text-xs font-bold hover:bg-error hover:text-on-error transition-all duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  ) : activity.type === 'organizer_verified' ? (
                    <div className="p-2 rounded-full bg-tertiary/20 text-tertiary shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => alert(`Reviewing flag alert: ${activity.subtitle}`)} 
                      className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant shrink-0"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Area: Action Required */}
        <div className="space-y-8">
          {/* Action Required Card */}
          <div className="glass-surface p-6 rounded-2xl border-l-4 border-primary shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-on-surface">Action Required</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              You have {stats.pendingEvents} pending approvals and queue items that require your audit reviews in EventHub today.
            </p>
            <button 
              onClick={onStartReviewQueue}
              className="w-full py-3 bg-primary text-on-primary-container font-semibold text-sm rounded-xl shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-on-primary-container text-on-primary-container" />
              Start Review Queue
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button for alert creation */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={onAddSystemAlert}
          className="w-14 h-14 bg-primary text-on-primary font-bold rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <Plus className="w-6 h-6 text-on-primary stroke-[3px]" />
          <span className="absolute right-full mr-4 px-3 py-1 bg-surface-container text-primary font-semibold text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-primary/25">
            New System Alert
          </span>
        </button>
      </div>
    </div>
  );
}
