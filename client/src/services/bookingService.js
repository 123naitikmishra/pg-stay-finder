import { initialBookings } from '../data/mockData';

if (!localStorage.getItem('sf_bookings')) {
  localStorage.setItem('sf_bookings', JSON.stringify(initialBookings));
}

const getMockBookings = () => JSON.parse(localStorage.getItem('sf_bookings'));

export const bookingService = {
  getBookings: async (userId, role = "User") => {
    const bookings = getMockBookings();
    if (role === "Admin") {
      return bookings;
    }
    if (role === "Owner") {
      // Find bookings for properties owned by this owner
      const properties = JSON.parse(localStorage.getItem('sf_properties')) || [];
      const ownerPropertyIds = properties.filter(p => p.host.id === userId).map(p => p.id);
      return bookings.filter(b => ownerPropertyIds.includes(b.propertyId));
    }
    // Default: Regular User bookings
    return bookings.filter(b => b.userId === userId);
  },

  createBooking: async (bookingData) => {
    const bookings = getMockBookings();
    const newBooking = {
      id: `mock-b-${Date.now()}`,
      status: "Pending",
      paymentStatus: "Paid", // assume user has completed booking checkout
      createdAt: new Date().toISOString().split('T')[0],
      ...bookingData
    };
    bookings.push(newBooking);
    localStorage.setItem('sf_bookings', JSON.stringify(bookings));
    return newBooking;
  },

  updateBookingStatus: async (bookingId, status) => {
    const bookings = getMockBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      bookings[idx].status = status;
      localStorage.setItem('sf_bookings', JSON.stringify(bookings));
      return bookings[idx];
    }
    throw new Error("Booking not found");
  }
};
