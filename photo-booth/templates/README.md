# Template Photo Booth — Museum Wayang Jakarta

## Cara Menambah Template Baru

### 1. Siapkan file PNG dengan area transparan (bolong) untuk tempat foto

### 2. Taruh file di folder yang sesuai:

| Jenis | Folder | Ukuran PNG | Keterangan |
|-------|--------|------------|------------|
| 1 Foto (Single) | `single/` | **1280 x 720 px** (Landscape) | 1 area transparan untuk 1 foto |
| 3 Foto (Strip)  | `strip/`  | **720 x 2160 px** (Portrait)  | 3 area transparan tersusun vertikal |

### 3. Daftarkan di `templates.json`:

```json
{
  "single": [
    { "file": "nama-template.png", "name": "Nama Tampilan" }
  ],
  "strip": [
    { "file": "nama-strip.png", "name": "Nama Tampilan" }
  ]
}
```

### 4. Selesai! Template akan otomatis muncul di web.

## Tips Membuat di Canva
- Buat desain dengan ukuran yang sesuai (lihat tabel di atas)
- Buat area bolong/transparan di tempat yang diinginkan untuk menampilkan foto kamera
- Export sebagai **PNG** (pastikan centang "Transparent background" / "Latar transparan")
