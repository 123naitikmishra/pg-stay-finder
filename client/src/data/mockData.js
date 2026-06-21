export const initialProperties = [
  {
    id: "p1",
    title: "Premium Co-living PG for Men",
    description: "Modern co-living space designed for working professionals and students. Features high-speed fiber internet, housekeeping, premium meals, and dynamic lounge areas. Located in the tech hub, offering easy access to transport.",
    price: 8500,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ],
    type: "PG",
    gender: "male",
    occupancy: ["Single Sharing", "Double Sharing"],
    amenities: ["Wi-Fi", "AC", "Meals", "Laundry", "Power Backup", "CCTV", "Parking"],
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    area: "HSR Layout",
    address: "24th Main, Sector 2, HSR Layout, Bengaluru, Karnataka",
    host: {
      id: "owner1",
      name: "Ramesh Kumar",
      phone: "+919876543210",
      whatsapp: "+919876543210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    reviews: [
      {
        id: "r1",
        userName: "Amit Patel",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment: "Excellent amenities, clean rooms, and very responsive management. Highly recommended!",
        date: "2026-05-15"
      },
      {
        id: "r2",
        userName: "Vikram Sen",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        rating: 4.6,
        comment: "Food is quite decent compared to other PGs. Management resolves issues fast.",
        date: "2026-06-01"
      }
    ],
    availability: true,
    featured: true
  },
  {
    id: "p2",
    title: "Luxury Girls Hostel near DU",
    description: "Extremely secure, fully furnished luxury hostel exclusively for girls. Offers air-conditioned rooms, hygienic food plans, personal study desks, gym access, and 24/7 security guard patrol. Located walking distance from university campus.",
    price: 12000,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    type: "Hostel",
    gender: "female",
    occupancy: ["Double Sharing", "Triple Sharing"],
    amenities: ["Wi-Fi", "AC", "Meals", "Gym", "Power Backup", "CCTV"],
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    area: "North Campus",
    address: "Block B, Hudson Lane, North Campus, Delhi",
    host: {
      id: "owner2",
      name: "Sonia Sharma",
      phone: "+919876543211",
      whatsapp: "+919876543211",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    reviews: [
      {
        id: "r3",
        userName: "Priya Das",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment: "The environment is very safe and study-friendly. The warden is super sweet.",
        date: "2026-04-20"
      }
    ],
    availability: true,
    featured: true
  },
  {
    id: "p3",
    title: "1 BHK Fully Furnished Flat",
    description: "Modern, independent 1 BHK flat perfect for couples or professionals who value privacy. Features an equipped kitchen, modular wardrobes, and a private balcony with panoramic city views. Nestled in a gated premium community.",
    price: 18000,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
    ],
    type: "Flat",
    gender: "unisex",
    occupancy: ["Single Sharing"],
    amenities: ["Wi-Fi", "AC", "Parking", "Power Backup", "CCTV"],
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    area: "Andheri West",
    address: "Lokhandwala Complex, Andheri West, Mumbai, Maharashtra",
    host: {
      id: "owner1",
      name: "Ramesh Kumar",
      phone: "+919876543210",
      whatsapp: "+919876543210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    reviews: [
      {
        id: "r4",
        userName: "Rahul Verma",
        userAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
        rating: 4,
        comment: "Great flat and beautiful society. Slightly expensive but worth it for the amenities.",
        date: "2026-05-30"
      }
    ],
    availability: true,
    featured: false
  },
  {
    id: "p4",
    title: "Cozy Private Room in Apartment",
    description: "Private bedroom with attached bathroom inside a luxury 3 BHK apartment. You will share the spacious kitchen and drawing room with two friendly young professionals. Offers high speed Wi-Fi and weekly maid service.",
    price: 9500,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=800&q=80"
    ],
    type: "Room",
    gender: "unisex",
    occupancy: ["Single Sharing"],
    amenities: ["Wi-Fi", "AC", "Laundry", "Parking"],
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    area: "Indiranagar",
    address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka",
    host: {
      id: "owner3",
      name: "Karan Johar",
      phone: "+919876543212",
      whatsapp: "+919876543212",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    reviews: [],
    availability: true,
    featured: false
  },
  {
    id: "p5",
    title: "Elegant 3 BHK Independent House",
    description: "Spacious independent house with a front lawn and covered parking. Perfect for corporate accommodation or large groups of friends/families. Modern bathrooms, modular kitchen, and located in a peaceful residential zone.",
    price: 35000,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    type: "House",
    gender: "unisex",
    occupancy: ["Single Sharing"],
    amenities: ["Wi-Fi", "AC", "Parking", "Power Backup", "Gym", "Meals", "CCTV"],
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    area: "Saket",
    address: "Block M, Saket, New Delhi",
    host: {
      id: "owner2",
      name: "Sonia Sharma",
      phone: "+919876543211",
      whatsapp: "+919876543211",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    reviews: [
      {
        id: "r5",
        userName: "Kirti Roy",
        userAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80",
        rating: 4.8,
        comment: "Outstanding property! Massive rooms, very neat, and prime location.",
        date: "2026-06-10"
      }
    ],
    availability: true,
    featured: true
  }
];

export const initialUsers = [
  {
    id: "user1",
    email: "user@example.com",
    name: "John Doe",
    role: "User",
    favorites: ["p1", "p2"],
    phone: "+919999988888",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "owner1",
    email: "owner@example.com",
    name: "Ramesh Kumar",
    role: "Owner",
    favorites: [],
    phone: "+919876543210",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "admin1",
    email: "admin@example.com",
    name: "Admin Administrator",
    role: "Admin",
    favorites: [],
    phone: "+919111111111",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
  }
];

export const initialBookings = [
  {
    id: "b1",
    propertyId: "p1",
    propertyName: "Premium Co-living PG for Men",
    propertyImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    userId: "user1",
    userName: "John Doe",
    occupancyType: "Single Sharing",
    startDate: "2026-07-01",
    durationMonths: 3,
    monthlyRent: 8500,
    totalAmount: 25500,
    paymentStatus: "Paid",
    status: "Confirmed",
    createdAt: "2026-06-19"
  },
  {
    id: "b2",
    propertyId: "p2",
    propertyName: "Luxury Girls Hostel near DU",
    propertyImage: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    userId: "user1",
    userName: "John Doe",
    occupancyType: "Double Sharing",
    startDate: "2026-08-01",
    durationMonths: 6,
    monthlyRent: 12000,
    totalAmount: 72000,
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: "2026-06-20"
  }
];
