# IPL Ticket Booking System

This is an IPL Ticket Booking System built with **React** and **Vite.** The system allows users to view upcoming matches, book tickets, cancel bookings, and manage match details (for admins).

## Features

- View upcoming IPL matches.
- Book tickets for selected matches.
- Admin panel for creating, updating, and deleting matches.
- Cancel bookings for users.
- View ticket details (available tickets, ticket prices, etc.).
- Admin can view all the other people bookings.

## Technologies Used

- **Frontend**: React, Vite, React Router, Axios
- **Styling**: CSS Modules or regular CSS (if you're using something like Tailwind CSS or SASS, mention it here)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 22.x)
- **npm** 
- **Git** (for version control)

## Setup & Installation

Follow these steps to get the project up and running.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yashu183/ipl-booking-system-fe.git
cd ipl-booking-system-fe
```

### 2. Install Dependencies

```bash
npm i
```

### 3. Setting Up Environment Variables

Create `.env` file in the root directory of your project and paste the following content.


```bash
touch .env # to create .env file
VITE_API_BASE_URL=http://localhost:5555/api # Replace this with your backend URL.
```

### 4. Running the Development Server

```bash
npm run dev
```

This will start the fronetend server and it will be available on `http://localhost:5173` (unless you didn't change the default configs. If you did, port number will be shown in the terminal). Open your preferred browser and visit `http://localhost:5173`.
