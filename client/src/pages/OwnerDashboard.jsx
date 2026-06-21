import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { bookingService } from '../services/bookingService';
import { storageService } from '../services/storageService';
import { 
  Building, Plus, Trash2, Wallet, Users, BarChart3, Upload, X, Check, Edit2, Shield
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function OwnerDashboard() {
  const { currentUser } = useAuth();
  const { properties, addNewProperty, editProperty, deleteProperty } = useProperties();
  const [searchParams] = useSearchParams();

  // Dashboard lists states
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listing creation form states
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Property edit ID
  const [editingId, setEditingId] = useState(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('PG');
  const [gender, setGender] = useState('unisex');
  const [city, setCity] = useState('Bengaluru');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  
  // Array criteria fields
  const [occupancy, setOccupancy] = useState(['Single Sharing']);
  const [amenities, setAmenities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  // Handle URL shortcut to immediately open creation form modal
  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setModalOpen(true);
    }
  }, [searchParams]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getBookings(currentUser.id, currentUser.role);
      setBookings(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const myProperties = properties.filter(p => p.host.id === currentUser?.id);

  // Analytics calculation
  const totalEarnings = bookings
    .filter(b => b.status === 'Confirmed')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const activeTenants = bookings
    .filter(b => b.status === 'Confirmed').length;

  const handleBookingAction = async (bookingId, newStatus) => {
    try {
      await bookingService.updateBookingStatus(bookingId, newStatus);
      fetchBookings();
    } catch (error) {
      alert("Error updating booking status.");
    }
  };

  const handleAmenityCheck = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleOccupancyCheck = (occ) => {
    setOccupancy(prev => 
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    
    // Create instant previews
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...urls]);
  };

  const handleRemovePreview = (idx) => {
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
    setPreviewUrls(prev => prev.filter((_, i) => i !== idx));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setType('PG');
    setGender('unisex');
    setCity('Bengaluru');
    setArea('');
    setAddress('');
    setOccupancy(['Single Sharing']);
    setAmenities([]);
    setImageFiles([]);
    setPreviewUrls([]);
    setEditingId(null);
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    if (!area || !address) {
      alert("Please provide the area and address.");
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Upload/Convert images
      const uploadedImages = [];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const base64 = await storageService.uploadImage(file);
          uploadedImages.push(base64);
        }
      } else {
        // Default cover fallbacks
        uploadedImages.push("https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80");
      }

      const pData = {
        title,
        description,
        price: parseInt(price),
        type,
        gender,
        country: "India",
        state: city === 'Bengaluru' ? 'Karnataka' : city === 'New Delhi' ? 'Delhi' : 'Maharashtra',
        city,
        area,
        address,
        occupancy,
        amenities,
        images: uploadedImages,
        availability: true
      };

      if (editingId) {
        await editProperty(editingId, pData);
      } else {
        await addNewProperty(pData);
      }
      
      resetForm();
      setModalOpen(false);
    } catch (err) {
      alert("Failed to submit property listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (p) => {
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description);
    setPrice(p.price);
    setType(p.type);
    setGender(p.gender);
    setCity(p.city);
    setArea(p.area);
    setAddress(p.address);
    setOccupancy(p.occupancy);
    setAmenities(p.amenities);
    // Since images are base64 string lists, place them into previews directly
    setPreviewUrls(p.images || []);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header and CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Building className="text-primary-500" />
            <span>Owner Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400">List and edit property metrics, manage bookings requests, and view statistics</p>
        </div>
        <button 
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="flex items-center space-x-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-extrabold shadow-md shadow-primary-500/10 transition-colors shrink-0 self-start"
        >
          <Plus size={16} />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Analytics Widget Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="p-3.5 bg-primary-50 text-primary-500 rounded-2xl">
            <Building size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">My Listings</span>
            <span className="text-lg font-extrabold text-slate-800">{myProperties.length} active stays</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="p-3.5 bg-indigo-50 text-indigo-500 rounded-2xl">
            <Wallet size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Earnings</span>
            <span className="text-lg font-extrabold text-slate-800">₹{totalEarnings.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-2xl">
            <Users size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Tenants</span>
            <span className="text-lg font-extrabold text-slate-800">{activeTenants} stays confirmed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left lists: Property Listings */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-extrabold text-slate-800">My Stays & Hostels</h2>

          {myProperties.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl space-y-3">
              <Building size={28} className="text-slate-300 mx-auto" />
              <p className="text-xs text-slate-400 font-semibold">You haven't listed any property yet.</p>
              <button onClick={() => setModalOpen(true)} className="text-xs font-bold text-primary-500 hover:underline">
                Create your first listing now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myProperties.map((p) => (
                <div key={p.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm">
                  <div className="relative aspect-video bg-slate-100">
                    <img src={p.images[0]} alt="Stay" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm text-[9px] font-bold text-slate-700 rounded uppercase">
                      {p.type}
                    </span>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm line-clamp-1">{p.title}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">{p.area}, {p.city}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">₹{p.price}/mo</span>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditClick(p)} 
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 smooth-transition"
                          title="Edit Listing"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button 
                          onClick={() => deleteProperty(p.id)} 
                          className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 smooth-transition"
                          title="Delete Listing"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right lists: Booking Requests */}
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-slate-800">Booking Requests</h2>

          {loading ? (
            <p className="text-xs text-slate-400 py-6 text-center">Loading requests...</p>
          ) : bookings.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 bg-slate-50 border border-dashed rounded-3xl text-center">
              No booking requests received yet.
            </p>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3 shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800 text-xs truncate max-w-[150px]">{b.propertyName}</h4>
                      <span className={`px-2 py-0.5 text-[8px] font-bold rounded uppercase ${
                        b.status === 'Confirmed' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : b.status === 'Rejected' 
                            ? 'bg-red-50 text-red-600' 
                            : 'bg-amber-50 text-amber-600'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">Request by: <span className="font-bold text-slate-600">{b.userName}</span></p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-[9px] text-slate-500 font-semibold space-y-1">
                    <div>Checkin: {b.startDate} ({b.durationMonths} Months)</div>
                    <div>Plan: {b.occupancyType} • Total: ₹{b.totalAmount}</div>
                  </div>

                  {b.status === 'Pending' && (
                    <div className="flex space-x-2 pt-1">
                      <button 
                        onClick={() => handleBookingAction(b.id, 'Rejected')}
                        className="flex-1 py-1.5 border border-red-200 hover:bg-red-50 text-red-500 text-[9px] font-bold rounded-lg text-center"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleBookingAction(b.id, 'Confirmed')}
                        className="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold rounded-lg text-center"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-slate-800 text-base">
                {editingId ? 'Edit Property Listing' : 'List a Stay Property'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePropertySubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Title */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Property Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Premium Co-living PG for Men"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea 
                  required
                  placeholder="Tell tenants about the space, meals, rules, security, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none h-20 resize-none"
                />
              </div>

              {/* Price, Type, Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Base Price (₹/mo)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="8500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Stay Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 cursor-pointer"
                  >
                    <option value="PG">PG / Co-living</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Flat">Independent Flat</option>
                    <option value="Room">Private Room</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Gender Criteria</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 cursor-pointer"
                  >
                    <option value="unisex">Unisex</option>
                    <option value="male">Male Only</option>
                    <option value="female">Female Only</option>
                  </select>
                </div>
              </div>

              {/* City, Area, Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">City</label>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 cursor-pointer"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Area / Locality</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. HSR Layout"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Detailed Address</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 24th Main, Sector 2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Occupancy selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Occupancy Offered</label>
                <div className="flex flex-wrap gap-2">
                  {["Single Sharing", "Double Sharing", "Triple Sharing"].map((occ) => {
                    const isChecked = occupancy.includes(occ);
                    return (
                      <button
                        type="button"
                        key={occ}
                        onClick={() => handleOccupancyCheck(occ)}
                        className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold transition-all ${
                          isChecked 
                            ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Amenities Provided</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Wi-Fi", "AC", "Meals", "Gym", "Laundry", "Power Backup", "CCTV", "Parking"].map((amenity) => {
                    const isChecked = amenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => handleAmenityCheck(amenity)}
                        className={`py-2 border rounded-xl text-[10px] font-semibold text-center transition-all ${
                          isChecked 
                            ? 'bg-slate-100 border-slate-300 text-slate-800 font-bold'
                            : 'bg-white border-slate-150 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Images uploads */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Property Photos</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-xl border overflow-hidden shrink-0">
                      <img src={url} alt="preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => handleRemovePreview(idx)}
                        className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 text-white rounded-full hover:bg-black/80"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  
                  <label className="w-16 h-16 rounded-xl border border-dashed hover:border-primary-400 bg-slate-50 hover:bg-primary-50/20 flex flex-col items-center justify-center text-slate-400 hover:text-primary-500 cursor-pointer transition-all">
                    <Upload size={16} />
                    <span className="text-[8px] font-bold mt-1">Upload</span>
                    <input 
                      type="file" 
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Footer submission CTA */}
              <div className="flex space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving Listing...' : 'Publish Listing'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
