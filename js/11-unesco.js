/**
 * Logika Modal Sertifikat UNESCO
 */

function bukaModalUnesco() {
    const modal = document.getElementById('modal-unesco');
    if (!modal) return;

    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function tutupModalUnesco() {
    const modal = document.getElementById('modal-unesco');
    if (!modal) return;

    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

// Daftarkan fungsi ke window agar bisa dipanggil dari inline onclick HTML
window.bukaModalUnesco = bukaModalUnesco;
window.tutupModalUnesco = tutupModalUnesco;
