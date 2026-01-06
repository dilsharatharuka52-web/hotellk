
import React from 'react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-cyan-800 font-bold text-sm shadow-sm">
          ${room.price} / night
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{room.name}</h3>
            <p className="text-cyan-600 font-medium text-sm flex items-center">
              <i className="fa-solid fa-mountain-sun mr-2"></i>
              {room.view}
            </p>
          </div>
        </div>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {room.description}
        </p>
        <div className="flex items-center space-x-6 text-slate-500 text-sm border-t border-slate-50 pt-6">
          <span className="flex items-center">
            <i className="fa-solid fa-user-group mr-2"></i>
            Up to {room.capacity} Guests
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-wifi mr-2"></i>
            Free Wi-Fi
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-mug-saucer mr-2"></i>
            Breakfast
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
