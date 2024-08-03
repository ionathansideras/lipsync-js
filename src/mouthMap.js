// const mouthCues = {
//     closed: { low: 200, high: 400 }, // Ⓐ: "M", "N" (closed mouth)
//     "slightly open": { low: 400, high: 600 }, // Ⓑ: "I", "E", "T", "S", "L" (slightly open mouth with clenched teeth)
//     open: { low: 600, high: 800 }, // Ⓒ: "AE", "EH" (open mouth)
//     "wide open": { low: 800, high: 1000 }, // Ⓓ: "AA" (wide open mouth)
//     "slightly rounded": { low: 1000, high: 1200 }, // Ⓔ: "U", "O", "W" (slightly rounded mouth)
//     "puckered lips": { low: 1200, high: 1400 }, // Ⓕ: "OW", "UW" (puckered lips)
//     "upper teeth touching lower lip": { low: 1400, high: 1600 }, // Ⓖ: "F", "V" (upper teeth touching lower lip)
//     "tongue raised behind upper teeth": { low: 1600, high: 1800 }, // Ⓗ: "L", "SH" (tongue raised behind upper teeth)
//     "idle position": { low: 1800, high: 2000 }, // Ⓧ: pauses (idle position)
//     "slightly open": { low: 2000, high: 6200 }, // Ⓨ: "TH" (slightly open mouth with clenched teeth)
// };
const mouthCues = {
    // Formants for vowels
    vowels: {
        a: { f1: { low: 600, high: 850 }, f2: { low: 800, high: 1200 } },
        i: { f1: { low: 240, high: 340 }, f2: { low: 2000, high: 3000 } },
        e: { f1: { low: 400, high: 800 }, f2: { low: 1700, high: 2700 } },
        o: { f1: { low: 360, high: 640 }, f2: { low: 640, high: 1000 } },
        u: { f1: { low: 250, high: 400 }, f2: { low: 230, high: 1200 } },
    },

    // Fricatives
    fricatives: {
        // If the peak frequency is above 4000 Hz (with a significant magnitude), it is more likely to be /s/.
        s: { low: 4000, high: 8000 },
        // If the peak frequency is below 4000 Hz (with a significant magnitude), it is more likely to be /f/.
        f: { low: 1000, high: 7000 },
        // If the frequency is around 500 Hz to 3000 Hz and has a lower magnitude, it is likely /v/.
        v: { low: 500, high: 7000 },
        // If the energy is spread out and less intense, it may be /θ/ (th).
        th: { low: 500, high: 8000 },
        z: { low: 3000, high: 8000 },
    },

    // Nasals
    nasals: {
        m: {
            f1: { low: 250, high: 300 },
            f2: { low: 800, high: 1200 },
            f3: { low: 2100, high: 2400 },
        },
        n: {
            f1: { low: 250, high: 300 },
            f2: { low: 1200, high: 1500 },
            f3: { low: 2100, high: 2400 },
        },
        ng: {
            f1: { low: 250, high: 300 },
            f2: { low: 1500, high: 2000 },
            f3: { low: 2200, high: 3000 },
        },
    },
};

module.exports = { mouthCues };
