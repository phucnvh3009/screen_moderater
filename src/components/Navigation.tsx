import { LayoutDashboard, CalendarDays, ShieldCheck, MapPin, LogOut, Zap, User } from 'lucide-react';

interface NavigationProps {
  activeTab: 'dashboard' | 'events' | 'organizers' | 'venues' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'events' | 'organizers' | 'venues' | 'profile') => void;
  pendingApprovalsCount: number;
}

export default function Navigation({ activeTab, setActiveTab, pendingApprovalsCount }: NavigationProps) {
  return (
    <aside className="w-64 h-screen border-r border-outline-variant/20 flex flex-col py-6 bg-surface-container shadow-lg shadow-primary/5 shrink-0 z-50 sticky top-0">
      {/* Brand Logo and Title */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(251,171,255,0.4)]">
          <Zap className="w-4 h-4 text-on-primary-container fill-on-primary-container" />
        </div>
        <div>
          <h1 className="font-sans text-xl font-bold text-primary drop-shadow-[0_0_8px_rgba(251,171,255,0.6)]">
            EventHub
          </h1>
          <p className="text-[10px] font-semibold text-outline tracking-widest uppercase">
            Moderator Portal
          </p>
        </div>
      </div>

      {/* Menu Options */}
      <nav className="flex-1 px-4 space-y-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
            activeTab === 'dashboard'
              ? 'text-primary bg-primary/10 border-r-4 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
          <span className="text-sm font-semibold">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
            activeTab === 'events'
              ? 'text-primary bg-primary/10 border-r-4 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
          }`}
        >
          <CalendarDays className={`w-5 h-5 ${activeTab === 'events' ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
          <span className="text-sm font-semibold">Event Management</span>
        </button>

        <button
          onClick={() => setActiveTab('organizers')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
            activeTab === 'organizers'
              ? 'text-primary bg-primary/10 border-r-4 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className={`w-5 h-5 ${activeTab === 'organizers' ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
            <span className="text-sm font-semibold">Organizer Approvals</span>
          </div>
          {pendingApprovalsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
              {pendingApprovalsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('venues')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
            activeTab === 'venues'
              ? 'text-primary bg-primary/10 border-r-4 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
          }`}
        >
          <MapPin className={`w-5 h-5 ${activeTab === 'venues' ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
          <span className="text-sm font-semibold">Venues</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
            activeTab === 'profile'
              ? 'text-primary bg-primary/10 border-r-4 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
          <span className="text-sm font-semibold">My Profile</span>
        </button>
      </nav>

      {/* Logout button */}
      <div className="px-4 mt-auto">
        <button
          onClick={() => alert("Simulation: Logged out from EventHub moderator account.")}
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error hover:bg-error/10 transition-all duration-200 rounded-xl"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
