# Parcour - Courier & Parcel Logistics Frontend

A modern, responsive web application for courier and parcel logistics management, built with Next.js 14. This frontend application provides a comprehensive interface for customers, delivery agents, and administrators to manage parcel deliveries efficiently.

## 🚀 Features

### 👥 Multi-Role User Interface

#### **Customer Portal**

- 📦 **Parcel Booking**: Easy-to-use interface for booking new shipments
- 📍 **Real-time Tracking**: Live parcel tracking with status updates
- 💳 **Payment Options**: Support for COD and prepaid payment methods
- 📋 **Booking History**: Complete history of all shipments
- 🔍 **Parcel Details**: Detailed view of parcel information and delivery status

#### **Delivery Agent Portal**

- 📱 **Assignment Management**: View and manage assigned parcels
- 🚚 **Status Updates**: Update delivery statuses in real-time
- 🗺️ **Route Optimization**: Interactive maps with optimized delivery routes
- 🔗 **QR Code Scanning**: Scan QR codes for quick parcel identification
- 📊 **Performance Dashboard**: Track delivery metrics and performance

#### **Administrator Portal**

- 📈 **Analytics Dashboard**: Comprehensive analytics and reporting
- 👥 **User Management**: Manage customers, agents, and system users
- 📦 **Parcel Management**: Oversee all parcels and assignments
- 🔗 **Agent Assignment**: Assign parcels to delivery agents
- 📊 **Report Generation**: Generate detailed reports and exports

### 🎨 User Experience Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for better user experience
- **Real-time Updates**: Live status updates and notifications
- **Interactive Maps**: Integration with mapping services for location tracking
- **QR Code Generation**: Generate and scan QR codes for parcel identification
- **Form Validation**: Comprehensive form validation with error handling
- **Loading States**: Smooth loading states and skeleton screens

## 🛠️ Technology Stack

### **Frontend Framework**

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **React 18**: Latest React features and hooks

### **UI & Styling**

- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality React components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Next Themes**: Dark/light mode support

### **State Management & Data**

- **React Context API**: Global state management
- **React Hook Form**: Form state management
- **TanStack Query**: Server state management
- **Zod**: Schema validation

### **Maps & Visualization**

- **Leaflet**: Interactive maps
- **React Leaflet**: React components for Leaflet
- **Recharts**: Data visualization charts

### **Utilities & Libraries**

- **Date-fns**: Date manipulation utilities
- **QRCode.react**: QR code generation
- **Sonner**: Toast notifications
- **js-cookie**: Cookie management

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm/yarn/pnpm**: Package manager
- **Git**: Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tasnimayan/parcour.git
   cd parcour
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Key Features Implementation

### **Authentication System**

- Role-based authentication (Customer, Agent, Admin)
- Protected routes with middleware
- Session management with context API

### **Real-time Tracking**

- Live parcel status updates
- Interactive maps with delivery routes
- QR code generation and scanning

### **Responsive Design**

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interfaces

### **Form Management**

- Comprehensive form validation with Zod
- Error handling and user feedback
- Multi-step forms for complex processes

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For support and questions:

- **Email**: tasnimayan22@gmail.com

## 🤝 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [Leaflet](https://leafletjs.com/) - Interactive maps
