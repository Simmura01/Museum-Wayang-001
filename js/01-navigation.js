/* ============================================================
   01-NAVIGATION.JS
   Perpindahan antar halaman/section utama (dipanggil dari
   tombol #nav-menu). Memicu build ulang grid Jelajah &
   render ulang Pencapaian saat halaman tsb dibuka.
   ============================================================ */
function changePage(id){
    stopAudio();
    const targetUrl = (id === 'beranda') ? 'index.html' : id + '.html';
    if (window.location.pathname.indexOf(targetUrl) === -1) {
        window.location.href = targetUrl;
    }
}

