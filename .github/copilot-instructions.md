# AI Agent Instructions for DanhSach Project

## Project Overview
This is a student management system with a Node.js/Express backend and a vanilla JavaScript frontend. The system allows CRUD operations for student records with pagination support.

## Architecture
- `/api/` - Backend Express server with MySQL database connection
  - `server.js` - Main API routes and server setup
  - `db.js` - Database connection configuration
- `/List/` - Frontend client implementation
  - `index.html` - Main page markup
  - `script.js` - Client-side logic
  - `style.css` - Styling

## Key Integration Points

### API Endpoints
- GET `/api/sinhvien?page={page}&limit={limit}` - List students with pagination
- POST `/api/sinhvien` - Create new student
- PUT `/api/sinhvien/:id` - Update student
- DELETE `/api/sinhvien/:id` - Delete student

### Database Schema
Students table (`sinhvien`):
- `id` - Auto-increment primary key
- `hoten` - Student name
- `age` - Student age
- `class` - Class name/ID

## Project Conventions

### Frontend Patterns
- Data fetching using native `fetch` API with async/await
- XSS prevention using `escapeHtml` function for user inputs
- Pagination controls in standard format: First/Prev/Next/Last
- Dynamic form generation and table updates

### Backend Patterns
- Response format: `{ data: [], pagination: { currentPage, totalPages, totalItems } }`
- Error responses: `{ error: message }` with appropriate HTTP status codes
- Query parameter validation with defaults (page=1, limit=10)

## Development Setup
1. MySQL database named 'qlsinhvien' must be running locally
2. Database credentials in `db.js`:
   ```js
   host: 'localhost'
   user: 'root'
   password: '12345'
   database: 'qlsinhvien'
   ```
3. Start API server: `node api/server.js` (runs on port 3000)
4. Access frontend: Open `List/index.html` in browser

## Common Tasks
- Modifying pagination: Update `itemsPerPage` options in `script.js`
- Adding new API endpoints: Follow existing patterns in `server.js`
- Database error handling: Check `db.js` for connection error patterns