const bookingsStore = [];

export const bookingController = {
  create: async (req, res) => {
    const bookingData = req.body;
    const newBooking = {
      id: `bk-${Date.now()}`,
      status: "Pending",
      paymentStatus: "Paid",
      createdAt: new Date().toISOString().split('T')[0],
      ...bookingData
    };
    bookingsStore.push(newBooking);
    res.status(201).json({ success: true, data: newBooking });
  },

  getAll: async (req, res) => {
    // If Admin -> return all
    // If Owner -> filter by owner property
    // Default User -> filter by userId
    const { id, role } = req.user;
    let result = [...bookingsStore];

    if (role === 'Owner') {
      // In full implementation, we'd lookup which properties belong to Owner
      // For now, return bookings matching the owner host details if provided
      result = bookingsStore.filter(b => b.hostId === id);
    } else if (role !== 'Admin') {
      result = bookingsStore.filter(b => b.userId === id);
    }

    res.json({ success: true, data: result });
  }
};
