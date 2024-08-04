import { mouthCues } from "./mouthMap.js";
import { computeSTFT } from "./computeSTFT.js";
import { getMouthShape } from "./getMouthShape.js";

// Function to process the audio data and map to mouth shapes
function processAudio(leftChannelData, sampleRate) {
    // convert the left channel data to an array so we can have access
    // to the array methods
    let leftChannelArray = Array.from(leftChannelData);

    // Define parameters for STFT
    const windowSize = 1024; // Size of each window in samples
    const overlap = 512; // Number of overlapping samples

    // Compute STFT
    const stftResults = computeSTFT(
        leftChannelArray,
        sampleRate,
        windowSize,
        overlap
    );

    // Map frequencies to mouth shapes
    const mappedShapes = stftResults.map((data) => {
        return getMouthShape(data, mouthCues);
    });

    // Generate mouth cues with start and end times
    return mappedShapes;
}

export { processAudio };
