# 🌊 AquaRiyum

**AquaRiyum** is a premium, cinematic underwater-themed e-commerce platform designed for selling exotic colorful fishes. It features a grand, dynamic user interface with glassmorphism effects, a full-screen animated background, and a seamless shopping experience. 

## ✨ Features

- **Immersive UI/UX**: High-end desktop experience with deep ocean blue palettes, glassmorphism, and cinematic hero sections.
- **Dynamic Backgrounds**: Full-screen video backgrounds that can be updated dynamically from the admin panel to keep the storefront fresh.
- **Product Gallery**: Comprehensive product catalog with filtering options, detailed fish cards, and hover animations.
- **Shopping Cart & Checkout**: Robust cart system with a beautiful slide-out overlay and seamless checkout flow.
- **User Authentication**: Secure login and registration system for customers to manage their orders.
- **Admin Dashboard**: Dedicated admin panel to manage inventory (CRUD for fishes and categories), handle orders, and upload new background videos.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (via Vite)
- **Styling**: Vanilla CSS with modern flexbox/grid layouts and glassmorphism (backdrop-filter)
- **Routing**: React Router DOM
- **State Management**: Context API (AuthContext, CartContext)
- **Icons & Notifications**: Lucide React, React Toastify

### Backend
- **Language**: PHP (RESTful API architecture)
- **Database**: MySQL (using PDO for secure queries)
- **Authentication**: Custom token/session-based auth

## 🚀 Installation & Setup

### Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) (or any similar AMP stack)
- [Node.js](https://nodejs.org/) (v16 or higher)

### 1. Database Setup
1. Open XAMPP and start the **Apache** and **MySQL** modules.
2. Open your browser and navigate to `http://localhost/phpmyadmin`.
3. Create a new database named `aquariyum`.
4. Import the provided SQL file located at `database/aquariyum.sql` into the newly created database.

### 2. Backend Setup (PHP API)
1. Clone or move the project repository into your `htdocs` directory (e.g., `C:\xampp\htdocs\Aquarium`).
2. Ensure the backend files are located at `C:\xampp\htdocs\Aquarium\backend`.
3. Configure the database connection if necessary in `backend/config/db.php`. (Default is usually `root` with no password for XAMPP).
4. The API endpoints will be available at `http://localhost/Aquarium/backend/api/...`

### 3. Frontend Setup (React)
1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd C:\xampp\htdocs\Aquarium\frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The React application will typically run on `http://localhost:5173`. Open this URL in your browser to view the storefront!

## 📁 Project Structure


Aquarium/
├── backend/                # PHP RESTful API
│   ├── api/                # Endpoints for fishes, categories, cart, orders
│   ├── auth/               # Login and registration logic
│   ├── config/             # Database connection setup
│   └── uploads/            # Stored assets (fish images, videos)
├── database/               # SQL dump files
│   └── aquariyum.sql
└── frontend/               # React Application
    ├── src/
    │   ├── components/     # Reusable UI components (Navbar, CartOverlay, etc.)
    │   ├── context/        # Global state (Auth, Cart)
    │   ├── pages/          # Full page views (Home, Products, Login, Admin)
    │   ├── index.css       # Global styles & glassmorphism utilities
    │   └── App.jsx         # Main router setup
    ├── package.json
    └── vite.config.js
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
