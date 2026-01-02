const express = require("express");
const router = express.Router();

const authRequired = require("../middleware/authMiddleware");
const {
  listScenarios,
  getScenario,
  createScenario,
  guessLiar,
} = require("../controllers/scenarioController");


router.get("/", listScenarios);
router.get("/:id", getScenario);
router.post("/", authRequired, createScenario);
router.post("/:id/guess", authRequired, guessLiar);


module.exports = router;
