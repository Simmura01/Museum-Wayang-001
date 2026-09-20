/**
 * Photo Booth Wayang - booth.js
 * Fitur: webcam + frame wayang + template folder + unduh PNG + share sosmed
 * Terhubung dengan hasil quiz MBTI via sessionStorage
 */

// --- Baca data MBTI dari sessionStorage ---------------------------------------
const mbtiData = (() => {
  try { return JSON.parse(sessionStorage.getItem('mbtiResult')); }
  catch(e) { return null; }
})();

// --- Tampilkan info MBTI jika tersedia ----------------------------------------
if (mbtiData) {
  const bar  = document.getElementById('mbtiInfoBar');
  const text = document.getElementById('mbtiInfoText');
  if (bar && text) {
    text.textContent = mbtiData.mbtiType + ' - Kamu adalah ' + mbtiData.characterName;
    bar.classList.remove('hidden');
  }
}

// --- Konfigurasi Frame Bawaan -------------------------------------------------
const FRAMES = {
  klasik: { border: '#c8a01e', bg: '#0d0a06', accent: '#ffd700', name: 'Klasik Emas', dot: '#c8a01e'   },
  merah:  { border: '#8b1a1a', bg: '#1a0505', accent: '#e05050', name: 'Merah Wayang', dot: '#c0392b'  },
  hitam:  { border: '#444',    bg: '#080808', accent: '#aaaaaa', name: 'Hitam Elegan', dot: '#888888'  },
};
let selectedFrame = 'klasik';
let stream        = null;
let animFrameId   = null;

// --- Template System State ----------------------------------------------------
let currentMode       = 'single';  // 'single' or 'strip'
let customTemplateImg = null;
let templateData      = { single: [], strip: [] };
let selectedTemplateType = 'builtin'; // 'builtin', 'folder', 'custom'

// --- Referensi DOM ------------------------------------------------------------
const introSection  = document.getElementById('introSection');
const cameraSection = document.getElementById('cameraSection');
const resultSection = document.getElementById('resultSection');
const video         = document.getElementById('webcamVideo');
const overlayCanvas = document.getElementById('frameOverlay');
const photoCanvas   = document.getElementById('photoCanvas');

// --- Mulai Kamera -------------------------------------------------------------
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = stream;
    await video.play();

    introSection.classList.add('hidden');
    cameraSection.classList.remove('hidden');

    video.addEventListener('loadedmetadata', startOverlay, { once: true });
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

// --- Loop Overlay Preview -----------------------------------------------------
function startOverlay() {
  var oc = overlayCanvas;
  function loop() {
    if (oc.width !== video.offsetWidth || oc.height !== video.offsetHeight) {
      oc.width  = video.offsetWidth  || 640;
      oc.height = video.offsetHeight || 360;
    }
    var ctx = oc.getContext('2d');
    ctx.clearRect(0, 0, oc.width, oc.height);
    
    if (customTemplateImg && currentMode === 'single') {
      ctx.drawImage(customTemplateImg, 0, 0, oc.width, oc.height);
    } else if (!customTemplateImg || currentMode === 'single') {
      if (selectedTemplateType === 'builtin') {
        drawWayangFrame(ctx, oc.width, oc.height, selectedFrame, null, true);
      }
    }
    // Strip mode: don't overlay on landscape video, use side panel instead
    
    animFrameId = requestAnimationFrame(loop);
  }
  loop();
}

// --- Gambar Frame Wayang (built-in) -------------------------------------------
function drawWayangFrame(ctx, W, H, frameKey, mbtiInfo, isPreview) {
  var f  = FRAMES[frameKey] || FRAMES.klasik;
  var bw = Math.max(16, Math.round(W * 0.038));

  // Header bar
  var headerH = Math.max(44, Math.round(H * 0.09));
  ctx.fillStyle = isPreview ? f.bg + 'dd' : f.bg;
  ctx.fillRect(0, 0, W, headerH);

  ctx.fillStyle = f.accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold ' + Math.round(headerH * 0.37) + 'px "Cinzel", serif';
  ctx.fillText('MUSEUM WAYANG JAKARTA', W / 2, headerH / 2);

  ctx.strokeStyle = f.accent + '66';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(bw * 2, headerH);
  ctx.lineTo(W - bw * 2, headerH);
  ctx.stroke();

  // Footer bar
  var footerH = Math.max(52, Math.round(H * 0.12));
  var footerY = H - footerH;
  ctx.fillStyle = isPreview ? f.bg + 'dd' : f.bg;
  ctx.fillRect(0, footerY, W, footerH);

  ctx.strokeStyle = f.accent + '66';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(bw * 2, footerY);
  ctx.lineTo(W - bw * 2, footerY);
  ctx.stroke();

  ctx.fillStyle = f.accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (mbtiInfo) {
    ctx.font = 'bold ' + Math.round(footerH * 0.35) + 'px "Cinzel", serif';
    ctx.fillText(mbtiInfo.mbtiType + ' - ' + mbtiInfo.characterName, W / 2, footerY + footerH * 0.38);
    ctx.font = Math.round(footerH * 0.25) + 'px "Outfit", sans-serif';
    ctx.fillStyle = f.accent + '99';
    var dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillText(dateStr + '  |  #MuseumWayangJakarta', W / 2, footerY + footerH * 0.72);
  } else {
    var dateStr2 = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.font = Math.round(footerH * 0.28) + 'px "Outfit", sans-serif';
    ctx.fillText(dateStr2, W / 2, footerY + footerH * 0.38);
    ctx.font = Math.round(footerH * 0.24) + 'px "Outfit", sans-serif';
    ctx.fillStyle = f.accent + '88';
    ctx.fillText('#MuseumWayangJakarta', W / 2, footerY + footerH * 0.72);
  }

  // Border luar
  ctx.strokeStyle = f.border;
  ctx.lineWidth   = bw;
  ctx.strokeRect(bw / 2, bw / 2, W - bw, H - bw);

  // Border dalam tipis
  ctx.strokeStyle = f.accent + '55';
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(bw + 6, bw + 6, W - (bw + 6) * 2, H - (bw + 6) * 2);

  // Ornamen sudut (4 sudut)
  var cs = Math.round(W * 0.07);
  var corners = [
    [bw + 12, bw + 12, 0],
    [W - bw - 12, bw + 12, Math.PI / 2],
    [W - bw - 12, H - bw - 12, Math.PI],
    [bw + 12, H - bw - 12, -Math.PI / 2],
  ];
  corners.forEach(function(c) {
    var cx = c[0], cy = c[1], rot = c[2];
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.strokeStyle = f.accent;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(cs, 0);
    ctx.moveTo(0, 0); ctx.lineTo(0, cs);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = f.accent;
    ctx.fill();
    ctx.strokeStyle = f.accent + '55';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(cs * 0.35, 0); ctx.lineTo(0, cs * 0.35);
    ctx.stroke();
    ctx.restore();
  });
}

// =============================================================================
// TEMPLATE SYSTEM
// =============================================================================

// --- Load Templates from folder -----------------------------------------------
async function loadTemplates() {
  try {
    var resp = await fetch('templates/templates.json');
    if (resp.ok) {
      templateData = await resp.json();
    }
  } catch(e) {
    console.log('[Booth] Tidak ada templates.json, menggunakan bawaan saja.');
  }
  renderTemplateGallery();
}

// --- Render Template Gallery --------------------------------------------------
function renderTemplateGallery() {
  var gallery = document.getElementById('templateGallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  var isStrip = (currentMode === 'strip');
  gallery.classList.toggle('strip-mode', isStrip);

  if (!isStrip) {
    // === SINGLE MODE ===
    // Built-in frames
    Object.keys(FRAMES).forEach(function(key) {
      var f = FRAMES[key];
      var card = document.createElement('div');
      card.className = 'template-card single' + (selectedTemplateType === 'builtin' && selectedFrame === key ? ' active' : '');
      card.innerHTML = '<div class="template-card-builtin template-card-img" style="display:flex;align-items:center;justify-content:center;">' +
        '<span class="template-card-dot" style="background:' + f.dot + '"></span> ' + f.name +
        '</div><div class="template-card-label">' + f.name + '</div>';
      card.addEventListener('click', function() {
        selectedFrame = key;
        selectedTemplateType = 'builtin';
        customTemplateImg = null;
        updateStripPreview();
        renderTemplateGallery();
      });
      gallery.appendChild(card);
    });

    // Folder templates (single)
    templateData.single.forEach(function(tpl) {
      var card = document.createElement('div');
      card.className = 'template-card single';
      card.innerHTML = '<img class="template-card-img" src="templates/single/' + tpl.file + '" alt="' + tpl.name + '" loading="lazy" />' +
        '<div class="template-card-label">' + tpl.name + '</div>';
      card.addEventListener('click', function() {
        selectFolderTemplate('single', tpl);
      });
      gallery.appendChild(card);
    });
  } else {
    // === STRIP MODE ===
    // Folder templates (strip)
    if (templateData.strip.length > 0) {
      templateData.strip.forEach(function(tpl) {
        var card = document.createElement('div');
        card.className = 'template-card strip';
        card.innerHTML = '<img class="template-card-img" src="templates/strip/' + tpl.file + '" alt="' + tpl.name + '" loading="lazy" />' +
          '<div class="template-card-label">' + tpl.name + '</div>';
        card.addEventListener('click', function() {
          selectFolderTemplate('strip', tpl);
        });
        gallery.appendChild(card);
      });
    }

    // Built-in strip option (using frame colors)
    Object.keys(FRAMES).forEach(function(key) {
      var f = FRAMES[key];
      var card = document.createElement('div');
      card.className = 'template-card single' + (selectedTemplateType === 'builtin' && selectedFrame === key && !customTemplateImg ? ' active' : '');
      card.innerHTML = '<div class="template-card-builtin template-card-img" style="display:flex;align-items:center;justify-content:center;aspect-ratio:16/9;">' +
        '<span class="template-card-dot" style="background:' + f.dot + '"></span> ' + f.name +
        '</div><div class="template-card-label">' + f.name + ' (Bawaan)</div>';
      card.addEventListener('click', function() {
        selectedFrame = key;
        selectedTemplateType = 'builtin';
        customTemplateImg = null;
        updateStripPreview();
        renderTemplateGallery();
      });
      gallery.appendChild(card);
    });
  }
}

// --- Select folder template ---------------------------------------------------
function selectFolderTemplate(mode, tpl) {
  var folder = (mode === 'strip') ? 'strip' : 'single';
  var imgUrl = 'templates/' + folder + '/' + tpl.file;
  var img = new Image();
  img.onload = function() {
    customTemplateImg = img;
    selectedTemplateType = 'folder';
    updateStripPreview();
    renderTemplateGallery();
    // Mark the correct card active
    document.querySelectorAll('.template-card').forEach(function(c) { c.classList.remove('active'); });
    // Find card by label
    document.querySelectorAll('.template-card-label').forEach(function(lbl) {
      if (lbl.textContent === tpl.name) {
        lbl.parentElement.classList.add('active');
      }
    });
  };
  img.src = imgUrl;
}

// --- Update strip preview panel -----------------------------------------------
function updateStripPreview() {
  var panel = document.getElementById('stripPreviewPanel');
  var previewImg = document.getElementById('stripPreviewImg');
  var videoContainer = document.getElementById('videoContainer');

  if (currentMode === 'strip' && customTemplateImg && selectedTemplateType === 'folder') {
    panel.classList.remove('hidden');
    previewImg.src = customTemplateImg.src;
    videoContainer.classList.add('strip-mode');
  } else {
    panel.classList.add('hidden');
    previewImg.src = '';
    videoContainer.classList.remove('strip-mode');
  }
}

// --- Mode Tab Switch ----------------------------------------------------------
function switchMode(mode) {
  currentMode = mode;
  // Reset template selection
  customTemplateImg = null;
  selectedTemplateType = 'builtin';
  selectedFrame = 'klasik';

  // Update tabs visual
  document.querySelectorAll('.template-mode-tab').forEach(function(tab) {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  updateStripPreview();
  renderTemplateGallery();
}

// =============================================================================
// CAPTURE FUNCTIONS
// =============================================================================

let captureInProgress = false;

async function capturePhoto() {
  if (captureInProgress) return;
  captureInProgress = true;

  var countdownEl = document.getElementById('captureCountdown');
  document.getElementById('captureBtn').style.display = 'none';

  if (currentMode === 'single') {
    await runCountdown(3, countdownEl);
    takeSinglePhoto();
  } else {
    var photos = [];
    for (var i = 0; i < 3; i++) {
      await runCountdown(3, countdownEl, 'Foto ' + (i+1) + '/3');
      photos.push(takeSnapshot());
    }
    composeStrip(photos);
  }
  
  captureInProgress = false;
  countdownEl.textContent = '';
  document.getElementById('captureBtn').style.display = 'flex';
}

function runCountdown(seconds, el, prefix) {
  prefix = prefix || '';
  return new Promise(function(resolve) {
    var timeLeft = seconds;
    el.textContent = prefix ? prefix + ' - ' + timeLeft : timeLeft;
    var interval = setInterval(function() {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(interval);
        el.textContent = 'CEKREK!';
        var flash = document.createElement('div');
        flash.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:white; z-index:9999; transition: opacity 0.3s; opacity:1;';
        document.body.appendChild(flash);
        setTimeout(function() { flash.style.opacity = 0; }, 100);
        setTimeout(function() { flash.remove(); resolve(); }, 300);
      } else {
        el.textContent = prefix ? prefix + ' - ' + timeLeft : timeLeft;
      }
    }, 1000);
  });
}

function takeSnapshot() {
  var vW = video.videoWidth || 1280;
  var vH = video.videoHeight || 720;
  var c = document.createElement('canvas');
  c.width = vW; c.height = vH;
  var ctx = c.getContext('2d');
  ctx.save();
  ctx.translate(vW, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, vW, vH);
  ctx.restore();
  return c;
}

function takeSinglePhoto() {
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  var vW = video.videoWidth || 1280;
  var vH = video.videoHeight || 720;
  
  photoCanvas.width = vW;
  photoCanvas.height = vH;
  var ctx = photoCanvas.getContext('2d');
  
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
  var W = 720;
  var H = 2160;
  
  photoCanvas.width = W;
  photoCanvas.height = H;
  var ctx = photoCanvas.getContext('2d');
  
  // Background
  ctx.fillStyle = (FRAMES[selectedFrame] && FRAMES[selectedFrame].bg) || '#111';
  ctx.fillRect(0, 0, W, H);
  
  for (var i = 0; i < 3; i++) {
    var snap = photos[i];
    var sourceSize = snap.height;
    var sourceX = (snap.width - sourceSize) / 2;
    var sourceY = 0;
    ctx.drawImage(snap, sourceX, sourceY, sourceSize, sourceSize, 0, i * 720, 720, 720);
  }
  
  if (customTemplateImg) {
    ctx.drawImage(customTemplateImg, 0, 0, W, H);
  } else {
    drawWayangFrame(ctx, W, H, selectedFrame, mbtiData, false);
    var borderColor = (FRAMES[selectedFrame] && FRAMES[selectedFrame].border) || '#c8a01e';
    ctx.strokeStyle = borderColor;
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
  if (stream) stream.getTracks().forEach(function(t) { t.stop(); });
  stream = null;
}

// --- Unduh Foto ---------------------------------------------------------------
function downloadPhoto() {
  var mbtiStr = mbtiData ? '-' + mbtiData.characterName : '';
  var link    = document.createElement('a');
  link.download = 'WayangPhoto' + mbtiStr + '-' + Date.now() + '.png';
  link.href     = photoCanvas.toDataURL('image/png');
  link.click();
}

// --- Share Foto ---------------------------------------------------------------
async function sharePhoto() {
  var shareText = mbtiData
    ? 'Aku adalah ' + mbtiData.characterName + ' (' + mbtiData.mbtiType + ') dalam kepribadian Wayang! Museum Wayang Jakarta'
    : 'Foto wayangku dari Museum Wayang Jakarta! #MuseumWayangJakarta';

  if (navigator.share) {
    photoCanvas.toBlob(async function(blob) {
      var file = new File([blob], 'wayang-photo.png', { type: 'image/png' });
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
  downloadPhoto();
  setTimeout(function() {
    alert('Foto sudah diunduh!\n\nSalin teks ini saat membagikan:\n"' + text + '"');
  }, 300);
}

// --- Ambil Lagi ---------------------------------------------------------------
function retakePhoto() {
  resultSection.classList.add('hidden');
  startCamera();
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================

document.getElementById('startCameraBtn').addEventListener('click', startCamera);
document.getElementById('captureBtn').addEventListener('click', capturePhoto);
document.getElementById('downloadBtn').addEventListener('click', downloadPhoto);
document.getElementById('shareBtn').addEventListener('click', sharePhoto);
document.getElementById('retakeBtn').addEventListener('click', retakePhoto);

// Mode tabs
document.querySelectorAll('.template-mode-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    switchMode(tab.dataset.mode);
  });
});

// Custom Template Upload
document.getElementById('customTemplateUpload').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) return;
  var url = URL.createObjectURL(file);
  var img = new Image();
  img.onload = function() {
    customTemplateImg = img;
    selectedTemplateType = 'custom';

    // Auto-detect mode from image dimensions
    if (img.height > img.width * 1.5) {
      // Portrait => strip
      if (currentMode !== 'strip') switchMode('strip');
    } else {
      // Landscape => single
      if (currentMode !== 'single') switchMode('single');
    }

    updateStripPreview();
    // Deselect all cards
    document.querySelectorAll('.template-card').forEach(function(c) { c.classList.remove('active'); });
    alert('Template custom berhasil dimuat!');
  };
  img.src = url;
});

// Guide Overlay
document.getElementById('showGuideBtn').addEventListener('click', function() {
  var overlay = document.getElementById('guideOverlay');
  if (overlay) overlay.classList.remove('hidden');
});
document.getElementById('closeGuideBtn').addEventListener('click', function() {
  var overlay = document.getElementById('guideOverlay');
  if (overlay) overlay.classList.add('hidden');
});

// --- Init: Load templates on page load ----------------------------------------
loadTemplates();