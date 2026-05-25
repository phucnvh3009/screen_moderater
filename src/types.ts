export interface TimelineEvent {
  id: string;
  time: string;
  text: string;
  status: 'info' | 'success' | 'pending' | 'danger';
}

export interface OrganizerApplication {
  id: string;
  name: string;
  avatarUrl: string;
  altText?: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  totalEvents: number;
  avgRating: number;
  companyName: string;
  taxCode: string;
  bankName: string;
  bankAccount: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
  trustScore: number;
  timeline: TimelineEvent[];
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  stockText: string;
  stockColor: 'error' | 'success' | 'warning' | 'neutral';
  limitText: string;
  isPremium?: boolean;
}

export interface EventDetail {
  id: string;
  title: string;
  type: string;
  coverUrl: string;
  coverAlt?: string;
  startDate: string;
  endDate: string;
  description: string;
  organizerName: string;
  venueName: string;
  venueAddress: string;
  venueCapacity: number;
  venueSecurity: string;
  venueMapUrl: string;
  tiers: TicketTier[];
  status: 'pending' | 'approved' | 'rejected';
}

export interface VenueDetail {
  id: string;
  name: string;
  address: string;
  capacity: number;
  security: string;
  rating: number;
  coverUrl: string;
  description: string;
  eventsCount: number;
}

export interface DashboardStats {
  pendingEvents: number;
  totalOrganizers: number;
  approvedEvents: number;
  activeOrganizers: number;
  serverLoad: number;
  apiLatency: number;
}

export interface RecentActivity {
  id: string;
  type: 'event_submitted' | 'organizer_verified' | 'event_flagged';
  title: string;
  subtitle: string;
  time: string;
  avatarUrl?: string;
  avatarAlt?: string;
  eventId?: string;
  organizerId?: string;
}
