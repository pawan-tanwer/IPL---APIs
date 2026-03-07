const Match = require("../models/ipl.model.js");
const iplFinal = require("../models/iplFinal.model.js");

// do teams ke beech ke matches ke stats nikalne ka fuction
const getMatchStats = async (req, res) => {
  try {

    const { team1, team2 } = req.params;

    const matches = await Match.find({
      $or: [
        { "Team 1 Name": team1, "Team 2 Name": team2 },
        { "Team 1 Name": team2, "Team 2 Name": team1 }
      ]
    });

    let team1Win = 0;
    let team2Win = 0;

    matches.forEach(match => {

      if (match["Winning Team"] === team1) {
        team1Win++;
      }

      if (match["Winning Team"] === team2) {
        team2Win++;
      }

    });

    res.json({
      team1,
      team2,
      totalMatches: matches.length,
      team1Win,
      team2Win,
      matches
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// final match ke details save karne ka function
const iplFinalDetails = async(req, res) =>{
  const { year, team1, team2, score, winner, result, venue } = req.body;

  const FinalMatch =  await iplFinal.create({
    year, team1, team2, score, winner, result, venue 
  })
  res.status(201).json( {success: true, FinalMatch});
}

// given year ke final match ke winner nikalne ka function
const getFinalWinner = async (req, res)=>{
  const { year } = req.params;
  const finalMatch = await iplFinal.findOne({year});
  if(!finalMatch){
    return res.status(404).json({message: "No final match found for the given year"});
  }
  res.json({year, winner:finalMatch.winner, team1: finalMatch.team1, team2: finalMatch.team2, score: finalMatch.score, venue: finalMatch.venue, result: finalMatch.result});
}

// saare final matches ke details nikalne ka function
const getAllFinals = async (req, res)=>{
  const finals = await iplFinal.find();
  res.json({finals});
}

//kis team ke pass kitne trophies hai.
const getTrophiesCount = async (req, res) => {
  const {teamName} = req.params;
  const trophies = await iplFinal.find({});
  let count = 0;
  trophies.filter((e) => {
    if(e.winner === teamName){
      count++;
    }
  })
  res.json({teamName, trophies: count});
}

module.exports = { getMatchStats, iplFinalDetails , getFinalWinner, getAllFinals, getTrophiesCount};