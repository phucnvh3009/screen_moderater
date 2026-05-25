import { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft,
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  ShieldCheck, 
  Landmark, 
  FileText, 
  CheckSquare, 
  CheckCircle2, 
  XSquare,
  Loader
} from 'lucide-react';
import { OrganizerApplication } from '../types';

interface OrganizerDetailViewProps {
  application: OrganizerApplication;
  onApproveOrganizer: (id: string, name: string) => void;
  onRejectOrganizer: (id: string, name: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onBack: () => void;
}

export default function OrganizerDetailView({ 
  application, 
  onApproveOrganizer, 
  onRejectOrganizer, 
  onSaveNotes,
  onBack
}: OrganizerDetailViewProps) {
  const [notes, setNotes] = useState<string>(application.notes);
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>(application.status);
  const [savingNotes, setSavingNotes] = useState<boolean>(false);

  const handleApprove = () => {
    setStatus('approved');
    onApproveOrganizer(application.id, application.name);
  };

  const handleReject = () => {
    setStatus('rejected');
    onRejectOrganizer(application.id, application.name);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setSavingNotes(true);
    onSaveNotes(application.id, value);
    setTimeout(() => {
      setSavingNotes(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary-light text-xs font-bold transition-all cursor-pointer group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        BACK TO ORGANIZERS LIST
      </button>

      {/* Top Breadcrumbs and Detail Headers */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant text-xs mb-2 uppercase tracking-widest font-bold">
            <span>Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
            <span>Approvals</span>
            <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
            <span className="text-primary font-extrabold font-sans">Detail</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Review Application
          </h1>
        </div>
        
        {/* Verification Status Pill & Ref ID */}
        <div className="flex items-center gap-3 self-start md:self-end">
          {status === 'pending' ? (
            <span className="px-3.5 py-1 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/20 text-xs font-bold uppercase tracking-wider">
              Pending Review
            </span>
          ) : status === 'approved' ? (
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-success border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
              Verification Approved
            </span>
          ) : (
            <span className="px-3.5 py-1 rounded-full bg-rose-500/10 text-error border border-rose-500/20 text-xs font-bold uppercase tracking-wider">
              Rejected
            </span>
          )}
          <span className="text-on-surface-variant text-sm font-semibold">Ref ID: {application.id}</span>
        </div>
      </div>

      {/* Main Details Two Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal Metadata Card & Stats */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group transition-all duration-500 glow-hover shadow-xl">
            {/* Ambient Background Gradient Orb */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300"></div>
            
            {/* Profile Avatar elements */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110"></div>
                <img 
                  alt={application.altText || "Organizer Alice Headshot"} 
                  className="relative w-24 h-24 rounded-2xl object-cover border-2 border-primary/40 shadow-inner" 
                  src={application.avatarUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-1">
                {application.name}
              </h2>
              <p className="text-primary text-sm font-semibold tracking-wide">
                {application.bio}
              </p>
            </div>

            {/* Structured info points */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Email Address</p>
                  <p className="text-sm font-semibold text-on-surface">{application.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Phone Number</p>
                  <p className="text-sm font-semibold text-on-surface">{application.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Base Location</p>
                  <p className="text-sm font-semibold text-on-surface">{application.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats items */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-2xl text-center">
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Total Events</p>
              <p className="text-3xl font-extrabold text-primary neon-glow">{application.totalEvents}</p>
            </div>
            
            <div className="glass-panel p-5 rounded-2xl text-center">
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Avg Rating</p>
              <p className="text-3xl font-extrabold text-tertiary neon-glow">{application.avgRating.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Business layout details & moderator audit notes */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden glow-hover shadow-xl">
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant/15 pb-4">
              <Building className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-on-surface">Business Verification</h3>
            </div>

            {/* Core verification records */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column verification */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-on-surface-variant font-bold uppercase tracking-wider block mb-2">Company Name</label>
                  <div className="bg-surface-dim/50 p-4 rounded-xl border border-outline-variant/20 shadow-sm">
                    <p className="text-sm font-bold text-on-surface">{application.companyName}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-on-surface-variant font-bold uppercase tracking-wider block mb-2">Tax Registration Code</label>
                  <div className="bg-surface-dim/50 p-4 rounded-xl border border-outline-variant/20 flex items-center justify-between shadow-sm">
                    <p className="font-mono text-sm font-semibold text-on-surface tracking-wider">{application.taxCode}</p>
                    <span className="p-1 rounded-full bg-success/20 text-success">
                      <ShieldCheck className="w-4 h-4 fill-success text-surface" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column verification */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-on-surface-variant font-bold uppercase tracking-wider block mb-2">Bank Account (Settlement)</label>
                  <div className="bg-surface-dim/50 p-4 rounded-xl border border-outline-variant/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Landmark className="w-4 h-4 text-on-surface-variant" />
                      <p className="text-sm font-semibold text-on-surface">{application.bankName}</p>
                    </div>
                    <p className="font-mono text-xs text-on-surface-variant font-semibold">{application.bankAccount}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-on-surface-variant font-bold uppercase tracking-wider block mb-2">Registration Documents</label>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => alert(`Simulating file opening: ${application.companyName} PDF Registration Certificate.`)}
                      className="flex-1 bg-surface-bright/70 p-3.5 rounded-xl border border-outline-variant/30 text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-variant hover:text-primary transition-all cursor-pointer shadow-sm"
                    >
                      <FileText className="w-4 h-4 text-primary" /> VIEW PDF
                    </button>
                    <button 
                      onClick={() => alert(`Simulating file opening: IRS Tax registration confirmation document for ${application.companyName}.`)}
                      className="flex-1 bg-surface-bright/70 p-3.5 rounded-xl border border-outline-variant/30 text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-variant hover:text-primary transition-all cursor-pointer shadow-sm"
                    >
                      <CheckSquare className="w-4 h-4 text-primary" /> TAX ID
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section inside Card */}
            <div className="mt-8 pt-6 border-t border-outline-variant/10">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-on-surface-variant font-bold uppercase tracking-wider block">
                  Moderator Notes
                </label>
                {savingNotes && (
                  <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                    <Loader className="w-3.5 h-3.5 animate-spin" />
                    <span>Auto-saving...</span>
                  </div>
                )}
              </div>
              <textarea 
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                className="w-full bg-surface-dim/50 border border-outline-variant/20 rounded-2xl p-4 text-sm text-on-surface font-semibold focus:ring-1 focus:outline-none focus:ring-primary h-24 resize-none transition-all placeholder:text-outline-variant/50 shadow-inner" 
                placeholder="Add any observations or missing requirements here..."
              />
            </div>
          </div>

          {/* Verification Big buttons action block */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleApprove}
                disabled={status === 'approved'}
                className="flex-1 py-4 px-6 rounded-2xl bg-success text-white font-bold text-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-success/20 disabled:opacity-40 cursor-pointer border-none"
              >
                <CheckCircle2 className="w-5 h-5" />
                Approve Organizer
              </button>
              
              <button 
                onClick={handleReject}
                disabled={status === 'rejected'}
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-danger text-danger font-bold text-lg flex items-center justify-center gap-2 hover:bg-danger/5 active:scale-[0.98] transition-all disabled:opacity-40 cursor-pointer"
              >
                <XSquare className="w-5 h-5" />
                Reject Organizer
              </button>
            </div>
            
            <p className="text-center text-on-surface-variant text-xs font-semibold">
              Approval will grant the organizer full access to post events and process payments inside the network.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Timeline Logs & Trust Score widget layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logs column */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl shadow-lg">
          <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface mb-6">Recent Application Events</h4>
          <div className="space-y-6">
            {application.timeline.map((item) => (
              <div key={item.id} className="flex gap-4 items-start">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  item.status === 'success' 
                    ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)]' 
                    : item.status === 'info' 
                    ? 'bg-primary shadow-[0_0_8px_rgba(251,171,255,0.8)]'
                    : item.status === 'pending'
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-rose-500'
                }`}></div>
                <div>
                  <p className="text-sm text-on-surface font-semibold">{item.text}</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Trust Score col block */}
        <div className="bg-primary-container/10 rounded-3xl p-6 border border-primary/20 flex flex-col justify-between overflow-hidden relative shadow-lg min-h-[180px]">
          {/* Subtle logo background outline and text display */}
          <div className="absolute -bottom-8 -right-8 text-primary/5 text-[120px] pointer-events-none select-none select-none font-bold">
            🛡️
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Trust Score</h4>
            <p className="text-5xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(251,171,255,0.4)]">
              {application.trustScore}%
            </p>
          </div>
          <p className="text-xs text-on-surface-variant relative z-10 leading-relaxed font-semibold">
            High confidence profile matched by system analytics. All automated KYC database checks cleared successfully without flags.
          </p>
        </div>
      </div>
    </div>
  );
}
