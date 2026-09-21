/* ============================================================
   04-PAMERAN.JS
   State & render halaman Pameran: carousel lemari, hotspot,
   navigasi lantai/ruangan, dan modal detail koleksi.
   Membutuhkan: 03-pameran-data.js dan 02-audio-modal-helpers.js
   ============================================================ */

let currentFloor='lantai1', currentRoomKey='ruang1', displays=[], curIdx=0;

function getCurrentRoomData(){ return museumData[currentFloor].rooms[currentRoomKey]; }

function getPos(diff,total){
    if(diff===0) return 'pos-active';
    if(diff===1) return 'pos-next';
    if(diff===-1) return 'pos-prev';
    if(diff>=2) return 'pos-far-right';
    return 'pos-far-left';
}

function updateCarousel(){
    const total=displays.length;
    displays.forEach((d,i)=>{
        let diff=i-curIdx;
        while(diff>total/2) diff-=total;
        while(diff<-total/2) diff+=total;
        d.className='display-lemari '+getPos(diff,total);
    });
    document.querySelectorAll('#nav-dots .nav-dot').forEach((dot,i)=>{
        dot.classList.toggle('active',i===curIdx);
    });
}

function naviPameran(dir){
    const total=displays.length;
    if(total===0) return;
    curIdx=(curIdx+dir+total)%total;
    updateCarousel();
}

const DOT_ICONS=['assets/icons/icon-gunungan.png'];
function buildDots(){
    const c=document.getElementById('nav-dots');
    c.innerHTML='';
    displays.forEach((_,i)=>{
        const d=document.createElement('div');
        d.className='nav-dot'+(i===0?' active':'');
        const img=document.createElement('img');
        img.src=DOT_ICONS[i%DOT_ICONS.length];img.alt='nav '+(i+1);
        d.appendChild(img);
        d.addEventListener('click',()=>{curIdx=i;updateCarousel()});
        c.appendChild(d);
    });
}

function rebuildLorong(){
    const lorong=document.getElementById('lorong');
    lorong.innerHTML='';
    const room=getCurrentRoomData();
    room.displays.forEach((disp,i)=>{
        const div=document.createElement('div');
        div.className='display-lemari';div.dataset.index=i;
        const wrapper=document.createElement('div');
        wrapper.className='lemari-wrapper';
        if(disp.img){
            const img=document.createElement('img');
            img.src=disp.img;img.alt=room.fullLabel+' — Display '+(i+1);img.className='gambar-lemari';
            wrapper.appendChild(img);
        } else {
            const ph=document.createElement('div');ph.className='lemari-placeholder';
            ph.innerHTML='<div class="ph-icon">🖼️</div><div class="ph-text">Foto lemari belum diunggah<br>'+room.label+' — Display '+(i+1)+'</div>';
            wrapper.appendChild(ph);
        }
        disp.hotspots.forEach(hs=>{
            const hotspot=document.createElement('div');hotspot.className='hotspot';
            hotspot.style.left=hs.x+'%';hotspot.style.top=hs.y+'%';hotspot.style.width=hs.w+'%';hotspot.style.height=hs.h+'%';
            hotspot.addEventListener('click',()=>bukaDetail(hs));
            hotspot.innerHTML='<div class="hotspot-glow"></div><div class="hotspot-plus">+</div><div class="hotspot-label">'+hs.label+'</div>';
            wrapper.appendChild(hotspot);
        });
        div.appendChild(wrapper);
        div.addEventListener('click',function(){
            if(div.classList.contains('pos-prev')) naviPameran(-1);
            else if(div.classList.contains('pos-next')) naviPameran(1);
        });
        lorong.appendChild(div);
    });
    displays=[...lorong.querySelectorAll('.display-lemari')];
    buildDots();updateCarousel();
}

function switchFloor(floorKey){
    if(floorKey===currentFloor) return;
    currentFloor=floorKey;currentRoomKey=Object.keys(museumData[floorKey].rooms)[0];curIdx=0;
    document.querySelectorAll('.floor-btn[data-floor]').forEach(b=>b.classList.toggle('active',b.dataset.floor===currentFloor));
    renderRoomMinimap();renderCurrentViewLabel();rebuildLorong();
}

function switchRoom(roomKey){
    if(roomKey===currentRoomKey) return;
    currentRoomKey=roomKey;curIdx=0;
    renderRoomMinimap();renderCurrentViewLabel();rebuildLorong();
}

function renderRoomMinimap(){
    const rooms=museumData[currentFloor].rooms;
    document.getElementById('minimap-title').textContent='ROOM MINIMAP ('+museumData[currentFloor].label.toUpperCase()+')';
    const grid=document.getElementById('minimap-grid');grid.innerHTML='';
    Object.entries(rooms).forEach(([key,room])=>{
        const isHere=key===currentRoomKey;
        const box=document.createElement('div');
        box.className='minimap-room'+(isHere?' here':'');
        box.textContent=isHere?'ANDA DI SINI':room.label.toUpperCase();
        if(!isHere) box.addEventListener('click',()=>switchRoom(key));
        grid.appendChild(box);
    });
}

function renderCurrentViewLabel(){
    const room=getCurrentRoomData();
    document.getElementById('current-view-label').textContent='CURRENT VIEW: '+museumData[currentFloor].label.toUpperCase()+', '+room.label.toUpperCase();
}

/* Swipe (mobile) & keyboard navigation */
let swipeX=null;
const lorong=document.getElementById('lorong');
lorong.addEventListener('touchstart',e=>{swipeX=e.touches[0].clientX},{passive:true});
lorong.addEventListener('touchend',e=>{
    if(swipeX===null) return;
    const dx=swipeX-e.changedTouches[0].clientX;
    if(Math.abs(dx)>45) naviPameran(dx>0?1:-1);
    swipeX=null;
});
document.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft') naviPameran(-1);
    if(e.key==='ArrowRight') naviPameran(1);
    if(e.key==='Escape'){tutupDetail();tutupDetailScan();}
});

/* ─── DETAIL MODAL (dipakai halaman Pameran) ─── */
function bukaDetail(hs){
    markHotspotViewed(hs.nama);
    document.getElementById('modal-nama').textContent=(hs.nama||'').toUpperCase();
    const img=document.getElementById('modal-img');
    const imgSection=document.getElementById('modal-img-section');
    imgSection.classList.remove('zoomed');
    if(hs.img){img.src=hs.img;img.style.display='block';}else{img.style.display='none';}

    /* Simpan semua teks (ID & EN) ke helper terpusat */
    setDetailTexts(hs, {
        penjelasan: 'tab-penjelasan',
        psikologi:  'tab-psikologi',
        hubungan:   'tab-hubungan'
    });

    /* Tampilkan teks Bahasa Indonesia sebagai default */
    applyDetailTextsForLang('id');

    switchDetailTab('penjelasan','detail-tabs','#detail-zoom .detail-tab-panel');

    /* Reset toggle bahasa ke Indonesia */
    currentAudioMeta={id:hs.audio||'',en:hs.audioEn||''};
    document.querySelectorAll('#audio-lang-toggle .lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang==='id'));
    loadAudioForLang('id','audio-player-ui','audio-lang-toggle');

    const m=document.getElementById('detail-zoom');
    m.style.display='flex';requestAnimationFrame(()=>m.classList.add('show'));
}

function tutupDetail(){
    stopAudio();
    document.getElementById('modal-img-section').classList.remove('zoomed');
    const m=document.getElementById('detail-zoom');
    m.classList.remove('show');setTimeout(()=>m.style.display='none',320);
}
document.getElementById('detail-zoom').addEventListener('click',function(e){if(e.target===this)tutupDetail();});
