const mongoose = require('mongoose');
const Scenario = require('./src/models/Scenario');
require('dotenv').config(); 

const MONGO_URI = "mongodb+srv://db_user:12345@cluster0.koqrdyy.mongodb.net/?appName=Cluster0"

const partyData = {
  type: "party",
  title: "CASE: DELETED TRUTH, REMAINING LIES",
  description: "A house party in Moda. A deleted video file. 6 Suspects. Who is hiding the truth?",
  solution: "selin", 
  explanation: "Deleting the video was a 2-step process. Selin watched the video, panicked, took a screenshot, and then deleted it. Cansel (Ayse) gave silent approval to protect her image.",
  
  clues: [
    { id: 1, type: "network", text: "Network Traffic: 03:14 - Access detected to 'party_final.mp4'." },
    { id: 2, type: "device", text: "Device ID: iPhone 14 Pro (Selin) - Video watched 78%." },
    { id: 3, type: "action", text: "System Log: 'Screenshot' action triggered at the exact same second." },
    { id: 4, type: "deletion", text: "File Status: Not Shift+Delete; deleted by emptying the Recycle Bin." },
    { id: 5, type: "message", text: "DM Log (Recovered): Cansel -> 'It happened just in time.'" },
    { id: 6, type: "wifi", text: "Wi-Fi Log: Recep's device disconnected 3 times (Weak signal)." },
    { id: 7, type: "wifi", text: "Wi-Fi Log: Rolando left the network right before the incident." }
  ],

  characters: [
    {
      charId: "recep",
      name: "Recep",
      avatarUrl: "/recep.jpg",
      role: "Uninvited Guest",
      memeTitle: "Sen benlen neden geliyon?",
      personality: "Blunt, Rude, Not Manipulative.",
      statement: "Ben açık konuşurum goçum. Video falan varsa vardı, yoksa yoktu. Ben girdim, çıktım, güldüm, eğlendim böhöyt. Bilgisayara dokunmadım. Sadece sinek avlarım. Zaten o laptop bana ters.",
      isLiar: false
    },
    {
      charId: "kadikoy",
      name: "DJ Boğa",
      avatarUrl: "/kadikoy.jpg",
      role: "Venue Manager",
      memeTitle: "Sessiz Alfa",
      personality: "Controlled, Cold-blooded..",
      statement: "Laptop’ı gördüm. Sen laptapu gördün de.. Açık mıydı, kapalı mıydı bilmiyorum. Ben müziğe bakıyordum. Olan olduysa da karışmam.",
      isLiar: false
    },
    {
      charId: "selin",
      name: "Selin",
      avatarUrl: "/selin.jpg",
      role: "Content Creator",
      memeTitle: "Bunu story atmamak suç",
      personality: "Image-focused, Plays innocent.",
      statement: "Ben sadece story attım. Video açmadım bile. Laptop başkasının, bana ne?",
      isLiar: true 
    },
    {
      charId: "ronaldo",
      name: "Rolando",
      avatarUrl: "/ronaldo.jpg",
      role: "NPC / Kayıp",
      memeTitle: "Aynen Kanka",
      personality: "Indifferent, Dreamer.",
      statement: "Aynen kanka ya… Ben tam hatırlamıyorum. Video falan varsa bile görmemişimdir. Futbolcu olmayı hayal ediyodum o sıra sizin videonuzla uğraşamam.",
      isLiar: false
    },
    {
      charId: "ali",
      name: "Ali Musluk",
      avatarUrl: "/ali.jpg",
      role: "IT Guy",
      memeTitle: "Ben Bilişimciyim",
      personality: "Technical, Wants to clear his name.",
      statement: "Video silinmişse bilinçli silinmiştir. Yanlışlıkla olmaz. Ama ben silmedim, zaten log tutuyorum.",
      isLiar: false
    },
    {
      charId: "cansel",
      name: "Cansel",
      avatarUrl: "/cansel.jpg",
      role: "Silent / Role Model",
      memeTitle: "Ben böyle şeylerle uğraşmam",
      personality: "Obsessed with image, Esthetic.",
      statement: "Video mu? Ben görmedim bile. Telefonum çantadaydı. Ayrıca burnum estetik benim. Zaten böyle şeylerden hoşlanmam.",
      isLiar: false 
    }
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connect');

    await Scenario.deleteMany({ type: 'party' });
    console.log('Old party scenario is cleaned.');

    await Scenario.create(partyData);
    console.log('New scenario uploaded successfuly!');

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed();