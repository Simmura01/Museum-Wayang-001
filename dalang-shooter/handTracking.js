// Import MediaPipe vision tasks bundle from jsDelivr CDN
import { FilesetResolver, HandLandmarker } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/vision_bundle.mjs";

export class HandTracker {
  constructor(videoElement, overlayCanvas) {
    this.video = videoElement;
    this.overlayCanvas = overlayCanvas;
    this.overlayCtx = overlayCanvas.getContext("2d");
    
    this.handLandmarker = null;
    this.stream = null;
    this.isInitialized = false;
    this.lastVideoTime = -1;
    this.isTracking = false;
    
    // Landmark index definitions
    this.INDEX_FINGER_TIP = 8;
    this.WRIST = 0;
    
    // MediaPipe Hand Connection lines map for drawing hand skeleton
    this.HAND_CONNECTIONS = [
      [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // Index finger
      [9, 10], [10, 11], [11, 12],     // Middle finger (connected via MCP below)
      [13, 14], [14, 15], [15, 16],    // Ring finger
      [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
      [5, 9], [9, 13], [13, 17]        // Knuckle connections (MCP joints)
    ];
  }

  /**
   * Initializes the MediaPipe fileset resolver and loads the Hand Landmarker model
   * @param {Function} statusCallback - Callback to report initialization progress
   */
  async initialize(statusCallback = () => {}) {
    try {
      statusCallback("Loading WebAssembly dependencies...");
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
      );

      statusCallback("Downloading hand landmarker model (approx. 5.6MB)...");
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU" // Request GPU delegation for 60fps performance
        },
        runningMode: "VIDEO",
        numHands: 1, // Only track one hand for performance
        minHandDetectionConfidence: 0.45,
        minHandPresenceConfidence: 0.45,
        minTrackingConfidence: 0.45
      });

      this.isInitialized = true;
      statusCallback("Model loaded successfully!");
      return true;
    } catch (error) {
      console.error("Failed to initialize HandLandmarker:", error);
      statusCallback(`Initialization Error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Requests webcam permissions and starts video stream
   */
  async startCamera() {
    if (this.stream) return this.stream;

    const constraints = {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        frameRate: { ideal: 30 }
      },
      audio: false
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.video.srcObject = this.stream;
      
      // Wait for video metadata to load before playing
      return new Promise((resolve) => {
        this.video.onloadedmetadata = () => {
          this.video.play()
            .then(() => resolve(this.stream))
            .catch((err) => {
              console.error("Error playing video:", err);
              resolve(this.stream);
            });
        };
      });
    } catch (error) {
      console.error("Error accessing webcam:", error);
      throw error;
    }
  }

  /**
   * Stops camera stream and releases webcam tracks
   */
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.video) {
      this.video.srcObject = null;
    }
    this.isTracking = false;
    this.clearOverlay();
  }

  /**
   * Clears the overlay canvas
   */
  clearOverlay() {
    this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
  }

  /**
   * Runs model detection on the current video frame and draws vector landmarks
   * @returns {Object|null} - The tracked index finger coordinates normalized (x, y) or null if not detected
   */
  detectFrame() {
    if (!this.isInitialized || !this.video.srcObject || this.video.paused) {
      this.isTracking = false;
      this.clearOverlay();
      return null;
    }

    // Check if video has fresh data based on timestamp
    const videoTime = this.video.currentTime;
    if (videoTime === this.lastVideoTime) {
      // Frame has not updated, return current state or previous tracking coordinate
      return null;
    }
    this.lastVideoTime = videoTime;

    // Detect landmarks for the video frame at the current timestamp
    const timestampMs = performance.now();
    const result = this.handLandmarker.detectForVideo(this.video, timestampMs);

    this.clearOverlay();

    if (result && result.landmarks && result.landmarks.length > 0) {
      this.isTracking = true;
      const landmarks = result.landmarks[0];
      
      // Draw hand skeleton overlay
      this.drawHandOverlay(landmarks);
      
      // Extract the index finger tip (landmark index 8)
      const indexTip = landmarks[this.INDEX_FINGER_TIP];
      
      // Mirror the X coordinate horizontally so moving right moves the cursor right
      // Note: we return values in range [0, 1] relative to the video aspect box
      return {
        x: 1 - indexTip.x,
        y: indexTip.y,
        score: indexTip.score || 1.0
      };
    } else {
      this.isTracking = false;
      return null;
    }
  }

  /**
   * Renders the hand joints and connections on the corner webcam preview overlay
   * @param {Array} landmarks - Hand landmark list from MediaPipe
   */
  drawHandOverlay(landmarks) {
    const width = this.overlayCanvas.width;
    const height = this.overlayCanvas.height;

    // Draw connection lines (skeletal structures)
    this.overlayCtx.strokeStyle = "rgba(0, 240, 255, 0.4)"; // Translucent cyan
    this.overlayCtx.lineWidth = 2.5;
    
    for (const connection of this.HAND_CONNECTIONS) {
      const p1 = landmarks[connection[0]];
      const p2 = landmarks[connection[1]];
      
      this.overlayCtx.beginPath();
      this.overlayCtx.moveTo(p1.x * width, p1.y * height);
      this.overlayCtx.lineTo(p2.x * width, p2.y * height);
      this.overlayCtx.stroke();
    }

    // Draw joints
    for (let i = 0; i < landmarks.length; i++) {
      const lm = landmarks[i];
      const cx = lm.x * width;
      const cy = lm.y * height;
      
      this.overlayCtx.beginPath();
      if (i === this.INDEX_FINGER_TIP) {
        // Highlight index finger tip with a glowing green dot
        this.overlayCtx.arc(cx, cy, 7, 0, 2 * Math.PI);
        this.overlayCtx.fillStyle = "#39ff14"; // Neon green
        this.overlayCtx.shadowColor = "#39ff14";
        this.overlayCtx.shadowBlur = 10;
      } else {
        // Other landmarks get smaller blue dots
        this.overlayCtx.arc(cx, cy, 4, 0, 2 * Math.PI);
        this.overlayCtx.fillStyle = "#00f0ff"; // Neon blue
        this.overlayCtx.shadowColor = "transparent";
        this.overlayCtx.shadowBlur = 0;
      }
      this.overlayCtx.fill();
    }
    
    // Reset shadow properties
    this.overlayCtx.shadowBlur = 0;
  }
}
