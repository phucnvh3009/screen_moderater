import { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Info
} from 'lucide-react';

import { 
  INITIAL_DASHBOARD_STATS, 
  INITIAL_ORGANIZERS, 
  INITIAL_EVENTS, 
  INITIAL_VENUES, 
  INITIAL_RECENT_ACTIVITIES 
} from './data';
import { DashboardStats, OrganizerApplication, EventDetail, RecentActivity, VenueDetail } from './types';

// Reusable Sub-Views Imports
import Navigation from './components/Navigation';
import DashboardView from './components/DashboardView';
import EventListView from './components/EventListView';
import EventDetailView from './components/EventDetailView';
import OrganizerListView from './components/OrganizerListView';
import OrganizerDetailView from './components/OrganizerDetailView';
import VenueExplorerView from './components/VenueExplorerView';
import ProfileView from './components/ProfileView';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'organizers' | 'venues' | 'profile'>('dashboard');
  
  // Data State
  const [stats, setStats] = useState<DashboardStats>(INITIAL_DASHBOARD_STATS);
  const [organizers, setOrganizers] = useState<OrganizerApplication[]>(INITIAL_ORGANIZERS);
  const [events, setEvents] = useState<EventDetail[]>(INITIAL_EVENTS);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(INITIAL_RECENT_ACTIVITIES);
  const [venues, setVenues] = useState<VenueDetail[]>(INITIAL_VENUES);

  // Focus ID state within tabs
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedOrganizerId, setSelectedOrganizerId] = useState<string | null>(null);

  // Toast Info State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Automatically clear Toast Notifications
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Show Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  // Helper properties
  const pendingApprovalsCount = organizers.filter(org => org.status === 'pending').length;

  // Handler: Start Review Queue (navigate to the first pending organizer application)
  const handleStartReviewQueue = () => {
    const firstPending = organizers.find(org => org.status === 'pending');
    if (firstPending) {
      setSelectedOrganizerId(firstPending.id);
      setActiveTab('organizers');
      showToast(`Loading review verification for ${firstPending.name}...`, 'info');
    } else {
      setActiveTab('organizers');
      showToast("No pending registrations. Audit list up-to-date!", "success");
    }
  };

  // Handler: Approve Organizer application
  const handleApproveOrganizer = (id: string, name: string) => {
    setOrganizers(prev => prev.map(org => {
      if (org.id === id) {
        const updatedTimeline = [
          ...org.timeline,
          { id: Math.random().toString(), time: 'Just now', text: 'Application approved by Moderator Alice', status: 'success' as const }
        ];
        return { ...org, status: 'approved' as const, timeline: updatedTimeline, trustScore: 100 };
      }
      return org;
    }));

    // Update real-time stats
    setStats(prev => ({
      ...prev,
      totalOrganizers: prev.totalOrganizers + 1
    }));

    // Add logging line
    const newAct: RecentActivity = {
      id: Math.random().toString(),
      type: 'organizer_verified',
      title: name,
      subtitle: 'organizer account Verified and Approved',
      time: 'Just now',
      organizerId: id,
      avatarUrl: organizers.find(org => org.id === id)?.avatarUrl,
      avatarAlt: `A profile portrait of approved creator ${name}`
    };
    setRecentActivities(prev => [newAct, ...prev]);

    showToast(`Organizer "${name}" verification application approved! Code credentials sent to bank settlement node.`, 'success');
  };

  // Handler: Reject Organizer application
  const handleRejectOrganizer = (id: string, name: string) => {
    setOrganizers(prev => prev.map(org => {
      if (org.id === id) {
        const updatedTimeline = [
          ...org.timeline,
          { id: Math.random().toString(), time: 'Just now', text: 'Application rejected by Moderator Alice', status: 'danger' as const }
        ];
        return { ...org, status: 'rejected' as const, timeline: updatedTimeline };
      }
      return org;
    }));

    showToast(`Organizer "${name}" application rejected. Discrepancy logs exported.`, 'error');
  };

  // Handler: Save custom notes on organizers
  const handleSaveOrganizerNotes = (id: string, notesText: string) => {
    setOrganizers(prev => prev.map(org => {
      if (org.id === id) {
        return { ...org, notes: notesText };
      }
      return org;
    }));
  };

  // Handler: Approve Concert/Rave Event
  const handleApproveEvent = (eventId: string, title: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, status: 'approved' as const };
      }
      return evt;
    }));

    // Update stats
    setStats(prev => ({
      ...prev,
      approvedEvents: prev.approvedEvents + 1,
      pendingEvents: Math.max(0, prev.pendingEvents - 1)
    }));

    showToast(`Concert "${title}" approved! Published live to the EventHub seeker app.`, 'success');
  };

  // Handler: Reject Concert/Rave Event
  const handleRejectEvent = (eventId: string, title: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, status: 'rejected' as const };
      }
      return evt;
    }));

    setStats(prev => ({
      ...prev,
      pendingEvents: Math.max(0, prev.pendingEvents - 1)
    }));

    showToast(`Concert "${title}" rejected. Notice dispatched to publisher.`, 'error');
  };

  // Handler: Approve Activity from Dashboard Feed
  const handleApproveActivity = (activityId: string, eventTitle: string) => {
    // Approve matching pending event if possible
    const matchEvent = events.find(e => e.title.includes(eventTitle) || e.id === 'EV-1001');
    if (matchEvent) {
      handleApproveEvent(matchEvent.id, matchEvent.title);
    }
    setRecentActivities(prev => prev.filter(act => act.id !== activityId));
  };

  // Handler: Reject Activity from Dashboard Feed
  const handleRejectActivity = (activityId: string, eventTitle: string) => {
    const matchEvent = events.find(e => e.title.includes(eventTitle) || e.id === 'EV-1001');
    if (matchEvent) {
      handleRejectEvent(matchEvent.id, matchEvent.title);
    }
    setRecentActivities(prev => prev.filter(act => act.id !== activityId));
  };

  // Handler: Add new mock system alerts (Pulsing trigger)
  const handleAddSystemAlert = () => {
    const alertsList = [
      'Over-threshold decibel alert at Velvet Cellar Lounge.',
      'API gateway throughput throttle triggered at Austin node.',
      'Organizer NightX Team uploaded a revised contract layout.',
      'Global FinTrust Bank cleared processing nodes verification.',
    ];
    const pickedAlertText = alertsList[Math.floor(Math.random() * alertsList.length)];
    
    const newAct: RecentActivity = {
      id: Math.random().toString(),
      type: 'event_flagged',
      title: 'Global System Log:',
      subtitle: pickedAlertText,
      time: 'Just now'
    };

    setRecentActivities(prev => [newAct, ...prev]);
    showToast(`System log generated: "${pickedAlertText}"`, 'info');
  };

  // Sync loaded detail references
  const currentEvent = events.find(evt => evt.id === selectedEventId) || events[0];
  const currentOrganizer = organizers.find(org => org.id === selectedOrganizerId) || organizers[0];

  return (
    <div className="bg-surface text-on-surface min-h-screen selection:bg-primary/30 selection:text-primary circuit-bg font-sans flex text-sm overflow-x-hidden antialiased">
      
      {/* Dynamic Toast Alerts Popup banner */}
      {toast && (
        <div className="fixed bottom-28 right-10 z-50 animate-bounce transition-all">
          <div className="glass-card px-6 py-4 rounded-xl text-white flex items-center gap-3 shadow-[0_0_20px_rgba(251,171,255,0.25)] border-l-4"
            style={{ 
              borderColor: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#f43f5e' : '#fbabff' 
            }}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-primary" />}
            <span className="text-sm font-semibold tracking-wide font-sans">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Side Navigation panel panel */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Reset child view states on navigate
          setSelectedEventId(null);
          setSelectedOrganizerId(null);
        }} 
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main viewport area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* Top AppBar elements */}
        <header className="w-full h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 flex items-center justify-between px-gutter">
          {/* Spacer to push menu items to the right */}
          <div></div>

          {/* Bells, Admin Info profiling on right side of top bar */}
          <div className="flex items-center gap-6">
            {/* Notification alert bells */}
            <button 
              onClick={handleAddSystemAlert}
              className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-full transition-all cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-surface animate-pulse"></span>
            </button>

            {/* Profile badge details */}
            <div 
              onClick={() => {
                setActiveTab('profile');
                setSelectedEventId(null);
                setSelectedOrganizerId(null);
              }}
              className="flex items-center gap-3 pl-4 border-l border-outline-variant/30 cursor-pointer hover:opacity-90 active:scale-95 transition-all group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-on-surface font-bold text-sm tracking-wide group-hover:text-primary transition-colors">Moderator Alice</p>
                <p className="text-primary text-[10px] font-extrabold tracking-widest uppercase">Senior Auditor</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden ring-offset-2 ring-offset-surface group-hover:ring-2 group-hover:ring-primary transition-all shadow-md">
                <img 
                  alt="Moderator Alice Profile Avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd3FJ4wzGpHv5l3Xtqq7NdyXnjiKJr-MjTF6MgZFm0LTvxE0V_7MlaAUPXPzgK_4vK8u6KT2uTEJjS76F6sIKQX6TE_BGnQuFS9_wXOXZQxqbur7N2PyX5JlDkHThp2Y8__FqqgCVbgFtrhPvAoefVeFSkMWGc0aN3AiBueh3HqcxKLF1SbFiV_V_V4ss8bckCr23LpUuqFlrrKjHv8prp8Bj7PBIxVebi3ZtKGXXYRw9U_Xh6BAyP4Y-IIrgzYM_RxLMspGL_Fos"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content body wrapper */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
          
          {/* Layout logic depending on selected menu tab */}
          {activeTab === 'dashboard' && (
            <DashboardView 
              stats={stats}
              activities={recentActivities}
              onStartReviewQueue={handleStartReviewQueue}
              onApproveActivity={handleApproveActivity}
              onRejectActivity={handleRejectActivity}
              onAddSystemAlert={handleAddSystemAlert}
            />
          )}

          {activeTab === 'events' && (
            selectedEventId ? (
              <EventDetailView 
                event={currentEvent}
                onBack={() => setSelectedEventId(null)}
                onApproveEvent={handleApproveEvent}
                onRejectEvent={handleRejectEvent}
              />
            ) : (
              <EventListView 
                events={events}
                onViewDetails={(id) => setSelectedEventId(id)}
              />
            )
          )}

          {activeTab === 'organizers' && (
            selectedOrganizerId ? (
              <OrganizerDetailView 
                application={currentOrganizer}
                onApproveOrganizer={handleApproveOrganizer}
                onRejectOrganizer={handleRejectOrganizer}
                onSaveNotes={handleSaveOrganizerNotes}
                onBack={() => setSelectedOrganizerId(null)}
              />
            ) : (
              <OrganizerListView 
                organizers={organizers}
                onSelectOrganizer={(id) => setSelectedOrganizerId(id)}
              />
            )
          )}

          {activeTab === 'venues' && (
            <VenueExplorerView 
              venues={venues}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* Atmospheric Glowing Elements behind canvas */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
    </div>
  );
}
