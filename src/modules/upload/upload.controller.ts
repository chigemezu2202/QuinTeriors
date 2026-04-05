import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { createUpload } from './upload.service.js';
import { errorResponse, successResponse } from '../../utils/http.js';
import { AuthRequest } from '../../middlewares/auth.js';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    },
});

export async function uploadImageController(req: AuthRequest, res: Response) {
    try {
        if (!req.file) {
            return errorResponse(res, 'No file uploaded', 400);
        }

        const fileUrl = `/uploads/${req.file.filename}`;
        const uploadData = await createUpload({
            file_name: req.file.originalname,
            file_url: fileUrl,
            file_type: req.file.mimetype,
            uploaded_by: req.admin?.id ?? null,
        });

        return successResponse(res, uploadData, 201);
    } catch (error) {
        return errorResponse(res, 'Unable to upload image');
    }
}

export { upload };