/* ============================================================
   08-INIT.JS
   Pemanggilan render pertama kali saat halaman dimuat.
   HARUS di-load PALING TERAKHIR (setelah semua file lain),
   karena memanggil fungsi-fungsi dari file 04, 06.
   ============================================================ */
try { renderRoomMinimap(); } catch(e){}
try { renderCurrentViewLabel(); } catch(e){}
try { rebuildLorong(); } catch(e){}
try { renderJelajahMinimap(); } catch(e){}

// Inisialisasi khusus untuk halaman-halaman yang sudah dipisah (agar merender grid/pencapaian saat dibuka)
try { if(document.getElementById('jelajah-grid')) { buildJelajahGrid(); cekTutorial(); } } catch(e){}
try { if(document.getElementById('ach-card-scan')) { renderPencapaian(); } } catch(e){}
