# MyRoute Backend API

Backend API for MyRoute - Smart Route Planner

## Features

- 🔐 User authentication (JWT)
- 💾 Save and manage routes
- 🔗 Share routes with others
- 👤 User preferences and profiles
- 📍 Route history and favorites

## Tech Stack

- **Node.js** + **Express** - Server framework
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:8000
```

### 3. Get MongoDB Connection String

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your database user password

**Option B: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/myroute
```

### 4. Run Development Server

```bash
npm run dev
```

Server runs on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Routes
- `POST /api/routes` - Save a route (requires auth)
- `GET /api/routes` - Get all user's routes (requires auth)
- `GET /api/routes/:id` - Get specific route (requires auth)
- `PUT /api/routes/:id` - Update route (requires auth)
- `DELETE /api/routes/:id` - Delete route (requires auth)
- `POST /api/routes/:id/share` - Generate share link (requires auth)
- `GET /api/routes/shared/:token` - Get shared route (public)

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update profile (requires auth)
- `PUT /api/users/preferences` - Update preferences (requires auth)

### Health
- `GET /health` - Health check
- `GET /` - API info

## Deploy to Railway

1. **Create Railway Account**: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Select Repository**: RusstySlice/MyRoute
4. **Add Environment Variables** in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
5. **Deploy!** 🚀

Railway will auto-deploy on every push to your GitHub repo.

## Testing API

Use Postman, Insomnia, or cURL:

```bash
# Health check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## Author

Built by Juan & Russty

