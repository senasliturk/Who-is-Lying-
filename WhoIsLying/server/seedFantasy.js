const mongoose = require('mongoose');
const Scenario = require('./src/models/Scenario');
require('dotenv').config(); 

const MONGO_URI = "mongodb+srv://db_user:12345@cluster0.koqrdyy.mongodb.net/?appName=Cluster0"

const fantasyData = {
  type: "fantasy",
  title: "CASE: THE SILENT SPELL",
  description: "The Grand Archmage Alaric was found dead in his sealed tower. No wounds. No entry signs. 6 magical suspects. Who cast the killing curse?",
  solution: "Suphi", 
  explanation: "It wasn't a curse, it was a delayed poison disguised as a cure.Suphi gave Alaric a so-called calming potion after hearing hours earlier that Alaric had given students a score of 100. However, after drinking the potion, Alaric suffered a heart attack and died before he could enter the grades into the system.",
  
  clues: [
    { id: 1, type: "magic", text: "Aura Analysis: No offensive spells detected in the room. The death was biological, not magical." },
    { id: 2, type: "object", text: "On the Desk: An empty vial labeled 'Restorative Draught' signed by the Royal Healer." },
    { id: 3, type: "alchemy", text: "Goblet Residue: Traces of 'Nightshade' found mixed with red wine." },
    { id: 4, type: "witness", text: "Gargoyle Sentry: 'No one entered the tower after sunset except the Archmage himself.'" },
    { id: 5, type: "scroll", text: "Alaric's Journal (Last Entry): 'I fear those closest to me. The Healer smiles too much.'" },
    { id: 6, type: "spell", text: "Defensive Ward: The tower's protection shield was intact. The killer didn't break in." }
  ],

  characters: [
    {
      charId: "draken",
      name: "Lord Draken",
      avatarUrl: "/draken.jpg",
      role: "The Rival Necromancer",
      memeTitle: "Look at my evil skull ring",
      personality: "Arrogant, Dark, but Honorable.",
      statement: "I wanted him dead, yes. I challenged him to a duel next week. Why would I poison him like a coward today? I kill with fire and bone, not with wine.",
      isLiar: false
    },
    {
      charId: "Suphi",
      name: "Suphi Hoca",
      avatarUrl: "/suphihoca.jpg",
      role: "The Royal wizard",
      memeTitle: "Trust me, I'm a wizard I just stole a note from the students",
      personality: "Gentle, Soft-spoken, Secretly Vengeful.",
      statement: "Ben sadece 90 verdim. Eğer 100 verseydim yalancı olduğumu anlardınız.",
      isLiar: true 
    },
    {
      charId: "thorin",
      name: "Thorin",
      avatarUrl: "/thorin.jpg",
      role: "Orc Bodyguard",
      memeTitle: "Smash first, ask later",
      personality: "Loyal, Brutal, Simple.",
      statement: "I stood at the door. No one goes in. No one comes out. If boss died, it was ghosts. I smash ghosts? No, cannot smash ghosts. Sad.",
      isLiar: false
    },
    {
      charId: "sylas",
      name: "Sylas",
      avatarUrl: "/sylas.jpg",
      role: "The Rogue Spy",
      memeTitle: "I stole your wallet",
      personality: "Shifty, Sarcastic, Greed-driven.",
      statement: "I was... acquiring assets in the lower city. Stealing? Such an ugly word. I wasn't even in the castle. Check my pockets, nothing but gold.",
      isLiar: false
    },
    {
      charId: "lyra",
      name: "Lyra",
      avatarUrl: "/lyra.jpg",
      role: "The Apprentice",
      memeTitle: "Not paid enough for this",
      personality: "Anxious, Overworked, Scared.",
      statement: "I was cleaning the cauldron! I swear! Master Alaric was shouting at me all day, but I didn't kill him. Who will teach me magic now? I'm doomed!",
      isLiar: false
    },
    {
      charId: "vlad",
      name: "Baron Vlad",
      avatarUrl: "/vlad.jpg",
      role: "Vampire Diplomat",
      memeTitle: "I don't drink... wine",
      personality: "Charming, Creepy, Ancient.",
      statement: "His blood... excuse me, his death is a tragedy. I was attending the midnight ball. I have hundreds of witnesses. Besides, poisoned blood tastes terrible.",
      isLiar: false
    }
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' MongoDB Connected');

    await Scenario.deleteMany({ type: 'fantasy' });
    console.log('  Old fantasy scenarios deleted.');

    await Scenario.create(fantasyData);
    console.log(' Fantasy Scenario Inserted Successfully!');

    process.exit();
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
}

seed();

