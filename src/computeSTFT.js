import fftJs from "fft-js";
const { util: fftUtil } = fftJs;
const fft = fftJs.fft;

// Function to compute Short-Time Fourier Transform (STFT)
function computeSTFT(audioData, sampleRate, windowSize, overlap) {
    const stepSize = windowSize - overlap;
    const numWindows = Math.floor((audioData.length - overlap) / stepSize);

    const stftResults = [];

    // Iterate over the audio data in windows of size windowSize
    // that means that the audio data is split into windows of 1024 samples
    for (let i = 0; i < numWindows; i++) {
        // Calculate the start and end indices of the window
        // that will represent the time domain of the audio data
        const start = i * stepSize;
        const end = start + windowSize;

        // Break if the end index exceeds the audio data lengths
        if (end > audioData.length) {
            break;
        }

        // Extract windowed segment of the audio data
        const windowData = audioData.slice(start, end);

        // Apply FFT to the windowed segment
        const phasors = fft(windowData);
        const frequencies = fftUtil.fftFreq(phasors, sampleRate);
        const magnitudes = fftUtil.fftMag(phasors);

        // form an object with the start and end time of the window, the frequencies and magnitudes
        stftResults.push({
            startTime: start / sampleRate,
            endTime: end / sampleRate,
            frequencies: frequencies,
            magnitudes: magnitudes,
        });
    }

    return stftResults;
}

export { computeSTFT };
