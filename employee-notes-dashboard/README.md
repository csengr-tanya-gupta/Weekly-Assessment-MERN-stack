# NoteFlow - Employee Notes Dashboard

A full-stack Employee Notes Dashboard with a sticky **Navbar**, **Hero section**, and **MongoDB Atlas** cloud storage. Built with Node.js + Express.js (backend), MongoDB Atlas (cloud database), and React.js (frontend).

---

## Project Structure

```
employee-notes-dashboard/
├── backend/
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── noteRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   ├── AddNoteForm.js
    │   │   ├── AddNoteForm.css
    │   │   ├── NoteCard.js
    │   │   └── NoteCard.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## MongoDB Atlas Setup (Required)

> The app now stores all data in **MongoDB Atlas** (cloud). Follow these steps before running the backend.

### Step 1 — Create a free Atlas account

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign up or log in, then click **"Try Free"**

### Step 2 — Create a Cluster

1. Click **"Build a Database"**, then choose **Free (M0 Shared)**
2. Pick a cloud provider and region, then click **"Create"**

### Step 3 — Create a Database User

1. In the left sidebar go to **Security > Database Access**
2. Click **"Add New Database User"**
3. Choose **Password** auth, then set a username and password (save these!)
4. Role: **"Atlas admin"** or **"Read and write to any database"**
5. Click **"Add User"**

### Step 4 — Whitelist your IP

1. In the left sidebar go to **Security > Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`), then confirm
   _(For production, restrict to your actual IP)_

### Step 5 — Get your Connection String

1. Go to **Database > Connect** on your cluster
2. Choose **"Drivers"**. Driver: **Node.js**, Version: **5.5 or later**
3. Copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6 — Add it to .env

Open `backend/.env` and replace the placeholder:

```env
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/employee_notes?retryWrites=true&w=majority&appName=Cluster0
```

> Replace `youruser`, `yourpassword`, and the cluster hostname with your actual values.
> The database name `employee_notes` will be created automatically.

---

## Getting Started

### Step 1 — Backend Setup

```bash
cd employee-notes-dashboard/backend

npm install

npm start
```

Server runs at: **http://localhost:5000**

You should see:

```
MongoDB connected successfully
Server running at http://localhost:5000
```

### Step 2 — Seed Sample Data (Optional)

```bash
node seed.js
```

Inserts 6 sample notes into your Atlas cluster:

```
Successfully seeded 6 notes:
  1. [ObjectId] "Completed React Practice"
  2. [ObjectId] "Learned MongoDB"
  ...
Database seeding complete!
```

### Step 3 — Frontend Setup

Open a new terminal:

```bash
cd employee-notes-dashboard/frontend

npm install
npm start
```

Opens at: **http://localhost:3000**

---

## UI Features

| Feature                  | Description                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| **Sticky Navbar**        | NoteFlow brand, nav links (Dashboard / My Notes / About), live note count badge, avatar, mobile hamburger |
| **Hero Section**         | Animated gradient title, Atlas connection indicator, stat cards (Total / Today / This Week)               |
| **Search Bar**           | Real-time client-side filter by title or description                                                      |
| **Add Note Form**        | Expandable card with validation and character counter                                                     |
| **Note Cards**           | Inline edit and delete with animations                                                                    |
| **Empty / Error States** | Friendly messages with retry button                                                                       |
| **Responsive**           | Mobile hamburger menu, stacked hero on small screens                                                      |

---

## API Reference

**Base URL:** `http://localhost:5000/api`

| Method   | Endpoint         | Description                           |
| -------- | ---------------- | ------------------------------------- |
| `GET`    | `/api/notes`     | Fetch all notes (sorted newest first) |
| `POST`   | `/api/notes`     | Create a new note                     |
| `GET`    | `/api/notes/:id` | Get single note by ID                 |
| `PUT`    | `/api/notes/:id` | Update note title & description       |
| `DELETE` | `/api/notes/:id` | Delete a note                         |

---

## Tech Stack

| Layer       | Technology                 |
| ----------- | -------------------------- |
| Backend     | Node.js + Express.js       |
| Database    | MongoDB Atlas (cloud)      |
| ODM         | Mongoose                   |
| Frontend    | React.js v18               |
| HTTP Client | Axios                      |
| Fonts       | DM Serif Display + DM Sans |

---

## Troubleshooting

**"MONGO_URI is not defined" error**
Open `backend/.env` and add your Atlas connection string.

**"Authentication failed" on connect**
Double-check your Atlas username and password in the URI. Special characters in passwords must be URL-encoded (e.g. `@` becomes `%40`).

**"IP not whitelisted" error**
In Atlas > Network Access, add your current IP or allow `0.0.0.0/0`.

**Frontend shows "Connection Error"**
Ensure the backend is running (`npm start` in `/backend`) and `.env` has the correct Atlas URI.

---
