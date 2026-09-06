/**
 * Dalang Shooter — Game Engine v3
 *
 * MEKANIK BARU (Shooter):
 * - Musuh bergerak horizontal dari kiri/kanan layar
 * - 3 tipe musuh: Prajurit (1 hit), Ksatria (3 detik), Mahardika (4 detik)
 * - Kawan (Sekutu): jangan ditembak — nyawa berkurang
 * - Mode Tap: tap langsung pada musuh untuk menembak
 * - Mode Kamera: tahan cursor di atas musuh untuk membakar
 * - Kemunculan bertahap sesuai waktu
 * - Health bar di atas setiap musuh
 * - 5 Nyawa: musuh lolos = -1, kawan kena = -1
 *
 * DIPERTAHANKAN:
 * - Lerp smoothing kursor kamera
 * - Partikel & feedback text
 * - Sistem skor / combo
 * - updateFPS / debugMode
 * - AudioManager
 */

// ─── Konstanta ───────────────────────────────────────────────────────────────

export const MAX_LIVES = 5;
const HIT_SCORE_BASE   = 100;
const COMBO_BONUS_PER_5 = 50;

// Tipe Musuh
const ENEMY_TYPES = {
  PRAJURIT:  { name: 'PRAJURIT',  hitDuration: 0,    hp: 1,   maxHp: 1,   baseSpeed: 90,  color: '#e05030', glowColor: 'rgba(224,80,48,0.85)',   score: 100, width: 48, height: 64 },
  KSATRIA:   { name: 'KSATRIA',   hitDuration: 1.0,  hp: 2,   maxHp: 2,   baseSpeed: 70,  color: '#e08820', glowColor: 'rgba(224,136,32,0.85)',  score: 250, width: 54, height: 70 },
  MAHARDIKA: { name: 'MAHARDIKA', hitDuration: 1.5,  hp: 2,   maxHp: 2,   baseSpeed: 55,  color: '#9040e0', glowColor: 'rgba(144,64,224,0.85)',  score: 400, width: 60, height: 76 },
  KAWAN:     { name: 'KAWAN',     hitDuration: 0,    hp: 1,   maxHp: 1,   baseSpeed: 80,  color: '#30b870', glowColor: 'rgba(48,184,112,0.85)',  score: 0,   width: 48, height: 64, friendly: true },
};

// Kurva kesulitan
const DIFF = {
  spawnInterval: { start: 3.2, end: 0.8 },   // detik antar spawn
  speedMulti:    { start: 1.0, end: 2.2 },    // pengali kecepatan
  maxEnemies:    { start: 1,   end: 5   },    // max musuh serentak
  rampDuration:  240,
};

// ─── Kelas Utama Game ─────────────────────────────────────────────────────────

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx    = canvasElement.getContext('2d');

    this.config = {
      width:              800,
      height:             450,
      playerRadius:       16,
      smoothingFactor:    0.25,
      stabilityThreshold: 1.8,
      // Lane Y positions untuk musuh (3 jalur horizontal)
      lanes: [110, 225, 340],
    };

    this.canvas.width  = this.config.width;
    this.canvas.height = this.config.height;

    // ─ Mode input ──────────────────────────────────────────────
    this.mode = 'camera';

    // ─ Kursor (mode kamera) ────────────────────────────────────
    this.player = {
      x: this.config.width  / 2,
      y: this.config.height / 2,
      targetX: this.config.width  / 2,
      targetY: this.config.height / 2,
      color:     '#39ff14',
      glowColor: 'rgba(57,255,20,0.7)',
      shooting:  false,  // apakah sedang mengenai musuh
    };

    // ─ Status game ─────────────────────────────────────────────
    this.lives        = MAX_LIVES;
    this.score        = 0;
    this.combo        = 0;
    this.maxCombo     = 0;
    this.totalHits    = 0;
    this.totalMisses  = 0;
    this.gameTime     = 0;
    this.diffProgress = 0;
    this.spawnTimer   = 99;

    // ─ Entitas ─────────────────────────────────────────────────
    this.enemies       = [];
    this.bullets       = [];
    this.enemyBullets  = [];  // proyektil yang ditembak musuh ke player
    this.particles     = [];
    this.feedbackTexts = [];

    // ─ Invincibility frame setelah player kena tembak ──────────
    this.invincibleTimer = 0; // detik tersisa tidak bisa kena

    // ─ Referensi eksternal ─────────────────────────────────────
    this.audioManager = null;

    // ─ Timing ──────────────────────────────────────────────────
    this.lastTime       = 0;
    this.bgTime         = 0;
    this.debugMode      = false;
    this.fps            = 0;
    this.fpsUpdateTimer = 0;
    this.fpsFrameCount  = 0;

    // ─ Image assets ────────────────────────────────────────────
    this._images = {}; // { key: HTMLImageElement } — diisi nanti
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Inisialisasi & Setup
  // ────────────────────────────────────────────────────────────────────────────

  async loadAssets(onProgress) {
    // Coba muat gambar placeholder/user — tidak wajib ada
    const assets = [
      { key: 'bg',        src: 'asset/background.jpg' },
      { key: 'enemy1',    src: 'asset/musuh1.png'     },
      { key: 'enemy2',    src: 'asset/musuh2.png'     },
      { key: 'enemy3',    src: 'asset/musuh3.png'     },
      { key: 'friendly',  src: 'asset/kawan.png'      },
    ];

    let loaded = 0;
    await Promise.all(assets.map(a => new Promise(resolve => {
      const img = new Image();
      img.onload  = () => { this._images[a.key] = img; loaded++; onProgress?.(loaded, assets.length); resolve(); };
      img.onerror = () => { loaded++; onProgress?.(loaded, assets.length); resolve(); }; // graceful fallback
      img.src = a.src;
    })));
  }

  setAudioManager(am) { this.audioManager = am; }
  setMode(mode)       { this.mode = mode; }

  // ────────────────────────────────────────────────────────────────────────────
  // Reset
  // ────────────────────────────────────────────────────────────────────────────

  reset() {
    this.lives        = MAX_LIVES;
    this.score        = 0;
    this.combo        = 0;
    this.maxCombo     = 0;
    this.totalHits    = 0;
    this.totalMisses  = 0;
    this.gameTime     = 0;
    this.diffProgress = 0;
    this.spawnTimer   = 99;

    this.enemies       = [];
    this.bullets       = [];
    this.enemyBullets  = [];
    this.particles     = [];
    this.feedbackTexts = [];
    this.lastTime      = 0;
    this.fpsUpdateTimer = 0;
    this.fpsFrameCount  = 0;
    this.invincibleTimer = 0;

    this.player.x       = this.config.width  / 2;
    this.player.y       = this.config.height / 2;
    this.player.targetX = this.config.width  / 2;
    this.player.targetY = this.config.height / 2;
    this.player.shooting = false;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Nilai Kesulitan
  // ────────────────────────────────────────────────────────────────────────────

  _diffVal(key) {
    const d = DIFF[key];
    return d.start - (d.start - d.end) * this.diffProgress;
  }

  _maxEnemies() {
    const d = DIFF.maxEnemies;
    return Math.round(d.start + (d.end - d.start) * this.diffProgress);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Input
  // ────────────────────────────────────────────────────────────────────────────

  /** Dipanggil oleh HandTracker — update posisi target cursor */
  setTargetPosition(coords) {
    if (!coords) return;
    this.player.targetX = coords.x * this.config.width;
    this.player.targetY = coords.y * this.config.height;
  }

  /**
   * Dipanggil saat tap/klik (mode tap).
   * Hit-test langsung pada musuh di posisi tap.
   */
  handleTap(canvasX, canvasY) {
    let hit = false;
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (e.dead || e.escaped) continue;

      const hw = e.w / 2;
      const hh = e.h / 2;
      if (canvasX >= e.x - hw && canvasX <= e.x + hw &&
          canvasY >= e.y - hh && canvasY <= e.y + hh) {

        if (e.friendly) {
          this._hitFriendly(e);
        } else {
          this._applyDamage(e, canvasX, canvasY);
        }
        hit = true;
        break; // 1 tap = 1 hit
      }
    }
    // Buat bullet visual walau miss (opsional visual feedback)
    if (!hit) this._spawnBulletMiss(canvasX, canvasY);
    return hit;
  }

  /** Konversi koordinat mouse/touch → koordinat canvas */
  getCanvasCoords(event) {
    const rect   = this.canvas.getBoundingClientRect();
    const scaleX = this.config.width  / rect.width;
    const scaleY = this.config.height / rect.height;
    const src    = event.touches ? event.touches[0] : event;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Update — Frame Loop
  // ────────────────────────────────────────────────────────────────────────────

  update(timestamp) {
    if (!this.lastTime) { this.lastTime = timestamp; return null; }

    let dt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;
    if (dt > 0.15) dt = 0.15;

    this.updateFPS(dt);
    this.bgTime   += dt;
    this.gameTime += dt;

    this.diffProgress = Math.min(1, this.gameTime / DIFF.rampDuration);

    // ── Update kursor (mode kamera) ──────────────────────────────
    this.player.shooting = false;
    if (this.mode === 'camera') {
      const dx   = this.player.targetX - this.player.x;
      const dy   = this.player.targetY - this.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist > this.config.stabilityThreshold) {
        this.player.x += dx * this.config.smoothingFactor;
        this.player.y += dy * this.config.smoothingFactor;
      }
      const pr = this.config.playerRadius;
      this.player.x = Math.max(pr, Math.min(this.config.width  - pr, this.player.x));
      this.player.y = Math.max(pr, Math.min(this.config.height - pr, this.player.y));

      // Mode kamera: cursor di atas musuh = burn damage
      this._applyCameraBurn(dt);
    }

    // ── Spawn musuh ─────────────────────────────────────────────
    const activeCount = this.enemies.filter(e => !e.dead && !e.escaped).length;
    const interval    = this._diffVal('spawnInterval');

    this.spawnTimer += dt;
    if (this.spawnTimer >= interval && activeCount < this._maxEnemies()) {
      this.spawnTimer = 0;
      this._spawnEnemy();
    }

    // ── Update musuh ────────────────────────────────────────────
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];

      // Animasi kematian
      if (e.dead) {
        e.deathAge += dt;
        if (e.deathAge >= 0.5) this.enemies.splice(i, 1);
        continue;
      }

      // Lolos (keluar layar)
      if (e.escaped) {
        e.deathAge += dt;
        if (e.deathAge >= 0.3) this.enemies.splice(i, 1);
        continue;
      }

      // Gerak horizontal
      e.x += e.vx * dt;
      e.age += dt;

      // Shoot-back cooldown (hanya musuh yang belum lolos/mati)
      if (e.canShoot && !e.dead && !e.escaped) {
        e.shootCooldown -= dt;
        if (e.shootCooldown <= 0) {
          e.shootCooldown = e.shootInterval;
          this._spawnEnemyBullet(e);
        }
      }

      // Cek keluar layar
      if ((e.vx > 0 && e.x > this.config.width + e.w) ||
          (e.vx < 0 && e.x < -e.w)) {
        e.escaped = true;
        e.deathAge = 0;
        if (!e.friendly) {
          this._registerEscape(e);
        }
      }
    }

    // ── Update bullets ──────────────────────────────────────────
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      if (b.life <= 0 || b.x < 0 || b.x > this.config.width ||
          b.y < 0 || b.y > this.config.height) {
        this.bullets.splice(i, 1);
      }
    }

    // ── Update enemy bullets + hit player ──────────────────────
    if (this.invincibleTimer > 0) this.invincibleTimer -= dt;

    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const b = this.enemyBullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;

      // Hapus jika keluar layar atau habis umur
      if (b.life <= 0 || b.x < -20 || b.x > this.config.width + 20 ||
          b.y < -20 || b.y > this.config.height + 20) {
        this.enemyBullets.splice(i, 1);
        continue;
      }

      // Cek hit player
      if (this.invincibleTimer <= 0) {
        let hitPlayer = false;

        if (this.mode === 'camera') {
          // Mode kamera: deteksi ke posisi cursor
          const d = Math.hypot(b.x - this.player.x, b.y - this.player.y);
          if (d <= this.config.playerRadius + 7) hitPlayer = true;
        } else {
          // Mode tap: area bawah tengah layar (zona "player")
          const px = this.config.width  / 2;
          const py = this.config.height - 40;
          if (Math.hypot(b.x - px, b.y - py) <= 55) hitPlayer = true;
        }

        if (hitPlayer) {
          this.enemyBullets.splice(i, 1);
          this._playerHitByBullet(b.x, b.y);
        }
      }
    }

    // ── Update partikel ─────────────────────────────────────────
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x   += p.vx * dt;
      p.y   += p.vy * dt;
      p.vy  += 120 * dt;
      p.life -= dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    // ── Update feedback texts ───────────────────────────────────
    for (let i = this.feedbackTexts.length - 1; i >= 0; i--) {
      const ft = this.feedbackTexts[i];
      ft.y    -= dt * 48;
      ft.life -= dt;
      ft.alpha = Math.max(0, ft.life / ft.maxLife);
      if (ft.life <= 0) this.feedbackTexts.splice(i, 1);
    }

    // ── Cek game over ────────────────────────────────────────────
    if (this.lives <= 0) return 'gameover';

    return null;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Kamera Burn (mode kamera: cursor di atas musuh)
  // ────────────────────────────────────────────────────────────────────────────

  _applyCameraBurn(dt) {
    const px = this.player.x;
    const py = this.player.y;
    const pr = this.config.playerRadius;

    for (const e of this.enemies) {
      if (e.dead || e.escaped) continue;

      const hw = e.w / 2 + pr;
      const hh = e.h / 2 + pr;

      if (px >= e.x - hw && px <= e.x + hw &&
          py >= e.y - hh && py <= e.y + hh) {

        this.player.shooting = true;

        if (e.friendly) {
          // Tahan selama 0.3 detik baru trigger penalti
          e.burnTimer = (e.burnTimer || 0) + dt;
          if (e.burnTimer >= 0.3) {
            e.burnTimer = 0;
            this._hitFriendly(e);
          }
        } else {
          // Damage per detik tergantung tipe
          const dps = e.hitDuration > 0 ? (1 / e.hitDuration) : 99;
          e.hp -= dps * dt;
          e.burnTimer = (e.burnTimer || 0) + dt;

          if (e.hp <= 0) {
            this._killEnemy(e);
          } else {
            // Visual feedback hit saat mulai burn
            if (e.burnTimer <= dt * 2) {
              this._spawnParticles(e.x, e.y, e.color, 3);
            }
          }
        }
      } else {
        e.burnTimer = 0;
      }
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Spawn Musuh
  // ────────────────────────────────────────────────────────────────────────────

  _spawnEnemy() {
    const t  = this.gameTime;
    const W  = this.config.width;

    // Kemunculan bertahap
    let typePool = ['PRAJURIT'];
    if (t >= 15) typePool.push('PRAJURIT', 'KSATRIA'); // Prajurit lebih dominan, Ksatria mulai muncul
    if (t >= 35) typePool.push('KSATRIA', 'MAHARDIKA');

    let typeName = typePool[Math.floor(Math.random() * typePool.length)];

    // 25% peluang memunculkan KAWAN (sekutu) setelah 15 detik permainan berjalan
    if (t >= 15 && Math.random() < 0.25) {
      typeName = 'KAWAN';
    }
    const def      = ENEMY_TYPES[typeName];
    const speedMul = this._diffVal('speedMulti');

    // Pilih lane acak
    const laneY = this.config.lanes[Math.floor(Math.random() * this.config.lanes.length)];

    // Arah masuk
    const fromLeft = Math.random() < 0.5;
    const startX   = fromLeft ? -def.width / 2 - 10 : W + def.width / 2 + 10;
    const vx       = (fromLeft ? 1 : -1) * def.baseSpeed * speedMul;

    // Properti tembak balik (hanya KSATRIA dan MAHARDIKA)
    const canShoot     = typeName === 'KSATRIA' || typeName === 'MAHARDIKA';
    const shootInt     = typeName === 'MAHARDIKA' ? 1.8 : 2.5;

    const enemy = {
      type:       typeName,
      friendly:   def.friendly || false,
      x:          startX,
      y:          laneY,
      w:          def.width,
      h:          def.height,
      vx,
      color:      def.color,
      glowColor:  def.glowColor,
      hp:         def.hp,
      maxHp:      def.maxHp,
      hitDuration: def.hitDuration,
      score:      def.score,
      age:        0,
      dead:       false,
      escaped:    false,
      deathAge:   0,
      burnTimer:  0,
      fromLeft,
      // Shoot-back
      canShoot,
      shootInterval: shootInt,
      shootCooldown: 1.0 + Math.random() * 1.2, // delay sebelum tembakan pertama
    };

    this.enemies.push(enemy);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Damage & Kill
  // ────────────────────────────────────────────────────────────────────────────

  _applyDamage(enemy, hitX, hitY) {
    if (enemy.dead || enemy.escaped) return;

    if (enemy.hitDuration === 0) {
      // Instant kill (Prajurit)
      this._killEnemy(enemy);
    } else {
      // Reduce HP by 1 step per tap
      enemy.hp -= 1;
      this._spawnParticles(hitX, hitY, enemy.color, 5);
      this._spawnFeedback(hitX, hitY - enemy.h / 2 - 8, 'HIT', '#ffd700');
      if (this.audioManager) this.audioManager.playSFX('perfect');

      if (enemy.hp <= 0) {
        this._killEnemy(enemy);
      }
    }
  }

  _killEnemy(enemy) {
    if (enemy.dead) return;
    enemy.dead = true;
    enemy.deathAge = 0;

    const comboBonus = Math.floor(this.combo / 5) * COMBO_BONUS_PER_5;
    this.score += enemy.score + comboBonus;
    this.combo++;
    this.maxCombo = Math.max(this.maxCombo, this.combo);
    this.totalHits++;

    this._spawnParticles(enemy.x, enemy.y, enemy.color, 16);

    const label = this.combo >= 10 ? `×${this.combo} COMBO!` : `+${enemy.score}`;
    this._spawnFeedback(enemy.x, enemy.y - enemy.h / 2 - 14, label, '#ffd700');

    if (this.audioManager) this.audioManager.playSFX('perfect');
  }

  _hitFriendly(enemy) {
    if (enemy.dead || enemy.escaped) return;
    enemy.dead = true;
    enemy.deathAge = 0;

    this.combo = 0;
    this.totalMisses++;
    this.lives = Math.max(0, this.lives - 1);

    this._spawnParticles(enemy.x, enemy.y, '#ff4444', 10);
    this._spawnFeedback(enemy.x, enemy.y - enemy.h / 2 - 14, 'KAWAN!', '#ff4466');

    if (this.audioManager) this.audioManager.playSFX('miss');
  }

  _registerEscape(enemy) {
    this.combo = 0;
    this.totalMisses++;
    this.lives = Math.max(0, this.lives - 1);

    this._spawnFeedback(
      enemy.x < 0 ? 30 : this.config.width - 30,
      enemy.y,
      'LOLOS!',
      'rgba(255,80,80,0.9)'
    );

    if (this.audioManager) this.audioManager.playSFX('miss');
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Enemy Bullet — Musuh Menembak Player
  // ────────────────────────────────────────────────────────────────────────────

  _spawnEnemyBullet(enemy) {
    // Jangan tembak jika musuh sudah hampir keluar layar
    if (enemy.x < 0 || enemy.x > this.config.width) return;

    const speed = 200;
    let tx, ty;

    if (this.mode === 'camera') {
      // Tembak ke arah cursor player saat ini
      tx = this.player.x;
      ty = this.player.y;
    } else {
      // Mode tap: tembak ke arah bawah-tengah layar (zona player tap)
      tx = this.config.width  / 2 + (Math.random() - 0.5) * 120;
      ty = this.config.height - 30;
    }

    const dx    = tx - enemy.x;
    const dy    = ty - enemy.y;
    const dist  = Math.hypot(dx, dy) || 1;
    const normX = dx / dist;
    const normY = dy / dist;

    this.enemyBullets.push({
      x:    enemy.x,
      y:    enemy.y,
      vx:   normX * speed,
      vy:   normY * speed,
      life: 3.5,
      color: enemy.type === 'MAHARDIKA' ? '#c060ff' : '#ff6020',
    });
  }

  _playerHitByBullet(bx, by) {
    this.combo = 0;
    this.lives = Math.max(0, this.lives - 1);

    this.invincibleTimer = 1.2; // 1.2 detik tidak bisa kena lagi

    this._spawnParticles(bx, by, '#ff3344', 10);
    this._spawnFeedback(bx, by, 'TERKENA!', '#ff2244');

    if (this.audioManager) this.audioManager.playSFX('miss');
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Bullet Visual (mode tap — miss)
  // ────────────────────────────────────────────────────────────────────────────

  _spawnBulletMiss(tx, ty) {
    this.bullets.push({
      x: tx, y: ty,
      vx: 0, vy: 0,
      life: 0.12,
      miss: true,
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Partikel & Feedback
  // ────────────────────────────────────────────────────────────────────────────

  _spawnParticles(ox, oy, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.8;
      const speed = 60 + Math.random() * 120;
      const life  = 0.35 + Math.random() * 0.35;
      this.particles.push({
        x: ox, y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        color,
        radius: 2 + Math.random() * 3,
        life, maxLife: life,
      });
    }
  }

  _spawnFeedback(x, y, label, color) {
    this.feedbackTexts.push({ x, y, label, color, life: 0.9, maxLife: 0.9, alpha: 1 });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // DRAW — Render semua elemen
  // ────────────────────────────────────────────────────────────────────────────

  draw() {
    const ctx = this.ctx;
    const W   = this.config.width;
    const H   = this.config.height;

    // 1. Background
    ctx.clearRect(0, 0, W, H);
    if (this._images.bg) {
      // Subtle pan effect using bgTime
      const panX = Math.sin(this.bgTime * 0.2) * 20; 
      const panY = Math.cos(this.bgTime * 0.15) * 10;
      
      // Draw slightly larger to allow panning without showing edges
      ctx.drawImage(this._images.bg, -25 + panX, -15 + panY, W + 50, H + 30);
      
      // Reduce the darkness so the background is more visible
      ctx.fillStyle = 'rgba(6, 3, 1, 0.35)';
    } else {
      ctx.fillStyle = 'rgba(6, 3, 1, 0.92)';
    }
    ctx.fillRect(0, 0, W, H);

    // 2. Lane guides (subtle)
    this._drawLanes(ctx, W, H);

    // 3. Musuh
    this._drawEnemies(ctx);

    // 4. Partikel
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle   = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 5. Bullets (player) + Enemy Bullets
    this._drawBullets(ctx);
    this._drawEnemyBullets(ctx);

    // 6. Feedback texts
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    for (const ft of this.feedbackTexts) {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.font        = 'bold 14px "Outfit", sans-serif';
      ctx.fillStyle   = ft.color;
      ctx.shadowColor = ft.color;
      ctx.shadowBlur  = 14;
      ctx.fillText(ft.label, ft.x, ft.y);
      ctx.restore();
    }

    // 7. Flash merah saat invincible (player kena tembak)
    if (this.invincibleTimer > 0) {
      const flashAlpha = Math.sin(this.invincibleTimer * 18) * 0.12 + 0.08;
      ctx.save();
      ctx.globalAlpha = Math.max(0, flashAlpha);
      ctx.fillStyle   = '#ff0033';
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // 8. Kursor (mode kamera)
    if (this.mode === 'camera') this._drawCursor(ctx);

    // 8. HUD in-canvas
    this._drawInCanvasHUD(ctx, W, H);

    ctx.shadowBlur  = 0;
    ctx.globalAlpha = 1;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Draw Lane Guides
  // ────────────────────────────────────────────────────────────────────────────

  _drawLanes(ctx, W, H) {
    ctx.save();
    ctx.strokeStyle = 'rgba(200,160,30,0.06)';
    ctx.lineWidth   = 1;
    ctx.setLineDash([8, 18]);

    for (const ly of this.config.lanes) {
      ctx.beginPath();
      ctx.moveTo(0, ly);
      ctx.lineTo(W, ly);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.restore();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Draw Enemies
  // ────────────────────────────────────────────────────────────────────────────

  _drawEnemies(ctx) {
    for (const e of this.enemies) {
      const hw = e.w / 2;
      const hh = e.h / 2;

      ctx.save();

      // Animasi kematian
      if (e.dead) {
        const prog = e.deathAge / 0.5;
        ctx.globalAlpha = Math.max(0, 1 - prog);
        ctx.translate(e.x, e.y);
        ctx.scale(1 + prog * 0.5, 1 + prog * 0.5);
        ctx.translate(-e.x, -e.y);
      }

      // Animasi escape (fade out)
      if (e.escaped) {
        ctx.globalAlpha = Math.max(0, 1 - e.deathAge / 0.3);
      }

      // Glow
      ctx.shadowColor = e.glowColor;
      ctx.shadowBlur  = e.friendly ? 18 : 12 + (this._burnRatio(e) * 10);

      // Gambar sprite atau fallback shape
      const imgKey = e.type === 'PRAJURIT' ? 'enemy1'
                   : e.type === 'KSATRIA'   ? 'enemy2'
                   : e.type === 'MAHARDIKA' ? 'enemy3'
                   : 'friendly';

      if (this._images[imgKey]) {
        // Efek mengambang (bobbing)
        const bob = Math.sin(e.x * 0.05 + this.bgTime * 5) * 6;
        // Flip horizontal sesuai arah
        ctx.save();
        ctx.translate(e.x, e.y + bob);
        // Tilt sedikit berdasarkan kecepatan
        ctx.rotate((e.fromLeft ? 1 : -1) * 0.05);
        if (!e.fromLeft) ctx.scale(-1, 1);
        ctx.drawImage(this._images[imgKey], -hw, -hh, e.w, e.h);
        ctx.restore();
      } else {
        // Fallback: bentuk wayang sederhana (siluet)
        this._drawEnemyFallback(ctx, e, hw, hh);
      }

      // Health bar (hanya untuk musuh dengan HP > 1)
      if (!e.friendly && e.maxHp > 1 && !e.dead && !e.escaped) {
        this._drawHealthBar(ctx, e, hw, hh);
      }

      // Label nama musuh
      if (!e.dead && !e.escaped) {
        const labelY = e.y - hh - 18;
        ctx.font      = 'bold 9px "Cinzel", serif';
        ctx.fillStyle = e.friendly ? '#30e880' : e.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 8;
        ctx.fillText(e.type, e.x, labelY);
      }

      ctx.restore();
    }

    ctx.shadowBlur  = 0;
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);
  }

  _burnRatio(e) {
    if (e.maxHp <= 1) return 0;
    return Math.max(0, 1 - (e.hp / e.maxHp));
  }

  _drawEnemyFallback(ctx, e, hw, hh) {
    const color = e.color;

    // Body (trapezoid silhouette)
    ctx.fillStyle   = color;
    ctx.globalAlpha = (ctx.globalAlpha || 1) * 0.88;
    ctx.beginPath();
    ctx.moveTo(e.x - hw * 0.5, e.y - hh);       // kepala kiri
    ctx.lineTo(e.x + hw * 0.5, e.y - hh);       // kepala kanan
    ctx.lineTo(e.x + hw, e.y + hh * 0.3);       // bahu kanan
    ctx.lineTo(e.x + hw * 0.7, e.y + hh);       // kaki kanan
    ctx.lineTo(e.x - hw * 0.7, e.y + hh);       // kaki kiri
    ctx.lineTo(e.x - hw, e.y + hh * 0.3);       // bahu kiri
    ctx.closePath();
    ctx.fill();

    // Kepala
    ctx.globalAlpha = (ctx.globalAlpha || 1) * (1 / 0.88);
    ctx.fillStyle   = color;
    ctx.beginPath();
    ctx.arc(e.x, e.y - hh + hw * 0.4, hw * 0.38, 0, Math.PI * 2);
    ctx.fill();

    // Outline
    ctx.strokeStyle = e.friendly ? '#ffffff' : '#ffffff';
    ctx.lineWidth   = 1.5;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.arc(e.x, e.y - hh + hw * 0.4, hw * 0.38, 0, Math.PI * 2);
    ctx.stroke();
  }

  _drawHealthBar(ctx, e, hw, hh) {
    const barW   = e.w * 1.1;
    const barH   = 5;
    const barX   = e.x - barW / 2;
    const barY   = e.y - hh - 10;
    const ratio  = Math.max(0, e.hp / e.maxHp);

    // Background bar
    ctx.fillStyle   = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur  = 0;
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 3);
    ctx.fill();

    // HP bar
    const hpColor = ratio > 0.5 ? '#39ff14'
                  : ratio > 0.25 ? '#ffea00'
                  : '#ff3344';
    ctx.fillStyle = hpColor;
    ctx.shadowColor = hpColor;
    ctx.shadowBlur  = 6;
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW * ratio, barH, 3);
    ctx.fill();

    ctx.shadowBlur = 0;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Draw Bullets
  // ────────────────────────────────────────────────────────────────────────────

  _drawBullets(ctx) {
    for (const b of this.bullets) {
      ctx.save();
      ctx.globalAlpha = b.life > 0.06 ? 0.8 : b.life / 0.06 * 0.8;
      ctx.fillStyle   = b.miss ? 'rgba(255,180,50,0.5)' : '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur  = 8;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.miss ? 4 : 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Draw Enemy Bullets
  // ────────────────────────────────────────────────────────────────────────────

  _drawEnemyBullets(ctx) {
    for (const b of this.enemyBullets) {
      const lifeRatio = Math.min(1, b.life / 3.5);
      ctx.save();
      ctx.globalAlpha = lifeRatio * 0.9;

      // Glow luar (halo)
      ctx.shadowColor = b.color;
      ctx.shadowBlur  = 16;
      ctx.fillStyle   = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 7, 0, Math.PI * 2);
      ctx.fill();

      // Inti terang
      ctx.shadowBlur  = 6;
      ctx.fillStyle   = '#ffffff';
      ctx.beginPath();
      ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Kursor Kamera
  // ────────────────────────────────────────────────────────────────────────────

  _drawCursor(ctx) {
    const { x, y, shooting } = this.player;
    const r = this.config.playerRadius;

    const ringColor = shooting ? '#ff6633' : this.player.color;
    const glowColor = shooting ? 'rgba(255,80,30,0.8)' : this.player.glowColor;

    ctx.shadowBlur  = shooting ? 30 : 18;
    ctx.shadowColor = glowColor;

    // Ring luar
    ctx.strokeStyle = ringColor;
    ctx.lineWidth   = shooting ? 3 : 2.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshair lines
    ctx.lineWidth = 1.5;
    const cl = r - 4;
    ctx.beginPath();
    ctx.moveTo(x - cl, y); ctx.lineTo(x - 4, y);
    ctx.moveTo(x + 4,  y); ctx.lineTo(x + cl, y);
    ctx.moveTo(x, y - cl); ctx.lineTo(x, y - 4);
    ctx.moveTo(x, y + 4);  ctx.lineTo(x, y + cl);
    ctx.stroke();

    // Pusat
    ctx.fillStyle   = shooting ? '#ff6633' : '#ffffff';
    ctx.shadowBlur  = 6;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // HUD In-Canvas
  // ────────────────────────────────────────────────────────────────────────────

  _drawInCanvasHUD(ctx, W, H) {
    ctx.textBaseline = 'top';

    // Skor (kiri atas)
    ctx.textAlign   = 'left';
    ctx.font        = 'bold 10px "Cinzel", serif';
    ctx.fillStyle   = 'rgba(200,160,30,0.5)';
    ctx.shadowBlur  = 0;
    ctx.fillText('SKOR', 16, 16);
    ctx.font        = 'bold 22px "Outfit", sans-serif';
    ctx.fillStyle   = '#c8a01e';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur  = 8;
    ctx.fillText(this.score.toLocaleString(), 16, 27);
    ctx.shadowBlur  = 0;

    // Combo (kanan atas)
    if (this.combo > 1) {
      ctx.textAlign   = 'right';
      ctx.font        = 'bold 10px "Cinzel", serif';
      ctx.fillStyle   = 'rgba(200,160,30,0.5)';
      ctx.fillText('KOMBO', W - 16, 16);
      ctx.font        = `bold ${this.combo >= 20 ? 26 : 20}px "Outfit", sans-serif`;
      ctx.fillStyle   = this.combo >= 20 ? '#ffe566' : '#c8a01e';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur  = this.combo >= 10 ? 16 : 6;
      ctx.fillText(`×${this.combo}`, W - 16, 27);
      ctx.shadowBlur  = 0;
    }

    // Tingkat kesulitan (bawah tengah)
    const diffPct = Math.round(this.diffProgress * 100);
    const diffLbl = this.gameTime < 30  ? 'PEMULA'
                  : this.gameTime < 60  ? 'SEDANG'
                  : this.gameTime < 90  ? 'SULIT'
                  : 'MAESTRO';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font         = '9px "Cinzel", serif';
    ctx.fillStyle    = `rgba(200,160,30,${0.12 + this.diffProgress * 0.3})`;
    ctx.fillText(`${diffLbl}  ${diffPct}%`, W / 2, H - 8);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Util
  // ────────────────────────────────────────────────────────────────────────────

  updateFPS(dt) {
    this.fpsFrameCount++;
    this.fpsUpdateTimer += dt;
    if (this.fpsUpdateTimer >= 0.5) {
      this.fps            = Math.round(this.fpsFrameCount / this.fpsUpdateTimer);
      this.fpsFrameCount  = 0;
      this.fpsUpdateTimer = 0;
    }
  }
}
