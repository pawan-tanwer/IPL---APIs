const express = require("express");
const router = express.Router();
const { getMatchStats,iplFinalDetails, getFinalWinner ,getAllFinals,getTrophiesCount} = require("../controllers/ipl.controller");


router.get("/stats/:team1/:team2", getMatchStats);
router.post("/final", iplFinalDetails);
router.get("/final/winner/:year", getFinalWinner);
router.get("/finals", getAllFinals);
router.get("/trophies/team/:teamName", getTrophiesCount);
module.exports = router;