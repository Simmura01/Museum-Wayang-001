/**
 * Dalang Shooter — launcher dari halaman Museum Wayang
 * Sebelumnya: Dalang Rhythm (diperbarui)
 */

function bukaRhythmGame() {
  // Navigasi ke game
  window.location.href = 'finger-Tracking-Game-main/index.html';
}

// ── Auto-navigate ke halaman Wahana saat kembali dari game ───────────────────
// Ketika halaman museum dimuat dengan hash #wahana, langsung tampilkan halaman Wahana
(function () {
  if (window.location.hash === '#wahana') {
    // Hapus hash agar tidak memengaruhi navigasi berikutnya
    history.replaceState(null, '', window.location.pathname);

    // Tunggu hingga DOM siap, lalu pindah ke halaman wahana
    document.addEventListener('DOMContentLoaded', function () {
      if (typeof changePage === 'function') {
        changePage('wahana');
      }
    });

    // Fallback jika DOMContentLoaded sudah terlewat
    if (document.readyState !== 'loading') {
      if (typeof changePage === 'function') {
        changePage('wahana');
      }
    }
  }
})();
