AquaRiyum Implementation Plan
We will build a grand, premium-looking aquarium fish sales website named AquaRiyum using React.js (Frontend), PHP (Backend API), and MySQL (Database).

Overview
The goal is to create a visually stunning e-commerce platform with an immersive ocean/aquarium theme. It will feature a dynamic, full-screen moving fish background video, smooth glassmorphism effects, and micro-animations to deliver a high-end showroom experience.

Open Questions
IMPORTANT

Do you already have a specific background video and fish images to use, or should I generate placeholder images and use a generic underwater stock video?
For local development, assuming your database credentials are root with no password for XAMPP. Please confirm if there are any specific credentials I should use.

Proposed Changes
We will set up the project within the c:\xampp\htdocs\Aquarium directory following the requested folder structure.

1. Database Layer (database/)
[NEW] database/aquariyum.sql
Contains table definitions: users, categories, fishes, cart, orders, order_items, and background_videos.
Includes initial seed data for categories and an admin user.

2. Backend Layer (PHP) (backend/)
[NEW] backend/config/db.php
Handles the PDO connection to the MySQL database.
[NEW] backend/api/ and backend/auth/
Set of RESTful PHP endpoints returning JSON:
auth/login.php, auth/register.php
api/fishes.php (CRUD operations)
api/categories.php
api/cart.php
api/orders.php
api/background_videos.php (Upload and active toggle)

[NEW] backend/uploads/
Directories fish_images/ and videos/ for storing uploaded assets.
3. Frontend Layer (React + Vite) (frontend/)
We will initialize a new React project using Vite.

Architecture and Dependencies
React.js with Vanilla CSS for full styling control.
React Router DOM for routing.
Axios for API requests.
React Toastify for toast notifications.
Lucide React (or similar) for modern icons.

Components
BackgroundVideo: A reusable component to render the full-screen video, querying the backend for the active video.
Navbar: Glassmorphic navigation bar.
FishCard: Product display with hover animations and "Add to Cart" functionality.
CartModal/Page: Managing cart state.

Pages
Home: Grand hero section with the background video, featured products, categories.
Products: Full catalog with filtering.
Login/Register: Authentication pages.
Admin Dashboard: Secure area to manage inventory, categories, orders, and background videos.

UI & Styling Strategy
Colors: Deep ocean blues, aqua, and cyan with subtle gradients.
Glassmorphism: Using backdrop-filter: blur(10px) with semi-transparent white/blue backgrounds for cards and modals.
Animations: CSS keyframes for floating effects, bubble animations, and smooth transitions on hover.

Verification Plan
Automated/Manual Tests
Database: Import the SQL script and verify tables are created.
Backend API: Test login, registration, and CRUD endpoints using Postman or directly via the frontend.
Frontend UI:
Run the React development server.
Verify the background video plays and can be changed via the Admin Panel.
Test the entire user flow: browsing fishes, adding to cart, logging in, and placing an order.
Ensure the UI feels premium and matches the requested "grand aquarium" aesthetic.
