import express from "express";
import cors from "cors"; // Import the cors package
import processAudioFile from "./src/index.js";
import fs from "fs";

const app = express();
const port = 3000;
app.use(cors()); // Use the cors middleware
app.use(express.static("public"));

app.get("/process-audio", (req, res) => {
    console.log("Processing audio file...");
    // import the audio file
    const buffer = fs.readFileSync("secret.wav");
    processAudioFile(buffer)
        .then((mouthCues) => {
            res.json({ message: mouthCues });
        })
        .catch((err) => {
            console.error("Error processing audio file:", err);
            res.status(500).json({ error: "Error processing audio file." });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
