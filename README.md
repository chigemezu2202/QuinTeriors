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
