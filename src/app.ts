import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import routes
import authRoutes from './modules/auth/auth.routes.js';
import leadsRoutes from './modules/leads/leads.routes.js';
import servicesRoutes from './modules/services/services.routes.js';
import portfolioRoutes from './modules/portfolio/portfolio.routes.js';
import galleryRoutes from './modules/gallery/gallery.routes.js';
import testimonialsRoutes from './modules/testimonials/testimonials.routes.js';
import pagesRoutes from './modules/pages/pages.routes.js';
import settingsRoutes from './modules/settings/settings.routes.js';
import adminsRoutes from './modules/admins/admins.routes.js';
import uploadRoutes from './modules/upload/upload.routes.js';
import serviceItemsRoutes from './modules/service-items/service-items.routes.js';

// Import middlewares
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [
            'http://localhost:3000/',
            'http://localhost:5173/',
            'http://localhost:5174/',
            'https://yourdomain.com',
            'https://www.yourdomain.com',
            // Add your frontend domains here
        ]
        : true, // Allow all in development
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadsRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/portfolio', portfolioRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/testimonials', testimonialsRoutes);
app.use('/api/v1/pages', pagesRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/admins', adminsRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/service-items', serviceItemsRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use(errorHandler);

export default app;