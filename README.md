# 🕵️‍♂️ Who Is Lying? - Interactive Detective Mystery Game

> **SE 3355 - Web Programming Final Project**

**Who Is Lying?** is an interactive Full-Stack web application that immerses players in the role of a detective. Players must investigate suspects, analyze digital evidence via a hacker terminal, and solve mysteries across different unique scenarios.



## 🌟 Key Features

* **3 Unique Game Modes:**
    * 🎉 **Party Mystery:** Investigate social media lies and a deleted video at a chaotic house party.
    * 🏫 **Campus Drama:** Uncover the truth behind a sabotaged final project in the architecture faculty.
    * 🧙 **Fantasy Quest:** Solve the murder of the Grand Archmage in a dark fantasy setting involving potions and spells.
* **Immersive UI/UX:**
    * **Polaroid Card Interface:** Interactive suspect profiles with flip animations and hover effects.
    * **Digital Forensics Terminal:** A "Matrix-style" terminal to analyze server logs, Wi-Fi traces, and encrypted messages.
* **Game Mechanics:**
    * **Mark as Suspect:** Toggle markers on suspects to track your investigation.
    * **Accuse & Solve:** Make your final accusation. If correct, celebrate with a victory confetti animation! 🎉

## 🛠️ Tech Stack (MERN)

* **Frontend:** React.js (Vite), CSS Modules, React Router DOM
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose
* **Testing:** Thunder Client (API Testing)
* **Tools:** Axios, React-Confetti, BCrypt (Auth Security)

---

## 📸 Screenshots


<img width="1869" height="764" alt="Ekran görüntüsü 2026-01-02 162605" src="https://github.com/user-attachments/assets/acc108f0-efde-4e12-9c63-b5f65e2477b0" />


<img width="1890" height="851" alt="Ekran görüntüsü 2026-01-02 162540" src="https://github.com/user-attachments/assets/3e279b3f-5a15-45c5-ae31-e00f993ae560" />



---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/senasliturk/Who-is-Lying-.git](https://github.com/senasliturk/Who-is-Lying-.git)
cd Who-is-Lying-
2. Backend Setup (Server)
Navigate to the server directory and install dependencies:

Bash

cd server
npm install
Create Environment Variables: Create a .env file inside the server folder and add your MongoDB connection string:

Kod snippet'i

MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.mongodb.net/whoislying
PORT=5000
JWT_SECRET=your_secret_key_here
Database Seeding (Crucial Step): You must populate the database with the game scenarios before running the app. Run these commands:

Bash

node seedParty.js
node seedCampus.js
node seedFantasy.js
You should see " Scenario Inserted Successfully!" for each command.

Start the Server:

Bash

npm start
(Server runs on http://localhost:5000)

3. Frontend Setup (Client)
Open a new terminal, navigate to the client directory:

Bash

cd ../client
npm install
Start the Client:

Bash

npm run dev
(Client runs on http://localhost:5173)

👥 Team Members
22070006063 - Osman Ozan Kavaklı - Full Stack Developer

22070006073 - Berke Sinan Sönmez - Frontend / UI Design

21070006035 - Sena Aslı Türk - Backend / Database

📄 Project Structure
Bash

who-is-lying/
├── client/             # React Frontend
│   ├── public/         # Images & Assets
│   └── src/
│       ├── components/ # Reusable UI components (Polaroid, Terminal)
│       ├── pages/      # Game Logic & Views
│       └── ...
├── server/             # Express Backend
│   ├── models/         # Mongoose Schemas (User, Scenario)
│   ├── routes/         # API Routes (Auth, Game Data)
│   ├── seedParty.js    # Database Seeder Scripts
│   └── ...
└── README.md
Course: SE 3355 - Web Programming
