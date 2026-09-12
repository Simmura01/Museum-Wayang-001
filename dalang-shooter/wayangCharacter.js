/**
 * WayangCharacter — Manages the central wayang figure in Dalang Rhythm.
 *
 * Features:
 *  - Loads 6 pose images (PNG)
 *  - Neighboring-only pose transitions (pose N → N±1)
 *  - Idle animation: gentle sine-wave breathing scale + micro-rotation
 *  - onNoteHit(quality): burst scale, rotation twitch, pose advance
 *  - Particle system: batik-themed gold sparkles on hit
 *  - Glow burst on PERFECT
 */

// Adjacency table: which poses each pose can transition to
// pose indices are 0-based internally (maps to pose1.png – pose6.png)
const POSE_TRANSITIONS = [
  [1],       // pose 0 → can go to pose 1
  [0, 2],    // pose 1 → can go to 0 or 2
  [1, 3],    // pose 2 → can go to 1 or 3
  [2, 4],    // pose 3 → can go to 2 or 4
  [3, 5],    // pose 4 → can go to 3 or 5
  [4],       // pose 5 → can go to 4
];

// Hit quality visual configs
const HIT_CONFIG = {
  perfect: { color: '#ffd700', glowColor: 'rgba(255,215,0,0.8)', particleCount: 18, scaleBoost: 0.18 },
  great:   { color: '#00cfff', glowColor: 'rgba(0,207,255,0.6)', particleCount: 12, scaleBoost: 0.12 },
  good:    { color: '#39ff14', glowColor: 'rgba(57,255,20,0.5)', particleCount: 8,  scaleBoost: 0.07 },
  miss:    { color: '#ff4444', glowColor: 'rgba(255,68,68,0.4)', particleCount: 0,  scaleBoost: 0 },
};

export class WayangCharacter {
  /**
   * @param {string} posesBasePath  - Folder path ending with '/', e.g. './pose wayang/'
   * @param {number} poseCount      - Number of pose images (default 6)
   */
  constructor(posesBasePath = './pose wayang/', poseCount = 6) {
    this.basePath   = posesBasePath;
    this.poseCount  = poseCount;
    this.images     = [];       // HTMLImageElement[]
    this.loaded     = false;

    // Pose state
    this.currentPose = 0;       // 0-based index
    this.targetPose  = 0;

    // Idle animation
    this.idleTime    = 0;       // accumulates in seconds
    this.idleScale   = 1.0;
    this.idleRot     = 0;       // radians

    // Hit animation state
    this.hitScale    = 0;       // extra scale burst (decays)
    this.hitRot      = 0;       // rotation twitch (decays)
    this.glowOpacity = 0;       // glow burst (decays)
    this.glowColor   = 'rgba(255,215,0,0.8)';
    this.lastHitTime = -9999;   // seconds since game start

    // Particles
    this.particles   = [];
  }

  // ── Loading ─────────────────────────────────────────────────────────────────

  /**
   * Pre-load all pose images.
   * @param {Function} [onProgress]  - cb(loadedCount, total)
   * @returns {Promise<void>}
   */
  async load(onProgress) {
    this.images = [];
    this.loaded = false;

    const promises = [];
    for (let i = 1; i <= this.poseCount; i++) {
      const img = new Image();
      const url = `${this.basePath}pose${i}.png`;
      const p = new Promise((resolve) => {
        img.onload  = () => { onProgress?.(this.images.filter(Boolean).length, this.poseCount); resolve(); };
        img.onerror = () => {
          console.warn(`[WayangCharacter] Could not load ${url}`);
          resolve(); // don't fail — just leave slot empty
        };
        img.src = url;
      });
      this.images.push(img);
      promises.push(p);
    }

    await Promise.all(promises);
    this.loaded = true;
  }

  // ── Game Events ─────────────────────────────────────────────────────────────

  /**
   * Trigger hit animation and advance to neighboring pose.
   * @param {'perfect'|'great'|'good'|'miss'} quality
   */
  onNoteHit(quality) {
    const cfg = HIT_CONFIG[quality] ?? HIT_CONFIG.good;

    // Advance to a neighboring pose
    if (quality !== 'miss') {
      const neighbors = POSE_TRANSITIONS[this.currentPose];
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      this.currentPose = next;
    }

    // Hit animation burst
    this.hitScale    = cfg.scaleBoost;
    this.hitRot      = (Math.random() - 0.5) * 0.12;  // ±~7°
    this.glowOpacity = quality === 'miss' ? 0 : 0.9;
    this.glowColor   = cfg.glowColor;
    this.lastHitTime = this.idleTime; // use idleTime as elapsed tracker

    // Spawn particles
    if (cfg.particleCount > 0) {
      this._spawnParticles(cfg.particleCount, cfg.color);
    }
  }

  // ── Update ──────────────────────────────────────────────────────────────────

  /**
   * Update animations each frame.
   * @param {number} dt  - Delta time in seconds
   */
  update(dt) {
    this.idleTime += dt;

    // Idle breathing animation
    this.idleScale = 1.0 + Math.sin(this.idleTime * 1.2) * 0.018;
    this.idleRot   = Math.sin(this.idleTime * 0.7) * 0.012;

    // Decay hit animations
    const hitDecay   = 1 - dt * 8;   // fast decay
    const glowDecay  = 1 - dt * 3;
    this.hitScale    = Math.max(0, this.hitScale   * hitDecay);
    this.hitRot      = this.hitRot   * hitDecay;
    this.glowOpacity = Math.max(0, this.glowOpacity * glowDecay);

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x    += p.vx * dt;
      p.y    += p.vy * dt;
      p.vy   += 180 * dt;    // gravity
      p.life -= dt;
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  // ── Draw ────────────────────────────────────────────────────────────────────

  /**
   * Render wayang character and all effects.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} cx      - Center X on canvas
   * @param {number} cy      - Center Y on canvas
   * @param {number} height  - Desired render height in pixels
   */
  draw(ctx, cx, cy, height) {
    const img = this.images[this.currentPose];

    // Compute aspect-correct width
    let drawW = height;
    let drawH = height;
    if (img && img.naturalWidth > 0) {
      drawW = (img.naturalWidth / img.naturalHeight) * height;
    }

    const totalScale = this.idleScale + this.hitScale;
    const totalRot   = this.idleRot  + this.hitRot;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(totalRot);
    ctx.scale(totalScale, totalScale);

    // Glow burst behind character on hit
    if (this.glowOpacity > 0.01) {
      ctx.shadowColor = this.glowColor;
      ctx.shadowBlur  = 60 * this.glowOpacity;
    }

    // Draw pose image
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    } else {
      // Placeholder silhouette if image not loaded
      ctx.fillStyle = 'rgba(200,160,30,0.15)';
      ctx.beginPath();
      ctx.ellipse(0, 0, drawW * 0.35, drawH * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // Draw particles (in world space, not character-local)
    this._drawParticles(ctx);
  }

  // ── Particles ───────────────────────────────────────────────────────────────

  /**
   * Spawn particles radiating from origin.
   * @private
   */
  _spawnParticles(count, color) {
    // Store spawn origin — caller should set this before calling onNoteHit if needed
    // We use the last draw position via stored cx/cy
    const ox = this._lastCx ?? 400;
    const oy = this._lastCy ?? 225;

    for (let i = 0; i < count; i++) {
      const angle  = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed  = 80 + Math.random() * 120;
      const life   = 0.5 + Math.random() * 0.4;
      this.particles.push({
        x:       ox + (Math.random() - 0.5) * 20,
        y:       oy + (Math.random() - 0.5) * 20,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed - 60,
        color,
        radius:  2 + Math.random() * 3,
        life,
        maxLife: life,
        alpha:   1,
      });
    }
  }

  /** @private */
  _drawParticles(ctx) {
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * Store last draw center so particle spawning has a reference point.
   * Call this just before draw().
   */
  setDrawOrigin(cx, cy) {
    this._lastCx = cx;
    this._lastCy = cy;
  }

  /** Reset character state for a new game */
  reset() {
    this.currentPose = 0;
    this.idleTime    = 0;
    this.hitScale    = 0;
    this.hitRot      = 0;
    this.glowOpacity = 0;
    this.particles   = [];
  }
}
