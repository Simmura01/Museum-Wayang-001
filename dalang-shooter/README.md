# Finger Dodge

A polished, browser-based hand-tracking arcade game built with **Vanilla HTML, CSS, JavaScript**, and **MediaPipe Tasks Vision**. 

Control a glowing neon cursor using your webcam and the tip of your index finger. Collect gold coins to level up, and dodge moving obstacles to survive!

## Features

- **Real-Time Hand Tracking**: Uses MediaPipe Tasks Vision / Hand Landmarker with GPU acceleration for 60 FPS performance on standard laptop webcams.
- **Sleek Retro-Arcade Aesthetics**: A dark sci-fi design with vibrant neon glow filters, customized fonts, animated menus, and motion blur trails on canvas.
- **Responsive Controls**:
  - Horizontal mirroring so moving your hand right moves the cursor right.
  - Exponential moving average (lerp) smoothing to reduce webcam coordinate jitter.
  - Stability dead-zone threshold to keep the cursor completely still when your finger is held steady.
- **Robust State Machine**: Automatic pausing with a 1-second grace period if hand tracking is lost, and seamless auto-resuming when your finger is visible again.
- **Synthesized Sound Effects**: Audio cues (coin collect, countdown tick, start chime, game over sweep) are synthesized in real-time using the **Web Audio API**—no audio file assets or network fetching required.
- **Zero Local Backend Dependencies**: Runs entirely in the client browser.

---

## File Structure

The project is structured modularly:
- [index.html](file:///C:/Users/Ashok/.gemini/antigravity/scratch/finger-dodge/index.html) - Game layout, overlays, HUD, canvas, and webcam preview tags.
- [style.css](file:///C:/Users/Ashok/.gemini/antigravity/scratch/finger-dodge/style.css) - Responsive styling, neon theme, glassmorphism overlays, animations.
- [handTracking.js](file:///C:/Users/Ashok/.gemini/antigravity/scratch/finger-dodge/handTracking.js) - MediaPipe resolver wrapper, camera initialization, and drawing joint overlays.
- [game.js](file:///C:/Users/Ashok/.gemini/antigravity/scratch/finger-dodge/game.js) - Audio synth, physics engine, collision math, entity updates, and neon drawing.
- [app.js](file:///C:/Users/Ashok/.gemini/antigravity/scratch/finger-dodge/app.js) - Orchestrator connecting tracking and rendering loops, binding UI events, managing timer states, and local storage scores.

---

## Quick Start (How to Run)

To run the game, you need to host the files on a local HTTP web server. Due to browser security restrictions, **webcam access is blocked if you try to open the `index.html` file directly using `file://`**.

Follow one of these methods to start a local server:

### Method A: Using Python (Recommended if Python is installed)
1. Open terminal/PowerShell in this directory:
   ```bash
   cd C:\Users\Ashok\.gemini\antigravity\scratch\finger-dodge
   ```
2. Start Python's built-in HTTP server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to: **[http://localhost:8000](http://localhost:8000)**

### Method B: Using Node.js / npm (Recommended for JS developers)
1. In your terminal/PowerShell inside the project directory, run:
   ```bash
   npx http-server -p 8000
   ```
2. Open your browser and go to: **[http://localhost:8000](http://localhost:8000)**

### Method C: VS Code "Live Server" Extension
1. Open this directory as a folder in VS Code.
2. Click the **"Go Live"** button in the bottom status bar, or right-click `index.html` and select **"Open with Live Server"**.
3. It will open automatically in your default browser (usually `http://127.0.0.1:5500`).

---

## Public Domain Deployment (Free Hosting)

Since this is a fully static client-side application, you can easily host and share the game on public domains using any of these free services:

### Option A: Netlify Drop (Easiest - Drag & Drop)
1. Open your browser and go to: **[Netlify Drop](https://app.netlify.com/drop)**
2. Drag and drop the root `finger-dodge` folder into the upload box on the Netlify web page.
3. Your site will instantly go live with a secure public HTTPS link!

### Option B: Netlify CLI (Deploy from Terminal)
You can deploy your project to Netlify directly using the command line:
1. In your terminal, run:
   ```bash
   npx netlify-cli deploy --dir=. --prod
   ```
2. Follow the login prompt to link or create a new site. Once done, it will compile and provide your live production URL.

### Option C: GitHub Pages
GitHub allows you to host static pages directly from your code repository:
1. Create a repository on GitHub.
2. Initialize Git, commit, and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. On GitHub, navigate to your repository **Settings** -> **Pages**.
4. Set the **Source** to `Deploy from a branch`, select `main` and the `/ (root)` folder, then click **Save**.
5. The game will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

### Option D: Temporary Tunneling (localtunnel)
If you want to quickly share your local running server with friends without uploading the files:
1. Run the local python server (defaults to port 8000).
2. Start the tunnel in another terminal:
   ```bash
   npx localtunnel --port 8000
   ```
3. Share the printed URL (e.g., `https://xxxx.loca.lt`). Visitors will need to input your public IP address (found via `icanhazip.com`) on the landing page to bypass the warning.

---

## Troubleshooting Guide

### 1. Camera Permission Denied
*   **Symptom**: Clicking "START GAME" displays an alert warning: `"Camera access is required..."`.
*   **Resolution**: 
    1. Look at your browser address bar. Click the **lock icon** (🔒) or **camera icon** next to `localhost:8000`.
    2. Toggle the **Camera** permission switch to **Allow**.
    3. Reload the page and click "START GAME" again.
    4. Ensure no other applications (like Zoom, Teams, or Discord) are currently locking the webcam.

### 2. Hand Not Detected
*   **Symptom**: Webcam indicator is green, but status says `LOST` or `STABILIZING...` and player cursor doesn't move.
*   **Resolution**:
    1. Hold your hand approximately 1.5 to 3 feet (45cm - 90cm) away from the camera lens.
    2. Show your hand facing the camera with your **index finger clearly pointed upwards** (like a "Number 1" sign).
    3. Ensure your hand is in a well-lit room. Dim environments prevent the MediaPipe model from identifying landmarks.
    4. Keep your hand inside the camera frame. Look at the **WEBCAM MONITOR** in the bottom right corner to verify your hand is fully in view.

### 3. Black Webcam Preview
*   **Symptom**: The corner monitor shows a black box, and no tracking lines appear.
*   **Resolution**:
    1. Make sure your laptop webcam privacy shutter is physical open/uncovered.
    2. Check device manager to verify camera drivers are installed and functioning.
    3. Try opening the default Windows Camera app to see if your system recognizes the camera. If it doesn't, restart your computer.

### 4. Running from `file://` instead of `localhost`
*   **Symptom**: Opening `index.html` directly from files fails with browser errors, and MediaPipe CDN or webcam access is blocked.
*   **Resolution**: Browsers enforce Strict-Origin/CORS and secure context policies. Webcams and ESM network scripts are only allowed in secure contexts (like `https://` or `http://localhost` / `http://127.0.0.1`). You **must** run a local web server (refer to the Quick Start instructions above).

### 5. Performance Lag / Low Framerate
*   **Symptom**: Game lag, coordinates jumping, framerate below 30 FPS.
*   **Resolution**:
    1. Open Chrome DevTools (`F12`), go to the **Console** and ensure there are no error loops.
    2. In Chrome, ensure **Hardware Acceleration** is enabled. Go to *Settings -> System -> Use graphics acceleration when available* and restart Chrome.
    3. Click the **DEBUG** button in the game's footer. Verify the FPS counter.
    4. Keep your browser tab focused. Inactive background tabs will intentionally throttle frames.
    5. Close processor-heavy background apps or tabs to free up GPU resources.
