const express = require("express");
const cors = require("cors"); // Import the cors package
const { processAudioFile } = require("./src/index.js");
const app = express();
const port = 3000;

app.use(cors()); // Use the cors middleware
app.use(express.static("public"));

app.get("/process-audio", (req, res) => {
    processAudioFile("secret.wav")
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
