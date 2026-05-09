const mongoose = require("mongoose");
require("dotenv").config();

const Note = require("./models/Note");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set in .env file.");
  console.error("   Add your MongoDB Atlas connection string to backend/.env");
  process.exit(1);
}

const sampleNotes = [
  {
    title: "Completed React Practice",
    description:
      "Learned useEffect and API integration. Built a small project to consume a REST API and display data dynamically using useState and useEffect hooks.",
    createdAt: new Date("2026-05-08T10:30:00.000Z"),
  },
  {
    title: "Learned MongoDB",
    description:
      "Practiced CRUD operations using Mongoose. Created schemas and models, connected to local MongoDB instance, and tested insert, find, update, and delete operations.",
    createdAt: new Date("2026-05-07T09:00:00.000Z"),
  },
  {
    title: "Express.js REST API",
    description:
      "Built a full REST API with Express.js. Implemented GET, POST, PUT, and DELETE endpoints. Added CORS middleware and global error handling.",
    createdAt: new Date("2026-05-06T14:15:00.000Z"),
  },
  {
    title: "Team Stand-up Notes",
    description:
      "Discussed sprint goals for the upcoming week. Assigned tasks: frontend integration to Alice, database design to Bob, and API development to self. Review meeting scheduled for Friday.",
    createdAt: new Date("2026-05-05T08:45:00.000Z"),
  },
  {
    title: "Code Review Feedback",
    description:
      "Received feedback on PR #42 — improved variable naming, removed unused imports, and refactored the async function to use proper error handling with try/catch blocks.",
    createdAt: new Date("2026-05-04T16:00:00.000Z"),
  },
  {
    title: "UI Component Design",
    description:
      "Designed note card components using CSS Flexbox. Added hover animations, responsive grid layout, and consistent color scheme across the dashboard.",
    createdAt: new Date("2026-05-03T11:30:00.000Z"),
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);

    const deleted = await Note.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing note(s)`);

    const inserted = await Note.insertMany(sampleNotes);
    console.log(`Successfully seeded ${inserted.length} notes:\n`);

    inserted.forEach((note, index) => {
      console.log(`  ${index + 1}. [${note._id}] "${note.title}"`);
    });

    console.log("\nDatabase seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
    process.exit(0);
  }
}

seedDatabase();
