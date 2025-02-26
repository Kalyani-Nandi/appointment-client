# Appointment Booking System (Client)

This is the client-side of the Appointment Booking System, built with React, Node.js, and Tailwind CSS. It allows users to view available slots, book appointments, and manage schedules seamlessly.

# 🛠️ Features

Appointment Booking: Select date and time slots for booking.

Slot Management: Display available and booked slots dynamically.

REST API Integration: Communicate with the backend to store and retrieve data.

Responsive Design: Optimized for both desktop and mobile devices using Tailwind CSS.

# 🛠️ Project Structure

The project is structured as follows: 


 ``` 
appointment-client/
│
├── src/                    # Source code for the application
│    ├── components/        # Reusable React components
│    ├── pages/             # Application pages (Home, Booking, etc.)
│    ├── hooks/             # Custom hooks for slot generation
│    └── index.js           # Root component
│
├── public/                 # Public assets (favicon, images, etc.)
│
├── .env.example            # Environment variable template
│
├── package.json            # Project metadata and dependencies
│
├── .gitignore              # Ignored files/folders
│
├── tailwind.config.js      # Tailwind CSS configuration
│
└── README.md               # Project documentation
```

# Installation

Clone the Repository

git clone https://github.com/Kalyani-Nandi/appointment-client.git

cd appointment-client

# Install Dependencies

Use npm to install the required dependencies:

npm install

# 🧪 Environment Variables

Ensure the following variables are set in your .env file:

REACT_APP_API_URL=https://appointment-server-six.vercel.app/api/

# Start the Development Server

Run the following command to start the server locally:

npm run start

Once the server starts, the application will be accessible at:

http://localhost:3000

# 🌐 Live Demo

You can access the live version of the Admin Site here:    

https://appointment-client-rho.vercel.app/



# 👩‍💻 Author

Kalyani Nandi