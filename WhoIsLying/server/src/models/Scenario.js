const mongoose = require("mongoose");


const characterSchema = new mongoose.Schema(
  {
    charId: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    statement: { type: String, required: true },

    role: { type: String },         
    memeTitle: { type: String },    
    personality: { type: String },  

    isLiar: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

const clueSchema = new mongoose.Schema(
  {
    id: { type: Number },
    type: { type: String }, 
    text: { type: String },
  },
  { _id: false }
);

const scenarioSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["party", "campus", "fantasy"], default: "party" },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    solution: { type: String },   
    explanation: { type: String }, 
    clues: [clueSchema],           

    characters: {
      type: [characterSchema],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 3;
        },
        message: "The script must include at least three characters.",
      },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

scenarioSchema.pre("validate", function () {
  const liars = (this.characters || []).filter((c) => c.isLiar === true);

  if (liars.length !== 1) {
    this.invalidate("characters", "Every scenario must have exactly one liar.");
  }
});

module.exports = mongoose.model("Scenario", scenarioSchema);