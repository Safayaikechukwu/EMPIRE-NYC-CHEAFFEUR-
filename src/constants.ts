import { 
  Car, 
  Plane, 
  Clock, 
  Shield, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase, 
  Phone,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  ArrowRight,
  Globe,
  Building2
} from 'lucide-react';

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  image: string;
  description: string;
  status?: 'Available' | 'Reserved' | 'Sold Out';
}

export const VEHICLES: Vehicle[] = [
  {
    id: 's-class-1',
    name: 'Mercedes-Benz S-Class',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://vegaspreowned-ez360.imgix.net/W1K6G7GB3TA369235/W1K6G7GB3TA369235-2026-Mercedes-Benz-S-Class.sp_turntable_pic.1000.4x3-4032x3024-6432KB-4K.20260205090216.jpg?con=12&sat=15&shad=25&vib=NaN&rect=0%2C3%2C3824%2C2868',
    description: 'The Sovereign of the Road. A masterclass in quiet authority and cutting-edge luxury.',
    status: 'Available'
  },
  {
    id: 's-class-2',
    name: 'Mercedes-Benz S-Class (Black)',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    description: 'The ultimate executive transport. Pristine condition, professional chauffeur.',
    status: 'Available'
  },
  {
    id: 's-class-3',
    name: 'Mercedes-Benz S-Class (Silver)',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    description: 'Elegant and sophisticated. Perfect for high-profile corporate travel.',
    status: 'Reserved'
  },
  {
    id: 'escalade-1',
    name: 'Cadillac Escalade ESV',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    description: 'The Titan of luxury SUVs. Massive presence and uncompromising space.',
    status: 'Available'
  },
  {
    id: 'escalade-2',
    name: 'Cadillac Escalade (Platinum)',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    description: 'Maximum comfort for group travel. Equipped with premium entertainment systems.',
    status: 'Available'
  },
  {
    id: 'escalade-3',
    name: 'Cadillac Escalade (Black Edition)',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    description: 'Bold and authoritative. The preferred choice for celebrity transport.',
    status: 'Sold Out'
  },
  {
    id: 'party-bus-1',
    name: 'Luxury Party Bus (20 Pax)',
    category: 'Party Bus',
    passengers: 20,
    luggage: 10,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'The ultimate celebration on wheels. Fiber optic lighting and premium sound.',
    status: 'Available'
  },
  {
    id: 'party-bus-2',
    name: 'Grand Party Bus (30 Pax)',
    category: 'Party Bus',
    passengers: 30,
    luggage: 15,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Spacious and vibrant. Perfect for weddings and large group events.',
    status: 'Reserved'
  },
  {
    id: 'short-bus-1',
    name: 'Executive Short Bus',
    category: 'Short Bus',
    passengers: 14,
    luggage: 10,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Comfortable group transit with executive amenities.',
    status: 'Available'
  },
  {
    id: 'shuttle-1',
    name: 'Corporate Shuttle (15 Pax)',
    category: 'Shuttle',
    passengers: 15,
    luggage: 15,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Reliable airport and event shuttle service.',
    status: 'Available'
  },
  {
    id: 'sprinter-1',
    name: 'Mercedes Sprinter (Executive)',
    category: 'Sprinter Van',
    passengers: 12,
    luggage: 12,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'The standard for executive group travel. High-roof comfort.',
    status: 'Available'
  },
  {
    id: 'sprinter-2',
    name: 'Mercedes Sprinter (Limo Style)',
    category: 'Sprinter Van',
    passengers: 10,
    luggage: 10,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Luxury interior with face-to-face seating and bar.',
    status: 'Available'
  },
  {
    id: 'bmw-7-1',
    name: 'BMW 7 Series',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    description: 'The Dynamic Sentinel. Engineered for prestige and performance.',
    status: 'Available'
  },
  {
    id: 'range-rover-1',
    name: 'Range Rover Autobiography',
    category: 'Luxury SUV',
    passengers: 4,
    luggage: 4,
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop',
    description: 'The All-Terrain Guardian. A fortress of luxury for any environment.',
    status: 'Available'
  },
  {
    id: 'suburban-1',
    name: 'Chevrolet Suburban',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    description: 'The Tactical Command. Ultimate escort for groups.',
    status: 'Available'
  },
  {
    id: 'rolls-ghost-1',
    name: 'Rolls-Royce Ghost',
    category: 'Specialty',
    passengers: 3,
    luggage: 2,
    image: 'https://images.unsplash.com/photo-1631214524020-5e18d976517b?q=80&w=2070&auto=format&fit=crop',
    description: 'The Ethereal Phantom. Transcendent luxury for milestones.',
    status: 'Sold Out'
  },
  {
    id: 'rolls-cullinan-1',
    name: 'Rolls-Royce Cullinan',
    category: 'Specialty',
    passengers: 4,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    description: 'The Apex Predator. The highest form of luxury and dominance.',
    status: 'Available'
  },
  {
    id: 'party-bus-3',
    name: 'Ultra Party Bus (40 Pax)',
    category: 'Party Bus',
    passengers: 40,
    luggage: 20,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Massive capacity for the biggest celebrations.',
    status: 'Sold Out'
  },
  {
    id: 'shuttle-2',
    name: 'Event Shuttle (25 Pax)',
    category: 'Shuttle',
    passengers: 25,
    luggage: 25,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Efficient group transport for corporate events.',
    status: 'Available'
  },
  {
    id: 'sprinter-3',
    name: 'Mercedes Sprinter (Cargo)',
    category: 'Sprinter Van',
    passengers: 2,
    luggage: 50,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Perfect for equipment transport and logistics.',
    status: 'Available'
  },
  {
    id: 'escalade-4',
    name: 'Cadillac Escalade (White)',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    description: 'Elegant white Escalade for weddings and special events.',
    status: 'Reserved'
  },
  {
    id: 's-class-4',
    name: 'Mercedes-Benz S-Class (Maybach)',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    description: 'The pinnacle of the S-Class range. Unrivaled luxury.',
    status: 'Sold Out'
  },
  {
    id: 'short-bus-2',
    name: 'Luxury Short Bus',
    category: 'Short Bus',
    passengers: 14,
    luggage: 10,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Upgraded interior for premium group travel.',
    status: 'Available'
  },
  {
    id: 'shuttle-3',
    name: 'VIP Shuttle (10 Pax)',
    category: 'Shuttle',
    passengers: 10,
    luggage: 10,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Private shuttle for small VIP groups.',
    status: 'Sold Out'
  },
  {
    id: 'sprinter-4',
    name: 'Mercedes Sprinter (Business)',
    category: 'Sprinter Van',
    passengers: 9,
    luggage: 9,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Mobile office setup for executives on the go.',
    status: 'Available'
  },
  {
    id: 'escalade-5',
    name: 'Cadillac Escalade (Armored)',
    category: 'Luxury SUV',
    passengers: 4,
    luggage: 4,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    description: 'Maximum security for high-profile clients.',
    status: 'Sold Out'
  },
  {
    id: 's-class-5',
    name: 'Mercedes-Benz S-Class (Hybrid)',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    description: 'Eco-friendly luxury without compromise.',
    status: 'Available'
  },
  {
    id: 'party-bus-4',
    name: 'Boutique Party Bus',
    category: 'Party Bus',
    passengers: 15,
    luggage: 5,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Intimate party setting for smaller groups.',
    status: 'Sold Out'
  },
  {
    id: 'shuttle-4',
    name: 'Airport Shuttle (Large)',
    category: 'Shuttle',
    passengers: 30,
    luggage: 30,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'High-capacity airport transfer specialist.',
    status: 'Sold Out'
  },
  {
    id: 'sprinter-5',
    name: 'Mercedes Sprinter (Adventure)',
    category: 'Sprinter Van',
    passengers: 4,
    luggage: 20,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'Customized for long-distance luxury travel.',
    status: 'Sold Out'
  }
];

export const TRUST_FEATURES = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Plane, text: 'Flight Tracking' },
  { icon: Star, text: '5-Star Rated' },
  { icon: Building2, text: 'Fortune 500 Trusted' },
  { icon: Globe, text: 'Global Banking Partners' },
  { icon: Briefcase, text: 'Private Equity Escort' }
];

export const SERVICES = [
  {
    title: 'Airport Chauffeur',
    description: 'Seamless transfers to and from JFK, LGA, and EWR with professional meet-and-greet.',
    link: '/airport-chauffeur-nyc',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Executive Car Service',
    description: 'Discreet and professional transportation for high-level executives and corporate events.',
    link: '/executive-chauffeur-nyc',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Hourly Chauffeur',
    description: 'Dedicated chauffeur at your disposal for meetings, events, or city exploration.',
    link: '/hourly-chauffeur-nyc',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'City-to-City Transfers',
    description: 'Long-distance premium travel between NYC and major Northeast hubs.',
    link: '/city-to-city-nyc',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop'
  }
];

export const AIRPORTS = [
  {
    name: 'JFK',
    fullName: 'John F. Kennedy International',
    description: 'NYC\'s primary international gateway. We provide curbside or inside meet-and-greet.',
    link: '/jfk-chauffeur'
  },
  {
    name: 'LGA',
    fullName: 'LaGuardia Airport',
    description: 'The preferred choice for domestic business travel. Efficient transfers to Manhattan.',
    link: '/laguardia-chauffeur'
  },
  {
    name: 'EWR',
    fullName: 'Newark Liberty International',
    description: 'Serving the tri-state area. Reliable transfers across the Hudson.',
    link: '/newark-chauffeur'
  }
];
