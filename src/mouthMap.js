const mouthCues = {
    "closed mouth": { low: 0, high: 1000 }, // Ⓐ: "M", "N"
    "slightly open mouth with clenched teeth": { low: 1000, high: 3000 }, // Ⓑ: "I", "E", "T", "S", "L"
    "open mouth": { low: 3000, high: 5000 }, // Ⓒ: "AE", "EH"
    "wide open mouth": { low: 5000, high: 6000 }, // Ⓓ: "AA"
    "slightly rounded mouth": { low: 6000, high: 7000 }, // Ⓔ: "U", "O", "W"
    "puckered lips": { low: 7000, high: 8000 }, // Ⓕ: "OW", "UW"
    "upper teeth touching lower lip": { low: 8000, high: 9000 }, // Ⓖ: "F", "V"
    "tongue raised behind upper teeth": { low: 9000, high: 10000 }, // Ⓗ: "L", "SH"
    "idle position": { low: 10000, high: 11000 }, // Ⓧ: pauses
};

// const mouthCues = {
//     A: { low: 0, high: 1000 }, // Ⓐ: "M", "N"
//     G: { low: 1000, high: 3000 }, // Ⓑ: "I", "E", "T", "S", "L"
//     B: { low: 3000, high: 5000 }, // Ⓒ: "AE", "EH"
//     H: { low: 5000, high: 6000 }, // Ⓓ: "AA"
//     E: { low: 6000, high: 7000 }, // Ⓔ: "U", "O", "W"
//     F: { low: 7000, high: 8000 }, // Ⓕ: "OW", "UW"
//     C: { low: 8000, high: 9000 }, // Ⓖ: "F", "V"
//     G: { low: 9000, high: 10000 }, // Ⓗ: "L", "SH"
//     D: { low: 10000, high: 11000 }, // Ⓧ: pauses
// };

// export it
module.exports = { mouthCues };
