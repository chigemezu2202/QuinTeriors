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