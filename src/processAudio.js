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

    // Identify the top 3 peaks (which could correspond to F1, F2, and F3)
    const peakIndices = getTopNIndices(data.magnitudes, 3);
    // get the frequencies of the magnitudes indexes
    const dominantFrequencies = peakIndices.map(
        (index) => data.frequencies[index]
    );

    console.log("Dominant Frequencies:", dominantFrequencies);

    // ===========================================================
    // now i have the 3 dominant frequencies, i need to compare them to the mouthCues objects ????
    // idk if thats accurate and right, but i think i need to compare them
    // ===========================================================

    // Check for vowels (which have specific formant frequencies F1 and F2)
    for (let key in mouthCues.vowels) {
        const cue = mouthCues.vowels[key];
        const formantMatch = dominantFrequencies
            .slice(0, 2)
            .every((freq, i) => {
                const formantRange = cue[`f${i + 1}`];
                if (formantRange) {
                    console.log(
                        `Checking formant f${i + 1} for ${key} in vowels:`,
                        formantRange,
                        "with frequency:",
                        freq
                    );
                    return freq >= formantRange.low && freq < formantRange.high;
                }
                return false;
            });

        if (formantMatch) {
            console.log(`Match found for ${key} in vowels`);
            return {
                start: data.startTime,
                end: data.endTime,
                value: key,
                category: "vowels",
                frequencies: dominantFrequencies,
            };
        }
    }

    // Check for nasals (which have specific formant frequencies F1, F2, and F3)
    for (let key in mouthCues.nasals) {
        const cue = mouthCues.nasals[key];
        const formantMatch = dominantFrequencies.every((freq, i) => {
            const formantRange = cue[`f${i + 1}`];
            if (formantRange) {
                console.log(
                    `Checking formant f${i + 1} for ${key} in nasals:`,
                    formantRange,
                    "with frequency:",
                    freq
                );
                return freq >= formantRange.low && freq < formantRange.high;
            }
            return false;
        });

        if (formantMatch) {
            console.log(`Match found for ${key} in nasals`);
            return {
                start: data.startTime,
                end: data.endTime,
                value: key,
                category: "nasals",
                frequencies: dominantFrequencies,
            };
        }
    }

    // Check for fricatives (which are characterized by their overall spectral energy distribution)
    for (let key in mouthCues.fricatives) {
        const cue = mouthCues.fricatives[key];
        const maxFreq = dominantFrequencies[0]; // Considering the most dominant frequency

        if (maxFreq >= cue.low && maxFreq < cue.high) {
            console.log(
                `Match found for ${key} in fricatives with frequency: ${maxFreq}`
            );
            return {
                start: data.startTime,
                end: data.endTime,
                value: key,
                category: "fricatives",
                frequencies: dominantFrequencies,
            };
        }
    }

    console.log("No match found, defaulting to idle position");

    // Default case if no matching mouth cue is found
    return {
        start: data.startTime,
        end: data.endTime,
        value: "idle position",
        frequencies: dominantFrequencies,
    };
}

// Helper function to get the indices of the top N values in an array
function getTopNIndices(arr, n) {
    // finds the 3 highest values in the magnitude array
    const indices = Array.from(arr.keys());
    indices.sort((a, b) => arr[b] - arr[a]);
    return indices.slice(0, n);
}

module.exports = { processAudio };
