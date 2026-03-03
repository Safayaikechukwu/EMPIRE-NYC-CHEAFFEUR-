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
  status?: 'Available' | 'Reserved' | 'Sold Out';
}

export const VEHICLES: Vehicle[] = [
  {
    id: 's-class',
    name: 'Mercedes-Benz S-Class',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    description: 'The Sovereign of the Road. A masterclass in quiet authority, offering an impenetrable sanctuary of luxury and cutting-edge intelligence for the elite traveler.',
    status: 'Available'
  },
  {
    id: 'bmw-7',
    name: 'BMW 7 Series',
    category: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    description: 'The Dynamic Sentinel. Engineered for those who demand both executive prestige and the agility of a high-performance operative. Power, refined.',
    status: 'Available'
  },
  {
    id: 'camry-exec',
    name: 'Toyota Camry XSE',
    category: 'Business Sedan',
    passengers: 3,
    luggage: 2,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop',
    description: 'The Stealth Operative. Efficient, reliable, and perfectly discreet. The ideal choice for high-stakes city maneuvers where blending in is the ultimate advantage.',
    status: 'Available'
  },
  {
    id: 'accord-exec',
    name: 'Honda Accord Touring',
    category: 'Business Sedan',
    passengers: 3,
    luggage: 2,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop',
    description: 'The Precision Specialist. A balanced fusion of smart technology and smooth performance. Reliable support for the modern professional on the move.',
    status: 'Reserved'
  },
  {
    id: 'tesla-y',
    name: 'Tesla Model Y',
    category: 'Electric Executive',
    passengers: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2070&auto=format&fit=crop',
    description: 'The Silent Guardian. Zero emissions, maximum intelligence. A futuristic choice for the environmentally conscious executive who values silent, swift maneuvers.',
    status: 'Available'
  },
  {
    id: 'escalade',
    name: 'Cadillac Escalade ESV',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    description: 'The Titan. An unshakeable icon of American power. With massive presence and uncompromising space, it commands the road and protects its passengers with absolute scale.',
    status: 'Available'
  },
  {
    id: 'range-rover',
    name: 'Range Rover Autobiography',
    category: 'Luxury SUV',
    passengers: 4,
    luggage: 4,
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop',
    description: 'The All-Terrain Guardian. From city streets to rugged retreats, it offers a fortress of luxury that conquers any environment with effortless grace.',
    status: 'Available'
  },
  {
    id: 'suburban',
    name: 'Chevrolet Suburban',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    description: 'The Tactical Command. The ultimate escort for groups. Spacious, secure, and built for the most demanding logistics with a discreet, professional profile.',
    status: 'Available'
  },
  {
    id: 'sprinter-exec',
    name: 'Mercedes-Benz Sprinter',
    category: 'Executive Sprinter',
    passengers: 14,
    luggage: 14,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop',
    description: 'The Mobile Fortress. A high-capacity executive command center on wheels. Designed for team collaboration and secure group transit in total comfort.',
    status: 'Available'
  },
  {
    id: 'rolls-ghost',
    name: 'Rolls-Royce Ghost',
    category: 'Specialty',
    passengers: 3,
    luggage: 2,
    image: 'https://images.unsplash.com/photo-1631214524020-5e18d976517b?q=80&w=2070&auto=format&fit=crop',
    description: 'The Ethereal Phantom. A rare manifestation of automotive perfection. Silent, transcendent, and reserved exclusively for life\'s most significant milestones.',
    status: 'Sold Out'
  },
  {
    id: 'rolls-cullinan',
    name: 'Rolls-Royce Cullinan',
    category: 'Specialty',
    passengers: 4,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    description: 'The Apex Predator. The highest form of luxury and dominance. It stands alone at the summit of automotive achievement, offering a ride beyond compare.',
    status: 'Available'
  }
];

export const TRUST_FEATURES = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Plane, text: 'Flight Tracking' },
  { icon: Star, text: '5-Star Rated' }
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
