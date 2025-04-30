
`Features:`  
Admin Login: Admins can log in using their username or phone number.

OTP-based Authentication: OTP generation and verification via Twilio for login and password resets.

Password Reset: Admins can initiate OTP-based password resets.

Vendor Approval: Admins can approve or reject vendor registration requests.

Rate-limited OTP Requests: To prevent abuse, OTP requests are rate-limited.

JWT Authentication: Cookie-based JWT authentication for secure admin sessions.

Password Hashing: Secure password hashing using bcrypt.

Vendor Categories: Vendors can apply under predefined categories like "Wedding Venues," "Photographers," etc.

Dashboard Statistics: View aggregate counts for services, cards, bookings, users, vendors, and pending items.

Paginated Lists: View and paginate through services, cards, bookings, users, vendor requests, and reviews.

Moderation Actions: Admins can approve/reject services, cancel bookings, and restore associated resource availability.

Notifications: Sends WhatsApp or SMS notifications via Twilio upon moderation actions.

Soft Deletes: Admins can soft delete reviews and block/unblock users.



Create a .env file with the following keys:

`NODE_ENV=development
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret`

Tech Stack:

`Backend: Node.js, Express.js
Database: MongoDB 
Authentication: JWT, bcrypt, OTP`




User Authentication
Sign-In: Users can sign in using their phone number. OTP will be sent via Twilio to verify the phone number.

Sign-Up: New users can sign up with their full name and phone number. OTP is sent for verification before account creation.

OTP Verification: OTPs are generated, stored, and verified for both sign-in and sign-up processes. OTPs expire after 10 minutes.

Blocked Users: Blocked users cannot sign in or sign up.

Vendor Registration
Vendor Registration Request: Vendors can apply with their phone number, password, and category. A brand icon is required during the registration process.

OTP Verification: Vendors need to verify their phone number via OTP before registration.

Vendor Request Status: Vendor requests are stored with a status of "pending" and will be approved after verification by the system admin.

Admin Moderation & Management
Dashboard Statistics: Admins can view statistics for services, cards, bookings, and earnings.

CRUD Operations for Services and Cards: Admins can perform create, read, update, and delete operations for services and cards.

Manage Bookings: Admins can view and update booking statuses.

Vendor Management: Admins can approve or reject vendor registration requests.

Review Management: Admins can fetch reviews for services and card templates, calculate average ratings, and delete reviews as needed.

User Blocking: Admins can block or unblock users.

Notifications
WhatsApp or SMS Notifications: Notifications are sent via Twilio for moderation actions such as vendor approval/rejection, bookings, and cancellations.

Error Handling
401 Unauthorized: If the provided token is invalid or expired.

403 Forbidden: If the user does not have the required permissions to access the route.

404 Not Found: If the requested resource (admin, user, vendor) does not exist.

License
`MIT License`