# Digitalisasi Museum Wayang — Struktur Proyek (Modular)

Versi ini adalah hasil pemecahan dari file `index.html` tunggal (all-in-one)
menjadi struktur folder yang lebih rapi: **CSS terpisah per bagian**,
**JS terpisah per fungsi**, dan **folder gambar/audio terorganisir per
lantai → ruang → display/detail**.

## ⚠️ Cara menjalankan

Buka **`index.html`** langsung di browser (double-click) — SUDAH BISA
JALAN tanpa server, karena semua bagian HTML tetap digabung dalam satu
`index.html` (lihat catatan di bawah), sementara CSS & JS dipecah dan
dimuat lewat `<link>` / `<script src="...">`.

Jika nanti proyek ini di-hosting di server sungguhan (bukan dibuka
langsung dari file), Anda bisa lebih lanjut memecah tiap `<div id="...">
class="section">` di index.html menjadi file terpisah dan memuatnya
dengan `fetch()` — tapi cara itu TIDAK bisa dipakai kalau file cuma
dibuka dobel-klik (browser memblokir `fetch()` ke file lokal karena
alasan keamanan/CORS). Karena mentor & tim kemungkinan besar ingin buka
langsung tanpa setup server, HTML sengaja dibiarkan menyatu di satu
file agar 100% aman dijalankan di mana saja.

## Struktur folder

```
museum-wayang/
├── index.html                  ← satu-satunya file HTML (lihat catatan di atas)
├── README.md                   ← file ini
├── css/                        ← CSS dipecah per bagian/fungsi
│   ├── 00-variables-reset.css      variabel warna + reset dasar
│   ├── 01-welcome.css              layar sambutan
│   ├── 02-navigation.css           menu navigasi atas
│   ├── 03-layout-sections.css      kerangka umum tiap "halaman"
│   ├── 04-beranda.css              halaman Beranda
│   ├── 05-shared-gallery.css       elemen bersama Pameran/Jelajah/Pencapaian
│   ├── 06-pameran.css              halaman Pameran
│   ├── 07-jelajah.css              halaman Jelajah
│   ├── 08-pencapaian.css           halaman Pencapaian
│   ├── 09-modals.css               semua jendela modal
│   └── 10-responsive.css           media query (HARUS terakhir)
├── js/                          ← JS dipecah per fungsi
│   ├── 00-welcome.js                klik layar welcome
│   ├── 01-navigation.js             pindah halaman (changePage)
│   ├── 02-audio-modal-helpers.js    audio player + modal generik (bersama)
│   ├── 03-pameran-data.js           DATA koleksi wayang (museumData)
│   ├── 04-pameran.js                logika halaman Pameran
│   ├── 05-jelajah-data.js           DATA node Jelajah (dataJelajah)
│   ├── 06-jelajah.js                logika halaman Jelajah + scanner QR
│   ├── 07-pencapaian.js             logika halaman Pencapaian
│   └── 08-init.js                   render pertama kali (HARUS terakhir)
└── assets/
    ├── video/                   welcome2.mp4 (video mascot)
    ├── icons/                   ikon umum (qr, panduan, unesco, law, dll.)
    ├── audio/                   narasi ID (+ folder en/ untuk EN)
    └── images/
        ├── beranda/              foto background Beranda (museum.jpeg)
        ├── pameran/
        │   ├── lantai1/
        │   │   ├── ruang1/
        │   │   │   ├── display/    foto lemari utuh (5 display)
        │   │   │   └── detail/     foto close-up: ramawijaya, rahwana, duryudana
        │   │   └── ruang2/
        │   │       ├── display/    (placeholder, 9 display)
        │   │       └── detail/     (placeholder)
        │   └── lantai2/
        │       ├── ruangA/
        │       │   ├── display/    display6.jpeg + placeholder
        │       │   └── detail/     (placeholder)
        │       └── ruangB/
        │           ├── display/    (placeholder)
        │           └── detail/     (placeholder)
        ├── jelajah/icons/        ikon bulat untuk node QR di halaman Jelajah
        └── pencapaian/icons/     ikon 4 badge pencapaian
```

Setiap sub-folder gambar/audio punya `README.md` sendiri yang
menjelaskan persis nama file apa yang harus diisi dan dipakai di mana.

## Kenapa dipecah seperti ini?

- **CSS per bagian** → gampang cari style Beranda vs Pameran vs Jelajah
  tanpa scroll ratusan baris. `05-shared-gallery.css` sengaja dipisah
  karena isinya dipakai bersama oleh 3 halaman (background bertekstur,
  panel lantai, mini-map ruangan) — mengedit di situ otomatis
  memengaruhi ketiganya.
- **JS per fungsi** → data (`03-pameran-data.js`, `05-jelajah-data.js`)
  dipisah dari logika (`04-pameran.js`, `06-jelajah.js`), supaya
  menambah/mengedit koleksi wayang cukup buka 1 file data saja tanpa
  menyentuh kode fungsi.
- **Folder gambar per lantai/ruang/display-detail** → path gambar jadi
  self-explanatory, dan tim bisa langsung tahu foto lemari (`display/`)
  vs foto close-up satu tokoh (`detail/`) harus ditaruh di mana.

## Perbaikan kecil yang ikut dilakukan

Path audio pada 3 koleksi utama (Ramawijaya, Rahwana, Duryudana) di
file asli saling tertukar/salah tokoh. Sudah diperbaiki agar tiap
tokoh punya path audio sendiri (`assets/audio/<slug>.mp3` +
`assets/audio/en/<slug>.mp3`) sesuai nama pada naskah voice-over yang
sudah dibuat — file mp3 asli tinggal ditambahkan ke folder tersebut.

## Menambah koleksi wayang baru

1. Tambahkan entri baru di `js/03-pameran-data.js` (untuk Pameran) dan
   `js/05-jelajah-data.js` (untuk Jelajah, jika ingin ada di kuis).
2. Taruh foto lemari di `.../display/` dan foto close-up di `.../detail/`.
3. Taruh audio di `assets/audio/<slug>.mp3` dan `assets/audio/en/<slug>.mp3`.

Tidak perlu menyentuh file HTML/CSS sama sekali untuk menambah koleksi.
