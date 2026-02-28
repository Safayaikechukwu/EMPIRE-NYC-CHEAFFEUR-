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
  ArrowRight
} from 'lucide-react';

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  image: string;
  description: string;
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'exec-sedan',
    name: 'Executive Sedan',
    category: 'Mercedes-Benz S-Class or similar',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    description: 'The pinnacle of executive travel. Perfect for individual executives or couples.'
  },
  {
    id: 'luxury-suv',
    name: 'Luxury SUV',
    category: 'Cadillac Escalade ESV or similar',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    description: 'Spacious and commanding. Ideal for families or small executive teams with significant luggage.'
  },
  {
    id: 'premium-sprinter',
    name: 'Premium Sprinter',
    category: 'Mercedes-Benz Sprinter',
    passengers: 14,
    luggage: 14,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'The ultimate group transport. Configured for maximum comfort and productivity.'
  }
];

export const TRUST_FEATURES = [
  { icon: Clock, text: '24/7 Service' },
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Plane, text: 'Flight Tracking' },
  { icon: Star, text: '5-Star Rated' },
  { icon: CheckCircle2, text: 'Flat-Rate Pricing' }
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
