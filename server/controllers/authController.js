// In-memory user store initial mapping
const usersStore = [
  { id: "user1", email: "user@example.com", name: "John Doe", role: "User", phone: "+919999988888" },
  { id: "owner1", email: "owner@example.com", name: "Ramesh Kumar", role: "Owner", phone: "+919876543210" },
  { id: "admin1", email: "admin@example.com", name: "Admin Administrator", role: "Admin", phone: "+919111111111" }
];

export const authController = {
  register: async (req, res) => {
    const { email, password, name, role } = req.body;
    if (!email || !name || !role) {
      return res.status(400).json({ success: false, message: "Missing required details." });
    }

    const exists = usersStore.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: "Email is already registered." });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      name,
      role,
      phone: "+919999999999",
      favorites: []
    };
    usersStore.push(newUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email required." });
    }

    const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({
      success: true,
      message: "Login successful.",
      user
    });
  },

  logout: async (req, res) => {
    res.json({
      success: true,
      message: "Logged out successfully."
    });
  }
};
