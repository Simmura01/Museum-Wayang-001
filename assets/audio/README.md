# assets/audio/  (Narasi Bahasa Indonesia)

Format: `assets/audio/<slug>.mp3` untuk ID, `assets/audio/en/<slug>.mp3` untuk EN
(mengikuti konvensi yang sudah dipakai tim: audio/name.mp3 + audio/en/name.mp3).

Slug mengikuti nama tokoh pada `Naskah-VoiceOver-Wayang.md`:

| Slug         | Tokoh        | File ID (folder ini)     | File EN (folder en/)         |
|--------------|--------------|---------------------------|-------------------------------|
| ramawijaya   | Ramawijaya   | ramawijaya.mp3             | en/ramawijaya.mp3              |
| rahwana      | Rahwana      | rahwana.mp3                | en/rahwana.mp3                 |
| duryudana    | Duryudana    | duryudana.mp3              | en/duryudana.mp3               |

> CATATAN PERBAIKAN: Pada file asli sebelumnya, audio Ramawijaya &
> Rahwana sama-sama menunjuk ke "rahwana indonesia.mpeg" (tertukar),
> dan audio Duryudana menunjuk ke "audio/nakula.mp3" (salah tokoh).
> Path di js/03-pameran-data.js sudah diperbaiki agar tiap tokoh
> punya file audio sendiri sesuai nama di atas — tinggal isi file
> mp3-nya sesuai naskah voice-over yang sudah dibuat.
