/* ============================================================
   06-JELAJAH.JS
   Logika halaman Jelajah: render grid node, scanner QR,
   modal detail hasil scan, kuis, dan progress (localStorage).
   Membutuhkan: 05-jelajah-data.js, 03-pameran-data.js (untuk
   getHotspotByRef), dan 02-audio-modal-helpers.js
   ============================================================ */

let currentJFloor = 'lantai1';
let currentJRoom  = 'ruang1';
let currentNodeId = '';
let html5QrcodeScanner = null;
let scanTargetNodeId = '';

function switchJFloor(floorKey){
    if(floorKey===currentJFloor) return;
    currentJFloor=floorKey;
    currentJRoom=Object.keys(jelajahData[floorKey].rooms)[0];
    document.querySelectorAll('.floor-btn[data-jfloor]').forEach(b=>b.classList.toggle('active',b.dataset.jfloor===currentJFloor));
    renderJelajahMinimap();buildJelajahGrid();
}
function switchJRoom(roomKey){
    if(roomKey===currentJRoom) return;
    currentJRoom=roomKey;
    renderJelajahMinimap();buildJelajahGrid();
}
function renderJelajahMinimap(){
    const rooms=jelajahData[currentJFloor].rooms;
    document.getElementById('jelajah-minimap-title').textContent='PETA RUANGAN ('+jelajahData[currentJFloor].label.toUpperCase()+')';
    const grid=document.getElementById('jelajah-minimap-grid');grid.innerHTML='';
    Object.entries(rooms).forEach(([key,room])=>{
        const isHere=key===currentJRoom;
        const box=document.createElement('div');box.className='minimap-room'+(isHere?' here':'');
        box.textContent=isHere?'ANDA DI SINI':room.label.toUpperCase();
        if(!isHere) box.addEventListener('click',()=>{switchJRoom(key);});
        grid.appendChild(box);
    });
    const room=jelajahData[currentJFloor].rooms[currentJRoom];
    document.getElementById('jelajah-view-label').textContent=jelajahData[currentJFloor].label.toUpperCase()+' — '+room.label.toUpperCase()+' — '+room.fullLabel.toUpperCase();
}

/* Build Grid Jelajah — dengan dukungan ikon custom + fallback SVG */
function buildJelajahGrid(){
    const grid=document.getElementById('jelajah-grid');
    grid.innerHTML='';
    const roomData=jelajahData[currentJFloor].rooms[currentJRoom];
    const p=getProgress();
    if(!roomData.displays||roomData.displays.length===0){
        const msg=document.createElement('div');
        msg.style.cssText='font-family:"Cinzel",serif;font-size:.8rem;color:var(--muted);letter-spacing:2px;text-align:center;padding:40px;';
        msg.textContent='Ruangan ini belum memiliki koleksi terdaftar.';
        grid.appendChild(msg);
        updateProgressUI();return;
    }
    roomData.displays.forEach((nodes,di)=>{
        const box=document.createElement('div');box.className='j-display-box';
        const cabinet=document.createElement('div');cabinet.className='j-cabinet';
        const cabLabel=document.createElement('div');cabLabel.className='j-cabinet-label';
        cabLabel.textContent='DISPLAY '+(di+1);
        cabinet.appendChild(cabLabel);
        nodes.forEach(nodeId=>{
            const data=dataJelajah[nodeId];
            const nodeWrap=document.createElement('div');
            nodeWrap.style.cssText='display:flex;flex-direction:column;align-items:center;gap:4px;';

            const node=document.createElement('div');
            node.className='j-node';node.id=nodeId;

            if(data && data.icon){
                const iconImg=document.createElement('img');
                iconImg.src=data.icon;
                iconImg.alt=data.nama||nodeId;
                iconImg.className='j-node-icon';
                iconImg.onerror=function(){
                    this.remove();
                    node.appendChild(createNodeFallbackSVG());
                };
                node.appendChild(iconImg);
            } else {
                node.appendChild(createNodeFallbackSVG());
            }

            const statusEl=document.createElement('div');statusEl.className='j-node-status';statusEl.textContent='?';
            node.appendChild(statusEl);

            if(p[nodeId]?.quizDone){
                node.classList.add('gold');statusEl.classList.add('quiz-done');statusEl.textContent='✓';
            } else if(p[nodeId]?.scanned){
                node.classList.add('scanned-only');statusEl.classList.add('scanned');statusEl.textContent='📷';
            }
            node.onclick=()=>klikNode(nodeId);

            const nameLbl=document.createElement('div');
            nameLbl.style.cssText='font-family:"Cinzel",serif;font-size:.45rem;color:var(--muted);letter-spacing:.8px;text-align:center;max-width:60px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;';
            nameLbl.textContent=data?data.nama:'???';
            nodeWrap.appendChild(node);nodeWrap.appendChild(nameLbl);
            cabinet.appendChild(nodeWrap);
        });
        const label=document.createElement('div');label.className='j-label-btn';
        label.textContent='DISPLAY '+(di+1);
        box.appendChild(cabinet);box.appendChild(label);
        grid.appendChild(box);
    });
    updateProgressUI();
}

/* Helper: buat SVG fallback untuk node tanpa ikon */
function createNodeFallbackSVG(){
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 24 40');
    svg.setAttribute('xmlns',ns);
    svg.classList.add('j-node-svg-fallback');
    svg.innerHTML=`
        <ellipse cx="12" cy="6" rx="5" ry="5.5" fill="currentColor"/>
        <rect x="9" y="11" width="6" height="14" rx="2" fill="currentColor"/>
        <rect x="4" y="13" width="5" height="9" rx="2" fill="currentColor"/>
        <rect x="15" y="13" width="5" height="9" rx="2" fill="currentColor"/>
        <rect x="10" y="25" width="3" height="11" rx="1.5" fill="currentColor"/>
        <rect x="13" y="25" width="3" height="11" rx="1.5" fill="currentColor"/>
    `;
    svg.style.color='var(--gold-pale)';
    return svg;
}

/* ─── Progress (localStorage) ─── */
function getProgress(){
    try{return JSON.parse(localStorage.getItem('museumProgress'))||{};}catch(e){return {};}
}
function saveProgress(p){
    try{localStorage.setItem('museumProgress',JSON.stringify(p));}catch(e){}
}

/* ─── Klik Node ─── */
function klikNode(nodeId){
    currentNodeId=nodeId;
    const p=getProgress();
    if(p[nodeId]?.quizDone){
        bukaDetailScan(nodeId,false);
    } else if(p[nodeId]?.scanned){
        bukaDetailScan(nodeId,true);
    } else {
        scanTargetNodeId=nodeId;
        document.getElementById('judul-scanner').textContent='Scan QR: '+(dataJelajah[nodeId]?.nama||nodeId);
        bukaModal('modal-scanner');
        setTimeout(()=>avviaScanner(),500);
    }
}

function bukaModalScan(){
    scanTargetNodeId='';
    document.getElementById('judul-scanner').textContent='Scan QR Code Wayang';
    bukaModal('modal-scanner');
    setTimeout(()=>avviaScanner(),500);
}

function getHotspotByRef(ref){
    if(!ref) return null;
    const parts=ref.split('.');
    if(parts.length<4) return null;
    const [flr,room,dispIdx,hsIdx]=parts;
    try{
        return museumData[flr].rooms[room].displays[parseInt(dispIdx)].hotspots[parseInt(hsIdx)];
    }catch(e){return null;}
}

function bukaDetailScan(nodeId,showKuisBtn){
    const data=dataJelajah[nodeId];
    if(!data) return;
    const hs=getHotspotByRef(data.museumRef);
    document.getElementById('scan-modal-nama').textContent=(data.nama||'').toUpperCase();
    const img=document.getElementById('scan-modal-img');
    const imgSec=document.getElementById('scan-modal-img-section');
    imgSec.classList.remove('zoomed');
    if(hs&&hs.img){img.src=hs.img;img.style.display='block';}
    else{img.style.display='none';}
    document.getElementById('scan-tab-penjelasan').textContent=(hs&&hs.desc)||data.nama+' — informasi lengkap sedang disusun oleh tim kurator.';
    document.getElementById('scan-tab-psikologi').textContent=(hs&&hs.psikologi)||'Analisis psikologi tokoh ini akan segera dilengkapi.';
    document.getElementById('scan-tab-hubungan').textContent=(hs&&hs.hubungan)||'Informasi hubungan tokoh ini akan segera dilengkapi.';
    switchDetailTab('penjelasan','scan-detail-tabs','#modal-detail-scan .detail-tab-panel');
    currentAudioMeta={id:(hs&&hs.audio)||'',en:(hs&&hs.audioEn)||''};
    document.querySelectorAll('#scan-audio-lang-toggle .lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang==='id'));
    loadAudioForLang('id','scan-audio-player-ui','scan-audio-lang-toggle');
    const foot=document.querySelector('#modal-detail-scan .modal-foot');
    const p=getProgress();
    if(p[nodeId]?.quizDone){
        foot.innerHTML='<button class="btn-detail" onclick="tutupDetailScan()">TUTUP</button><span style="font-family:\'Cinzel\',serif;font-size:.7rem;color:var(--gold);align-self:center;">✓ KUIS SELESAI</span>';
    } else {
        foot.innerHTML='<button class="btn-detail" onclick="tutupDetailScan()">TUTUP</button><button class="btn-detail" style="background:linear-gradient(90deg,#1a3a05,#3a6010,#5ab025,#8ae840,#5ab025,#3a6010,#1a3a05);letter-spacing:2px;" onclick="lanjutKuisDariDetail()">LANJUT KUIS ➔</button>';
    }
    const m=document.getElementById('modal-detail-scan');
    m.style.display='flex';requestAnimationFrame(()=>m.classList.add('show'));
}

function tutupDetailScan(){
    stopAudio();
    document.getElementById('scan-modal-img-section').classList.remove('zoomed');
    const m=document.getElementById('modal-detail-scan');
    m.classList.remove('show');setTimeout(()=>m.style.display='none',320);
}

function lanjutKuisDariDetail(){
    tutupDetailScan();
    setTimeout(()=>mulaiKuis(),350);
}

document.getElementById('modal-detail-scan').addEventListener('click',function(e){if(e.target===this)tutupDetailScan();});

/* ─── QR SCANNER ─── */
function avviaScanner(){
    const readerEl=document.getElementById('reader');readerEl.innerHTML='';
    if(html5QrcodeScanner){try{html5QrcodeScanner.clear();}catch(e){}html5QrcodeScanner=null;}
    html5QrcodeScanner=new Html5QrcodeScanner("reader",{fps:10,qrbox:{width:220,height:220},rememberLastUsedCamera:true,supportedScanTypes:[Html5QrcodeScanType.SCAN_TYPE_CAMERA]},false);
    html5QrcodeScanner.render(
        function(decodedText){prosesHasilScan(decodedText);},
        function(error){}
    );
}
function prosesHasilScan(teks){
    hentiScanner();
    const prefix='WAYANG:';
    if(teks.startsWith(prefix)){
        const nodeId=teks.substring(prefix.length).trim();
        if(dataJelajah[nodeId]){
            currentNodeId=nodeId;
            tutupModal('modal-scanner');
            const p=getProgress();
            if(!p[nodeId]) p[nodeId]={};
            p[nodeId].scanned=true;
            saveProgress(p);
            updateProgressUI();
            buildJelajahGrid();
            setTimeout(()=>bukaDetailScan(nodeId,true),350);
        } else {
            tampilkanPesanScan('⚠️ Wayang "'+nodeId+'" tidak ada dalam database.');
        }
    } else {
        tampilkanPesanScan('⚠️ QR Code tidak dikenali.<br>Format yang benar: <span style="color:var(--gold)">WAYANG:node_X_Y</span>');
    }
}
function tampilkanPesanScan(pesan){
    document.getElementById('reader').innerHTML=`<div style="padding:20px;color:var(--gold);font-family:'Cinzel',serif;font-size:.78rem;text-align:center;line-height:1.7">${pesan}<br><br><button class="btn-detail" style="padding:8px 20px" onclick="avviaScanner()">Coba Lagi</button></div>`;
}
function hentiScanner(){
    if(html5QrcodeScanner){try{html5QrcodeScanner.clear();}catch(e){}html5QrcodeScanner=null;}
}
function tutupScanner(){hentiScanner();tutupModal('modal-scanner');}
function simulasiScanSukses(){
    let targetId=scanTargetNodeId||currentNodeId;
    if(!targetId||!dataJelajah[targetId]){
        const p=getProgress();
        const ALL_NODES=Object.keys(dataJelajah);
        targetId=ALL_NODES.find(id=>!p[id]?.quizDone)||ALL_NODES[0];
    }
    prosesHasilScan('WAYANG:'+targetId);
}

/* ─── Kuis ─── */
function mulaiKuis(){
    const data=dataJelajah[currentNodeId];if(!data) return;
    document.getElementById('kuis-sub-nama').textContent=data.nama;
    document.getElementById('teks-pertanyaan').textContent=data.q;
    const kotakOpsi=document.getElementById('opsi-jawaban');kotakOpsi.innerHTML='';
    data.opsi.forEach((jawaban,idx)=>{
        const btn=document.createElement('button');btn.className='btn-jawaban';btn.textContent=jawaban;
        btn.onclick=()=>cekJawaban(idx,data.ans,btn);
        kotakOpsi.appendChild(btn);
    });
    bukaModal('modal-kuis');
}
function cekJawaban(dipilih,benar,btnEl){
    document.querySelectorAll('#opsi-jawaban .btn-jawaban').forEach(b=>b.onclick=null);
    if(dipilih===benar){
        btnEl.classList.add('benar-anim');
        btnEl.textContent='✓ '+btnEl.textContent+' (Benar!)';
        const p=getProgress();
        if(!p[currentNodeId]) p[currentNodeId]={};
        p[currentNodeId].quizDone=true;p[currentNodeId].scanned=true;
        saveProgress(p);
        const nodeEl=document.getElementById(currentNodeId);
        if(nodeEl){nodeEl.classList.add('gold');nodeEl.classList.remove('scanned-only');}
        updateProgressUI();buildJelajahGrid();
        setTimeout(()=>{
            tutupModal('modal-kuis');
            document.getElementById('hasil-kuis-icon').textContent='🏆';
            document.getElementById('hasil-kuis-judul').textContent='Hebat!';
            document.getElementById('hasil-kuis-teks').textContent='Kamu berhasil menjawab dengan benar! Koleksi '+dataJelajah[currentNodeId].nama+' berhasil dikumpulkan.';
            bukaModal('modal-hasil-kuis');
        },1200);
    } else {
        btnEl.classList.add('salah-anim');btnEl.textContent='✗ '+btnEl.textContent;
        const semua=document.querySelectorAll('#opsi-jawaban .btn-jawaban');
        if(semua[benar]) semua[benar].classList.add('benar-anim');
        setTimeout(()=>{
            tutupModal('modal-kuis');
            document.getElementById('hasil-kuis-icon').textContent='📚';
            document.getElementById('hasil-kuis-judul').textContent='Hampir!';
            document.getElementById('hasil-kuis-teks').textContent='Jawaban yang benar adalah: '+dataJelajah[currentNodeId].opsi[benar]+'. Pelajari lagi di halaman Pameran!';
            bukaModal('modal-hasil-kuis');
        },1800);
    }
}

function updateProgressUI(){
    const p=getProgress();
    const ALL=Object.keys(dataJelajah);
    let totalScanned=0,totalQuiz=0;
    ALL.forEach(id=>{
        if(p[id]?.scanned||p[id]?.quizDone) totalScanned++;
        if(p[id]?.quizDone) totalQuiz++;
    });
    document.getElementById('text-scan').textContent='Scanned: '+totalScanned+' / '+ALL.length;
    document.getElementById('bar-scan').style.width=(totalScanned/ALL.length*100)+'%';
    document.getElementById('text-quiz').textContent='Kuis: '+totalQuiz+' / '+ALL.length;
    document.getElementById('bar-quiz').style.width=(totalQuiz/ALL.length*100)+'%';
}

/* ─── Tutorial ─── */
function cekTutorial(){
    try{if(!localStorage.getItem('tutorialJelajahSelesai')) bukaTutorial();}catch(e){bukaTutorial();}
}
function bukaTutorial(){bukaModal('modal-tutorial');}
function tutupTutorial(){
    try{localStorage.setItem('tutorialJelajahSelesai','true');}catch(e){}
    tutupModal('modal-tutorial');
}
