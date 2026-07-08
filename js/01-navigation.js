/* ============================================================
   01-NAVIGATION.JS
   Perpindahan antar halaman/section utama (dipanggil dari
   tombol #nav-menu). Memicu build ulang grid Jelajah &
   render ulang Pencapaian saat halaman tsb dibuka.
   ============================================================ */
function changePage(id){
    stopAudio();
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('#nav-menu .nav-btn').forEach(b=>{
        b.classList.toggle('active', b.dataset.page===id);
    });
    if(id==='jelajah'){ buildJelajahGrid(); cekTutorial(); }
    if(id==='pencapaian'){ renderPencapaian(); }
}
