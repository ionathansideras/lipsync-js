# lipsync-js (Development Branch)

![lipsync-js](image.png)

## Version

Development Branch

**Note**: This branch is under active development. Features and functionality may change frequently.

## Introduction

**lipsync-js** is a powerful library for processing WAV audio files and generating mouth shapes for lip-sync animations. It uses Fast Fourier Transform (FFT) and Short-Time Fourier Transform (STFT) to analyze the audio data and map it to predefined mouth shapes, enabling realistic lip-syncing for animated characters.

## Features

-   **Audio Processing**: Analyzes WAV audio files to extract frequency and magnitude data.
-   **Mouth Shape Mapping**: Maps audio data to mouth shapes based on frequency ranges.

## Getting Started

To get started with the development branch, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/ionathansideras/lipsync-js.git
    ```

2. Navigate to the project directory:

    ```bash
    cd lipsync-js
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

5. Open the `index.html` file. It is recommended to use the VS Code Live Server extension for this:

    - Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
    - Right-click on `index.html` and select "Open with Live Server".

## Code Structure

The main code is located in the `src` directory. If you need to change the `.wav` file, you will need to update the file path in both the `index.html` file and the `tts.js` file.

## Community and Contributions

lipsync-js is a community project open to the public. Contributions, feedback, and participation are welcome and encouraged. Together, we can improve and expand the capabilities of this library to benefit everyone.

## Copyright

© 2024 lipsync-js contributors. This project is licensed under the MIT License.

Feel free to let me know if you need any further changes!
