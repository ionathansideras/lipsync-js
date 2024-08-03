// Function to compute Short-Time Fourier Transform (STFT)
const fft = require("fft-js").fft;
const fftUtil = require("fft-js").util;
const { mouthCues } = require("./mouthMap");

// Function to compute Short-Time Fourier Transform (STFT)
function computeSTFT(audioData, sampleRate, windowSize, overlap) {
    const stepSize = windowSize - overlap;
    const numWindows = Math.floor((audioData.length - overlap) / stepSize);

    const stftResults = [];

    for (let i = 0; i < numWindows; i++) {
        const start = i * stepSize;
        const end = start + windowSize;

        if (end > audioData.length) {
            break;
        }

        // Extract windowed segment of the audio data
        const windowData = audioData.slice(start, end);

        // Apply FFT to the windowed segment
        const phasors = fft(windowData);
        const frequencies = fftUtil.fftFreq(phasors, sampleRate);
        const magnitudes = fftUtil.fftMag(phasors);

        stftResults.push({
            startTime: start / sampleRate,
            endTime: end / sampleRate,
            frequencies: frequencies,
            magnitudes: magnitudes,
        });
    }

    return stftResults;
}

// Function to process the audio data and map to mouth shapes
function processAudio(leftChannelData, sampleRate) {
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

// Function to map frequency to a mouth shape
function getMouthShape(data, mouthCues) {
    if (data.frequencies.length === 0) return null; // No frequencies to process

    // Find the index of the maximum magnitude
    const maxMagnitudeIndex = data.magnitudes.indexOf(
        Math.max(...data.magnitudes)
    );
    const dominantFrequency = data.frequencies[maxMagnitudeIndex];

    for (let key in mouthCues) {
        if (
            dominantFrequency >= mouthCues[key].low &&
            dominantFrequency < mouthCues[key].high
        ) {
            return {
                start: data.startTime,
                end: data.endTime,
                value: key,
                frequency: dominantFrequency,
            };
        }
    }

    // Default case if no matching mouth cue is found
    return {
        start: data.startTime,
        end: data.endTime,
        value: "idle position",
        frequency: dominantFrequency,
    };
}

module.exports = { processAudio };
