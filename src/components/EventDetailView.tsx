import { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Timer, 
  Building, 
  MapPin, 
  Star, 
  Info, 
  X, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { EventDetail } from '../types';

interface EventDetailViewProps {
  event: EventDetail;
  onBack: () => void;
  onApproveEvent: (eventId: string, title: string) => void;
  onRejectEvent: (eventId: string, title: string) => void;
}

export default function EventDetailView({ event, onBack, onApproveEvent, onRejectEvent }: EventDetailViewProps) {
  const [eventStatus, setEventStatus] = useState<'pending' | 'approved' | 'rejected'>(event.status);

  const handleApprove = () => {
    setEventStatus('approved');
    onApproveEvent(event.id, event.title);
  };

  const handleReject = () => {
    setEventStatus('rejected');
    onRejectEvent(event.id, event.title);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-28">
      {/* Detail Header area with back action symbol */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-surface-variant/50 rounded-full transition-all text-on-surface-variant hover:text-primary cursor-pointer border border-outline-variant/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant text-xs mb-1 uppercase tracking-widest font-bold">
            <span className="hover:text-primary cursor-pointer" onClick={onBack}>Events</span>
            <span>/</span>
            <span className="text-primary">Detail View</span>
          </nav>
          <h1 className="text-2xl font-bold text-on-surface">Event Review</h1>
        </div>
      </div>

      {/* Two columns grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Cover & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Banner container */}
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10">
            <img 
              className="w-full h-full object-cover" 
              src={event.coverUrl} 
              alt={event.coverAlt || event.title}
              referrerPolicy="no-referrer"
            />
            {/* Ambient gradients shading */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
            
            {/* Category tag and Big Heading */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-sans text-xs font-bold mb-3 inline-block uppercase tracking-widest">
                {event.type}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Detailed features card */}
          <div className="glass-card rounded-2xl p-8 space-y-6">
            {/* Start & End Dates details */}
            <div className="flex flex-wrap gap-8 items-center border-b border-outline-variant/20 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Start Date</p>
                  <p className="text-sm font-semibold text-on-surface">{event.startDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">End Date</p>
                  <p className="text-sm font-semibold text-on-surface">{event.endDate}</p>
                </div>
              </div>
            </div>

            {/* Paragraph sections */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-on-surface">Event Description</h3>
              <div className="text-sm text-on-surface-variant leading-relaxed space-y-4 whitespace-pre-line font-medium">
                {event.description}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Venue and Available ticket Tiers */}
        <div className="space-y-6">
          {/* Venue Card */}
          <div className="glass-card rounded-2xl p-6 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Building className="w-16 h-16 text-primary" />
            </div>
            
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Venue Information
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-2xl font-extrabold text-on-surface">{event.venueName}</p>
                <p className="text-sm text-on-surface-variant mt-1 font-medium">{event.venueAddress}</p>
              </div>

              {/* Badges for capacity & security level */}
              <div className="flex items-center gap-4 pt-2">
                <div className="bg-surface-variant/35 rounded-xl p-3 border border-outline-variant/10 flex-1 text-center">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Capacity</p>
                  <p className="text-lg font-extrabold text-on-surface mt-0.5">{event.venueCapacity.toLocaleString()}</p>
                </div>
                <div className="bg-surface-variant/35 rounded-xl p-3 border border-outline-variant/10 flex-1 text-center">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Security</p>
                  <p className="text-lg font-extrabold text-on-surface mt-0.5">{event.venueSecurity}</p>
                </div>
              </div>

              {/* Map display */}
              <div className="w-full h-32 rounded-xl overflow-hidden border border-outline-variant/20 shadow-inner relative">
                <img 
                  className="w-full h-full object-cover" 
                  src={event.venueMapUrl} 
                  alt="City Grid map route"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Available Tiers panel */}
          <div className="glass-card rounded-2xl p-6 space-y-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <Star className="w-4 h-4" /> Available Tiers
            </h3>

            <div className="space-y-4">
              {event.tiers.map((tier) => (
                <div 
                  key={tier.id}
                  className={`ticket-mask p-5 border rounded-xl relative overflow-hidden group min-h-[96px] flex flex-col justify-between ${
                    tier.isPremium 
                      ? 'bg-gradient-to-r from-primary-container/15 to-secondary-container/15 border-primary/20 shadow-[0_0_15px_rgba(251,171,255,0.08)]' 
                      : 'bg-gradient-to-r from-surface-container-high to-surface-variant/30 border-outline-variant/20'
                  }`}
                >
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface text-base">{tier.name}</span>
                      {tier.isPremium && <Star className="w-4 h-4 text-tertiary fill-tertiary" />}
                    </div>
                    <span className="text-xl font-extrabold text-primary">${tier.price.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center z-10 pt-2 border-t border-dashed border-outline-variant/10">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${tier.stockColor === 'error' ? 'bg-error animate-pulse' : tier.stockColor === 'warning' ? 'bg-amber-500 animate-pulse' : 'bg-success'}`}></span>
                      <p className="text-xs text-on-surface-variant font-semibold">{tier.stockText}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      tier.isPremium 
                        ? 'bg-tertiary/10 text-tertiary border border-tertiary/20' 
                        : 'text-on-surface-variant font-bold'
                    }`}>
                      {tier.limitText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 lg:left-64 right-0 h-24 bg-surface-container-high/90 backdrop-blur-2xl border-t border-outline-variant/20 px-gutter flex items-center justify-between z-40 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-variant/50 flex items-center justify-center border border-outline-variant/20 text-on-surface-variant">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-on-surface font-bold">
              Review Status: <span className="capitalize text-primary font-extrabold">{eventStatus}</span>
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5 font-medium">
              Submitted by Organizer "{event.organizerName}"
            </p>
          </div>
        </div>

        {/* Buttons for Approval & Rejection */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleReject}
            disabled={eventStatus === 'rejected'}
            className="px-6 py-3 rounded-xl font-semibold text-sm text-rose-400 border border-rose-400/30 hover:bg-rose-400/10 active:scale-95 disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4" /> Reject Event
          </button>
          
          <button 
            onClick={handleApprove}
            disabled={eventStatus === 'approved'}
            className="px-8 py-3 rounded-xl font-semibold text-sm bg-emerald-500 text-on-surface hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer border-none"
          >
            <CheckCircle className="w-4 h-4 fill-white text-emerald-500" /> Approve Event
          </button>
        </div>
      </footer>
    </div>
  );
}
