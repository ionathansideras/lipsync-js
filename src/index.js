import wav from "wav-decoder";
import { processAudio } from "./processAudio.js";

// Main function to process the audio file
async function processAudioFile(buffer) {
    try {
        const audioData = await wav.decode(buffer);
        console.log("Audio Data:", audioData);
        const leftChannelData = audioData.channelData[0]; // Get the left channel data
        const sampleRate = audioData.sampleRate; // Get the sample rate of the audio
        return processAudio(leftChannelData, sampleRate); // Process the left channel data
    } catch (err) {
        console.error("Error decoding WAV file:", err);
        throw err;
    }
}

export default processAudioFile;
