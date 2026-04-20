# 🏡 StayBnB – Rental Booking Platform

StayBnB is a full-stack server-rendered web application that allows users to explore, list, and book rental properties. It provides a seamless experience for both guests and hosts, similar to Airbnb.

---

## 🚀 Live Demo

- 🌐 Live Application: https://my-project-dsal.onrender.com

> ⚠️ Note: The app may take a few seconds to load initially due to Render free tier.

---

## 🚀 Features

- 🔐 User Authentication (Register/Login)
- 🏠 Browse rental listings with details (price, location, images)
- ➕ Create, edit, and delete listings (Host functionality)
- 📅 Booking system with date selection
- ⭐ Reviews & ratings system
- 🖼️ Image upload using Cloudinary
- 🔍 Search & filter properties
- 📱 Fully responsive design  

### 📊 Dashboard Features

- 📌 Track how many times listings are booked  
- 📅 View booking dates  
- 👤 See which user booked which listing  
- 📈 Manage all listing performance in one place  

### 🧾 My Bookings

- View all booked properties  
- Shows booking dates and listing details  
- Easy tracking of user bookings  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB (MongoDB Atlas)  
- Mongoose  
- EJS (Server-side templating)  
- Bootstrap  
- Cloudinary  

---

## 📂 Project Structure

StayBnB/  
│── models/  
│── routes/  
│── controllers/  
│── views/ (EJS Templates)  
│── public/ (Static Files)  
│── utils/  
│── app.js  
│── package.json  

---

## ⚙️ Installation & Setup (Local)

git clone https://github.com/khan-guddu-02/StayBnB.git  
cd StayBnB  
npm install  
node app.js  

---

## 🌐 Environment Variables

Create a `.env` file and add:

ATLASDB_URL=your_mongodb_connection  
CLOUD_NAME=your_cloud_name  
CLOUD_API=your_key  
CLOUD_API_SECRET=your_secret  
SESSION_SECRET=your_secret_key 

---

## 🎯 Key Highlights

- Server-side rendered application using EJS  
- Prevents double booking using date validation logic  
- Dashboard for booking tracking and listing analytics  
- My Bookings section for users  
- Review and rating system  
- Secure authentication and session management  
- Clean MVC architecture  

---

## 🔮 Future Improvements

- 💳 Payment Integration (Stripe / Razorpay)  
- ❤️ Wishlist feature  
- 🔔 Notifications  
- 📊 Admin panel  
- 📅 Advanced booking calendar  

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 👨‍💻 Author

Gareeb Nawaz  
- GitHub: https://github.com/khan-guddu-02

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
