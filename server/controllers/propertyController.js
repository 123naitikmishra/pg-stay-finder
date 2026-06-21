const propertiesStore = [
  {
    id: "p1",
    title: "Premium Co-living PG for Men",
    description: "Modern co-living space designed for working professionals and students.",
    price: 8500,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"],
    type: "PG",
    occupancy: ["Single Sharing", "Double Sharing"],
    amenities: ["Wi-Fi", "AC", "Meals"],
    city: "Bengaluru",
    area: "HSR Layout",
    address: "24th Main, HSR Layout, Bengaluru",
    host: { id: "owner1", name: "Ramesh Kumar" },
    reviews: []
  }
];

export const propertyController = {
  getAll: async (req, res) => {
    res.json({ success: true, data: propertiesStore });
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const property = propertiesStore.find(p => p.id === id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found." });
    }
    res.json({ success: true, data: property });
  },

  create: async (req, res) => {
    const propertyData = req.body;
    const newProperty = {
      id: `prop-${Date.now()}`,
      rating: 5.0,
      reviews: [],
      ...propertyData
    };
    propertiesStore.push(newProperty);
    res.status(201).json({ success: true, data: newProperty });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const idx = propertiesStore.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Property not found." });
    }
    propertiesStore[idx] = { ...propertiesStore[idx], ...req.body };
    res.json({ success: true, data: propertiesStore[idx] });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const idx = propertiesStore.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Property not found." });
    }
    propertiesStore.splice(idx, 1);
    res.json({ success: true, message: "Property deleted successfully." });
  }
};
