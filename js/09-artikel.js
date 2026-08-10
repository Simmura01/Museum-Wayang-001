/* ============================================================
   09-ARTIKEL.JS
   Data & logika artikel di halaman Beranda.
   Tiga artikel: Sejarah Wayang, UNESCO, Melestarikan Wayang.
   ============================================================ */

const artikelData = {

    sejarah: {
        judul: 'Sejarah & Asal-Usul Wayang Nusantara',
        kategori: '📜 Artikel Sejarah · Museum Wayang Jakarta',
        konten: `
            <img src="assets/images/artikel/sejarah.jpg" alt="Ilustrasi Sejarah Wayang" class="artikel-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <p class="art-intro">
                Wayang merupakan salah satu warisan budaya tertua dan paling kaya makna yang lahir di bumi Nusantara.
                Seni pertunjukan boneka bayangan ini telah hadir setidaknya sejak abad ke-9 Masehi, jauh sebelum kerajaan-kerajaan
                besar Nusantara mencapai puncak kejayaannya.
            </p>

            <h4 class="art-section-heading">Akar Sejarah</h4>
            <p class="art-paragraph">
                Bukti tertua keberadaan wayang ditemukan dalam prasasti Balitung dari tahun 907 Masehi, yang menyebut kata
                <em>"mawayang"</em> — merujuk pada pertunjukan bayangan wayang kulit. Pada masa itu, wayang telah menjadi
                bagian tak terpisahkan dari ritual keagamaan, upacara adat, dan hiburan istana.
            </p>
            <p class="art-paragraph">
                Pengaruh India masuk melalui jalur perdagangan dan penyebaran agama Hindu-Buddha, membawa kisah epik
                Mahabharata dan Ramayana ke Nusantara. Namun para seniman lokal tidak sekadar menyalin — mereka
                mentransformasi kisah-kisah tersebut dengan nilai-nilai kearifan lokal Jawa, Bali, dan Sunda, melahirkan
                tokoh-tokoh asli seperti Semar, Gareng, Petruk, dan Bagong (Punakawan) yang menjadi simbol kebijaksanaan
                rakyat jelata.
            </p>

            <h4 class="art-section-heading">Perkembangan di Masa Kerajaan</h4>
            <ul class="art-list">
                <li><strong>Abad ke-10–13 (Kerajaan Kediri & Singhasari)</strong>
                    Kisah Mahabharata disesuaikan dengan budaya Jawa. Tokoh Punakawan mulai muncul sebagai inovasi asli Nusantara.</li>
                <li><strong>Abad ke-14–16 (Majapahit)</strong>
                    Wayang mencapai puncak kematangan artistiknya. Bentuk wayang kulit distilasi menjadi siluet dua dimensi yang kaya ornamen.</li>
                <li><strong>Abad ke-15–17 (Penyebaran Islam)</strong>
                    Para Wali Songo, khususnya Sunan Kalijaga, menggunakan wayang sebagai media dakwah Islam yang bijaksana,
                    memperkenalkan lakon-lakon baru bernapaskan ajaran Islam tanpa merusak tradisi.</li>
                <li><strong>Abad ke-19–20 (Kolonial & Modern)</strong>
                    Di bawah pengaruh VOC dan kolonial Belanda, wayang tetap lestari karena perlindungan kerajaan-kerajaan Jawa.
                    Wayang mulai didokumentasikan secara akademis oleh para peneliti Barat.</li>
            </ul>

            <h4 class="art-section-heading">Jenis-Jenis Wayang Utama</h4>
            <ul class="art-list">
                <li><strong>Wayang Kulit</strong>Jenis paling tua dan paling dikenal. Dibuat dari kulit kerbau yang ditatah halus, dimainkan di balik layar putih (kelir) dengan cahaya lampu blencong.</li>
                <li><strong>Wayang Golek</strong>Wayang tiga dimensi dari kayu, populer di Jawa Barat dan Jawa Tengah. Dapat dimainkan tanpa layar.</li>
                <li><strong>Wayang Klitik (Karucil)</strong>Wayang pipih dari kayu tipis, berasal dari Jawa Timur, biasanya membawakan kisah Damarwulan.</li>
                <li><strong>Wayang Beber</strong>Wayang tertua dalam bentuk gulungan kain atau kertas bergambar, sambil dalang menceritakan kisah secara lisan.</li>
            </ul>

            <h4 class="art-section-heading">Peran Dalang</h4>
            <p class="art-paragraph">
                Dalang bukan sekadar penggerak boneka — ia adalah seniman, filsuf, dan pendeta dalam satu sosok.
                Seorang dalang harus menguasai ribuan karakter wayang, hafal puluhan lakon, memimpin orkestra gamelan,
                memiliki suara untuk puluhan tokoh berbeda, serta memiliki pemahaman mendalam atas filsafat Jawa dan
                kosmologi Hindu-Buddha-Islam.
            </p>
            <p class="art-paragraph">
                Pertunjukan wayang semalam suntuk (semalam penuh, 8–12 jam) adalah tradisi yang masih dipertahankan
                hingga kini dalam upacara-upacara penting seperti pernikahan, khitanan, dan bersih desa.
            </p>

            <div class="art-penutup">
                 Wayang adalah jiwa Nusantara —<br>
                cermin manusia, alam, dan semesta<br>
                yang terus hidup dalam setiap generasi.
            </div>
        `
    },

    unesco: {
        judul: 'Wayang & Pengakuan UNESCO 2003',
        kategori: '🌐 Artikel Internasional · Museum Wayang Jakarta',
        konten: `
            <img src="assets/images/artikel/images.jfif" alt="Ilustrasi UNESCO Wayang" class="artikel-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <p class="art-intro">
                Pada 7 November 2003, di Paris, Prancis, UNESCO secara resmi menetapkan Wayang Indonesia sebagai
                <em>Masterpiece of the Oral and Intangible Heritage of Humanity</em> — sebuah pengakuan tertinggi
                atas keagungan seni budaya bangsa Indonesia di mata dunia.
            </p>

            <h4 class="art-section-heading">Latar Belakang Pengakuan UNESCO</h4>
            <p class="art-paragraph">
                UNESCO mendirikan program Masterpiece of Oral and Intangible Heritage pada tahun 1997, bertujuan
                melindungi tradisi lisan dan ekspresi budaya takbenda dari kepunahan akibat globalisasi.
                Indonesia mengajukan wayang sebagai kandidat setelah melalui penelitian mendalam yang menunjukkan
                kompleksitas dan keunikan wayang yang tak tertandingi.
            </p>
            <p class="art-paragraph">
                Klaim dari negara tetangga atas beberapa unsur budaya Indonesia pada awal 2000-an juga mempercepat
                langkah pemerintah Indonesia untuk mendaftarkan wayang ke UNESCO sebagai penegasan kedaulatan budaya.
            </p>

            <h4 class="art-section-heading">Kriteria UNESCO yang Dipenuhi Wayang</h4>
            <ul class="art-list">
                <li><strong>Nilai Universal Luar Biasa</strong>
                    Wayang menggabungkan seni rupa, musik, sastra, drama, filsafat, dan spiritualitas dalam satu pertunjukan — kompleksitas yang sangat jarang ditemukan dalam tradisi budaya mana pun di dunia.</li>
                <li><strong>Transmisi Lintas Generasi</strong>
                    Pengetahuan wayang ditransmisikan secara lisan dari dalang senior kepada murid selama berabad-abad, membentuk sistem pendidikan budaya yang organik dan berkelanjutan.</li>
                <li><strong>Ancaman Kepunahan</strong>
                    UNESCO mengidentifikasi wayang menghadapi ancaman serius dari modernisasi, perubahan selera hiburan, dan minimnya regenerasi dalang muda.</li>
                <li><strong>Upaya Perlindungan yang Ada</strong>
                    Pemerintah dan komunitas budaya Indonesia telah menunjukkan komitmen nyata melalui sekolah dalang, festival wayang, dan dokumentasi.</li>
            </ul>

            <h4 class="art-section-heading">Konvensi UNESCO 2003</h4>
            <p class="art-paragraph">
                Bersamaan dengan penetapan Wayang sebagai Masterpiece, UNESCO membuka untuk ratifikasi
                <strong>Convention for the Safeguarding of the Intangible Cultural Heritage (2003)</strong>.
                Indonesia meratifikasi konvensi ini melalui Peraturan Presiden Nomor 78 Tahun 2007, menjadikan
                Indonesia salah satu negara pertama di Asia Tenggara yang berkomitmen penuh pada perlindungan
                warisan budaya takbenda.
            </p>

            <h4 class="art-section-heading">Dasar Hukum Pengesahan Konvensi</h4>
            <div class="art-hukum-item">
                <p><strong>Peraturan Presiden Nomor 78 Tahun 2007</strong> tentang Pengesahan Konvensi untuk Perlindungan Warisan Budaya Takbenda. Dengan Perpres ini, Indonesia secara hukum terikat untuk melindungi, mendokumentasikan, dan melestarikan seluruh warisan budaya takbenda termasuk wayang.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/42178/perpres-no-78-tahun-2007" target="_blank" rel="noopener">LIHAT PERPRES NO. 78/2007 →</a>
            </div>

            <h4 class="art-section-heading">Dampak Pengakuan UNESCO</h4>
            <ul class="art-list">
                <li><strong>Pariwisata Budaya</strong>Pengunjung mancanegara ke Museum Wayang Jakarta meningkat signifikan pasca 2003. Wayang menjadi daya tarik wisata budaya unggulan Indonesia.</li>
                <li><strong>Diplomasi Budaya</strong>Indonesia aktif menggelar pertunjukan wayang di berbagai negara sebagai bagian dari diplomasi budaya dan penguatan soft power.</li>
                <li><strong>Revitalisasi Pendidikan</strong>Berbagai sekolah, sanggar, dan perguruan tinggi seni memasukkan wayang ke dalam kurikulum, didukung oleh pembiayaan pemerintah.</li>
                <li><strong>Penegakan Hukum KIK</strong>Pengakuan UNESCO memperkuat posisi Indonesia dalam sengketa Kekayaan Intelektual Komunal (KIK), mencegah pengklaiman sepihak oleh pihak asing.</li>
            </ul>

            <div class="art-penutup">
                🌐 Pengakuan UNESCO bukan akhir perjuangan —<br>
                melainkan awal tanggung jawab kita bersama<br>
                untuk terus merawat wayang bagi dunia.
            </div>
        `
    },

    pelestarian: {
        judul: 'Melestarikan Wayang: Warisan Budaya untuk Generasi Mendatang',
        kategori: '🌿 Artikel Pelestarian · Museum Wayang Jakarta',
        konten: `
            <img src="assets/images/artikel/ngajar.jpeg" alt="Ilustrasi Pelestarian Wayang" class="artikel-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <p class="art-intro">
                Melestarikan wayang bukan sekadar mempertahankan sebuah seni pertunjukan — ini adalah ikhtiar
                mulia menjaga identitas bangsa, merawat nilai-nilai luhur filosofis, dan memastikan generasi
                mendatang masih dapat mewarisi kekayaan budaya yang tak ternilai ini. Negara hadir melalui
                seperangkat landasan hukum yang kokoh untuk mendukung upaya pelestarian tersebut.
            </p>

            <h4 class="art-section-heading">Mengapa Wayang Perlu Dilestarikan?</h4>
            <p class="art-paragraph">
                Wayang menghadapi tekanan multidimensi di era modern: gempuran hiburan digital, berkurangnya
                minat generasi muda untuk belajar mendalang, minimnya ruang pertunjukan, hingga sengketa
                kepemilikan budaya di tingkat internasional. Tanpa langkah pelestarian yang sistematis dan
                berkesinambungan, keagungan wayang hanya akan tinggal kenangan.
            </p>
            <ul class="art-list">
                <li><strong>Krisis Regenerasi Dalang</strong>
                    Jumlah dalang profesional terus menurun. Rata-rata usia dalang aktif saat ini di atas 50 tahun, sementara penerus muda sangat sedikit karena proses belajar yang panjang dan kompleks.</li>
                <li><strong>Kompetisi Hiburan Digital</strong>
                    Generasi Z lebih akrab dengan media sosial dan hiburan digital. Wayang harus berinovasi dalam penyajian tanpa kehilangan esensi tradisinya.</li>
                <li><strong>Risiko Klaim Asing</strong>
                    Beberapa elemen budaya Indonesia pernah diklaim oleh negara lain. Tanpa dokumentasi dan perlindungan hukum yang kuat, wayang rentan terhadap hal serupa.</li>
                <li><strong>Degradasi Fisik Koleksi</strong>
                    Ribuan wayang kuno tersimpan dalam kondisi yang memerlukan perawatan konservasi intensif. Bahan kulit dan kayu yang berusia ratusan tahun sangat rentan terhadap kerusakan.</li>
            </ul>

            <h4 class="art-section-heading">Pilar-Pilar Pelestarian Wayang</h4>
            <p class="art-paragraph">
                Pelestarian wayang memerlukan pendekatan holistik yang mencakup empat pilar utama:
            </p>
            <ul class="art-list">
                <li><strong>🎓 Pendidikan & Regenerasi</strong>
                    Memasukkan wayang ke kurikulum formal sekolah, mendirikan sanggar-sanggar dalang muda, memberikan beasiswa bagi pelajar seni tradisional, dan mengembangkan program magang dalang senior.</li>
                <li><strong>📚 Dokumentasi & Digitalisasi</strong>
                    Mendokumentasikan secara digital ribuan koleksi wayang, lakon, dan teknik pembuatan. Museum Wayang Jakarta berkomitmen untuk terus mengembangkan platform digital seperti yang Anda gunakan ini.</li>
                <li><strong>🌍 Diplomasi & Promosi Budaya</strong>
                    Aktif membawa pertunjukan wayang ke panggung internasional, berkolaborasi dengan institusi budaya dunia, dan menegaskan kepemilikan Indonesia atas warisan ini di forum-forum internasional.</li>
                <li><strong>⚖️ Perlindungan Hukum</strong>
                    Menegakkan regulasi perlindungan cagar budaya, mendaftarkan kekayaan intelektual komunal, dan mengimplementasikan konvensi-konvensi internasional yang telah diratifikasi Indonesia.</li>
            </ul>

            <h4 class="art-section-heading">Landasan Hukum Pelestarian Wayang</h4>
            <p class="art-paragraph">
                Negara telah menyiapkan kerangka hukum yang komprehensif untuk mendukung pelestarian wayang
                sebagai warisan budaya bangsa:
            </p>

            <div class="art-hukum-item">
                <p><strong>UU No. 11 Tahun 2010 tentang Cagar Budaya</strong> — Undang-undang ini mengatur secara rinci tentang kriteria benda cagar budaya, mekanisme perlindungan, register nasional cagar budaya, hingga ketentuan pidana bagi pelanggar. Wayang kulit kuno yang berusia di atas 50 tahun masuk dalam kategori benda cagar budaya yang dilindungi penuh oleh negara.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/38552/uu-no-11-tahun-2010" target="_blank" rel="noopener">LIHAT UU NO. 11/2010 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>UU No. 5 Tahun 2017 tentang Pemajuan Kebudayaan</strong> — Landasan hukum utama untuk pelindungan, pengembangan, pemanfaatan, dan pembinaan kebudayaan nasional. UU ini secara eksplisit menyebut wayang sebagai salah satu objek pemajuan kebudayaan. Pasal 4 menegaskan bahwa pemajuan kebudayaan bertujuan untuk memperkuat identitas bangsa di tengah peradaban dunia.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/37642/uu-no-5-tahun-2017" target="_blank" rel="noopener">LIHAT UU NO. 5/2017 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>Perpres No. 78 Tahun 2007 tentang Konvensi UNESCO 2003</strong> — Indonesia meratifikasi Konvensi UNESCO tentang Perlindungan Warisan Budaya Takbenda. Ratifikasi ini mengikat Indonesia secara hukum internasional untuk membuat inventaris nasional warisan budaya takbenda, mengimplementasikan program perlindungan, dan melaporkan perkembangan kepada UNESCO secara berkala.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/42178/perpres-no-78-tahun-2007" target="_blank" rel="noopener">LIHAT PERPRES NO. 78/2007 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>PP No. 1 Tahun 2022 tentang Register Nasional & Pelestarian Cagar Budaya</strong> — Peraturan pelaksana UU No. 11/2010 yang mengatur secara teknis mekanisme pendaftaran, penetapan, pengelolaan, dan pemeliharaan cagar budaya nasional termasuk wayang-wayang bersejarah.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/195523/pp-no-1-tahun-2022" target="_blank" rel="noopener">LIHAT PP NO. 1/2022 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>UU No. 28 Tahun 2014 tentang Hak Cipta</strong> — Melindungi ekspresi budaya tradisional (EBT) termasuk pertunjukan wayang, motif ukiran wayang, dan karya-karya turunan. Pasal 38 menegaskan bahwa hak cipta atas ekspresi budaya tradisional dipegang oleh negara.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/37743/uu-no-28-tahun-2014" target="_blank" rel="noopener">LIHAT UU NO. 28/2014 →</a>
            </div>

            <h4 class="art-section-heading">Peran Kita Sebagai Generasi Penerus</h4>
            <p class="art-paragraph">
                Pelestarian wayang bukan hanya tugas pemerintah dan seniman — setiap individu memiliki peran
                nyata yang dapat dimainkan. Mengunjungi museum, menghadiri pertunjukan wayang, berbagi konten
                wayang di media sosial, mendukung pengrajin wayang lokal, dan mengajarkan nilai-nilai wayang
                kepada anak-anak adalah langkah-langkah kecil yang berdampak besar.
            </p>
            <p class="art-paragraph">
                Dengan menggunakan aplikasi digitalisasi Museum Wayang Jakarta ini, Anda telah berkontribusi
                nyata dalam upaya pelestarian wayang — menjaga agar warisan agung ini tetap hidup, relevan,
                dan dikenal oleh generasi mendatang.
            </p>

            <div class="art-penutup">
                🌿 Melestarikan Wayang adalah<br>
                Melestarikan Jiwa Bangsa Indonesia.<br><br>
                Mari bersama menjaga warisan ini<br>
                untuk anak cucu kita.
            </div>
        `
    }
};

/**
 * Membuka modal detail artikel
 * @param {string} id - ID artikel ('sejarah' | 'unesco' | 'pelestarian')
 */
function bukaArtikel(id) {
    const data = artikelData[id];
    if (!data) return;

    document.getElementById('artikel-modal-judul').textContent = data.judul;
    document.getElementById('artikel-modal-kategori').textContent = data.kategori;
    document.getElementById('artikel-modal-body').innerHTML = data.konten;

    // Reset scroll ke atas
    document.getElementById('artikel-modal-body').scrollTop = 0;

    const modal = document.getElementById('modal-artikel');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * Menutup modal detail artikel
 */
function tutupArtikel() {
    const modal = document.getElementById('modal-artikel');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Tutup modal saat klik backdrop
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal-artikel');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) tutupArtikel();
        });
    }

    const modalUU = document.getElementById('modal-uu');
    if (modalUU) {
        modalUU.addEventListener('click', function (e) {
            if (e.target === modalUU) tutupModalUU();
        });
    }
});

/* ============================================================
   DATA PERATURAN — konten dirangkum dari peraturan.bpk.go.id
   ============================================================ */
const uuData = {

    'uu11-2010': {
        judul: 'UU Nomor 11 Tahun 2010',
        jenis: 'Undang-Undang Republik Indonesia',
        tentang: 'Cagar Budaya',
        berlaku: 'Mulai berlaku: 24 November 2010',
        sumber: 'https://peraturan.bpk.go.id/Details/38552/uu-no-11-tahun-2010',
        unduh: 'https://peraturan.bpk.go.id/Download/27798/UU%20Nomor%2011%20Tahun%202010.pdf',
        abstrak: `Undang-Undang ini lahir dari kesadaran bahwa cagar budaya merupakan kekayaan budaya bangsa sebagai wujud pemikiran dan perilaku kehidupan manusia yang penting artinya bagi pemahaman dan pengembangan sejarah, ilmu pengetahuan, dan kebudayaan. Negara bertanggung jawab penuh dalam pengaturan pelindungan, pengembangan, dan pemanfaatan cagar budaya demi kemakmuran rakyat.

UU ini menggantikan UU No. 5 Tahun 1992 tentang Benda Cagar Budaya yang sudah tidak sesuai dengan perkembangan dan kebutuhan hukum masyarakat. Wayang kulit kuno yang berusia di atas 50 tahun secara otomatis dilindungi sebagai benda cagar budaya berdasarkan UU ini.`,
        materi: [
            'Ketentuan Umum & Definisi Cagar Budaya',
            'Asas, Tujuan, dan Lingkup Perlindungan',
            'Kriteria Penetapan Cagar Budaya',
            'Pemilikan, Penguasaan & Pengalihan',
            'Penemuan dan Pencarian Cagar Budaya',
            'Register Nasional Cagar Budaya',
            'Pelestarian: Pelindungan, Pengembangan, Pemanfaatan',
            'Tugas dan Wewenang Pemerintah',
            'Pendanaan & Kompensasi',
            'Pengawasan, Penyidikan & Ketentuan Pidana',
        ]
    },

    'perpres78-2007': {
        judul: 'Perpres Nomor 78 Tahun 2007',
        jenis: 'Peraturan Presiden Republik Indonesia',
        tentang: 'Pengesahan Convention for The Safeguarding of The Intangible Cultural Heritage (Konvensi untuk Perlindungan Warisan Budaya Takbenda)',
        berlaku: 'Mulai berlaku: 5 Juli 2007',
        sumber: 'https://peraturan.bpk.go.id/Details/42178/perpres-no-78-tahun-2007',
        unduh: 'https://peraturan.bpk.go.id/Download/70823/PERPRES%20NO%2078%20TH%202007.pdf',
        abstrak: `Peraturan Presiden ini merupakan instrumen hukum yang mengesahkan Konvensi UNESCO 2003 tentang Perlindungan Warisan Budaya Takbenda di Indonesia. Dengan Perpres ini, Indonesia secara hukum internasional terikat untuk melindungi, mendokumentasikan, dan melestarikan seluruh warisan budaya takbenda — termasuk wayang sebagai Masterpiece UNESCO.

Ratifikasi ini mewajibkan Indonesia untuk: membuat inventaris nasional warisan budaya takbenda, mengimplementasikan program perlindungan konkret, dan melaporkan perkembangan kepada UNESCO secara berkala. Indonesia menjadi salah satu negara pertama di Asia Tenggara yang berkomitmen penuh pada konvensi ini.`,
        materi: [
            'Pengesahan Konvensi UNESCO 2003 secara resmi',
            'Kewajiban inventarisasi warisan budaya takbenda nasional',
            'Program perlindungan dan pelestarian aktif',
            'Pelaporan berkala kepada UNESCO',
            'Kerja sama internasional bidang budaya takbenda',
        ]
    },

    'pp1-2022': {
        judul: 'PP Nomor 1 Tahun 2022',
        jenis: 'Peraturan Pemerintah Republik Indonesia',
        tentang: 'Register Nasional dan Pelestarian Cagar Budaya',
        berlaku: 'Mulai berlaku: 3 Januari 2022',
        sumber: 'https://peraturan.bpk.go.id/Details/195523/pp-no-1-tahun-2022',
        unduh: 'https://peraturan.bpk.go.id/Download/189346/PP%20Nomor%201%20Tahun%202022.pdf',
        abstrak: `Peraturan Pemerintah ini merupakan aturan pelaksana dari UU No. 11 Tahun 2010, yang mengatur secara teknis mekanisme pendaftaran, penetapan, pengelolaan, dan pemeliharaan cagar budaya nasional — termasuk wayang-wayang bersejarah yang disimpan di museum.

PP ini juga memberikan perlindungan terhadap Objek yang Diduga Cagar Budaya (ODCB) dengan memberlakukan status yang sama sebagai Cagar Budaya. Pendanaan pelestarian menjadi tanggung jawab bersama antara Pemerintah Pusat, Pemerintah Daerah, dan masyarakat.`,
        materi: [
            'Register Nasional Cagar Budaya (APBN & APBD)',
            'Pelestarian: Pelindungan, Pengembangan, Pemanfaatan',
            'Pengelolaan Kawasan Cagar Budaya',
            'Insentif dan Kompensasi bagi pemilik/pengelola',
            'Pengawasan dan Penegakan Hukum',
            'Pendanaan bersama Pusat-Daerah-Masyarakat',
        ]
    },

    'uu5-2017': {
        judul: 'UU Nomor 5 Tahun 2017',
        jenis: 'Undang-Undang Republik Indonesia',
        tentang: 'Pemajuan Kebudayaan',
        berlaku: 'Mulai berlaku: 29 Mei 2017',
        sumber: 'https://peraturan.bpk.go.id/Details/37642/uu-no-5-tahun-2017',
        unduh: 'https://peraturan.bpk.go.id/Download/26736/UU%20No%205%20Tahun%202017.pdf',
        abstrak: `Undang-Undang ini hadir dari amanat bahwa Negara memajukan Kebudayaan Nasional Indonesia di tengah peradaban dunia dan menjadikan Kebudayaan sebagai investasi untuk membangun masa depan dan peradaban bangsa. UU ini secara eksplisit menyebut wayang sebagai salah satu objek pemajuan kebudayaan yang wajib dilindungi dan dikembangkan.

Pasal 4 menegaskan bahwa pemajuan kebudayaan bertujuan untuk memperkuat identitas bangsa di tengah peradaban dunia. Pasal 35 mengamanatkan diplomasi budaya internasional, sementara Pasal 43 huruf i & j mendorong kerja sama internasional di bidang kebudayaan.`,
        materi: [
            'Pelindungan Objek Pemajuan Kebudayaan',
            'Pengembangan & Pembinaan Kebudayaan Nasional',
            'Pemajuan Kebudayaan: tujuan memperkuat identitas bangsa',
            'Diplomasi Budaya & Kerja Sama Internasional (Pasal 35)',
            'Sistem Informasi Kebudayaan Nasional',
            'Pendanaan & Peran Pemerintah Daerah',
        ]
    },

    'uu5-2017-diplomasi': {
        judul: 'UU No. 5 Tahun 2017 — Pasal 35 & 43',
        jenis: 'Undang-Undang Republik Indonesia',
        tentang: 'Pemajuan Kebudayaan: Diplomasi Budaya & Kerja Sama Regional',
        berlaku: 'Mulai berlaku: 29 Mei 2017',
        sumber: 'https://peraturan.bpk.go.id/Details/37642/uu-no-5-tahun-2017',
        unduh: 'https://peraturan.bpk.go.id/Download/26736/UU%20No%205%20Tahun%202017.pdf',
        abstrak: `Pasal 35 UU No. 5 Tahun 2017 mengamanatkan bahwa pemerintah wajib melakukan diplomasi budaya untuk memperkuat posisi Indonesia di forum internasional, menjaga citra bangsa, dan mencegah klaim sepihak oleh pihak asing atas warisan budaya Indonesia.

Pasal 43 huruf i & j secara khusus menyebutkan kewajiban peningkatan kerja sama internasional di bidang kebudayaan, termasuk pertukaran budaya, kolaborasi artistik lintas batas, dan partisipasi aktif dalam forum budaya dunia. Bagi wayang, pasal-pasal ini menjadi landasan hukum untuk membawa pertunjukan wayang ke panggung internasional sebagai bagian dari soft power Indonesia.`,
        materi: [
            'Pasal 35: Diplomasi Budaya sebagai kewajiban negara',
            'Pasal 43 (i): Kerja sama internasional bidang kebudayaan',
            'Pasal 43 (j): Pertukaran budaya lintas bangsa',
            'Promosi warisan budaya Indonesia di forum dunia',
            'Pencegahan klaim sepihak warisan budaya',
        ]
    }
};

/* ── URL Download disimpan agar bisa diakses oleh unduhUU() ── */
let _currentUUDownloadUrl = '';

/**
 * Membuka modal detail peraturan
 * @param {string} id - ID peraturan
 */
function bukaModalUU(id) {
    const data = uuData[id];
    if (!data) return;

    _currentUUDownloadUrl = data.unduh;

    // Isi header
    document.getElementById('uu-modal-judul').textContent = data.judul;
    document.getElementById('uu-modal-jenis').textContent = data.jenis;

    // Bangun konten body
    const materiHTML = data.materi.map(m => `<li>${m}</li>`).join('');
    document.getElementById('uu-modal-body').innerHTML = `
        <div class="uu-jenis-badge">${data.jenis}</div>
        <div class="uu-nomor">${data.judul}</div>
        <div class="uu-tentang">${data.tentang}</div>
        <div class="uu-divider"></div>

        <div class="uu-section-label">📋 Abstrak Peraturan</div>
        <div class="uu-abstrak">${data.abstrak.replace(/\n\n/g, '</div><div class="uu-abstrak" style="margin-top:10px;">')}</div>

        <div class="uu-section-label">📑 Materi Pokok Peraturan</div>
        <ul class="uu-materi-list">${materiHTML}</ul>

        <div class="uu-berlaku">⚖️ ${data.berlaku}</div>
    `;

    // Isi bagian sumber
    document.getElementById('uu-modal-source').innerHTML = `
        <span class="uu-source-label">Sumber Resmi:</span>
        <a class="uu-source-link" href="${data.sumber}" target="_blank" rel="noopener">${data.sumber}</a>
    `;

    // Reset scroll ke atas
    document.getElementById('uu-modal-body').scrollTop = 0;

    const modal = document.getElementById('modal-uu');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * Menutup modal detail peraturan
 */
function tutupModalUU() {
    const modal = document.getElementById('modal-uu');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

/**
 * Membuka halaman unduh PDF peraturan
 */
function unduhUU() {
    if (_currentUUDownloadUrl) {
        window.open(_currentUUDownloadUrl, '_blank', 'noopener');
    }
}

