/**
 * Dalang Shooter — AppController v3
 *
 * ALUR STATE:
 *   LOADING → NAME_INPUT → MODE_SELECT → COUNTDOWN → PLAYING
 *                                                         ↓
 *                                                      PAUSED → RESUME → PLAYING
 *                                                             → MENU   → MODE_SELECT
 *                                                         ↓
 *                                                      GAME_OVER → ULANGI / MENU / LEADERBOARD
 *
 * PERUBAHAN dari v2:
 *   - Pause overlay: tombol MENU → kembali ke MODE_SELECT
 *   - HUD: nyawa memakai SVG heart icon (bukan emoji ♥)
 *   - Tap listener: langsung hit-test musuh (bukan not)
 *   - Hapus referensi WayangCharacter (sudah tidak dipakai di game.js baru)
 *
 * DIPERTAHANKAN:
 *   - HandTracker integration (mode kamera)
 *   - Tracking-lost detection + overlay
 *   - Countdown 3-2-1-MULAI!
 *   - Mute / Camera toggle / Debug mode
 *   - Leaderboard LocalStorage
 *   - AudioManager
 */

import { HandTracker }       from './handTracking.js';
import { Game, MAX_LIVES }   from './game.js';
import { AudioManager }      from './audioManager.js';
import { Leaderboard, computeRank } from './leaderboard.js';

// ─── DOM ────────────────────────────────────────────────────────────────────

const videoEl      = document.getElementById('webcamVideo');
const overlayEl    = document.getElementById('webcamOverlay');
const gameCanvas   = document.getElementById('gameCanvas');

// Overlays
const loadingOverlay      = document.getElementById('loadingOverlay');
const nameInputOverlay    = document.getElementById('nameInputOverlay');
const modeSelectOverlay   = document.getElementById('modeSelectOverlay');
const tutorialOverlay     = document.getElementById('tutorialOverlay');
const countdownOverlay    = document.getElementById('countdownOverlay');
const pauseOverlay        = document.getElementById('pauseOverlay');
const trackingLostOverlay = document.getElementById('trackingLostOverlay');
const gameOverOverlay     = document.getElementById('gameOverOverlay');
const leaderboardOverlay  = document.getElementById('leaderboardOverlay');

// Tutorial
const tutorialDesc     = document.getElementById('tutorialDesc');
const tutorialIcon     = document.getElementById('tutorialIcon');
const tutorialStartBtn = document.getElementById('tutorialStartBtn');

// Loading
const loadingStatusText = document.getElementById('loadingStatus');

// Name input
const playerNameInput = document.getElementById('playerNameInput');
const confirmNameBtn  = document.getElementById('confirmNameBtn');

// Mode select
const modeCameraBtn = document.getElementById('modeCameraBtn');
const modeTapBtn    = document.getElementById('modeTapBtn');

// Countdown
const countdownText = document.getElementById('countdownText');

// HUD
const scoreValText        = document.getElementById('scoreVal');
const comboValText        = document.getElementById('comboVal');
const livesContainer      = document.getElementById('livesContainer');
const fpsValText          = document.getElementById('fpsVal');
const fpsCounterContainer = document.getElementById('fpsCounter');

// Tracking indicator
const trackingStatusDot  = document.getElementById('trackingStatusDot');
const trackingStatusText = document.getElementById('trackingStatusText');
const camIndicator       = document.getElementById('camIndicator');

// Game Over
const goScoreEl       = document.getElementById('goScore');
const goComboEl       = document.getElementById('goCombo');
const goHitsEl        = document.getElementById('goHits');
const goMissesEl      = document.getElementById('goMisses');
const goPlayAgainBtn  = document.getElementById('goPlayAgainBtn');
const goMenuBtn       = document.getElementById('goMenuBtn');
const goLeaderboardBtn= document.getElementById('goLeaderboardBtn');

// Leaderboard
const lbTableEl = document.getElementById('leaderboardTable');
const lbBackBtn = document.getElementById('lbBackBtn');

// Footer controls
const backToMuseumBtn = document.getElementById('backToMuseumBtn');
const pauseToggleBtn  = document.getElementById('pauseToggleBtn');
const muteToggleBtn   = document.getElementById('muteToggleBtn');
const cameraToggleBtn = document.getElementById('cameraToggleBtn');
const debugToggleBtn  = document.getElementById('debugToggleBtn');
const webcamPanel     = document.getElementById('webcamPanel');

// Pause overlay buttons
const resumeGameBtn = document.getElementById('resumeGameBtn');
const pauseMenuBtn  = document.getElementById('pauseMenuBtn');

// ─── State ──────────────────────────────────────────────────────────────────

const STATES = {
  LOADING:     'LOADING',
  NAME_INPUT:  'NAME_INPUT',
  MODE_SELECT: 'MODE_SELECT',
  TUTORIAL:    'TUTORIAL',
  COUNTDOWN:   'COUNTDOWN',
  PLAYING:     'PLAYING',
  PAUSED:      'PAUSED',
  GAME_OVER:   'GAME_OVER',
  LEADERBOARD: 'LEADERBOARD',
};

const ALL_OVERLAYS = [
  loadingOverlay, nameInputOverlay, modeSelectOverlay, tutorialOverlay,
  countdownOverlay, pauseOverlay, trackingLostOverlay, gameOverOverlay, leaderboardOverlay,
];

// ─── Lagu Pengiring (auto-play, tanpa pemilihan) ──────────────────────────────
const SONGS = [
  { id: 'gamelan', title: 'Gamelan', artist: 'Tradisi Gamelan Jawa', file: 'audio/gamelan-arjuna.mp3' },
];

// ─── SVG Heart ───────────────────────────────────────────────────────────────
// Digunakan untuk render nyawa di HUD
const SVG_HEART_FULL  = `<svg class="life-icon full"  viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
const SVG_HEART_EMPTY = `<svg class="life-icon empty" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>`;

// ─── AppController ────────────────────────────────────────────────────────────

class AppController {
  constructor() {
    this.currentState = STATES.LOADING;

    this.tracker     = new HandTracker(videoEl, overlayEl);
    this.game        = new Game(gameCanvas);
    this.audio       = new AudioManager();
    this.leaderboard = new Leaderboard();

    this.game.setAudioManager(this.audio);

    this.playerName   = '';
    this.selectedMode = 'camera';
    this.selectedSong = null;

    // Countdown
    this.countdownValue = 3;
    this.countdownTimer = 0;

    // Tracking-lost
    this.handLostTime               = null;
    this.isTrackingLostOverlayActive = false;
    this.lastTrackingStatus         = 'red';

    // Tap listeners
    this._tapClickHandler = null;
    this._tapTouchHandler = null;

    this._setupEventListeners();
    this._updateLivesDisplay(); // inisialisasi HUD nyawa
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Inisialisasi
  // ────────────────────────────────────────────────────────────────────────────

  async init() {
    try {
      this._setStatus('Memuat MediaPipe Hand Landmarker...');
      await this.tracker.initialize(msg => this._setStatus(msg));

      this._setStatus('Memuat aset game...');
      await this.game.loadAssets((loaded, total) =>
        this._setStatus(`Memuat aset ${loaded}/${total}...`)
      );

      await Promise.all([
        this.audio.loadSFX('perfect',     'audio/sfx-perfect.mp3'),
        this.audio.loadSFX('miss',        'audio/sfx-miss.mp3'),
        this.audio.loadSFX('countdown',   'audio/sfx-countdown.mp3'),
        this.audio.loadSFX('countdownGo', 'audio/sfx-countdown-go.mp3'),
      ]);

      this.transitionToState(STATES.NAME_INPUT);
    } catch (err) {
      if (loadingStatusText) {
        loadingStatusText.innerHTML = `<span style="color:#ff4444">Inisialisasi gagal</span><br>${err.message}<br><br>Periksa koneksi internet.`;
      }
      console.error('Init failed:', err);
    }
  }

  _setStatus(msg) {
    if (loadingStatusText) loadingStatusText.textContent = msg;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Event Listeners
  // ────────────────────────────────────────────────────────────────────────────

  _setupEventListeners() {
    const backToMuseumBtn = document.getElementById('backToMuseumBtn');
    backToMuseumBtn?.addEventListener('click', () => {
      window.location.href = '../wahana.html';
    });

    // Name input
    confirmNameBtn?.addEventListener('click', () => this._confirmName());
    playerNameInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this._confirmName();
    });

    // Mode select
    modeCameraBtn?.addEventListener('click', () => this._selectMode('camera'));
    modeTapBtn?.addEventListener('click',    () => this._selectMode('tap'));

    // Tutorial
    tutorialStartBtn?.addEventListener('click', () => this._beginCountdown());

    // Pause / Resume
    pauseToggleBtn?.addEventListener('click', () => this.togglePause());
    resumeGameBtn?.addEventListener('click',  () => this.resumeGame());

    // Pause → Menu
    pauseMenuBtn?.addEventListener('click', () => {
      this.audio.stopSong();
      this.transitionToState(STATES.MODE_SELECT);
    });

    // Game Over buttons
    goPlayAgainBtn?.addEventListener('click', () => this._restartSameSong());
    goMenuBtn?.addEventListener('click',      () => this.transitionToState(STATES.MODE_SELECT));
    goLeaderboardBtn?.addEventListener('click', () => this.transitionToState(STATES.LEADERBOARD));

    // Leaderboard back
    lbBackBtn?.addEventListener('click', () => this.transitionToState(STATES.MODE_SELECT));

    // Footer
    const bottomLeaderboardBtn = document.getElementById('bottomLeaderboardBtn');
    bottomLeaderboardBtn?.addEventListener('click', () => this.transitionToState(STATES.LEADERBOARD));

    muteToggleBtn?.addEventListener('click', () => {
      const muted = this.audio.toggleMute();
      this._updateMuteUI(muted);
    });
    cameraToggleBtn?.addEventListener('click', () => this._toggleWebcamPanel());
    debugToggleBtn?.addEventListener('click',  () => this._toggleDebugMode());

    window.addEventListener('beforeunload', () => this.tracker.stopCamera());
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Name Input
  // ────────────────────────────────────────────────────────────────────────────

  _confirmName() {
    const val = (playerNameInput?.value ?? '').trim();
    if (!val) { playerNameInput?.focus(); return; }
    this.playerName = val.slice(0, 24);
    this.transitionToState(STATES.MODE_SELECT);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Mode Select
  // ────────────────────────────────────────────────────────────────────────────

  async _selectMode(mode) {
    this.selectedMode = mode;
    this.game.setMode(mode);

    if (mode === 'camera' && !this.tracker.stream) {
      try {
        await this.tracker.startCamera();
        camIndicator?.classList.replace('offline', 'online');
      } catch {
        alert('Akses kamera diperlukan untuk Mode Kamera. Pilih Mode Sentuh jika tidak ada kamera.');
        return;
      }
    }

    this.audio.initContext();

    // Auto-load lagu pengiring tanpa layar pemilihan
    this.selectedSong = SONGS[0];
    this.transitionToState(STATES.LOADING);
    this._setStatus('Menyiapkan permainan...');
    try {
      await this.audio.loadSong(this.selectedSong.file, p =>
        this._setStatus(`Memuat audio... ${Math.round(p * 100)}%`)
      );
    } catch {
      // Tidak ada file audio — tetap lanjut tanpa musik
      this.selectedSong = null;
    }
    this._showTutorial();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Tutorial
  // ────────────────────────────────────────────────────────────────────────────

  _showTutorial() {
    if (this.selectedMode === 'camera') {
      tutorialIcon.innerHTML = `<svg viewBox="0 0 24 24" style="width:64px;height:64px;fill:#ffd700;"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>`;
      tutorialDesc.innerHTML = `
        <strong>Arahkan jari telunjukmu</strong> ke kamera untuk menggerakkan kursor.<br><br>
        Tahan kursor di atas musuh <strong>Prajurit (Merah)</strong>, <strong>Ksatria (Oranye)</strong>, atau <strong>Mahardika (Ungu)</strong> untuk menembak mereka.<br><br>
        Awas! Jangan tembak <strong>Kawan (Hijau)</strong> atau nyawamu akan berkurang.
      `;
    } else {
      tutorialIcon.innerHTML = `<svg viewBox="0 0 24 24" style="width:64px;height:64px;fill:#ffd700;"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.42z"/></svg>`;
      tutorialDesc.innerHTML = `
        <strong>Ketuk atau klik</strong> langsung pada layar untuk menembak musuh.<br><br>
        Musuh <strong>Ksatria (Oranye)</strong> dan <strong>Mahardika (Ungu)</strong> butuh <strong>2 kali tembakan</strong> untuk mati.<br><br>
        Awas! Jangan tembak <strong>Kawan (Hijau)</strong> atau nyawamu akan berkurang.
      `;
    }
    this.transitionToState(STATES.TUTORIAL);
  }


  // ────────────────────────────────────────────────────────────────────────────
  // Countdown → Playing
  // ────────────────────────────────────────────────────────────────────────────

  _beginCountdown() {
    this.game.reset();
    this.updateHUD();
    this.handLostTime = null;
    this.isTrackingLostOverlayActive = false;
    trackingLostOverlay?.classList.add('hidden');

    this.transitionToState(STATES.COUNTDOWN);
    this.audio.playSFX('countdown');
  }

  _restartSameSong() {
    this._beginCountdown();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Pause / Resume
  // ────────────────────────────────────────────────────────────────────────────

  togglePause() {
    if (this.currentState === STATES.PLAYING) {
      this.audio.pauseSong();
      this.transitionToState(STATES.PAUSED);
      this._updatePauseButtonUI(true);
    } else if (this.currentState === STATES.PAUSED) {
      this.resumeGame();
    }
  }

  resumeGame() {
    this.audio.initContext();
    if (this.currentState === STATES.PAUSED) {
      this.audio.resumeSong();
      this.transitionToState(STATES.PLAYING);
      this.game.lastTime = performance.now();
      this._updatePauseButtonUI(false);
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Game Over
  // ────────────────────────────────────────────────────────────────────────────

  _showGameOver() {
    this.audio.stopSong();

    if(typeof window.gtag === 'function') {
        window.gtag('event', 'game_played', { 
            'mode': this.currentMode, 
            'score': this.game.score,
            'max_combo': this.game.maxCombo
        });
    }

    const accuracy = this.game.totalHits / Math.max(1, this.game.totalHits + this.game.totalMisses) * 100;

    this.leaderboard.saveEntry({
      name:     this.playerName,
      score:    this.game.score,
      accuracy,
      maxCombo: this.game.maxCombo,
      rank:     computeRank(accuracy),
      songId:   this.selectedSong?.id   ?? 'free',
      songName: this.selectedSong?.title ?? 'Tanpa Musik',
    });

    if (goScoreEl)  goScoreEl.textContent  = this.game.score.toLocaleString();
    if (goComboEl)  goComboEl.textContent  = `×${this.game.maxCombo}`;
    if (goHitsEl)   goHitsEl.textContent   = this.game.totalHits;
    if (goMissesEl) goMissesEl.textContent = this.game.totalMisses;

    this.transitionToState(STATES.GAME_OVER);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Leaderboard
  // ────────────────────────────────────────────────────────────────────────────

  _buildLeaderboard() {
    if (!lbTableEl) return;
    const entries = this.leaderboard.getTop(15);

    if (!entries.length) {
      lbTableEl.innerHTML = '<tr><td colspan="5" style="text-align:center;opacity:.5">Belum ada skor tersimpan</td></tr>';
      return;
    }

    lbTableEl.innerHTML = entries.map((e, i) => `
      <tr class="${i === 0 ? 'lb-top' : ''}">
        <td class="lb-rank">${i + 1}</td>
        <td class="lb-name">${_esc(e.name)}</td>
        <td class="lb-score">${e.score.toLocaleString()}</td>
        <td class="lb-combo">×${e.maxCombo}</td>
        <td class="lb-grade" data-rank="${e.rank}">${e.rank}</td>
      </tr>`).join('');
  }

  // ────────────────────────────────────────────────────────────────────────────
  // State Machine
  // ────────────────────────────────────────────────────────────────────────────

  transitionToState(newState) {
    this.currentState = newState;

    ALL_OVERLAYS.forEach(o => {
      o?.classList.add('hidden');
      o?.classList.remove('active');
    });
    if (pauseToggleBtn) pauseToggleBtn.disabled = true;

    this._removeTapListeners();

    // Kursor canvas
    gameCanvas.style.cursor = (newState === STATES.PLAYING && this.selectedMode === 'tap')
      ? 'crosshair' : 'none';

    switch (newState) {
      case STATES.LOADING:
        this._show(loadingOverlay);
        break;

      case STATES.NAME_INPUT:
        this._show(nameInputOverlay);
        playerNameInput?.focus();
        break;

      case STATES.MODE_SELECT:
        this._show(modeSelectOverlay);
        break;

      case STATES.TUTORIAL:
        this._show(tutorialOverlay);
        break;

      case STATES.COUNTDOWN:
        this._show(countdownOverlay);
        this.countdownValue = 3;
        if (countdownText) countdownText.textContent = '3';
        this.countdownTimer = 0;
        break;

      case STATES.PLAYING:
        if (pauseToggleBtn) pauseToggleBtn.disabled = false;
        if (this.selectedMode === 'tap') this._addTapListeners();
        break;

      case STATES.PAUSED:
        if (pauseToggleBtn) pauseToggleBtn.disabled = false;
        this._show(pauseOverlay);
        break;

      case STATES.GAME_OVER:
        this._show(gameOverOverlay);
        break;

      case STATES.LEADERBOARD:
        this._buildLeaderboard();
        this._show(leaderboardOverlay);
        break;
    }
  }

  _show(el) {
    el?.classList.remove('hidden');
    el?.classList.add('active');
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Tap Listeners
  // ────────────────────────────────────────────────────────────────────────────

  _addTapListeners() {
    this._tapClickHandler = (e) => {
      if (this.currentState !== STATES.PLAYING) return;
      const coords = this.game.getCanvasCoords(e);
      this.game.handleTap(coords.x, coords.y);
    };
    this._tapTouchHandler = (e) => {
      e.preventDefault();
      if (this.currentState !== STATES.PLAYING) return;
      // Multi-touch: proses setiap sentuhan
      for (const touch of e.changedTouches) {
        const coords = this.game.getCanvasCoords({ touches: [touch] });
        this.game.handleTap(coords.x, coords.y);
      }
    };
    gameCanvas.addEventListener('click',      this._tapClickHandler);
    gameCanvas.addEventListener('touchstart', this._tapTouchHandler, { passive: false });
  }

  _removeTapListeners() {
    if (this._tapClickHandler) {
      gameCanvas.removeEventListener('click',      this._tapClickHandler);
      gameCanvas.removeEventListener('touchstart', this._tapTouchHandler);
      this._tapClickHandler = null;
      this._tapTouchHandler = null;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // HUD Update
  // ────────────────────────────────────────────────────────────────────────────

  updateHUD() {
    if (scoreValText) scoreValText.textContent = this.game.score.toLocaleString();
    if (comboValText) comboValText.textContent = `×${this.game.combo}`;
    this._updateLivesDisplay();

    if (this.game.debugMode && fpsValText) {
      fpsValText.textContent = this.game.fps.toString();
    }
  }

  _updateLivesDisplay() {
    if (!livesContainer) return;
    const lives = this.game.lives;
    let html = '';
    for (let i = 0; i < MAX_LIVES; i++) {
      html += i < lives ? SVG_HEART_FULL : SVG_HEART_EMPTY;
    }
    livesContainer.innerHTML = html;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Tracking Status
  // ────────────────────────────────────────────────────────────────────────────

  updateTrackingStatusIndicator(status) {
    if (status === this.lastTrackingStatus) return;
    this.lastTrackingStatus = status;

    if (trackingStatusDot) trackingStatusDot.className = `status-dot ${status}`;
    const map = {
      green:  ['AKTIF',    'var(--neon-green)'],
      yellow: ['STABIL...','var(--neon-yellow)'],
      red:    ['HILANG',   'var(--neon-red)'],
    };
    const [txt, col] = map[status] ?? ['?', ''];
    if (trackingStatusText) {
      trackingStatusText.textContent = txt;
      trackingStatusText.style.color = col;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // UI Helpers
  // ────────────────────────────────────────────────────────────────────────────

  _updatePauseButtonUI(isPaused) {
    const pi = pauseToggleBtn?.querySelector('.pause-icon');
    const pl = pauseToggleBtn?.querySelector('.play-icon');
    const lb = document.getElementById('pauseBtnText');
    if (isPaused) {
      pi?.classList.add('hidden');
      pl?.classList.remove('hidden');
      if (lb) lb.textContent = 'LANJUT';
    } else {
      pi?.classList.remove('hidden');
      pl?.classList.add('hidden');
      if (lb) lb.textContent = 'JEDA';
    }
  }

  _updateMuteUI(isMuted) {
    const vu = muteToggleBtn?.querySelector('.volume-up-icon');
    const vo = muteToggleBtn?.querySelector('.volume-off-icon');
    const lb = document.getElementById('muteBtnText');
    if (isMuted) {
      vu?.classList.add('hidden'); vo?.classList.remove('hidden');
      if (lb) lb.textContent = 'SUARA ON';
    } else {
      vu?.classList.remove('hidden'); vo?.classList.add('hidden');
      if (lb) lb.textContent = 'MUTE';
    }
  }

  _toggleWebcamPanel() {
    const hidden = webcamPanel?.classList.toggle('hidden');
    const lb = document.getElementById('cameraBtnText');
    if (lb) lb.textContent = hidden ? 'KAMERA' : 'KAMERA';
  }

  _toggleDebugMode() {
    this.game.debugMode = !this.game.debugMode;
    if (this.game.debugMode) {
      fpsCounterContainer?.classList.remove('hidden');
      debugToggleBtn?.classList.add('neon-btn');
      if (debugToggleBtn) debugToggleBtn.style.color = 'var(--neon-blue)';
    } else {
      fpsCounterContainer?.classList.add('hidden');
      debugToggleBtn?.classList.remove('neon-btn');
      if (debugToggleBtn) debugToggleBtn.style.color = '';
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Main Game Loop
  // ────────────────────────────────────────────────────────────────────────────

  tick(timestamp) {
    // 1. Hand tracking (hanya mode kamera)
    if (this.selectedMode === 'camera') {
      const coords = this.tracker.detectFrame();
      const now    = performance.now();

      if (coords) {
        this.game.setTargetPosition(coords);
        this.updateTrackingStatusIndicator('green');
        this.handLostTime = null;

        if (this.isTrackingLostOverlayActive) {
          this.isTrackingLostOverlayActive = false;
          trackingLostOverlay?.classList.add('hidden');
          this.audio.playSFX('countdownGo');
          if (this.currentState === STATES.PLAYING) {
            this.game.lastTime = now;
            this.audio.resumeSong();
          }
        }
      } else {
        this.updateTrackingStatusIndicator(this.tracker.isTracking ? 'yellow' : 'red');

        if (this.currentState === STATES.PLAYING && !this.isTrackingLostOverlayActive) {
          if (!this.handLostTime) this.handLostTime = now;
          else if (now - this.handLostTime > 1000) {
            this.isTrackingLostOverlayActive = true;
            this.audio.pauseSong();
            trackingLostOverlay?.classList.remove('hidden');
          }
        }
      }
    }

    // 2. Update berdasarkan state
    switch (this.currentState) {
      case STATES.COUNTDOWN: {
        if (!this.countdownTimer) this.countdownTimer = timestamp;
        const elapsed = timestamp - this.countdownTimer;

        if (elapsed >= 1000) {
          this.countdownValue--;
          this.countdownTimer = timestamp;

          if (this.countdownValue > 0) {
            if (countdownText) countdownText.textContent = this.countdownValue;
            this.audio.playSFX('countdown');
          } else if (this.countdownValue === 0) {
            if (countdownText) countdownText.textContent = 'MULAI!';
            this.audio.playSFX('countdownGo');
          } else {
            this.transitionToState(STATES.PLAYING);
            this.audio.playSong(0);
            this.game.lastTime = timestamp;
          }
        }
        this.game.draw();
        break;
      }

      case STATES.PLAYING: {
        if (this.selectedMode === 'camera' && this.isTrackingLostOverlayActive) {
          this.game.draw();
          break;
        }

        const result = this.game.update(timestamp);
        if (result === 'gameover') {
          this._showGameOver();
        }

        this.game.draw();
        this.updateHUD();
        break;
      }

      default:
        this.game.draw();
        if (this.game.debugMode) this.updateHUD();
    }

    requestAnimationFrame(t => this.tick(t));
  }
}

// ─── Util ────────────────────────────────────────────────────────────────────

function _esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
  requestAnimationFrame(t => app.tick(t));
});
