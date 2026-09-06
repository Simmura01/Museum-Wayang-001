/**
 * Photo Booth Wayang — booth.js
 * Fitur: webcam → frame wayang → unduh PNG → share sosmed
 * Terhubung dengan hasil quiz MBTI via sessionStorage
 */

// ─── Baca data MBTI dari sessionStorage ─────────────────────────────────────
const mbtiData = (() => {
  try { return JSON.parse(sessionStorage.getItem('mbtiResult')); }
  catch { return null; }
})();

// ─── Tampilkan info MBTI jika tersedia ──────────────────────────────────────
if (mbtiData) {
  const bar  = document.getElementById('mbtiInfoBar');
  const text = document.getElementById('mbtiInfoText');
  if (bar && text) {
    text.textContent = `🎭 ${mbtiData.mbtiType} — Kamu adalah ${mbtiData.characterName}`;
    bar.classList.remove('hidden');
  }
}

// ─── Konfigurasi Frame ───────────────────────────────────────────────────────
const FRAMES = {
  klasik: { border: '#c8a01e', bg: '#0d0a06', accent: '#ffd700', name: 'Klasik Emas'   },
  merah:  { border: '#8b1a1a', bg: '#1a0505', accent: '#e05050', name: 'Merah Wayang'  },
  hitam:  { border: '#444',    bg: '#080808', accent: '#aaaaaa', name: 'Hitam Elegan'  },
};
let selectedFrame = 'klasik';
let stream        = null;
let animFrameId   = null;

// ─── Referensi DOM ──────────────────────────────────────────────────────────
const introSection  = document.getElementById('introSection');
const cameraSection = document.getElementById('cameraSection');
const resultSection = document.getElementById('resultSection');
const video         = document.getElementById('webcamVideo');
const overlayCanvas = document.getElementById('frameOverlay');
const photoCanvas   = document.getElementById('photoCanvas');

// ─── Mulai Kamera ────────────────────────────────────────────────────────────
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = stream;
    await video.play();

    introSection.classList.add('hidden');
    cameraSection.classList.remove('hidden');

    // Tunggu video siap lalu mulai overlay
    video.addEventListener('loadedmetadata', startOverlay, { once: true });
    // Fallback jika sudah langsung siap
    if (video.readyState >= 2) startOverlay();
  } catch (err) {
    console.error('[Booth] Kamera gagal:', err);
    if (err.name === 'NotAllowedError') {
      alert('Izin kamera ditolak. Silakan izinkan akses kamera di browser dan muat ulang halaman.');
    } else {
      alert('Tidak dapat mengakses kamera: ' + err.message);
    }
  }
}

// ─── Loop Overlay Preview ───────────────────────────────────────────────────
function startOverlay() {
  const oc = overlayCanvas;
  function loop() {
    // Sesuaikan ukuran canvas dengan video yang ditampilkan
    if (oc.width !== video.offsetWidth || oc.height !== video.offsetHeight) {
      oc.width  = video.offsetWidth  || 640;
      oc.height = video.offsetHeight || 360;
    }
    const ctx = oc.getContext('2d');
    ctx.clearRect(0, 0, oc.width, oc.height);
    
    if (customTemplateImg) {
      // Gambar template kustom menyesuaikan ukuran overlay
      ctx.drawImage(customTemplateImg, 0, 0, oc.width, oc.height);
    } else {
      drawWayangFrame(ctx, oc.width, oc.height, selectedFrame, null, true);
    }
    
    animFrameId = requestAnimationFrame(loop);
  }
  loop();
}

// ─── Gambar Frame Wayang ─────────────────────────────────────────────────────
function drawWayangFrame(ctx, W, H, frameKey, mbtiInfo, isPreview) {
  const f  = FRAMES[frameKey] || FRAMES.klasik;
  const bw = Math.max(16, Math.round(W * 0.038));   // border width proporsional

  // Jangan fillRect seluruh kanvas saat bukan preview, karena akan menutupi foto kamera yang sudah digambar!
  // if (!isPreview) {
  //   ctx.fillStyle = f.bg;
  //   ctx.fillRect(0, 0, W, H);
  // }

  // ─ Header bar ────────────────────────────────────────────────────
  const headerH = Math.max(44, Math.round(H * 0.09));
  ctx.fillStyle = isPreview ? `${f.bg}dd` : f.bg;
  ctx.fillRect(0, 0, W, headerH);

  ctx.fillStyle = f.accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(headerH * 0.37)}px "Cinzel", serif`;
  ctx.fillText('MUSEUM WAYANG JAKARTA', W / 2, headerH / 2);

  // ─ Garis dekorasi bawah header ────────────────────────────────────
  ctx.strokeStyle = `${f.accent}66`;
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(bw * 2, headerH);
  ctx.lineTo(W - bw * 2, headerH);
  ctx.stroke();

  // ─ Footer bar ────────────────────────────────────────────────────
  const footerH = Math.max(52, Math.round(H * 0.12));
  const footerY = H - footerH;
  ctx.fillStyle = isPreview ? `${f.bg}dd` : f.bg;
  ctx.fillRect(0, footerY, W, footerH);

  // Garis dekorasi atas footer
  ctx.strokeStyle = `${f.accent}66`;
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(bw * 2, footerY);
  ctx.lineTo(W - bw * 2, footerY);
  ctx.stroke();

  ctx.fillStyle = f.accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (mbtiInfo) {
    ctx.font = `bold ${Math.round(footerH * 0.35)}px "Cinzel", serif`;
    ctx.fillText(`${mbtiInfo.mbtiType} — ${mbtiInfo.characterName}`, W / 2, footerY + footerH * 0.38);
    ctx.font = `${Math.round(footerH * 0.25)}px "Outfit", sans-serif`;
    ctx.fillStyle = `${f.accent}99`;
    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillText(dateStr + '  ·  #MuseumWayangJakarta', W / 2, footerY + footerH * 0.72);
  } else {
    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.font = `${Math.round(footerH * 0.28)}px "Outfit", sans-serif`;
    ctx.fillText(dateStr, W / 2, footerY + footerH * 0.38);
    ctx.font = `${Math.round(footerH * 0.24)}px "Outfit", sans-serif`;
    ctx.fillStyle = `${f.accent}88`;
    ctx.fillText('#MuseumWayangJakarta', W / 2, footerY + footerH * 0.72);
  }

  // ─ Border luar ───────────────────────────────────────────────────
  ctx.strokeStyle = f.border;
  ctx.lineWidth   = bw;
  ctx.strokeRect(bw / 2, bw / 2, W - bw, H - bw);

  // ─ Border dalam tipis ─────────────────────────────────────────────
  ctx.strokeStyle = `${f.accent}55`;
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(bw + 6, bw + 6, W - (bw + 6) * 2, H - (bw + 6) * 2);

  // ─ Ornamen sudut (4 sudut) ────────────────────────────────────────
  const cs = Math.round(W * 0.07);  // corner size
  const corners = [
    [bw + 12, bw + 12, 0],
    [W - bw - 12, bw + 12, Math.PI / 2],
    [W - bw - 12, H - bw - 12, Math.PI],
    [bw + 12, H - bw - 12, -Math.PI / 2],
  ];
  corners.forEach(([cx, cy, rot]) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.strokeStyle = f.accent;
    ctx.lineWidth   = 2;
    // Sudut L
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(cs, 0);
    ctx.moveTo(0, 0); ctx.lineTo(0, cs);
    ctx.stroke();
    // Titik
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = f.accent;
    ctx.fill();
    // Garis diagonal kecil
    ctx.strokeStyle = `${f.accent}55`;
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(cs * 0.35, 0); ctx.lineTo(0, cs * 0.35);
    ctx.stroke();
    ctx.restore();
  });
}

// ─── Variabel Tambahan ────────────────────────────────────────────────────────
let customTemplateImg = null;
let captureInProgress = false;

// ─── Ambil Foto ──────────────────────────────────────────────────────────────
async function capturePhoto() {
  if (captureInProgress) return;
  captureInProgress = true;

  const mode = document.querySelector('input[name="templateMode"]:checked')?.value || 'single';
  const countdownEl = document.getElementById('captureCountdown');
  document.getElementById('captureBtn').style.display = 'none'; // Sembunyikan tombol

  if (mode === 'single') {
    await runCountdown(3, countdownEl);
    takeSinglePhoto();
  } else {
    // Mode Strip
    const photos = [];
    for (let i = 0; i < 3; i++) {
      await runCountdown(3, countdownEl, `Foto ${i+1}/3`);
      photos.push(takeSnapshot());
    }
    composeStrip(photos);
  }
  
  captureInProgress = false;
  countdownEl.textContent = '';
  document.getElementById('captureBtn').style.display = 'flex';
}

function runCountdown(seconds, el, prefix = '') {
  return new Promise(resolve => {
    let timeLeft = seconds;
    el.textContent = prefix ? `${prefix} - ${timeLeft}` : timeLeft;
    const interval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(interval);
        el.textContent = 'CEKREK!';
        // Flash screen effect
        const flash = document.createElement('div');
        flash.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:white; z-index:9999; transition: opacity 0.3s; opacity:1;';
        document.body.appendChild(flash);
        setTimeout(() => { flash.style.opacity = 0; }, 100);
        setTimeout(() => { flash.remove(); resolve(); }, 300);
      } else {
        el.textContent = prefix ? `${prefix} - ${timeLeft}` : timeLeft;
      }
    }, 1000);
  });
}

function takeSnapshot() {
  const vW = video.videoWidth || 1280;
  const vH = video.videoHeight || 720;
  const c = document.createElement('canvas');
  c.width = vW; c.height = vH;
  const ctx = c.getContext('2d');
  ctx.save();
  ctx.translate(vW, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, vW, vH);
  ctx.restore();
  return c;
}

function takeSinglePhoto() {
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  const vW = video.videoWidth || 1280;
  const vH = video.videoHeight || 720;
  
  photoCanvas.width = vW;
  photoCanvas.height = vH;
  const ctx = photoCanvas.getContext('2d');
  
  ctx.drawImage(takeSnapshot(), 0, 0);

  if (customTemplateImg) {
    ctx.drawImage(customTemplateImg, 0, 0, vW, vH);
  } else {
    drawWayangFrame(ctx, vW, vH, selectedFrame, mbtiData, false);
  }

  finishCapture();
}

function composeStrip(photos) {
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  const W = 720;
  const H = 2160;
  
  photoCanvas.width = W;
  photoCanvas.height = H;
  const ctx = photoCanvas.getContext('2d');
  
  // Background
  ctx.fillStyle = FRAMES[selectedFrame]?.bg || '#111';
  ctx.fillRect(0, 0, W, H);
  
  for (let i = 0; i < 3; i++) {
    const snap = photos[i];
    // Crop kotak di tengah (720x720 dari resolusi asli)
    const sourceSize = snap.height;
    const sourceX = (snap.width - sourceSize) / 2;
    const sourceY = 0;
    ctx.drawImage(snap, sourceX, sourceY, sourceSize, sourceSize, 0, i * 720, 720, 720);
  }
  
  if (customTemplateImg) {
    ctx.drawImage(customTemplateImg, 0, 0, W, H);
  } else {
    // Tambahkan frame bawaan + pembatas
    drawWayangFrame(ctx, W, H, selectedFrame, mbtiData, false);
    ctx.strokeStyle = FRAMES[selectedFrame]?.border || '#c8a01e';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(0, 720); ctx.lineTo(720, 720);
    ctx.moveTo(0, 1440); ctx.lineTo(720, 1440);
    ctx.stroke();
  }

  finishCapture();
}

function finishCapture() {
  cameraSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  stream?.getTracks().forEach(t => t.stop());
  stream = null;
}

// ─── Unduh Foto ──────────────────────────────────────────────────────────────
function downloadPhoto() {
  const mbtiStr = mbtiData ? `-${mbtiData.characterName}` : '';
  const link    = document.createElement('a');
  link.download = `WayangPhoto${mbtiStr}-${Date.now()}.png`;
  link.href     = photoCanvas.toDataURL('image/png');
  link.click();
}

// ─── Share Foto ──────────────────────────────────────────────────────────────
async function sharePhoto() {
  const shareText = mbtiData
    ? `Aku adalah ${mbtiData.characterName} (${mbtiData.mbtiType}) dalam kepribadian Wayang! 🎭 Museum Wayang Jakarta`
    : 'Foto wayangku dari Museum Wayang Jakarta! 🎭 #MuseumWayangJakarta';

  if (navigator.share) {
    photoCanvas.toBlob(async (blob) => {
      const file = new File([blob], 'wayang-photo.png', { type: 'image/png' });
      try {
        await navigator.share({
          title: 'Museum Wayang Jakarta',
          text:  shareText,
          files: [file],
        });
      } catch (err) {
        if (err.name !== 'AbortError') fallbackShare(shareText);
      }
    }, 'image/png');
  } else {
    fallbackShare(shareText);
  }
}

function fallbackShare(text) {
  // Unduh dan tampilkan instruksi
  downloadPhoto();
  setTimeout(() => {
    alert(`Foto sudah diunduh! 📥\n\nSalin teks ini saat membagikan:\n"${text}"`);
  }, 300);
}

// ─── Ambil Lagi ──────────────────────────────────────────────────────────────
function retakePhoto() {
  resultSection.classList.add('hidden');
  startCamera();
}

// ─── Event Listeners ─────────────────────────────────────────────────────────
document.getElementById('startCameraBtn')?.addEventListener('click', startCamera);
document.getElementById('captureBtn')?.addEventListener('click', capturePhoto);
document.getElementById('downloadBtn')?.addEventListener('click', downloadPhoto);
document.getElementById('shareBtn')?.addEventListener('click', sharePhoto);
document.getElementById('retakeBtn')?.addEventListener('click', retakePhoto);

// Pilihan frame
document.querySelectorAll('input[name="frameOption"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    selectedFrame = e.target.value;
    document.querySelectorAll('.frame-option').forEach(el => el.classList.remove('active'));
    e.target.closest('.frame-option')?.classList.add('active');
  });
});

// Custom Template
document.getElementById('customTemplateUpload')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    customTemplateImg = img;
    alert('Template custom berhasil dimuat! Cekrek sekarang!');
  };
  img.src = url;
});

// Guide Overlay
document.getElementById('showGuideBtn')?.addEventListener('click', () => {
  document.getElementById('guideOverlay')?.classList.remove('hidden');
});
document.getElementById('closeGuideBtn')?.addEventListener('click', () => {
  document.getElementById('guideOverlay')?.classList.add('hidden');
});
