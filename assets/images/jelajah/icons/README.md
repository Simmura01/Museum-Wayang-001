# assets/images/jelajah/icons/

Ikon bulat yang tampil pada NODE interaktif di halaman Jelajah
(berbeda dari ikon umum di assets/icons/).

Saat ini SEMUA node (node_1_1 s.d. node_6_1) memakai satu file
default yang sama:

| Nama file        |
|-------------------|
| icon-wayang.png   |

Jika ingin ikon unik per tokoh (misalnya siluet Arjuna, siluet Rahwana,
dst.), tambahkan file baru di sini lalu ubah nilai `icon:` pada node
terkait di `js/05-jelajah-data.js`. Jika file ikon tidak ditemukan,
aplikasi otomatis menampilkan ikon siluet wayang generik (SVG fallback)
— jadi aplikasi tetap aman dipakai walau folder ini kosong.
