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

export { mouthCues };
