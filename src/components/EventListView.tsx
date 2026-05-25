import { useState } from 'react';
import { 
  Clock, 
  Bolt, 
  TrendingUp, 
  Flag, 
  ChevronLeft, 
  ChevronRight,
  Search
} from 'lucide-react';
import { EventDetail } from '../types';

interface EventListViewProps {
  events: EventDetail[];
  onViewDetails: (eventId: string) => void;
}

export default function EventListView({ events, onViewDetails }: EventListViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filters Events based on search queries and dropdown menu
  const filteredEvents = events.filter(event => {
    // Status Filter
    if (selectedStatus !== 'All Statuses') {
      const matchStatus = event.status.toLowerCase() === selectedStatus.replace('Approval', '').replace(' ', '').toLowerCase();
      if (!matchStatus) return false;
    }
    
    // Local Search Filter
    if (localSearch.trim() !== '') {
      const query = localSearch.toLowerCase();
      const matchTitle = event.title.toLowerCase().includes(query);
      const matchOrg = event.organizerName.toLowerCase().includes(query);
      const matchId = event.id.toLowerCase().includes(query);
      const matchVenue = event.venueName.toLowerCase().includes(query);
      return matchTitle || matchOrg || matchId || matchVenue;
    }

    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Content Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Event Moderation
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mt-1">
            Review and manage upcoming event submissions for the EventHub network.
          </p>
        </div>
        
        {/* Dropdowns & local search */}
        <div className="flex items-center gap-3 self-start md:self-end w-full md:w-auto">
          {/* Local Search input */}
          <div className="relative flex-1 md:w-64 group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors duration-200" />
            <input 
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl pl-9 pr-8 py-2.5 text-xs text-on-surface placeholder:text-outline-variant/50 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-semibold font-sans" 
              placeholder="Search events..."
            />
            {localSearch && (
              <button 
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary font-bold pr-1 shrink-0"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-surface-container-high border border-outline-variant/30 text-on-surface text-sm rounded-xl px-4 py-2.5 pr-10 focus:ring-2 focus:ring-primary/50 outline-none transition-all cursor-pointer font-sans font-semibold text-xs"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Bento Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border-primary/20">
          <div>
            <p className="text-outline text-xs font-bold uppercase tracking-wider mb-1">Queue Size</p>
            <h3 className="text-2xl font-bold text-on-surface">142</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border-tertiary/20">
          <div>
            <p className="text-outline text-xs font-bold uppercase tracking-wider mb-1">Live Today</p>
            <h3 className="text-2xl font-bold text-on-surface">24</h3>
          </div>
          <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary">
            <Bolt className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border-green-500/20">
          <div>
            <p className="text-outline text-xs font-bold uppercase tracking-wider mb-1">Approval Rate</p>
            <h3 className="text-2xl font-bold text-on-surface">88%</h3>
          </div>
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-success">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border-secondary/20">
          <div>
            <p className="text-outline text-xs font-bold uppercase tracking-wider mb-1">Reported</p>
            <h3 className="text-2xl font-bold text-on-surface">03</h3>
          </div>
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
            <Flag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Moderation Table Grid */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50 text-outline uppercase text-[10px] font-bold tracking-[0.2em] border-b border-outline-variant/20">
                <th className="px-6 py-5">Event ID</th>
                <th className="px-6 py-5">Event Title</th>
                <th className="px-6 py-5">Organizer</th>
                <th className="px-6 py-5">Start Time</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant font-semibold">
                    No events matches the specified filter or query.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-surface-bright/30 transition-colors group">
                    {/* Event ID */}
                    <td className="px-6 py-5 font-mono text-primary/80 text-sm font-semibold">
                      #{event.id}
                    </td>
                    
                    {/* Event Title with Cover Thumbnail */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-outline-variant/20">
                          <img 
                            src={event.coverUrl} 
                            alt={event.coverAlt || event.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                        <span className="font-semibold text-on-surface text-sm">
                          {event.title}
                        </span>
                      </div>
                    </td>

                    {/* Organizer */}
                    <td className="px-6 py-5 text-on-surface-variant text-sm font-medium">
                      {event.organizerName}
                    </td>

                    {/* Start Time info */}
                    <td className="px-6 py-5">
                      <div className="text-sm">
                        <p className="text-on-surface font-semibold">
                          {event.startDate.split(' • ')[0]}
                        </p>
                        <p className="text-xs text-outline font-medium mt-0.5">
                          {event.startDate.split(' • ')[1] || "22:00 PM"}
                        </p>
                      </div>
                    </td>

                    {/* Status badge pill */}
                    <td className="px-6 py-5">
                      {event.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          Pending
                        </span>
                      )}
                      {event.status === 'approved' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-success ring-1 ring-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Approved
                        </span>
                      )}
                      {event.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* Action button */}
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => onViewDetails(event.id)}
                        className="px-4 py-1.5 text-xs font-bold text-outline hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/30 cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table pagination controller */}
        <div className="px-6 py-4 flex items-center justify-between bg-surface-container-high/30 border-t border-outline-variant/10">
          <p className="text-xs text-outline font-medium">
            Showing 1 to {filteredEvents.length} of {events.length} entries
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => {}}
              className="p-1.5 hover:bg-surface-variant rounded-lg text-outline disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs">
              1
            </button>
            <button 
              onClick={() => alert("Simulated: Navigating to page 2 of events dashboard.")}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant text-outline font-bold text-xs cursor-pointer"
            >
              2
            </button>
            <button 
              onClick={() => alert("Simulated: Navigating to page 3 of events dashboard.")}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant text-outline font-bold text-xs cursor-pointer"
            >
              3
            </button>
            <button 
              onClick={() => {}}
              className="p-1.5 hover:bg-surface-variant rounded-lg text-outline cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
