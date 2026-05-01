# QuinTeriors

> A modern full-stack interior design Business Administrative with evevated privilege's platform with secure authentication, file management, and comprehensive API endpoints.

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-blue)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-green)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-3.20.0-orange)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

**[Live Demo](https://quin-teriors.vercel.app)** • **[Repository](https://github.com/chigemezu2202/QuinTeriors)**


---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Development](#development)
- [Contributing](#contributing)

---

## 🎨 Overview

QuinTeriors is a comprehensive interior design e-commerce and portfolio platform built with TypeScript. It provides a robust backend API with secure authentication, real-time file uploads, database persistence, and rate limiting to deliver a seamless experience for both clients and designers.

---

## ✨ Features

### Core Functionality
- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **File Management** - Secure image uploads for design portfolios and products
- **Database Persistence** - MySQL integration for robust data management
- **Rate Limiting** - Built-in request throttling to prevent abuse
- **CORS Support** - Secure cross-origin resource sharing
- **Schema Validation** - Input validation using Zod

### Security Features
- Bcrypt password encryption
- JWT token-based authorization
- Rate limiting middleware
- CORS protection
- Input validation and sanitization

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Express.js** | 5.2.1 | Web framework & API server |
| **TypeScript** | 6.0.2 | Type-safe development |
| **MySQL2** | 3.20.0 | Database driver |
| **JWT** | 9.0.3 | Authentication tokens |
| **bcrypt** | 6.0.0 | Password hashing |
| **Multer** | 2.1.1 | File upload handling |
| **Zod** | 4.3.6 | Schema validation |

### Development Tools
| Tool | Purpose |
|------|---------|
| **tsx** | TypeScript execution & hot-reload |
| **tsc** | TypeScript compiler |
| **shx** | Cross-platform shell utilities |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MySQL** (v5.7 or higher)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/chigemezu2202/QuinTeriors.git
cd QuinTeriors
```

# QuinTeriors API Documentation

## Overview
The QuinTeriors API provides various endpoints to manage leads, services, portfolios, galleries, testimonials, pages, settings, admins, uploads, and service items. This documentation outlines the complete API structure, including authentication requirements, request and response examples, and rate limiting.

---

## API Endpoints
### Auth
- **POST /api/auth/login**  
  - **Request:**  
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```  
  - **Response:**  
    ```json
    {
      "token": "string",
      "expires": "string"
    }
    ```  
  - **Authentication:** None  
  - **Rate Limiting:** 1000 requests/hour

### Leads
- **GET /api/leads**  
  - **Response:**  
    ```json
    [
      {
        "id": "int",
        "name": "string",
        "email": "string"
      }
    ]
    ```  
  - **Authentication:** Bearer token required  
  - **Rate Limiting:** 500 requests/hour

### Services
- **GET /api/services**  
- **POST /api/services**  
  - **Request:**  
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```  
  - **Response:**  
    ```json
    {
      "id": "int",
      "title": "string"
    }
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

### Portfolio
- **GET /api/portfolio**  
  - **Response:**  
    ```json
    [
      {
        "id": "int",
        "title": "string",
        "image_url": "string"
      }
    ]
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

### Gallery
- **GET /api/gallery**  
  - **Response:**  
    ```json
    [
      {
        "id": "int",
        "image_url": "string"
      }
    ]
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

### Testimonials
- **GET /api/testimonials**  
  - **Response:**  
    ```json
    [
      {
        "id": "int",
        "client_name": "string",
        "feedback": "string"
      }
    ]
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

### Pages
- **GET /api/pages**  
  - **Response:**  
    ```json
    [
      {
        "id": "int",
        "title": "string",
        "slug": "string"
      }
    ]
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

### Settings
- **GET /api/settings**  
- **PUT /api/settings**  
  - **Request:**  
    ```json
    {
      "key": "string",
      "value": "string"
    }
    ```  
  - **Response:**  
    ```json
    {
      "status": "success"
    }
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

### Admins
- **GET /api/admins**  
  - **Response:**  
    ```json
    [
      {
        "id": "int",
        "username": "string"
      }
    ]
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

### Upload
- **POST /api/upload**  
  - **Request:**  
    ```json
    {
      "file": "binary"
    }
    ```  
  - **Response:**  
    ```json
    {
      "url": "string"
    }
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 100 requests/hour

### Service Items
- **GET /api/service-items**  
  - **Response:**  
    ```json
    [
      {
        "id": "int",
        "name": "string"
      }
    ]
    ```  
- **Authentication:** Bearer token required  
- **Rate Limiting:** 300 requests/hour

---

## Validation Details
Each request must validate the user's authentication token and ensure all required fields are present in the request body where applicable.

## Authentication Requirements
All endpoints except the authentication endpoint require a valid Bearer token for access. The token must be included in the Authorization header of the request.  

## Rate Limiting
The API enforces rate limits based on the endpoint to ensure fair usage and availability. Exceeding the limit will result in a rate limit error response.

## File Upload Instructions
To upload files, make a `POST` request to `/api/upload` with the file attached as binary data in the request body. Ensure that the file type and size comply with the API specifications.  

---

For further information and support, please refer to our support page or contact us directly.
