import express from 'express';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';

//TODO: import rootroute from router
import rootRouter from './routes/root.route.js'
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
app.set('trust proxy', 1);

//TODO: Allowed Origin for CORS
const allowedOrigin: (string | undefined)[] = [
    process.env.CLIENT_URL,
    "http://localhost:5173", // local dev
];
//TODO: Enable CORS middleware with proper options
const corsOptions : CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (like curl, Postman, or same-server calls)
        console.log("🌍 Incoming origin:", origin);
        
        if (!origin) return callback(null, true);

        if (allowedOrigin.includes(origin)) {
            callback(null, true);
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(`🚫 [CORS BLOCKED] Origin not allowed: ${origin}`);
            }
            callback(new Error('Not allowed by CORS'));
        }
    }, // e.g. your Vite/React URL
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true, // Allow cookies and authorization headers
    optionsSuccessStatus: 204, // For legacy browsers (IE, SmartTVs)
};


app.use(cors(corsOptions)); // Apply the cors config
app.use(express.json());

//NOTE: Auto Get The Current Request Time , Method, Host and Url
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`QuinTeriors Server Listening On Host: ${req.hostname.concat(req.path)}, Timestamp: [${timestamp}], Req Method: ${req.method}`);
    next();
});

// API routes
//TODO: Create Root Route For Testing  
app.use("/", rootRouter)
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