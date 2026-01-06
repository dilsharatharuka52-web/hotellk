
import React, { useState, useEffect } from 'react';
import { ROOMS } from './types';
import RoomCard from './components/RoomCard';
import ChatWidget, { triggerBooking } from './components/ChatWidget';

type Page = 'home' | 'experience' | 'rooms' | 'dining' | 'contact';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handleBookStay = () => {
    triggerBooking();
  };

  const renderContent = () => {
    switch (activePage) {
      case 'experience':
        return <ExperiencePage />;
      case 'rooms':
        return <RoomsPage onBook={handleBookStay} />;
      case 'dining':
        return <DiningPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setActivePage} onBook={handleBookStay} />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <nav className="fixed w-full z-40 px-6 py-4 flex justify-between items-center glass border-b border-slate-100">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <i className="fa-solid fa-anchor text-cyan-700 text-2xl"></i>
          <span className="font-serif text-2xl font-bold text-slate-800 tracking-tight">OceanView</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600 uppercase tracking-widest">
          <button 
            onClick={() => setActivePage('experience')} 
            className={`hover:text-cyan-700 transition-colors ${activePage === 'experience' ? 'text-cyan-700 border-b-2 border-cyan-700' : ''}`}
          >
            Experience
          </button>
          <button 
            onClick={() => setActivePage('rooms')} 
            className={`hover:text-cyan-700 transition-colors ${activePage === 'rooms' ? 'text-cyan-700 border-b-2 border-cyan-700' : ''}`}
          >
            Our Rooms
          </button>
          <button 
            onClick={() => setActivePage('dining')} 
            className={`hover:text-cyan-700 transition-colors ${activePage === 'dining' ? 'text-cyan-700 border-b-2 border-cyan-700' : ''}`}
          >
            Dining
          </button>
          <button 
            onClick={() => setActivePage('contact')} 
            className={`hover:text-cyan-700 transition-colors ${activePage === 'contact' ? 'text-cyan-700 border-b-2 border-cyan-700' : ''}`}
          >
            Contact
          </button>
        </div>
        <button 
          onClick={handleBookStay}
          className="bg-cyan-700 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-cyan-800 transition-all shadow-md group flex items-center"
        >
          <i className="fa-solid fa-calendar-check mr-2 animate-pulse"></i>
          Book Stay
        </button>
      </nav>

      {/* Page Content */}
      <main className="pt-16">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => setActivePage('home')}>
              <i className="fa-solid fa-anchor text-cyan-500 text-2xl"></i>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">OceanView</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A boutique escape on the golden shores of Sri Lanka. We offer a blend of luxury, serenity, and authentic island hospitality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cyan-500 transition-colors"><i className="fa-brands fa-instagram text-xl"></i></a>
              <a href="#" className="hover:text-cyan-500 transition-colors"><i className="fa-brands fa-facebook text-xl"></i></a>
              <a href="#" className="hover:text-cyan-500 transition-colors"><i className="fa-brands fa-tripadvisor text-xl"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setActivePage('home')} className="hover:text-white transition-colors">Our Story</button></li>
              <li><button onClick={() => setActivePage('rooms')} className="hover:text-white transition-colors">Rooms & Suites</button></li>
              <li><button onClick={() => setActivePage('dining')} className="hover:text-white transition-colors">Restaurant</button></li>
              <li><button onClick={() => setActivePage('experience')} className="hover:text-white transition-colors">Experience</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <i className="fa-solid fa-location-dot mt-1 mr-3 text-cyan-500"></i>
                Beach Road, Mirissa,<br />Sri Lanka
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-phone mr-3 text-cyan-500"></i>
                +94 11 123 4567
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope mr-3 text-cyan-500"></i>
                hello@oceanviewsl.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for seasonal offers and island news.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-l-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-cyan-500 outline-none" 
              />
              <button className="bg-cyan-700 text-white px-4 rounded-r-lg hover:bg-cyan-600 transition-colors">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center text-xs text-slate-600">
          <p>© 2024 OceanView Boutique Hotel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant Widget */}
      <ChatWidget />
    </div>
  );
};

// --- Page Components ---

const HomePage: React.FC<{ onNavigate: (page: Page) => void, onBook: () => void }> = ({ onNavigate, onBook }) => (
  <>
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="src/swimming-pool.jpg" 
          alt="Beach view" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <span className="text-white/80 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">Serenity Found in Sri Lanka</span>
        <h1 className="text-5xl md:text-8xl text-white font-bold mb-8 leading-tight">
          The Ocean is Your <br /><span className="italic font-normal">Backyard.</span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={onBook} className="w-full sm:w-auto bg-cyan-600 text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-cyan-700 transition-all flex items-center justify-center shadow-lg">
            <i className="fa-solid fa-bolt-lightning mr-2"></i> Instant Booking
          </button>
          <button onClick={() => onNavigate('rooms')} className="w-full sm:w-auto bg-transparent border border-white text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
            View Our Rooms
          </button>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
        <div className="p-6">
          <i className="fa-solid fa-clock text-cyan-700 text-3xl mb-4"></i>
          <h4 className="font-bold text-slate-800 mb-2">Check-in/out</h4>
          <p className="text-slate-500 text-sm">2:00 PM / 11:00 AM</p>
        </div>
        <div className="p-6">
          <i className="fa-solid fa-van-shuttle text-cyan-700 text-3xl mb-4"></i>
          <h4 className="font-bold text-slate-800 mb-2">Airport Pickup</h4>
          <p className="text-slate-500 text-sm">Available upon request</p>
        </div>
        <div className="p-6">
          <i className="fa-solid fa-mug-hot text-cyan-700 text-3xl mb-4"></i>
          <h4 className="font-bold text-slate-800 mb-2">Included Breakfast</h4>
          <p className="text-slate-500 text-sm">Daily tropical buffet</p>
        </div>
        <div className="p-6">
          <i className="fa-solid fa-wifi text-cyan-700 text-3xl mb-4"></i>
          <h4 className="font-bold text-slate-800 mb-2">High Speed Wi-Fi</h4>
          <p className="text-slate-500 text-sm">Free for all guests</p>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1">
        <img 
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1170" 
          alt="Lobby view" 
          className="rounded-3xl shadow-2xl"
        />
      </div>
      <div className="flex-1">
        <span className="text-cyan-700 text-sm font-bold uppercase tracking-widest mb-4 block">About Us</span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">A Sanctuary by the Sea</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Nestled on the pristine shores of southern Sri Lanka, OceanView Boutique Hotel is a testament to coastal elegance. Our architecture pays homage to local craftsmanship while providing modern comforts that ensure your stay is as peaceful as the surrounding tides.
        </p>
        <button onClick={() => onNavigate('experience')} className="text-cyan-700 font-bold uppercase text-xs tracking-widest flex items-center hover:translate-x-2 transition-transform">
          Discover the Experience <i className="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>
    </section>
  </>
);

const ExperiencePage: React.FC = () => (
  <div className="animate-fade-in">
    <header className="bg-cyan-900 py-24 px-6 text-white text-center">
      <h1 className="text-5xl font-bold font-serif mb-4">The OceanView Experience</h1>
      <p className="text-cyan-200 max-w-2xl mx-auto">From morning yoga to sunset surfing, every moment is crafted for discovery.</p>
    </header>
    
    <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="space-y-6">
        <img src="src/man-surfing-brazil.jpg" alt="Surfing" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
        <h3 className="text-3xl font-bold text-slate-800">Surf & Shore</h3>
        <p className="text-slate-600">Our beachfront location offers world-class waves for all levels. We provide professional coaching and equipment rental directly on the sand.</p>
      </div>
      <div className="space-y-6">
        <img src="src/healthy-attractive-woman-doing-exercises-body-practicing-yoga.jpg" alt="Yoga" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
        <h3 className="text-3xl font-bold text-slate-800">Sunset Wellness</h3>
        <p className="text-slate-600">Join our daily yoga sessions on the terrace as the sun dips below the horizon. Our wellness spa offers traditional Ayurvedic treatments.</p>
      </div>
      <div className="space-y-6">
        <img src="src/ramesh-ranasinghe-vq7iaP7ItJg-unsplash.jpg" alt="Whale watching" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
        <h3 className="text-3xl font-bold text-slate-800">Coastal Exploration</h3>
        <p className="text-slate-600">Discover the secrets of the Indian Ocean with our guided whale-watching tours and secret beach excursions led by local experts.</p>
      </div>
      <div className="space-y-6">
        <img src="src/matthijs-idema-ATup6L9yPeU-unsplash.jpg" alt="Local culture" className="rounded-2xl w-full h-80 object-cover" />
        <h3 className="text-3xl font-bold text-slate-800">Cultural Immersive</h3>
        <p className="text-slate-600">Take a trip to the historic Galle Fort or visit local tea plantations to experience the rich heritage of Sri Lanka.</p>
      </div>
    </section>
  </div>
);

const RoomsPage: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <div className="animate-fade-in">
    <header className="bg-slate-50 py-24 px-6 text-center">
      <h1 className="text-5xl font-bold font-serif mb-4 text-slate-900">Our Sanctuary</h1>
      <p className="text-slate-500 max-w-2xl mx-auto italic">"Designed for relaxation, inspired by the tides. Each space offers a unique blend of comfort and coastal charm."</p>
    </header>
    <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      {ROOMS.map(room => (
        <div key={room.id} className="relative group">
          <RoomCard room={room} />
          <div className="absolute bottom-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={onBook}
              className="bg-cyan-700 text-white px-6 py-3 rounded-xl shadow-xl hover:bg-cyan-800 transition-colors font-bold uppercase text-xs tracking-widest"
            >
              Book {room.name}
            </button>
          </div>
        </div>
      ))}
    </section>
  </div>
);

const DiningPage: React.FC = () => (
  <div className="animate-fade-in">
    <header className="relative h-96 flex items-center justify-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=2070" className="absolute inset-0 w-full h-full object-cover" alt="Dining" />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-5xl font-bold font-serif mb-2">The Saltwater Grill</h1>
        <p className="text-cyan-200 uppercase tracking-widest text-sm font-bold">Oceanfront Dining & Local Flavors</p>
      </div>
    </header>

    <section className="py-24 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-serif mb-8 text-slate-900">A Taste of the Island</h2>
      <p className="text-slate-600 leading-relaxed mb-16">
        At The Saltwater Grill, we celebrate the abundance of the Indian Ocean and the richness of Sri Lankan spices. Our chefs source ingredients daily from local markets and fisherman to create an ever-evolving menu of contemporary island cuisine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div className="border-b border-slate-100 pb-8">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xl font-bold text-slate-800">Mirissa Prawn Curry</h4>
            <span className="text-cyan-700 font-bold">$22</span>
          </div>
          <p className="text-sm text-slate-500 italic">Locally caught jumbo prawns in a rich coconut and spice infusion.</p>
        </div>
        <div className="border-b border-slate-100 pb-8">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xl font-bold text-slate-800">Seafood Platter</h4>
            <span className="text-cyan-700 font-bold">$45</span>
          </div>
          <p className="text-sm text-slate-500 italic">A selection of grilled fish, calamari, and lobster with garlic butter.</p>
        </div>
        <div className="border-b border-slate-100 pb-8">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xl font-bold text-slate-800">Tropical Hoppers</h4>
            <span className="text-cyan-700 font-bold">$12</span>
          </div>
          <p className="text-sm text-slate-500 italic">Traditional bowl-shaped rice pancakes served with sambal and curry.</p>
        </div>
        <div className="border-b border-slate-100 pb-8">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xl font-bold text-slate-800">Coconut Sorbet</h4>
            <span className="text-cyan-700 font-bold">$8</span>
          </div>
          <p className="text-sm text-slate-500 italic">Handmade sorbet using fresh king coconuts from our garden.</p>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="animate-fade-in">
    <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h1 className="text-5xl font-bold font-serif mb-8 text-slate-900">Get in Touch</h1>
        <p className="text-slate-600 mb-12">
          Whether you have a question about our rooms, want to book a special event, or simply want to say hello, we're here to help.
        </p>

        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-700">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Email Us</p>
              <p className="text-slate-800 font-medium">hello@oceanviewsl.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-700">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Call Us</p>
              <p className="text-slate-800 font-medium">+94 11 123 4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-700">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Our Location</p>
              <p className="text-slate-800 font-medium">Beach Road, Mirissa, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h3>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">First Name</label>
              <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-600" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Last Name</label>
              <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-600" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Email Address</label>
            <input type="email" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-600" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Message</label>
            <textarea rows={4} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-600"></textarea>
          </div>
          <button className="w-full bg-cyan-700 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-cyan-800 transition-colors shadow-lg">
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  </div>
);

export default App;
