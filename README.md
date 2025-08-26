# Parcour - Courier Management System

Parcour is a comprehensive courier tracking and parcel management system built with Next.js, designed to streamline logistics operations for businesses and provide a seamless experience for customers and delivery agents.

## ✨ Features

### 👥 Multi-role System

- **Customers**

  - User registration and authentication
  - Parcel booking with real-time tracking
  - Booking history and status updates
  - COD and prepaid payment options

- **Delivery Agents**

  - View assigned parcels
  - Update delivery statuses
  - Optimized delivery routes
  - Barcode/QR code scanning

- **Administrators**
  - Dashboard with analytics
  - User and parcel management
  - Agent assignment
  - Report generation

### 🚀 Technical Highlights

- Real-time updates with Socket.IO
- Google Maps integration for tracking
- Responsive design for all devices
- Secure authentication with JWT
- Role-based access control

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14
- **UI**: Tailwind CSS + Shadcn/ui
- **State Management**: React Context API
- **Maps**: Google Maps API
- **Real-time**: Socket.IO

### Backend

- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + NextAuth.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL
- Google Maps API key
- SMTP credentials for emails (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/parcour.git
   cd parcour
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/parcour?schema=public"

   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Google
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # SMTP (for emails)
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASSWORD=your_email_password
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Routes

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Get current session
- `POST /api/auth/logout` - Logout

### Parcels

- `GET /api/parcels` - Get all parcels (admin)
- `POST /api/parcels` - Create new parcel
- `GET /api/parcels/:id` - Get parcel details
- `PATCH /api/parcels/:id` - Update parcel
- `GET /api/parcels/me` - Get user's parcels
- `POST /api/parcels/:id/track` - Update parcel status

### Users

- `GET /api/users` - Get all users (admin)
- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update current user

## 🗺️ Environment Variables

See `.env.example` for all required environment variables. Create a `.env.local` file in the root directory and add your configuration.

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fparcour)

### Self-hosting

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/parcour](https://github.com/yourusername/parcour)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
