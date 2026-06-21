// Mock storage import reference simulation
// For simplicity, we can fetch profiles
const profilesStore = {
  "user1": { id: "user1", email: "user@example.com", name: "John Doe", role: "User", favorites: ["p1"], phone: "+919999988888" },
  "owner1": { id: "owner1", email: "owner@example.com", name: "Ramesh Kumar", role: "Owner", favorites: [], phone: "+919876543210" },
  "admin1": { id: "admin1", email: "admin@example.com", name: "Admin Administrator", role: "Admin", favorites: [], phone: "+919111111111" }
};

export const userController = {
  getProfile: async (req, res) => {
    const { id } = req.user;
    const profile = profilesStore[id];
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found." });
    }
    res.json({ success: true, data: profile });
  },

  updateProfile: async (req, res) => {
    const { id } = req.user;
    if (!profilesStore[id]) {
      profilesStore[id] = { id, email: req.user.email || '', favorites: [] };
    }
    profilesStore[id] = { ...profilesStore[id], ...req.body };
    res.json({ success: true, data: profilesStore[id] });
  },

  getFavorites: async (req, res) => {
    const { id } = req.user;
    const profile = profilesStore[id];
    res.json({ success: true, data: profile ? profile.favorites : [] });
  },

  addFavorite: async (req, res) => {
    const { id } = req.user;
    const { propertyId } = req.body;
    if (!propertyId) {
      return res.status(400).json({ success: false, message: "Property ID required." });
    }
    if (!profilesStore[id]) {
      profilesStore[id] = { id, favorites: [] };
    }
    if (!profilesStore[id].favorites.includes(propertyId)) {
      profilesStore[id].favorites.push(propertyId);
    }
    res.json({ success: true, data: profilesStore[id].favorites });
  },

  removeFavorite: async (req, res) => {
    const { id } = req.user;
    const { propertyId } = req.body;
    if (!propertyId) {
      return res.status(400).json({ success: false, message: "Property ID required." });
    }
    if (profilesStore[id]) {
      profilesStore[id].favorites = profilesStore[id].favorites.filter(p => p !== propertyId);
    }
    res.json({ success: true, data: profilesStore[id] ? profilesStore[id].favorites : [] });
  }
};
