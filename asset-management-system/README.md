# Asset Management System

A complete full-stack web application for managing organizational assets, built with Node.js, Express, MongoDB, and Vanilla JavaScript.

## Features

### Authentication Module
- JWT-based authentication
- Role-based access control (Admin/User)
- Password hashing with bcrypt
- Secure login and registration

### Asset Management (Admin)
- Add, edit, and delete assets
- View all assets with pagination
- Search and filter by category, status
- Auto-generated asset IDs
- Track asset details (serial number, purchase date, warranty, etc.)

### User Module
- View assigned assets
- Request new assets
- Return assets
- Track request status

### Asset Assignment (Admin)
- Approve/reject asset requests
- Assign assets to users
- Change asset status
- Track asset history

### Dashboard
- Admin dashboard with statistics
- Total, available, assigned, and maintenance assets count
- Category-wise asset breakdown
- Clean and responsive UI

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs

## Project Structure

```
asset-management-system/
│
├── client/                    # Frontend files
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── api.js       # API calls
│   │   │   ├── auth.js      # Authentication utilities
│   │   │   └── navbar.js    # Navigation bar
│   │   ├── pages/           # Page-specific JavaScript
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   │   ├── dashboard.js
│   │   │   ├── assets.js
│   │   │   ├── requests.js
│   │   │   ├── my-assets.js
│   │   │   └── my-requests.js
│   │   └── styles/
│   │       └── style.css    # Global styles
│   ├── index.html           # Login page
│   ├── register.html
│   ├── dashboard.html
│   ├── assets.html
│   ├── requests.html
│   ├── my-assets.html
│   └── my-requests.html
│
└── server/                   # Backend files
    ├── config/
    │   └── db.js            # Database connection
    ├── controllers/
    │   ├── authController.js
    │   ├── assetController.js
    │   └── requestController.js
    ├── middleware/
    │   └── auth.js          # JWT verification
    ├── models/
    │   ├── User.js
    │   ├── Asset.js
    │   └── Request.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── assetRoutes.js
    │   └── requestRoutes.js
    ├── .env.example         # Environment variables template
    ├── server.js            # Entry point
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone or Download the Project

### Step 2: Install Backend Dependencies
```bash
cd asset-management-system/server
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the `server` directory:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/asset_management
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Step 4: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod
```

Or use MongoDB Atlas (cloud) and update the MONGODB_URI in .env

### Step 5: Start the Backend Server
```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

### Step 6: Start the Frontend
Open a new terminal and serve the client folder:

**Option 1: Using Live Server (VS Code Extension)**
- Install "Live Server" extension in VS Code
- Right-click on `client/index.html`
- Select "Open with Live Server"

**Option 2: Using Python**
```bash
cd client
python -m http.server 3000
```

**Option 3: Using Node.js http-server**
```bash
npm install -g http-server
cd client
http-server -p 3000
```

Frontend will run on `http://localhost:3000`

## Usage

### 1. Register a New User
- Go to `http://localhost:3000/register.html`
- Fill in the registration form
- Select role (Admin or User)
- Click Register

### 2. Login
- Go to `http://localhost:3000`
- Enter email and password
- Click Login

### 3. Admin Features
After logging in as admin:
- **Dashboard**: View statistics and asset breakdown
- **Assets**: Add, edit, delete, search, and filter assets
- **Requests**: Approve or reject user requests

### 4. User Features
After logging in as user:
- **My Assets**: View assigned assets
- **My Requests**: Request new assets, view status, return assets

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Assets
- `GET /api/assets` - Get all assets with filters (Protected)
- `GET /api/assets/:id` - Get single asset (Protected)
- `POST /api/assets` - Create asset (Admin only)
- `PUT /api/assets/:id` - Update asset (Admin only)
- `DELETE /api/assets/:id` - Delete asset (Admin only)
- `GET /api/assets/stats/dashboard` - Get dashboard stats (Admin only)

### Requests
- `POST /api/requests` - Create request (Protected)
- `GET /api/requests` - Get all requests (Admin only)
- `GET /api/requests/my-requests` - Get user's requests (Protected)
- `PUT /api/requests/:id/approve` - Approve request (Admin only)
- `PUT /api/requests/:id/reject` - Reject request (Admin only)
- `PUT /api/requests/:id/return` - Return asset (Protected)

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/user),
  department: String
}
```

### Assets Collection
```javascript
{
  assetId: String (auto-generated),
  name: String,
  category: String,
  serialNumber: String (unique),
  purchaseDate: Date,
  cost: Number,
  warrantyExpiry: Date,
  status: String (Available/Assigned/Maintenance/Retired),
  location: String,
  assignedTo: ObjectId (User reference)
}
```

### Requests Collection
```javascript
{
  userId: ObjectId (User reference),
  assetId: ObjectId (Asset reference),
  requestDate: Date,
  status: String (Pending/Approved/Rejected/Returned),
  returnDate: Date,
  remarks: String
}
```

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- CORS enabled

## Future Enhancements

- Export assets to CSV
- Asset depreciation calculator
- Email notifications
- Activity log system
- Dark mode toggle
- File upload for asset images
- Advanced reporting

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- For Atlas, ensure IP whitelist is configured

### CORS Error
- Ensure backend is running on port 5000
- Check CLIENT_URL in .env matches frontend URL

### JWT Token Error
- Clear browser localStorage
- Login again to get new token

## License

This project is open-source and available for educational purposes.

## Author

Computer Science Student - College Project

---

**Note**: This is a college project designed for learning purposes. For production use, additional security measures and optimizations should be implemented.
