import { OrganizerApplication, EventDetail, VenueDetail, DashboardStats, RecentActivity } from './types';

export const INITIAL_DASHBOARD_STATS: DashboardStats = {
  pendingEvents: 42,
  totalOrganizers: 1284,
  approvedEvents: 8932,
  activeOrganizers: 412,
  serverLoad: 34,
  apiLatency: 42,
};

export const INITIAL_ORGANIZERS: OrganizerApplication[] = [
  {
    id: 'APP-9921-X',
    name: 'Moderator Alice',
    bio: 'Independent Event Promoter',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAzkaMZ3oPMioGjnYrmPEIvPjeWPvhY_4zgQHQXHbHcUrmnf3BJ-l0eW2Vt1gV0KsRcPfOhtbiSd5P0vAS-8GlUppjKuwfMyfdXxP6TRu_E10UGX1rxqBsOsrysqvX00GYxsykAvWVDw5NEWH1rbDb5xHDZwe-mBi3HfsUH3BI2Lo63m1HaOV9ZKN5QMPD5CODIJB_lCjNiPKdtSVhVlUJ_a06XpV3Jj8zWnkhbZ2A13SMI_0qUI6pQ9xLUfBOozymlPJFQP1T-34',
    altText: 'A professional high-resolution headshot of a business executive named Alice, captured in a modern studio environment. She is wearing a navy blue blazer over a charcoal turtleneck.',
    email: 'alice@eventhub.local',
    phone: '+1 (555) 902-1244',
    location: 'Austin, Texas',
    totalEvents: 124,
    avgRating: 4.9,
    companyName: 'Neon Horizon Productions LLC',
    taxCode: 'TX-882-199-0012',
    bankName: 'Global FinTrust Bank',
    bankAccount: '**** **** **** 4492',
    notes: '',
    status: 'pending',
    trustScore: 98,
    timeline: [
      { id: '1', time: '2 hours ago', text: 'Application submitted by Alice', status: 'info' },
      { id: '2', time: '1 hour ago', text: 'Automated KYC check Passed', status: 'success' },
      { id: '3', time: 'Pending...', text: 'Background check initiated', status: 'pending' },
    ],
  },
  {
    id: 'APP-8840-Y',
    name: 'David Vance',
    bio: 'Nightlife Coordinator',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsNRI-knYYuoNpyAswi9vqDloevoA9-AaPeEkiTJTZ7AFbi2UuYxEzIUQKlFFiyCBFFegnPZJgQJbo8AHSj-x-NKUDX_o6X39-R8_5COOXueyjxNgPy3A9wQmuHJGOaO4gDP0oJOp4X2C_ZhkP1ZnokS6uPkXP0SEWw3HatAOWOAX959bMKGsClY7Ec3yubfszGJFapzE16dV0MKzN75duwFClCyZ9R8xxBTmK9tTPxtaT0mlhcFJTZOylUYDXrjzIfQVk3ZqMvy8',
    altText: 'Profile of David Vance with neon lights reflecting on his face.',
    email: 'vance@vibe.local',
    phone: '+1 (415) 309-8800',
    location: 'San Francisco, California',
    totalEvents: 72,
    avgRating: 4.7,
    companyName: 'Vibe Productions Inc',
    taxCode: 'SF-101-203-0402',
    bankName: 'Silicon Trust Bank',
    bankAccount: '**** **** **** 9081',
    notes: 'All documents checked. Clear history.',
    status: 'approved',
    trustScore: 95,
    timeline: [
      { id: '1', time: '1 day ago', text: 'Application submitted by David', status: 'info' },
      { id: '2', time: '1 day ago', text: 'Automated KYC check Passed', status: 'success' },
      { id: '3', time: '18 hours ago', text: 'Background check cleared successfully', status: 'success' },
    ],
  },
  {
    id: 'APP-5512-B',
    name: 'Elena Smith',
    bio: 'Creative Director',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqCqbzggquxzxg7q9R7XkgJZvlkG9_MRpc5pxMnB2NugmDQX728iANwiY4zEX6khog7sDPD01fkviLC0cG1pH0FxhCnczhShLyQVqIQnuil7bDviUZ-n3JIs4I3Y6tHeZqOMKRTz5G9b-XdPX_oaXYLe0OO63ttZ6Yri2-CfPV-QLULthY85pu_yCswKTThCZ9SgoVT7ZXPKlALnw8IKcpdnTBiusMB-uvYUX6CpfVZpYv4oBinfrlBYraMSzlzUz3d5zdGJEMwHg',
    altText: 'Creative director portrait with fuchsia colors.',
    email: 'elena@prism-events.com',
    phone: '+1 (212) 808-1992',
    location: 'New York, New York',
    totalEvents: 310,
    avgRating: 4.8,
    companyName: 'Prism Events Co.',
    taxCode: 'NY-449-301-3312',
    bankName: 'Empire National Bank',
    bankAccount: '**** **** **** 1022',
    notes: 'Long-standing premier member.',
    status: 'approved',
    trustScore: 100,
    timeline: [
      { id: '1', time: '3 days ago', text: 'Application submitted', status: 'info' },
      { id: '2', time: '3 days ago', text: 'Automated KYC check Passed', status: 'success' },
      { id: '3', time: '2 days ago', text: 'Fast-tracked approvals based on historical records', status: 'success' },
    ],
  }
];

export const INITIAL_EVENTS: EventDetail[] = [
  {
    id: 'EV-1001',
    title: 'Neon Horizon Festival',
    type: 'Festival',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEoHn2l4fW1OpG8fWmdpLHSDM7K-TOC8Pu_MI89BOYaQvKuObIIPYHhrjtRIruGdkgJTPcNI0ICUo22rqa5VrL_8_XuDeYinMBUkdqyxyTiVtq-gGr5p9e8et9OO96bWPGD6c_EduZeaIVxcxoeAzBSXvxVP8dGca_o_yIx6XoUNghID8W-w-cYZuBkT85V1Ac5GyQ_jFykbtFJ8U0hGL3LYpkmYUVZb9dI4DD3e9LaR9WpgrZtt7wbzEM2yb96IsCSwRDm2YjyJM',
    coverAlt: 'Vibrant neon-lit electronic music festival with strobe lights and cheering crowd.',
    startDate: 'Oct 24, 2024 • 22:00',
    endDate: 'Oct 25, 2024 • 06:00',
    organizerName: 'Prism Events Co.',
    description: 'Immerse Yourself in the Neon Horizon. Experience top electronic music production with full laser array support, multiple secondary stages, and high-energy electronic, industrial, and hardstyle sounds. Join thousands of dance music enthusiasts for a night that redefines sound and space.',
    venueName: 'The Steel Foundry',
    venueAddress: '404 Warehouse District, Metro City',
    venueCapacity: 2500,
    venueSecurity: 'High',
    venueMapUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Z9XWPR4UHCtDQ94iN05NLh-7VgwiWSRcuQJgDW7eTXSaBQ6JCfi3a4RVgCw_bKcZ_WwjvwprJFFLEwokhspwqkROWNuBneVBnkO6c5kutOYtgCcrsc5DScC3ezklagofUM8gNV3Aa9ra6u91ztxGnOnr_vmg6IcT-drGkuzMJ4NCcPLwcHHS3nKR8MYMeBAwRU7kwisMVP4ezp0APeR5rXcECgWgv-T72Q43I0X6Q-bUBNQUsbQm54NdwMqVYB1RzEQRr5JxoA',
    status: 'pending',
    tiers: [
      { id: 't1', name: 'General Admission', price: 35.00, stockText: 'Available', stockColor: 'success', limitText: 'Limit 1000' },
      { id: 't2', name: 'VIP Pass', price: 90.00, stockText: 'Low Stock: 15 left', stockColor: 'warning', limitText: 'Limit 150', isPremium: true }
    ]
  },
  {
    id: 'EV-1005',
    title: 'Midnight Jazz Lounge',
    type: 'Club Night',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcBARXcaUXmQ4n2UbX-3kKHNX5q2fgMx3W7o-oo4owveFi3ndqfXY4U3OOl3IoCwEvJFhVwvwHZy2Z_E-nVeow6bfBXEY3xPqFC2Ziez-3_9PrhiUJ7lXtwAESrR1eFPuwmdWCmoJNieCPX-03mEiBPHHLSj--biyxCCIv3n_dzNRikCb0a34O8JtTUEYBkIauiCADbF8s9SnbjDBZzANO6wFiP2_QJ52RyvRUl-QD5004EQs7NZp9T-RXvx3nYPmCViYWUopBJis',
    coverAlt: 'A moody jazz club interior with soft purple backlighting and musicians.',
    startDate: 'Oct 26, 2024 • 21:30',
    endDate: 'Oct 27, 2024 • 02:00',
    organizerName: 'Vibe Productions',
    description: 'An elegant evening of soul-stirring smooth jazz, dark-roasted cocktails, and live acoustic bands. Retreat into a dimly lit lounge with perfect acoustics, velvety sofas, and a curated crowd of local jazz aficionados.',
    venueName: 'Velvet Cellar Lounge',
    venueAddress: '12 Blue Notes Plaza, downtown',
    venueCapacity: 150,
    venueSecurity: 'Medium',
    venueMapUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Z9XWPR4UHCtDQ94iN05NLh-7VgwiWSRcuQJgDW7eTXSaBQ6JCfi3a4RVgCw_bKcZ_WwjvwprJFFLEwokhspwqkROWNuBneVBnkO6c5kutOYtgCcrsc5DScC3ezklagofUM8gNV3Aa9ra6u91ztxGnOnr_vmg6IcT-drGkuzMJ4NCcPLwcHHS3nKR8MYMeBAwRU7kwisMVP4ezp0APeR5rXcECgWgv-T72Q43I0X6Q-bUBNQUsbQm54NdwMqVYB1RzEQRr5JxoA',
    status: 'approved',
    tiers: [
      { id: 't1', name: 'Bar Counter Seat', price: 25.00, stockText: 'Sold Out', stockColor: 'error', limitText: 'Limit 40' },
      { id: 't2', name: 'VIP Booth reservation', price: 120.00, stockText: 'Available (12 Tables)', stockColor: 'success', limitText: 'Premium Table', isPremium: true }
    ]
  },
  {
    id: 'EV-1012',
    title: 'Warehouse Underground',
    type: 'Rave',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmiHHcTZOVIquGWcBQBJxlXONNa-OgM1qbWkpjMtTHjCLKzZMmQYI7OEIWunSnxDw5v32Ys2uysUiTYT35cu51ftsR1lsrL-3xABWA7XifADtecGWwdnhSqM9njdgOvXgTjjHwBG3mfl8VGmwYmuHVY67hNmotLQvNIWMJUYJhSMqnCqJyxqbyZkhelURE-B3T0NGE2PJxDkgIv7EofvmM8PPRQIKE68Z2NYmBy4DcRyFqOcsPOTlBNPMTYHdknaJz26GlI0eSS8',
    coverAlt: 'Crowded warehouse party with laser lights and industrial atmosphere.',
    startDate: 'Oct 28, 2024 • 23:59',
    endDate: 'Oct 29, 2024 • 07:00',
    organizerName: 'Berlin Beats',
    description: 'An underground techno odyssey featuring heavy industrial sounds, non-compromising visual sets, strict no-camera policy, and true raving spirits directly inside an abandoned manufacturing silo.',
    venueName: 'The Boiler Vault',
    venueAddress: '99 Silo Complex, Industrial Sector B',
    venueCapacity: 800,
    venueSecurity: 'Strict',
    venueMapUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Z9XWPR4UHCtDQ94iN05NLh-7VgwiWSRcuQJgDW7eTXSaBQ6JCfi3a4RVgCw_bKcZ_WwjvwprJFFLEwokhspwqkROWNuBneVBnkO6c5kutOYtgCcrsc5DScC3ezklagofUM8gNV3Aa9ra6u91ztxGnOnr_vmg6IcT-drGkuzMJ4NCcPLwcHHS3nKR8MYMeBAwRU7kwisMVP4ezp0APeR5rXcECgWgv-T72Q43I0X6Q-bUBNQUsbQm54NdwMqVYB1RzEQRr5JxoA',
    status: 'rejected',
    tiers: [
      { id: 't1', name: 'Underground Member Ticket', price: 20.00, stockText: 'Cancelled', stockColor: 'neutral', limitText: 'Limit 800' }
    ]
  },
  {
    id: 'EV-1024',
    title: 'Solstice Rave',
    type: 'Rave',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXO0IA60cbr0fZg-GrcHnEWmO3_ugu8gkiA5yFcQMfJoEn8KwKff3lRB04fNuGzvG_gMCCoqJwsGIY0hNpBFZeYNBCQ0SE5miKSFUHnIL9UJckiy-TWc_6C3_YpA1eE189YNO0ng5yLb746rZ9mZ7msPBE65UsLNXcyOyEUkqU7WquPgUn80p-g7zNwP2ZHyO35cUn-MVVDNUewWSIyWX6vAL7suWsRNiPSVc-dJm3DgMgXryU0dEp2pg9uNFFdgytAJtQ1lfWRc',
    coverAlt: 'Outdoor summer concert at sunset, warm orange and purple sky.',
    startDate: 'Nov 01, 2024 • 18:00',
    endDate: 'Nov 02, 2024 • 04:00',
    organizerName: 'Global Sounds',
    description: 'Welcome the winter solstice with a breathtaking outdoor rave. An massive digital display backdrop will project live celestial visualizations synced with modern progressive house rhythms under the clear open sky.',
    venueName: 'Sunset Valley Amphitheater',
    venueAddress: 'High Hills County Highway 9',
    venueCapacity: 5000,
    venueSecurity: 'Medium',
    venueMapUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Z9XWPR4UHCtDQ94iN05NLh-7VgwiWSRcuQJgDW7eTXSaBQ6JCfi3a4RVgCw_bKcZ_WwjvwprJFFLEwokhspwqkROWNuBneVBnkO6c5kutOYtgCcrsc5DScC3ezklagofUM8gNV3Aa9ra6u91ztxGnOnr_vmg6IcT-drGkuzMJ4NCcPLwcHHS3nKR8MYMeBAwRU7kwisMVP4ezp0APeR5rXcECgWgv-T72Q43I0X6Q-bUBNQUsbQm54NdwMqVYB1RzEQRr5JxoA',
    status: 'pending',
    tiers: [
      { id: 't1', name: 'Standard Pass', price: 40.00, stockText: 'Low Stock: 5 left', stockColor: 'warning', limitText: 'Limit 3000' },
      { id: 't2', name: 'Starlight Canopy Comfort', price: 150.00, stockText: 'Available', stockColor: 'success', limitText: 'Premium Lounge', isPremium: true }
    ]
  },
  {
    id: 'EV-9921',
    title: 'Neon Pulse: Underworld 2024',
    type: 'Concert',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtxIYZ2xmJE6-j0EvRTzAwW8aPJ8YGo4BEyBgskIYT5wNOI3wNWCn0IXAqrYtoTnZLN4AzCpbmYz2sftenHBicynLhP-k1KmO-b-PzSXLpLZrxy7o5ZJtPtpzeL3WCVU9FlYn4hDkq8Nzs9z8d_e3WTlJ47C1V4aBec6bIjTuPxUN8G1PrTGDanOKVkhDGRlFy6e7sWe_i802FRSNhUx5wKrSNRU4H9JrVQ6I25GgzulgujodcLqh288236WqZtmi5tJ1oWPeqzXw',
    coverAlt: 'A fuchsia-laser themed concert hall crowd.',
    startDate: 'Oct 24, 2024 • 21:00',
    endDate: 'Oct 25, 2024 • 04:00',
    organizerName: 'NightX Team',
    description: 'Step into the void with Neon Pulse: Underworld 2024. This year\'s flagship event transforms the industrial heart of the city into a hyper-visual auditory landscape. Featuring a curated lineup of world-class techno and deep-house artists, we are pushing the boundaries of what a live performance can be.\n\nOur production team has engineered a bespoke 360-degree sound system and a synchronized light show that reacts in real-time to the performers\' BPM. Expect immersive visuals, premium cocktails, and an atmosphere that only happens once a year. Entry is strictly 21+ and requires a digital pass for verification.',
    venueName: 'The Steel Foundry',
    venueAddress: '404 Warehouse District, Metro City',
    venueCapacity: 2500,
    venueSecurity: 'High',
    venueMapUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Z9XWPR4UHCtDQ94iN05NLh-7VgwiWSRcuQJgDW7eTXSaBQ6JCfi3a4RVgCw_bKcZ_WwjvwprJFFLEwokhspwqkROWNuBneVBnkO6c5kutOYtgCcrsc5DScC3ezklagofUM8gNV3Aa9ra6u91ztxGnOnr_vmg6IcT-drGkuzMJ4NCcPLwcHHS3nKR8MYMeBAwRU7kwisMVP4ezp0APeR5rXcECgWgv-T72Q43I0X6Q-bUBNQUsbQm54NdwMqVYB1RzEQRr5JxoA',
    status: 'pending',
    tiers: [
      { id: 't1', name: 'Early Bird', price: 45.00, stockText: 'Low Stock: 42 left', stockColor: 'warning', limitText: 'Limit 250' },
      { id: 't2', name: 'VIP Backstage', price: 120.00, stockText: 'Stock Limit: 50', stockColor: 'neutral', limitText: 'PREMIUM', isPremium: true }
    ]
  }
];

export const INITIAL_VENUES: VenueDetail[] = [
  {
    id: 'V-101',
    name: 'The Steel Foundry',
    address: '404 Warehouse District, Metro City',
    capacity: 2500,
    security: 'High',
    rating: 4.9,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtxIYZ2xmJE6-j0EvRTzAwW8aPJ8YGo4BEyBgskIYT5wNOI3wNWCn0IXAqrYtoTnZLN4AzCpbmYz2sftenHBicynLhP-k1KmO-b-PzSXLpLZrxy7o5ZJtPtpzeL3WCVU9FlYn4hDkq8Nzs9z8d_e3WTlJ47C1V4aBec6bIjTuPxUN8G1PrTGDanOKVkhDGRlFy6e7sWe_i802FRSNhUx5wKrSNRU4H9JrVQ6I25GgzulgujodcLqh288236WqZtmi5tJ1oWPeqzXw',
    description: 'A massive retrofitted industrial hangar located in the heart of the Warehouse District, boasting concrete layouts, heavy-insulated bass containment walls, and state-of-the-art rigging systems.',
    eventsCount: 38,
  },
  {
    id: 'V-102',
    name: 'Velvet Cellar Lounge',
    address: '12 Blue Notes Plaza, downtown',
    capacity: 150,
    security: 'Medium',
    rating: 4.8,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcBARXcaUXmQ4n2UbX-3kKHNX5q2fgMx3W7o-oo4owveFi3ndqfXY4U3OOl3IoCwEvJFhVwvwHZy2Z_E-nVeow6bfBXEY3xPqFC2Ziez-3_9PrhiUJ7lXtwAESrR1eFPuwmdWCmoJNieCPX-03mEiBPHHLSj--biyxCCIv3n_dzNRikCb0a34O8JtTUEYBkIauiCADbF8s9SnbjDBZzANO6wFiP2_QJ52RyvRUl-QD5004EQs7NZp9T-RXvx3nYPmCViYWUopBJis',
    description: 'An intimate, low-ceiling jazz club specializing in organic acoustics, high-end spirit tasting, and relaxed atmospheres with historical charm.',
    eventsCount: 14,
  },
  {
    id: 'V-103',
    name: 'Sunset Valley Amphitheater',
    address: 'High Hills County Highway 9',
    capacity: 5000,
    security: 'Medium',
    rating: 4.7,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXO0IA60cbr0fZg-GrcHnEWmO3_ugu8gkiA5yFcQMfJoEn8KwKff3lRB04fNuGzvG_gMCCoqJwsGIY0hNpBFZeYNBCQ0SE5miKSFUHnIL9UJckiy-TWc_6C3_YpA1eE189YNO0ng5yLb746rZ9mZ7msPBE65UsLNXcyOyEUkqU7WquPgUn80p-g7zNwP2ZHyO35cUn-MVVDNUewWSIyWX6vAL7suWsRNiPSVc-dJm3DgMgXryU0dEp2pg9uNFFdgytAJtQ1lfWRc',
    description: 'Breathtaking open-air theater situated inside natural hill structures. Known for stellar acoustic reflection and incredible twilight scenery.',
    eventsCount: 22,
  }
];

export const INITIAL_RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: 'act-1',
    type: 'event_submitted',
    title: 'John Doe',
    subtitle: 'submitted a new event: Neon Nights Rave',
    time: '2 minutes ago',
    eventId: 'EV-1001',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsNRI-knYYuoNpyAswi9vqDloevoA9-AaPeEkiTJTZ7AFbi2UuYxEzIUQKlFFiyCBFFegnPZJgQJbo8AHSj-x-NKUDX_o6X39-R8_5COOXueyjxNgPy3A9wQmuHJGOaO4gDP0oJOp4X2C_ZhkP1ZnokS6uPkXP0SEWw3HatAOWOAX959bMKGsClY7Ec3yubfszGJFapzE16dV0MKzN75duwFClCyZ9R8xxBTmK9tTPxtaT0mlhcFJTZOylUYDXrjzIfQVk3ZqMvy8',
    avatarAlt: 'A profile headshot of a young professional event organizer with neon lighting.'
  },
  {
    id: 'act-2',
    type: 'organizer_verified',
    title: 'Elena Smith',
    subtitle: 'organizer account Verified',
    time: '15 minutes ago',
    organizerId: 'APP-5512-B',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqCqbzggquxzxg7q9R7XkgJZvlkG9_MRpc5pxMnB2NugmDQX728iANwiY4zEX6khog7sDPD01fkviLC0cG1pH0FxhCnczhShLyQVqIQnuil7bDviUZ-n3JIs4I3Y6tHeZqOMKRTz5G9b-XdPX_oaXYLe0OO63ttZ6Yri2-CfPV-QLULthY85pu_yCswKTThCZ9SgoVT7ZXPKlALnw8IKcpdnTBiusMB-uvYUX6CpfVZpYv4oBinfrlBYraMSzlzUz3d5zdGJEMwHg',
    avatarAlt: 'A profile portrait of a female creative director with vibrant colored lighting.'
  },
  {
    id: 'act-3',
    type: 'event_flagged',
    title: 'Event Flagged:',
    subtitle: '"Underground Bass" reported for noise violation',
    time: '1 hour ago'
  }
];
