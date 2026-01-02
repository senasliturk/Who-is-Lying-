const mongoose = require('mongoose');
const Scenario = require('./src/models/Scenario');
require('dotenv').config(); 

const MONGO_URI = "mongodb+srv://db_user:12345@cluster0.koqrdyy.mongodb.net/?appName=Cluster0"

const campusData = {
  type: "campus", 
  title: "CASE: THE SHATTERED FINAL",
  description: "Architecture faculty. The night before the final jury. The star student's model is destroyed. Who sabotaged the project?",
  solution: "julia", 
  explanation: "It wasn't malice, it was clumsiness. Julia sneaked in to take photos of the project to 'get inspired' (copy). She tripped over a cable, crushed the model, and ran away in panic.",
  
  clues: [
    { id: 1, type: "access", text: "Door Log (02:15 AM): Studio door opened with a 'Guest Card'." },
    { id: 2, type: "wifi", text: "Wi-Fi Log: 'Julia_iPhone' connected to 'Studio_5G' at 02:20 AM." },
    { id: 3, type: "witness", text: "Janitor's Statement: 'I heard a loud crash and saw someone with a red backpack running away.'" },
    { id: 4, type: "object", text: "Found at Scene: A lens cap belonging to a professional camera." },
    { id: 5, type: "social", text: "Insta Story (Deleted): Julia posted a selfie with a red backpack earlier that day." },
    { id: 6, type: "alibi", text: "Mert's Alibi: He was at the library until morning (Verified by CCTV)." }
  ],

  characters: [
    {
      charId: "mert",
      name: "Mert",
      avatarUrl: "/mert.jpg",
      role: "The Valedictorian",
      memeTitle: "GPA is my personality",
      personality: "Competitive, Stressed, Arrogant.",
      statement: "Why would I destroy it? I'm already better than him. I was at the library studying all night. You can check the cameras. I don't need to sabotage anyone to win.",
      isLiar: false
    },
    {
      charId: "berk",
      name: "Berk",
      avatarUrl: "/berk.jpg",
      role: "Rich Kid / Slacker",
      memeTitle: "My dad knows the Dean",
      personality: "Relaxed, Unaware, Flirty.",
      statement: "Bro, I was at a party. I don't even know where the studio is. Why are we stressing? We'll graduate anyway. Want some coffee?",
      isLiar: false
    },
    {
      charId: "julia",
      name: "Julia",
      avatarUrl: "/julia.jpg",
      role: "Exchange Student",
      memeTitle: "I don't understand Turkish",
      personality: "Clumsy, Secretive, Plays dumb.",
      statement: "I was sleeping in my dorm. I don't have a key to the studio. Red backpack? Everyone has a red backpack. I don't know anything about a broken model.",
      isLiar: true 
    },
    {
      charId: "ece",
      name: "Ece",
      avatarUrl: "/ece.jpg",
      role: "The Jealous Bestie",
      memeTitle: "Happy for you (crying inside)",
      personality: "Fake nice, Passive-aggressive.",
      statement: "Oh my god, poor thing! I'm so sad for him. I mean, his project was okay, but he didn't deserve THIS. I was home watching Netflix. Alone.",
      isLiar: false
    },
    {
      charId: "caner",
      name: "Caner",
      avatarUrl: "/caner.jpg",
      role: "Overworked TA",
      memeTitle: "Is this on the syllabus?",
      personality: "Tired, Done with life, Cynical.",
      statement: "I left the building at 8 PM. I don't get paid enough to stay late. If you ask me, the model probably collapsed on its own. Glue quality is terrible these days.",
      isLiar: false
    },
    {
      charId: "onur",
      name: "Onur",
      avatarUrl: "/onur.jpg",
      role: "Library Ghost",
      memeTitle: "Hasn't slept since 2019",
      personality: "Quiet, Observant, weird.",
      statement: "I saw Mert at the library. He didn't move for 6 hours. I didn't see anyone else. I live here basically. Can I go now? I have a thesis to write.",
      isLiar: false
    }
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' MongoDB Connected');

    await Scenario.deleteMany({ type: 'campus' });
    console.log(' Old campus scenarios deleted.');

    await Scenario.create(campusData);
    console.log(' Campus Scenario Inserted Successfully!');

    process.exit();
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
}

seed();