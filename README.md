# PG & Stay Finder SaaS Application

A premium, front-end focused PG & Stay Finder SaaS application built using **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**, backed by a lightweight **Express** server and **Firebase** database capability.

> [!IMPORTANT]
> **Active Workspace Workspace Recommend:**
> For the best development experience, please open `C:\Users\naiti\.gemini\antigravity-ide\scratch\pg-stay-finder` as your active workspace directory in the IDE.

---

## Features

- **Airbnb-inspired UI:** Modern, clean appearance with glassmorphism, responsive navigation drawers, and polished animations.
- **Search Stay Catalog:** Filter properties by location (City, Area), accommodation types (PG, Hostel, Flat, Room, Apartment, House), monthly budget limit, amenities checklists, and real-time availability.
- **Detailed Property Overviews:** Airbnb-style photo grids, WhatsApp/phone contact connections to the host, detailed amenities previews, and dynamic user ratings & reviews.
- **Integrated Booking Widget:** Calculate rental totals including security deposits and cleaning fees, and complete bookings via a mock Credit Card payment modal.
- **Mock Map Placement Grid:** SVG-based interactive locator maps featuring responsive tooltips and zoom buttons.
- **Account Profiles & Roles:** Toggle between **Guest**, **Tenant (User)**, **Owner**, and **Admin** modes instantly using the custom developer role switcher widget inside the profile dropdown menu.
- **Owner Listing Controls:** Upload base64 photos, detail properties, approve or reject stay bookings, and view dashboard analytics panels.
- **System Admin System:** Moderator settings to delete properties, remove bad feedback reviews, and manage user registry roles.
- **Offline Fallback Database:** Automatically falls back to localized storage states if Firebase configuration credentials are not found, maintaining 100% interactivity.

---

## Technical Stack

- **Client:** React (v18), Vite, React Router DOM (v6), Tailwind CSS (v3), Framer Motion, Lucide React.
- **Server:** Node.js, Express, Cors, Dotenv, Morgan logging.
- **Database / Auth / Storage:** Firebase SDK configuration-ready.

---

## Project Structure

```text
pg-stay-finder/
├── client/
│   ├── src/
│   │   ├── components/      # Common inputs, headers, property layouts
│   │   ├── context/         # Auth and Property state managers
│   │   ├── data/            # Preset mock databases
│   │   ├── firebase/        # SDK checks and initialization
│   │   ├── pages/           # 13 Application views (Home, Listings, etc.)
│   │   ├── routes/          # Protected client routing
│   │   └── styles/          # Tailwind indexes
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── controllers/         # Mock REST controllers
│   ├── routes/              # Routing endpoints
│   ├── middleware/          # Role check handlers
│   └── server.js            # Express entry file
├── package.json
└── .env.example
```

---

## Development Setup

### 1. Install Dependencies
Run the command below in the root directory to install dependencies for both the client and the server:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and configure optional Firebase credentials if desired. Leave them blank to default to mock local state storage.
```bash
cp .env.example .env
```

### 3. Run Locally
Run both client and server development servers simultaneously:
```bash
npm run dev
```
- Client runs on: `http://localhost:3000`
- Server runs on: `http://localhost:5000`
