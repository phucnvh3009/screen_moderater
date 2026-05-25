import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Users, 
  Layers,
  Search,
  X,
  Compass
} from 'lucide-react';
import { VenueDetail } from '../types';

interface VenueExplorerViewProps {
  venues: VenueDetail[];
}

export default function VenueExplorerView({ venues }: VenueExplorerViewProps) {
  const [localSearch, setLocalSearch] = useState<string>('');

  // Filter venues by search keyword (name or address)
  const filteredVenues = venues.filter(venue => {
    if (!localSearch.trim()) return true;
    const query = localSearch.toLowerCase();
    return venue.name.toLowerCase().includes(query) || venue.address.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-8 animate-fade-in text-sans max-w-6xl mx-auto">
      {/* Title & info Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/15 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Venues Registry
          </h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mt-1">
            Database of physical theater spaces, stadium structures, spatial capacities, and published events.
          </p>
        </div>

        {/* Search input for filtering */}
        <div className="relative group w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors duration-200" />
          <input 
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl pl-10 pr-10 py-2.5 text-xs text-on-surface placeholder:text-outline-variant/50 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-semibold font-sans" 
            placeholder="Search venue name or location..."
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

      {/* Venues Data Table layout */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/60 border-b border-outline-variant/15 text-outline text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Venue Name</th>
                <th className="py-4 px-6">Address Location</th>
                <th className="py-4 px-6 text-center">Capacity</th>
                <th className="py-4 px-6 text-center">Active Events</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-on-surface font-semibold text-xs font-sans">
              {filteredVenues.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-on-surface-variant font-semibold">
                    <div className="flex flex-col items-center gap-2">
                      <Building className="w-10 h-10 text-outline-variant animate-pulse" />
                      <span>No matching registered venues found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredVenues.map((venue) => (
                  <tr key={venue.id} className="hover:bg-surface-bright/15 transition-colors group">
                    {/* Column 1: ID */}
                    <td className="py-5 px-6 font-mono text-xs text-outline tracking-wider selection:bg-primary/20">
                      {venue.id}
                    </td>

                    {/* Column 2: Venue Name */}
                    <td className="py-5 px-6 font-bold text-sm tracking-tight text-on-surface group-hover:text-primary transition-colors flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 border border-primary/25 text-primary shrink-0 group-hover:scale-105 duration-200 transition-transform">
                        <Building className="w-4 h-4 stroke-[2]" />
                      </div>
                      <span>{venue.name}</span>
                    </td>

                    {/* Column 3: Address Location */}
                    <td className="py-5 px-6 text-on-surface-variant font-medium leading-relaxed max-w-xs truncate">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-outline shrink-0" />
                        <span className="truncate">{venue.address}</span>
                      </div>
                    </td>

                    {/* Column 4: Capacity */}
                    <td className="py-5 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-surface-dim border border-outline-variant/15 text-on-surface">
                        <Users className="w-3.5 h-3.5 text-outline" />
                        {venue.capacity.toLocaleString()} Pax
                      </span>
                    </td>

                    {/* Column 5: Active Events */}
                    <td className="py-5 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                        <Layers className="w-3.5 h-3.5 text-primary" />
                        {venue.eventsCount} Active
                      </span>
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
