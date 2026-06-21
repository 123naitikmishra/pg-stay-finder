import { useState, useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { 
  ShieldAlert, Users, Building, FileText, Trash2, Shield, ToggleLeft, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { properties, deleteProperty, removeReview } = useProperties();
  
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, [properties]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch mock users list from local storage
      const localUsers = JSON.parse(localStorage.getItem('sf_users')) || [];
      setUsers(localUsers);
      
      // Fetch bookings
      const localBookings = await bookingService.getBookings(currentUser?.id, 'Admin');
      setBookings(localBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserRoleChange = (userId, newRole) => {
    const localUsers = JSON.parse(localStorage.getItem('sf_users')) || [];
    const idx = localUsers.findIndex(u => u.id === userId);
    if (idx !== -1) {
      localUsers[idx].role = newRole;
      localStorage.setItem('sf_users', JSON.stringify(localUsers));
      fetchAdminData();
    }
  };

  const handlePropertyRemove = async (id) => {
    if (window.confirm("Are you sure you want to remove this property listing?")) {
      await deleteProperty(id);
    }
  };

  // Collate reviews from all properties
  const allReviews = properties.reduce((acc, curr) => {
    const propertyReviews = curr.reviews.map(rev => ({
      ...rev,
      propertyId: curr.id,
      propertyTitle: curr.title
    }));
    return [...acc, ...propertyReviews];
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <Shield className="text-indigo-600" />
          <span>System Admin Panel</span>
        </h1>
        <p className="text-xs text-slate-400">Overview dashboard for stay properties, client registers, and reviews moderation</p>
      </div>

      {/* Admin stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Users size={16} /></div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Users</span>
            <span className="text-sm font-extrabold text-slate-800">{users.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-primary-50 text-primary-500 rounded-xl"><Building size={16} /></div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Stays Listed</span>
            <span className="text-sm font-extrabold text-slate-800">{properties.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl"><FileText size={16} /></div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Bookings</span>
            <span className="text-sm font-extrabold text-slate-800">{bookings.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl"><ShieldAlert size={16} /></div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Reviews Moderated</span>
            <span className="text-sm font-extrabold text-slate-800">{allReviews.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-100 flex space-x-6 text-sm font-bold text-slate-400">
        <button 
          onClick={() => setActiveTab('users')}
          className={`pb-3 border-b-2 transition-all ${activeTab === 'users' ? 'border-indigo-600 text-slate-800' : 'border-transparent hover:text-slate-600'}`}
        >
          Manage Users
        </button>
        <button 
          onClick={() => setActiveTab('properties')}
          className={`pb-3 border-b-2 transition-all ${activeTab === 'properties' ? 'border-indigo-600 text-slate-800' : 'border-transparent hover:text-slate-600'}`}
        >
          Manage Properties
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 border-b-2 transition-all ${activeTab === 'reviews' ? 'border-indigo-600 text-slate-800' : 'border-transparent hover:text-slate-600'}`}
        >
          Manage Reviews
        </button>
      </div>

      {/* Data tables */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        
        {loading ? (
          <p className="text-xs text-slate-400 py-12 text-center flex items-center justify-center space-x-2">
            <RefreshCw size={16} className="animate-spin text-primary-500" />
            <span>Fetching registry...</span>
          </p>
        ) : activeTab === 'users' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 font-extrabold text-slate-500">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Active Role</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-800">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.phone}</td>
                    <td className="p-4">
                      <select 
                        value={u.role}
                        onChange={(e) => handleUserRoleChange(u.id, e.target.value)}
                        className="bg-white border rounded px-2 py-1 font-bold cursor-pointer"
                      >
                        <option value="User">User</option>
                        <option value="Owner">Owner</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">System Node</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'properties' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 font-extrabold text-slate-500">
                  <th className="p-4">Stay Title</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Pricing</th>
                  <th className="p-4">Host</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                {properties.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-800">{p.title}</td>
                    <td className="p-4">{p.area}, {p.city}</td>
                    <td className="p-4 font-bold">₹{p.price}</td>
                    <td className="p-4 text-slate-500 font-semibold">{p.host.name}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handlePropertyRemove(p.id)}
                        className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg smooth-transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 font-extrabold text-slate-500">
                  <th className="p-4">Property</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Comment</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                {allReviews.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 max-w-[150px] truncate">{r.propertyTitle}</td>
                    <td className="p-4 font-semibold text-slate-800">{r.userName}</td>
                    <td className="p-4 font-bold text-yellow-500">{r.rating}★</td>
                    <td className="p-4 text-slate-500 max-w-sm truncate">{r.comment}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => removeReview(r.propertyId, r.id)}
                        className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg smooth-transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
