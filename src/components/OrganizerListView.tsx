import { useState } from 'react';
import { 
  Users, 
  Search, 
  X, 
  ArrowUpRight,
  UserCheck2
} from 'lucide-react';
import { OrganizerApplication } from '../types';

interface OrganizerListViewProps {
  organizers: OrganizerApplication[];
  onSelectOrganizer: (id: string) => void;
}

export default function OrganizerListView({ organizers, onSelectOrganizer }: OrganizerListViewProps) {
  const [localSearch, setLocalSearch] = useState<string>('');
  const [selectedStatusTab, setSelectedStatusTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Filter logic
  const filteredOrganizers = organizers.filter(org => {
    // 1. Status Filter
    if (selectedStatusTab !== 'all' && org.status !== selectedStatusTab) {
      return false;
    }

    // 2. Local Search Filter
    if (localSearch.trim() !== '') {
      const query = localSearch.toLowerCase();
      const matchName = org.name.toLowerCase().includes(query);
      const matchEmail = org.email.toLowerCase().includes(query);
      const matchCompany = org.companyName.toLowerCase().includes(query);
      const matchId = org.id.toLowerCase().includes(query);
      return matchName || matchEmail || matchCompany || matchId;
    }

    return true;
  });

  // Calculate status counts for tags
  const countAll = organizers.length;
  const countPending = organizers.filter(o => o.status === 'pending').length;
  const countApproved = organizers.filter(o => o.status === 'approved').length;
  const countRejected = organizers.filter(o => o.status === 'rejected').length;

  return (
    <div className="space-y-8 animate-fade-in text-sans">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Organizer Approval Bureau
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mt-1">
            Audit creator credentials, investigate business backgrounds, and review company tax records to grant event publishing authorization.
          </p>
        </div>

        {/* Local Search input for Organizers list view */}
        <div className="relative group w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors duration-200" />
          <input 
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl pl-10 pr-10 py-2.5 text-xs text-on-surface placeholder:text-outline-variant/50 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-semibold font-sans" 
            placeholder="Search credentials, ID, company..."
          />
          {localSearch && (
            <button 
              onClick={() => setLocalSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Filter Selector Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-outline-variant/10">
        <button
          onClick={() => setSelectedStatusTab('all')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
            selectedStatusTab === 'all' 
              ? 'bg-primary text-on-primary shadow-md shadow-primary/20' 
              : 'hover:bg-surface-bright/20 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          All Applications ({countAll})
        </button>

        <button
          onClick={() => setSelectedStatusTab('pending')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
            selectedStatusTab === 'pending' 
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20' 
              : 'hover:bg-surface-bright/30 text-amber-500 hover:text-amber-400 bg-amber-500/10 border border-amber-500/25'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
          Pending Verification ({countPending})
        </button>

        <button
          onClick={() => setSelectedStatusTab('approved')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
            selectedStatusTab === 'approved' 
              ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20' 
              : 'hover:bg-surface-bright/30 text-success hover:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current"></span>
          Approved ({countApproved})
        </button>

        <button
          onClick={() => setSelectedStatusTab('rejected')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
            selectedStatusTab === 'rejected' 
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
              : 'hover:bg-surface-bright/30 text-rose-500 hover:text-rose-400 bg-rose-500/10 border border-rose-500/25'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current"></span>
          Rejected ({countRejected})
        </button>
      </div>

      {/* Data Table Wrapper Card */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/60 border-b border-outline-variant/15 text-outline text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">ID Code</th>
                <th className="py-4 px-6">User Name</th>
                <th className="py-4 px-6">Company Name</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-on-surface font-semibold text-xs font-sans">
              {filteredOrganizers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-on-surface-variant font-semibold">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-10 h-10 text-outline-variant" />
                      <span>No matching organizer applicants registered of this status.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrganizers.map((org) => (
                  <tr key={org.id} className="hover:bg-surface-bright/15 transition-colors group">
                    {/* Column 1: ID Code */}
                    <td className="py-5 px-6 font-mono text-xs text-outline tracking-wider selection:bg-primary/20">
                      {org.id}
                    </td>

                    {/* Column 2: User Name with Avatar image */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-container shrink-0">
                          <img 
                            src={org.avatarUrl} 
                            alt={org.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <span className="text-on-surface font-bold text-sm block group-hover:text-primary transition-colors">
                            {org.name}
                          </span>
                          <span className="text-outline text-[11px] block mt-0.5 font-medium">
                            {org.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Company Name */}
                    <td className="py-5 px-6 text-on-surface-variant font-medium">
                      {org.companyName}
                    </td>

                    {/* Column 4: Status Badger Column */}
                    <td className="py-5 px-6 text-center">
                      {org.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                          Pending Check
                        </span>
                      )}
                      {org.status === 'approved' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-success ring-1 ring-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Approved
                        </span>
                      )}
                      {org.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* Column 5: Review Action button */}
                    <td className="py-5 px-6 text-right">
                      <button 
                        onClick={() => onSelectOrganizer(org.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary border border-primary/25 text-primary hover:text-on-primary font-bold text-xs transition-all cursor-pointer shadow-sm group-hover:scale-105 duration-200"
                      >
                        <UserCheck2 className="w-4.5 h-4.5" />
                        Review Code
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
