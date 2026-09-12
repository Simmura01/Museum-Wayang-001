/**
 * AudioManager — Web Audio API wrapper for Dalang Rhythm.
 *
 * Responsibilities:
 *  - Load song audio via fetch + decodeAudioData
 *  - Play / pause / stop song with accurate timing
 *  - getSongTime() → precise current playback position in ms
 *  - Load and play short SFX buffers by name
 *  - Global mute toggle
 *  - Graceful degradation if files are missing
 */

export class AudioManager {
  constructor() {
    this.ctx            = null;   // AudioContext (created on first user gesture)
    this.masterGain     = null;   // Master volume node
    this.songBuffer     = null;   // Decoded AudioBuffer for current song
    this.songSource     = null;   // Current BufferSourceNode
    this.songStartTime  = 0;      // ctx.currentTime when song started
    this.songOffset     = 0;      // Offset into buffer (for resume)
    this.isPlaying      = false;
    this.isMuted        = false;
    this.sfxBuffers     = {};     // name → AudioBuffer cache
  }

  // ── Initialisation ─────────────────────────────────────────────────────────

  /**
   * Create / resume AudioContext. Must be called from a user gesture.
   */
  initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = this.isMuted ? 0 : 1;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // ── Song Loading ────────────────────────────────────────────────────────────

  /**
   * Load a song file into a decoded AudioBuffer.
   * @param {string} url  - Path to audio file (.mp3 / .ogg / .m4a)
   * @param {Function} [onProgress] - optional cb(0–1)
   * @returns {Promise<boolean>}
   */
  async loadSong(url, onProgress) {
    this.stopSong();
    this.songBuffer = null;

    if (!url) {
      console.warn('[AudioManager] No audio file specified for song.');
      return false;
    }

    this.initContext();

    try {
      onProgress?.(0.05);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      onProgress?.(0.3);
      const arrayBuffer = await response.arrayBuffer();
      onProgress?.(0.6);
      this.songBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      onProgress?.(1.0);
      console.log(`[AudioManager] Loaded song: ${url} (${this.songBuffer.duration.toFixed(1)}s)`);
      return true;
    } catch (err) {
      console.warn(`[AudioManager] Could not load song "${url}":`, err.message);
      this.songBuffer = null;
      return false;
    }
  }

  // ── Song Playback ───────────────────────────────────────────────────────────

  /**
   * Start song from the beginning (or from a given offset).
   * @param {number} [fromMs=0]  - Start position in milliseconds
   */
  playSong(fromMs = 0) {
    if (!this.ctx || !this.songBuffer) return;
    this.stopSong(false);

    this.songOffset = fromMs / 1000;
    this.songSource = this.ctx.createBufferSource();
    this.songSource.buffer = this.songBuffer;
    this.songSource.connect(this.masterGain);
    this.songSource.start(0, this.songOffset);
    this.songStartTime = this.ctx.currentTime - this.songOffset;
    this.isPlaying = true;

    this.songSource.onended = () => {
      if (this.isPlaying) {
        this.isPlaying = false;
      }
    };
  }

  /**
   * Pause song, recording current position for resume.
   */
  pauseSong() {
    if (!this.isPlaying || !this.songSource) return;
    this.songOffset = this.ctx.currentTime - this.songStartTime;
    try { this.songSource.stop(); } catch {}
    this.songSource = null;
    this.isPlaying = false;
  }

  /**
   * Resume from paused position.
   */
  resumeSong() {
    if (this.isPlaying) return;
    this.playSong(this.songOffset * 1000);
  }

  /**
   * Stop song and reset position.
   * @param {boolean} [resetOffset=true]
   */
  stopSong(resetOffset = true) {
    if (this.songSource) {
      try { this.songSource.stop(); } catch {}
      this.songSource = null;
    }
    this.isPlaying = false;
    if (resetOffset) this.songOffset = 0;
  }

  /**
   * Returns current playback position of the song in milliseconds.
   * Returns 0 if nothing is playing.
   * @returns {number}
   */
  getSongTime() {
    if (!this.ctx) return 0;
    if (this.isPlaying) {
      return (this.ctx.currentTime - this.songStartTime) * 1000;
    }
    return this.songOffset * 1000;
  }

  /**
   * Song duration in ms.
   * @returns {number}
   */
  getSongDuration() {
    return this.songBuffer ? this.songBuffer.duration * 1000 : 0;
  }

  // ── SFX ────────────────────────────────────────────────────────────────────

  /**
   * Pre-load a named SFX file.
   * @param {string} name  - Identifier (e.g. 'perfect', 'miss')
   * @param {string} url   - Path to audio file
   */
  async loadSFX(name, url) {
    if (!url) return;
    this.initContext();
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = await res.arrayBuffer();
      this.sfxBuffers[name] = await this.ctx.decodeAudioData(buf);
    } catch (err) {
      console.warn(`[AudioManager] SFX "${name}" not loaded (${url}):`, err.message);
    }
  }

  /**
   * Play a pre-loaded SFX by name.
   * Falls back to a synthesised tone if the buffer is unavailable.
   * @param {string} name
   */
  playSFX(name) {
    if (this.isMuted || !this.ctx) return;

    if (this.sfxBuffers[name]) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.sfxBuffers[name];
      src.connect(this.masterGain);
      src.start();
      return;
    }

    // Synthesised fallback tones
    this._synthFallback(name);
  }

  /**
   * Synthesised fallback tones mapped to game events.
   * @private
   */
  _synthFallback(name) {
    if (!this.ctx) return;
    try {
      const osc  = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.masterGain);
      const now = this.ctx.currentTime;

      switch (name) {
        case 'perfect':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.setValueAtTime(1046.5, now + 0.05);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now); osc.stop(now + 0.28);
          break;
        case 'great':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659, now);
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          osc.start(now); osc.stop(now + 0.2);
          break;
        case 'good':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523, now);
          gain.gain.setValueAtTime(0.10, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
          osc.start(now); osc.stop(now + 0.16);
          break;
        case 'miss':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.start(now); osc.stop(now + 0.25);
          break;
        case 'countdown':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now); osc.stop(now + 0.1);
          break;
        case 'countdownGo':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start(now); osc.stop(now + 0.35);
          break;
        default:
          osc.start(now); osc.stop(now + 0.001);
      }
    } catch (e) {
      console.warn('[AudioManager] Synth fallback failed:', e);
    }
  }

  // ── Mute ───────────────────────────────────────────────────────────────────

  /**
   * Toggle mute. Returns new mute state.
   * @returns {boolean}
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : 1;
    }
    return this.isMuted;
  }

  /**
   * Set mute state explicitly.
   * @param {boolean} muted
   */
  setMute(muted) {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : 1;
    }
  }
}
