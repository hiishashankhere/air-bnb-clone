import {
  Bath,
  Building,
  Car,
  CheckCircle2,
  Cross,
  Dog,
  Fan,
  Flame,
  Key,
  Laptop,
  MapPin,
  MessageSquare,
  Microwave,
  Refrigerator,
  ShieldAlert,
  Shirt,
  Snowflake,
  Sparkles,
  Sun,
  Tag,
  Tv,
  Utensils,
  Video,
  Waves,
  Wifi,
  Wind,
} from 'lucide-react';
import React from 'react';

export function renderAmenityIcon(iconName: string): React.ReactNode {
  const props = { className: 'w-6 h-6 text-gray-800 shrink-0 stroke-[1.75]' };

  switch (iconName) {
    case 'Utensils':
      return <Utensils {...props} />;
    case 'Wifi':
      return <Wifi {...props} />;
    case 'Laptop':
      return <Laptop {...props} />;
    case 'Car':
      return <Car {...props} />;
    case 'Waves':
      return <Waves {...props} />;
    case 'Bath':
      return <Bath {...props} />;
    case 'Dog':
      return <Dog {...props} />;
    case 'Video':
      return <Video {...props} />;
    case 'ShieldAlert':
      return <ShieldAlert {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'Fan':
      return <Fan {...props} />;
    case 'Tv':
      return <Tv {...props} />;
    case 'Refrigerator':
      return <Refrigerator {...props} />;
    case 'Microwave':
      return <Microwave {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    case 'Shirt':
      return <Shirt {...props} />;
    case 'Building':
      return <Building {...props} />;
    case 'Sun':
      return <Sun {...props} />;
    case 'Cross':
      return <Cross {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    case 'Key':
      return <Key {...props} />;
    case 'MessageSquare':
      return <MessageSquare {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'Tag':
      return <Tag {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}
