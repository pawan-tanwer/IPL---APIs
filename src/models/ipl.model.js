const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Flexible schema (because JSON fields already defined)
const matchSchema = new mongoose.Schema({}, { strict: false });
const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);



// folder path
const folderPath = __dirname;

// read all files
const files = fs.readdirSync(folderPath).filter(file =>
  file.startsWith("ipl_matches_season_") && file.endsWith(".json")
);

async function importData() {
  try {

    for (const file of files) {

      const filePath = path.join(folderPath, file);

      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      await Match.insertMany(jsonData);

      console.log(`${file} imported successfully`);
    }

    console.log("All files imported");
    mongoose.connection.close();

  } catch (error) {
    console.log(error);
  }
}


module.exports = Match;