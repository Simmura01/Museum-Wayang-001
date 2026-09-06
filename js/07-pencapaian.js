/* ============================================================
   07-PENCAPAIAN.JS
   Logika halaman Pencapaian: 4 badge (scan, kuis, karakter,
   hukum) — dihitung dari localStorage & dari interaksi user
   di halaman Pameran/Jelajah/Beranda.
   ============================================================ */

function getViewedHotspots(){try{return JSON.parse(localStorage.getItem('museumViewedHotspots'))||[];}catch(e){return [];}}
function markHotspotViewed(nama){
    if(!nama) return;
    const list=getViewedHotspots();
    if(!list.includes(nama)){list.push(nama);try{localStorage.setItem('museumViewedHotspots',JSON.stringify(list));}catch(e){}}
}
function getHukumClicks(){try{return JSON.parse(localStorage.getItem('museumHukumClicks'))||[];}catch(e){return [];}}
function markHukumClicked(id){
    if(!id) return;
    const list=getHukumClicks();
    if(!list.includes(id)){list.push(id);try{localStorage.setItem('museumHukumClicks',JSON.stringify(list));}catch(e){}}
}
const TARGET_KARAKTER=10,TARGET_HUKUM=2;

function setAchievement(key,unlocked,progressText,fillPct){
    const card=document.getElementById('ach-card-'+key);if(!card) return;
    card.classList.toggle('unlocked',unlocked);card.classList.toggle('locked',!unlocked);
    const status=document.getElementById('ach-status-'+key);if(status) status.textContent=unlocked?'TERBUKA':'TERKUNCI';
    const prog=document.getElementById('ach-progress-'+key);if(prog) prog.textContent=progressText;
    const fill=document.getElementById('ach-fill-'+key);if(fill) fill.style.width=(unlocked?100:fillPct)+'%';
}

/* Modal Detail Pencapaian: diisi dari data tersembunyi di masing-masing kartu */
function bukaPencapaianDetail(key){
    const card=document.getElementById('ach-card-'+key);if(!card) return;
    const unlocked=card.classList.contains('unlocked');
    const iconWrap=card.querySelector('.achievement-icon-wrap');
    const title=card.querySelector('.achievement-title')?.textContent||'';
    const desc=document.getElementById('ach-desc-'+key)?.textContent||'';
    const progressText=document.getElementById('ach-progress-'+key)?.textContent||'';
    const fillWidth=document.getElementById('ach-fill-'+key)?.style.width||'0%';

    document.getElementById('pd-nama').textContent=title;
    const pdStatus=document.getElementById('pd-status');
    pdStatus.textContent=unlocked?'TERBUKA':'TERKUNCI';
    pdStatus.classList.toggle('unlocked',unlocked);
    document.getElementById('pd-desc').textContent=desc;
    document.getElementById('pd-progress').textContent=progressText;
    document.getElementById('pd-fill').style.width=unlocked?'100%':fillWidth;

    const pdIconWrap=document.getElementById('pd-icon-wrap');
    pdIconWrap.innerHTML=iconWrap?iconWrap.innerHTML:'';
    pdIconWrap.classList.toggle('unlocked',unlocked);

    bukaModal('modal-pencapaian-detail');
}

function renderPencapaian(){
    const p=getProgress();const ALL=Object.keys(dataJelajah);
    let totalScanned=0,totalQuiz=0;
    ALL.forEach(id=>{if(p[id]?.scanned||p[id]?.quizDone) totalScanned++;if(p[id]?.quizDone) totalQuiz++;});
    setAchievement('scan',totalScanned>=ALL.length,`${totalScanned} / ${ALL.length} koleksi dipindai`,totalScanned/ALL.length*100);
    setAchievement('kuis',totalQuiz>=ALL.length,`${totalQuiz} / ${ALL.length} kuis terselesaikan`,totalQuiz/ALL.length*100);
    const viewedCount=getViewedHotspots().length;
    setAchievement('karakter',viewedCount>=TARGET_KARAKTER,`${Math.min(viewedCount,TARGET_KARAKTER)} / ${TARGET_KARAKTER} koleksi dipelajari`,viewedCount/TARGET_KARAKTER*100);
    const hukumCount=getHukumClicks().length;
    setAchievement('hukum',hukumCount>=TARGET_HUKUM,`${Math.min(hukumCount,TARGET_HUKUM)} / ${TARGET_HUKUM} dasar hukum dibaca`,hukumCount/TARGET_HUKUM*100);
}
