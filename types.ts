
export type Role = 'user' | 'model' | 'system';

export interface Message {
  role: Role;
  text: string;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  view: string;
  image: string;
  description: string;
}

export const ROOMS: Room[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    price: 80,
    capacity: 2,
    view: 'Garden View',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1074',
    description: 'A cozy sanctuary featuring locally-inspired decor and a peaceful view of our tropical gardens.'
  },
  {
    id: 'deluxe',
    name: 'Deluxe Sea View Room',
    price: 120,
    capacity: 2,
    view: 'Sea View with Balcony',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1170',
    description: 'Wake up to the sounds of the Indian Ocean in this elegant room featuring a private balcony.'
  },
  {
    id: 'family',
    name: 'Family Suite',
    price: 180,
    capacity: 4,
    view: 'Sea View & Living Area',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1074',
    description: 'The perfect space for families, offering panoramic ocean views and separate living quarters.'
  }
];
