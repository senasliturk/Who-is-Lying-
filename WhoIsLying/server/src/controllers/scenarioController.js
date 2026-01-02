const Scenario = require("../models/Scenario");

exports.listScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find()
      .select("_id title description createdAt")
      .sort({ createdAt: -1 });

    return res.json({ scenarios });
  } catch (err) {
    return res.status(500).json({ message: "List error", error: err.message });
  }
};

exports.getScenario = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);
    if (!scenario) return res.status(404).json({ message: "No script found." });

    
    const safeScenario = {
      _id: scenario._id,
      title: scenario.title,
      description: scenario.description,
      characters: scenario.characters.map((c) => ({
        charId: c.charId,
        name: c.name,
        avatarUrl: c.avatarUrl,
        statement: c.statement,
      })),
      createdAt: scenario.createdAt,
    };

    return res.json({ scenario: safeScenario });
  } catch (err) {
    return res.status(500).json({ message: "Get error", error: err.message });
  }
};


exports.createScenario = async (req, res) => {
  try {
    const { title, description, characters } = req.body || {};

    if (!title || !description || !Array.isArray(characters)) {
      return res.status(400).json({ message: "Title, description, and characters are mandatory." });
    }

  
    const createdBy = req.user.userId;

    const scenario = await Scenario.create({
      title,
      description,
      characters,
      createdBy,
    });

    return res.status(201).json({ message: "The script has been created", scenarioId: scenario._id });
  } catch (err) {
    return res.status(400).json({ message: "Create error", error: err.message });
  }
};
exports.listScenarios = async (req, res) => {
  try {
    const { type } = req.query; 
    const filter = type ? { type } : {};
    const scenarios = await Scenario.find(filter).sort({ createdAt: -1 });
    return res.json({ scenarios });
  } catch (err) {
    return res.status(500).json({ message: "List error", error: err.message });
  }
};

exports.guessLiar = async (req, res) => {
  try {
    const { id } = req.params;
    const { charId } = req.body || {};

    if (!charId) {
      return res.status(400).json({ message: "charId required." });
    }

    const scenario = await Scenario.findById(id);
    if (!scenario) return res.status(404).json({ message: "scenario not found." });

    const selected = (scenario.characters || []).find((c) => c.charId === charId);
    if (!selected) {
      return res.status(404).json({ message: "This charId is not in this scenario." });
    }

    const liar = (scenario.characters || []).find((c) => c.isLiar === true);

    const correct = selected.isLiar === true;

    return res.json({
      correct,
      picked: { charId: selected.charId, name: selected.name },
      liar: liar ? { charId: liar.charId, name: liar.name } : null,
      message: correct ? "You guessed right " : "Wrong ",
    });
  } catch (err) {
    return res.status(500).json({ message: "Guess error", error: err.message });
  }
};

