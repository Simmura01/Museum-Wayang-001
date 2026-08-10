/* ============================================================
   02-AUDIO-MODAL-HELPERS.JS
   Fungsi BERSAMA yang dipakai oleh Pameran & Jelajah:
   - Audio player (play/pause, progress bar, ganti bahasa ID/EN)
   - Tab detail (Penjelasan / Psikologi / Hubungan)
   - Buka/tutup modal generik
   Muat file ini SEBELUM 04-pameran.js dan 06-jelajah.js.
   ============================================================ */

/* ─── AUDIO PLAYER ─── */
let currentAudio=null, audioProgressTimer=null;
let currentAudioMeta={id:'',en:''};
let currentAudioLang='id';

/* ─── TEKS KONTEN DETAIL (ID & EN) ─── */
/* Menyimpan semua versi teks agar bisa swap saat ganti bahasa */
let currentDetailTexts={
    desc:{id:'',en:''},
    psikologi:{id:'',en:''},
    hubungan:{id:'',en:''}
};

/* ID elemen teks untuk modal aktif saat ini */
let activeTextIds={
    penjelasan: 'tab-penjelasan',
    psikologi:  'tab-psikologi',
    hubungan:   'tab-hubungan'
};

/* Panggil ini saat membuka modal detail (Pameran atau Jelajah) */
function setDetailTexts(hs, panelIds){
    /* panelIds opsional; default ke pameran */
    activeTextIds = panelIds || {
        penjelasan: 'tab-penjelasan',
        psikologi:  'tab-psikologi',
        hubungan:   'tab-hubungan'
    };

    /* Simpan teks ID */
    currentDetailTexts.desc.id       = hs.desc      || '';
    currentDetailTexts.psikologi.id  = hs.psikologi || hs.karakter || '';
    currentDetailTexts.hubungan.id   = hs.hubungan  || '';

    /* Simpan teks EN */
    currentDetailTexts.desc.en       = hs.descEn      || hs.desc      || '';
    currentDetailTexts.psikologi.en  = hs.psikologiEn || hs.karakterEn || hs.psikologi || hs.karakter || '';
    currentDetailTexts.hubungan.en   = hs.hubunganEn  || hs.hubungan   || '';
}

/* Terapkan teks sesuai bahasa aktif ke panel-panel modal */
function applyDetailTextsForLang(lang){
    const l = (lang === 'en') ? 'en' : 'id';
    const elPenj = document.getElementById(activeTextIds.penjelasan);
    const elPsik = document.getElementById(activeTextIds.psikologi);
    const elHub  = document.getElementById(activeTextIds.hubungan);
    if(elPenj) elPenj.textContent = currentDetailTexts.desc[l]      || (l==='en' ? 'Description not available in English yet.' : 'Keterangan akan muncul di sini.');
    if(elPsik) elPsik.textContent = currentDetailTexts.psikologi[l] || (l==='en' ? 'Character information not available in English yet.' : 'Analisis psikologi tokoh ini akan segera dilengkapi.');
    if(elHub)  elHub.textContent  = currentDetailTexts.hubungan[l]  || (l==='en' ? 'Relationship information not available in English yet.' : 'Informasi hubungan tokoh ini akan segera dilengkapi.');
}

function stopAudio(){
    if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;currentAudio=null;}
    if(audioProgressTimer){clearInterval(audioProgressTimer);audioProgressTimer=null;}
}

function loadAudioForLang(lang,playerUIId,toggleId){
    stopAudio();
    currentAudioLang=lang;
    const src=currentAudioMeta[lang]||'';
    const playerUI=document.getElementById(playerUIId);
    const labelBahasa=lang==='id'?'Bahasa Indonesia':'English';
    if(src&&src.trim()!==''){
        const audio=new Audio(src);currentAudio=audio;
        playerUI.innerHTML=`<button class="btn-play-audio" id="btn-play" onclick="toggleAudio()" title="Play/Pause">▶</button>
            <div class="audio-info"><div class="audio-title">▸ NARASI AUDIO — ${labelBahasa.toUpperCase()}</div>
            <div class="audio-progress-bg" id="audio-prog-bg"><div class="audio-progress-fill" id="audio-fill"></div></div>
            <div class="audio-time" id="audio-time">0:00 / 0:00</div></div>`;
        document.getElementById('audio-prog-bg').addEventListener('click',function(e){
            if(!currentAudio||currentAudio.duration===0) return;
            const rect=this.getBoundingClientRect();
            currentAudio.currentTime=(e.clientX-rect.left)/rect.width*currentAudio.duration;
        });
        audio.addEventListener('ended',()=>{const btn=document.getElementById('btn-play');if(btn)btn.textContent='▶';});
        audio.addEventListener('timeupdate',()=>{
            const fill=document.getElementById('audio-fill');const timeEl=document.getElementById('audio-time');
            if(!fill||!audio.duration) return;
            fill.style.width=(audio.currentTime/audio.duration*100)+'%';
            timeEl.textContent=formatTime(audio.currentTime)+' / '+formatTime(audio.duration);
        });
    } else {
        playerUI.innerHTML=`<div class="audio-no-file">🎵 Narasi audio (${labelBahasa}) belum tersedia untuk koleksi ini.</div>`;
        currentAudio=null;
    }
    /* Setelah ganti audio, perbarui juga teks konten sesuai bahasa */
    applyDetailTextsForLang(lang);
}

function toggleAudio(){
    if(!currentAudio) return;
    const btn=document.getElementById('btn-play');
    if(currentAudio.paused){currentAudio.play();if(btn)btn.textContent='⏸';}
    else{currentAudio.pause();if(btn)btn.textContent='▶';}
}

function formatTime(sec){
    if(isNaN(sec)) return '0:00';
    return Math.floor(sec/60)+':'+String(Math.floor(sec%60)).padStart(2,'0');
}

/* ─── TAB DETAIL (Penjelasan/Psikologi/Hubungan) ─── */
function switchDetailTab(tabKey,tabsId,panelsSelector){
    document.querySelectorAll('#'+tabsId+' .detail-tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===tabKey));
    document.querySelectorAll(panelsSelector).forEach(p=>p.classList.toggle('active',p.dataset.panel===tabKey));
}

/* ─── ZOOM GAMBAR DI MODAL ─── */
function toggleZoom(){document.getElementById('modal-img-section').classList.toggle('zoomed');}
function toggleZoomScan(){document.getElementById('scan-modal-img-section').classList.toggle('zoomed');}

/* ─── MODAL GENERIK (tutorial, scanner, kuis, hasil kuis, pencapaian) ─── */
function bukaModal(id){
    const m=document.getElementById(id);if(!m) return;
    m.style.display='flex';requestAnimationFrame(()=>m.classList.add('show'));
}
function tutupModal(id){
    const m=document.getElementById(id);if(!m) return;
    m.classList.remove('show');setTimeout(()=>m.style.display='none',300);
}

/* Pasang listener toggle bahasa ID/EN untuk kedua modal detail
   (Pameran & Jelajah) — dijalankan setelah DOM siap. */
document.getElementById('audio-lang-toggle').addEventListener('click',function(e){
    const btn=e.target.closest('.lang-btn');if(!btn) return;
    const lang=btn.dataset.lang;if(lang===currentAudioLang) return;
    document.querySelectorAll('#audio-lang-toggle .lang-btn').forEach(b=>b.classList.toggle('active',b===btn));
    loadAudioForLang(lang,'audio-player-ui','audio-lang-toggle');
});
document.getElementById('scan-audio-lang-toggle').addEventListener('click',function(e){
    const btn=e.target.closest('.lang-btn');if(!btn) return;
    const lang=btn.dataset.lang;if(lang===currentAudioLang) return;
    document.querySelectorAll('#scan-audio-lang-toggle .lang-btn').forEach(b=>b.classList.toggle('active',b===btn));
    loadAudioForLang(lang,'scan-audio-player-ui','scan-audio-lang-toggle');
});
document.getElementById('detail-tabs').addEventListener('click',function(e){
    const btn=e.target.closest('.detail-tab-btn');if(!btn) return;
    switchDetailTab(btn.dataset.tab,'detail-tabs','#detail-zoom .detail-tab-panel');
});
document.getElementById('scan-detail-tabs').addEventListener('click',function(e){
    const btn=e.target.closest('.detail-tab-btn');if(!btn) return;
    switchDetailTab(btn.dataset.tab,'scan-detail-tabs','#modal-detail-scan .detail-tab-panel');
});
