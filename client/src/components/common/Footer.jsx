import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                StayFinder
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Simplifying PG & premium co-living rentals. Rent verified rooms, hostels, apartments, and shared stays seamlessly.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/listings" className="hover:text-white transition-colors">Explore Stays</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Who We Are</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Inquiries & Support</Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Property Types</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/listings?type=PG" className="hover:text-white transition-colors">Paying Guests (PG)</Link>
              </li>
              <li>
                <Link to="/listings?type=Hostel" className="hover:text-white transition-colors">Student Hostels</Link>
              </li>
              <li>
                <Link to="/listings?type=Flat" className="hover:text-white transition-colors">Independent Flats</Link>
              </li>
              <li>
                <Link to="/listings?type=Room" className="hover:text-white transition-colors">Private Rooms</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Get In Touch</h3>
            <div className="flex items-start space-x-2">
              <MapPin size={16} className="text-primary-500 mt-0.5" />
              <span>HSR Layout, Tech Sector, Bengaluru, Karnataka, India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-primary-500" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-primary-500" />
              <span>support@stayfinder.co</span>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
          <p>© 2026 StayFinder Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
