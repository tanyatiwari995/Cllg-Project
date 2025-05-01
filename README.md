# Backend Project

A Node.js-based backend application built with Express, MongoDB (via Mongoose), and various middleware/tools for authentication, file handling, security, scheduling, and more.

---

## 🔧 Features

- Authentication with JWT and bcrypt
- MongoDB integration using Mongoose
- File uploads with Multer and Cloudinary
- Session and cookie management
- Rate limiting and security headers
- SMS functionality via Twilio
- Environment variable configuration via dotenv
- Scheduling with node-cron

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB / Mongoose**
- **Cloudinary (File uploads)**
- **JWT (Authentication)**
- **Twilio (SMS)**
- **dotenv, helmet, morgan** (Security & logging)


## 🚀 Getting Started

### 1. Clone the repository

```bash

1. Install dependencies

npm install
2. Setup environment variables
Create a .env file in the root and add:
PORT=5000
MONGO_URI="mongodb://localhost:27017/db_name"
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
3. Run the app
Development:
npm run dev
Production:

npm start

🛠 Scripts

Command	Description

npm start	

npm run dev	

📚 Dependencies

This project uses the following major packages:

express, 
mongoose, 
jsonwebtoken, 
bcrypt, 
cloudinary, 
multer, 
twilio
helmet, 
cors, 
dotenv, 
express-validator, 
express-session, 
cookie-parser
node-cron, 
morgan, 
express-rate-limit

👩‍💻 Author
Tanya Tiwari

📄 License
This project is licensed under the MIT License.

