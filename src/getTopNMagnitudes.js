// Helper function to get the indices of the top N values in an array
function getTopNMagnitudes(arr, n) {
    // finds the 3 highest values in the magnitude array
    const indices = Array.from(arr.keys());
    indices.sort((a, b) => arr[b] - arr[a]);
    return indices.slice(0, n);
}

export { getTopNMagnitudes };
