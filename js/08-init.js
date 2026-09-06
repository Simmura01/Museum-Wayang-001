/* ============================================================
   08-INIT.JS
   Pemanggilan render pertama kali saat halaman dimuat.
   HARUS di-load PALING TERAKHIR (setelah semua file lain),
   karena memanggil fungsi-fungsi dari file 04, 06.
   ============================================================ */
renderRoomMinimap();
renderCurrentViewLabel();
rebuildLorong();
renderJelajahMinimap();
