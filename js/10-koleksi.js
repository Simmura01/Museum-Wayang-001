/* ============================================================
   DATA KOLEKSI MUSEUM WAYANG
   Disusun dari sumber resmi Dinas Kebudayaan DKI Jakarta
   ============================================================ */

const koleksiWayangData = [
    { nama: 'Citrawirya', deskripsi: 'Muka krem, topi hijau, pakaian biru.' },
    { nama: 'Buta Prajurit', deskripsi: 'Terdapat beberapa variasi: muka kuning dengan mahkota merah dan pakaian merah, atau pakaian hijau.' },
    { nama: 'Citrasoma', deskripsi: 'Memakai mahkota, muka kuning, dilengkapi kumis dan janggut, serta baju hijau.' },
    { nama: 'Togog Tejomantri', deskripsi: 'Muka krem, mulut lebar, memakai mahkota, dan pakaian berwarna kuning.' },
    { nama: 'Begawan Abiyasa', deskripsi: 'Muka coklat muda, rambut putih, kumis dan janggut putih, memakai topi dan pakaian putih.' },
    { nama: 'Dorna', deskripsi: 'Muka krem, rambut putih, memakai mahkota, serta baju putih.' },
    { nama: 'Lembu Sura', deskripsi: 'Berwujud makhluk bertanduk dengan muka kuning, badan kuning, dan memakai kain orange.' },
    { nama: 'Siluman Bagong', deskripsi: 'Muka merah, badan merah, dan mengenakan kain merah.' },
    { nama: 'Siluman Babi', deskripsi: 'Berhidung mancung, berwarna hijau, dan mengenakan kain hitam.' },
    { nama: 'Semar', deskripsi: 'Tokoh punakawan utama, berbadan bulat, wajah putih pucat, mewakili kebijaksanaan suci.' },
    { nama: 'Gareng', deskripsi: 'Punakawan dengan ciri khas tangan melengkung (ceko), mata juling, dan kaki pincang.' },
    { nama: 'Petruk', deskripsi: 'Punakawan bertubuh tinggi, hidung panjang, serta wajah tersenyum ramah melambangkan keluwesan.' },
    { nama: 'Bagong', deskripsi: 'Punakawan bertubuh pendek bulat, mata lebar, dan bibir tebal, ceplas-ceplos.' },
    { nama: 'Bima (Werkudara)', deskripsi: 'Ksatria Pandawa bertubuh besar, kuku pancanaka, muka hitam/emas melambangkan ketegasan.' },
    { nama: 'Arjuna (Janaka)', deskripsi: 'Ksatria Pandawa berwajah tampan, mata sipit menunduk, melambangkan kehalusan budi.' },
    { nama: 'Yudhistira (Puntadewa)', deskripsi: 'Sulung Pandawa, berwajah tenang, putih/emas, berbudi luhur tanpa senjata tajam.' },
    { nama: 'Gatotkaca', deskripsi: 'Ksatria pringgodani, bisa terbang, memiliki bintang emas di dada, lambang keberanian.' },
    { nama: 'Rahwana (Dasamuka)', deskripsi: 'Raja raksasa bermuka merah, memiliki sepuluh wajah, perlambang angkara murka.' },
    { nama: 'Rama Bargawa', deskripsi: 'Ksatria sakti dengan senjata kapak, berwajah tegas kebangsawanan.' },
    { nama: 'Srikandi', deskripsi: 'Prajurit wanita tangguh, mahkota khas, wajah menunduk namun tegas, ahli memanah.' },
    { nama: 'Rama Wijaya', deskripsi: 'Tokoh utama Ramayana, berwajah tampan, titisan Wisnu, penegak kebenaran.' },
    { nama: 'Sinta', deskripsi: 'Istri Rama, lambang kesetiaan dan kesucian yang diculik ke Alengka.' },
    { nama: 'Laksmana', deskripsi: 'Adik Rama yang setia, berwajah tampan dan juga penasihat yang ahli memanah.' },
    { nama: 'Hanoman', deskripsi: 'Kera putih sakti mandraguna, duta Rama yang membakar kerajaan Alengka.' },
    { nama: 'Sugriwa', deskripsi: 'Raja kera Gua Kiskenda berwajah merah, sekutu utama Rama melawan Alengka.' },
    { nama: 'Subali', deskripsi: 'Saudara kembar Sugriwa yang sakti, mati karena terperdaya tipu muslihat.' },
    { nama: 'Kumbakarna', deskripsi: 'Raksasa bertubuh sangat besar, adik Rahwana yang rela mati membela tanah airnya.' },
    { nama: 'Wibisana', deskripsi: 'Adik bungsu Rahwana yang menyeberang membela Rama karena memihak kebenaran.' },
    { nama: 'Indrajit', deskripsi: 'Putra mahkota Alengka yang sakti dan memiliki panah gaib Nagapasa.' },
    { nama: 'Kresna', deskripsi: 'Penasihat Pandawa berwajah hitam/krem, titisan Dewa Wisnu yang sangat bijaksana.' },
    { nama: 'Baladewa', deskripsi: 'Kakak Kresna berwajah merah terang, pemarah, bertubuh gagah namun berhati lurus.' },
    { nama: 'Karna', deskripsi: 'Kakak tertua Pandawa yang memihak Kurawa, setara dengan Arjuna dalam panahan.' },
    { nama: 'Duryudana', deskripsi: 'Sulung Kurawa berwajah tampan, lambang keserakahan kekuasaan Hastinapura.' },
    { nama: 'Dursasana', deskripsi: 'Kurawa berwajah merah dan bermulut lebar, lambang kekasaran dan kesombongan.' },
    { nama: 'Sengkuni', deskripsi: 'Patih licik Hastinapura, sumber utama permusuhan besar Mahabharata.' },
    { nama: 'Bisma', deskripsi: 'Kakek Pandawa-Kurawa, kesatria resi yang hidup selibat demi sumpahnya.' },
    { nama: 'Drupadi', deskripsi: 'Permaisuri para Pandawa, simbol keteguhan hati dan martabat perempuan agung.' },
    { nama: 'Abimanyu', deskripsi: 'Putra Arjuna yang tampan, sakti, dan gagah berani di medan Baratayuda.' },
    { nama: 'Antareja', deskripsi: 'Putra sulung Bima, mampu amblas ke bumi dan memiliki ludah berbisa sakti.' },
    { nama: 'Antasena', deskripsi: 'Putra bungsu Bima yang jujur, lugu, kebal senjata, dan hidup di dasar laut.' },
    { nama: 'Wisanggeni', deskripsi: 'Putra Arjuna yang sangat sakti, kebal racun dan api, bicaranya selalu apa adanya.' },
    { nama: 'Drupada', deskripsi: 'Raja Pancala, ayahanda Drupadi, ksatria yang tewas di tangan pandita Dorna.' },
    { nama: 'Salya', deskripsi: 'Raja Mandaraka mertua Duryudana, memiliki ajian mematikan Candabirawa.' },
    { nama: 'Aswatama', deskripsi: 'Putra pendeta Dorna yang berwatak pendendam dan kejam pada akhir perang.' },
    { nama: 'Batara Guru', deskripsi: 'Raja kahyangan, bertangan empat, naik lembu andini, penentu takdir dunia.' },
    { nama: 'Batara Narada', deskripsi: 'Dewa bijak berbadan pendek buncit, penyampai anugerah dan amanat kahyangan.' },
    { nama: 'Batara Bayu', deskripsi: 'Dewa angin yang sakti, pengasuh sekaligus ayah spiritual Bima dan Hanoman.' },
    { nama: 'Batara Indra', deskripsi: 'Dewa cuaca dan hujan, penganugerah keindahan dan pusaka kepada Arjuna.' },
    { nama: 'Cakil', deskripsi: 'Raksasa gesit dengan rahang bawah tonggos, musuh rutin ksatria di adegan perang kembang.' },
    { nama: 'Togog', deskripsi: 'Kakak Semar yang menjadi pamong pihak raksasa, selalu memberi nasihat meski diabaikan.' },
    { nama: 'Prabu Dasarata', deskripsi: 'Raja Ayodya, ayahanda Rama Wijaya yang bijaksana.' },
    { nama: 'Dewi Kosalya', deskripsi: 'Permaisuri Dasarata, ibu kandung Rama Wijaya.' },
    { nama: 'Dewi Kekayi', deskripsi: 'Istri Dasarata yang menuntut Rama diasingkan ke hutan.' },
    { nama: 'Dewi Sumitra', deskripsi: 'Istri Dasarata, ibu dari si kembar Laksmana dan Satrugna.' },
    { nama: 'Bharata', deskripsi: 'Adik tiri Rama yang menolak takhta dan setia pada kakaknya.' },
    { nama: 'Satrugna', deskripsi: 'Adik kembar Laksmana, setia mendampingi Bharata di Ayodya.' },
    { nama: 'Jatayu', deskripsi: 'Burung sakti sahabat Dasarata yang gugur membela Sinta dari culikan Rahwana.' },
    { nama: 'Sempati', deskripsi: 'Kakak Jatayu yang kehilangan sayapnya demi melindungi adiknya.' },
    { nama: 'Trijata', deskripsi: 'Putri Wibisana, perawat dan penghibur Sinta selama ditawan di Alengka.' },
    { nama: 'Sarpakenaka', deskripsi: 'Adik raksasi Rahwana yang hidungnya dipotong oleh Laksmana.' },
    { nama: 'Marica', deskripsi: 'Raksasa andalan Rahwana yang menyamar menjadi kijang kencana.' },
    { nama: 'Prahasta', deskripsi: 'Patih kerajaan Alengka, paman Rahwana yang gugur di tangan Anila.' },
    { nama: 'Anggada', deskripsi: 'Putra Subali, senapati andalan kera yang sangat gesit.' },
    { nama: 'Anila', deskripsi: 'Kera berbulu biru, senapati yang mengalahkan Prahasta dengan tugu batu.' },
    { nama: 'Jembawan', deskripsi: 'Beruang tua penasihat pasukan kera, bijak dan berpengalaman.' },
    { nama: 'Pandu Dewanata', deskripsi: 'Raja Hastinapura berwajah pucat, ayah dari kelima Pandawa.' },
    { nama: 'Dewi Kunti', deskripsi: 'Istri Pandu, ibu kandung Yudhistira, Bima, Arjuna, serta Karna.' },
    { nama: 'Dewi Madrim', deskripsi: 'Istri kedua Pandu, ibu kandung si kembar Nakula dan Sadewa.' },
    { nama: 'Nakula', deskripsi: 'Pandawa keempat, sangat tampan, ahli merawat kuda dan senjata pedang.' },
    { nama: 'Sadewa', deskripsi: 'Pandawa kelima, ahli perbintangan dan ilmu filsafat mistik.' },
    { nama: 'Destarata', deskripsi: 'Kakak Pandu yang buta sejak lahir, ayah dari seratus Kurawa.' },
    { nama: 'Dewi Gendari', deskripsi: 'Permaisuri Destarata, matanya selalu ditutup kain, ibu Kurawa.' },
    { nama: 'Seta', deskripsi: 'Pangeran Wirata, senapati agung pertama pihak Pandawa di Baratayuda.' },
    { nama: 'Utara', deskripsi: 'Pangeran Wirata yang tangguh, gugur di awal perang.' },
    { nama: 'Wratsangka', deskripsi: 'Ksatria Wirata pengguna panah yang gigih.' },
    { nama: 'Matsyapati', deskripsi: 'Raja Wirata yang menampung Pandawa saat masa penyamaran.' },
    { nama: 'Burisrawa', deskripsi: 'Pangeran Mandaraka yang tergila-gila pada Wembadra, gugur oleh Satyaki.' },
    { nama: 'Dewi Banowati', deskripsi: 'Istri Duryudana, cantik namun hatinya selalu condong kepada Arjuna.' },
    { nama: 'Drestadyumna', deskripsi: 'Kakak Drupadi, panglima Pandawa yang akhirnya memenggal pendeta Dorna.' },
    { nama: 'Sumbadra', deskripsi: 'Istri utama Arjuna, adik Kresna, lambang keanggunan dan kelembutan wanita.' },
    { nama: 'Larasati', deskripsi: 'Istri Arjuna yang berjiwa prajurit, mahir memanah.' },
    { nama: 'Siti Sendari', deskripsi: 'Putri Kresna, istri Abimanyu yang sangat setia.' },
    { nama: 'Utari', deskripsi: 'Putri Wirata, istri Abimanyu dan ibu dari penerus Hastinapura, Parikesit.' },
    { nama: 'Parikesit', deskripsi: 'Cucu Arjuna, raja penerus Hastinapura pasca perang Baratayuda.' },
    { nama: 'Prabu Niwatakawaca', deskripsi: 'Raja raksasa yang kebal senjata kecuali di langit-langit mulutnya, dikalahkan Arjuna.' },
    { nama: 'Prabu Bomanarakasura', deskripsi: 'Putra Kresna dengan Pertiwi, raja raksasa Trajutrisna.' },
    { nama: 'Samba', deskripsi: 'Putra Kresna berwajah sangat tampan, menjadi incaran Bomanarakasura.' },
    { nama: 'Satyaki', deskripsi: 'Ksatria Vrishni, murid dan pengawal setia Arjuna yang sangat tangguh.' },
    { nama: 'Udawa', deskripsi: 'Patih negara Dwarawati, tangan kanan dan kepercayaan Prabu Kresna.' },
    { nama: 'Sanghyang Wenang', deskripsi: 'Dewa tertinggi penguasa alam semesta sebelum takhta diserahkan.' },
    { nama: 'Sanghyang Tunggal', deskripsi: 'Ayah Batara Guru, dewa berwibawa yang mengayomi jagat raya.' },
    { nama: 'Batara Surya', deskripsi: 'Dewa matahari, ayah biologis Adipati Karna.' },
    { nama: 'Batara Kamajaya', deskripsi: 'Dewa asmara yang tampan rupawan, sering turun membantu manusia.' },
    { nama: 'Dewi Ratih', deskripsi: 'Dewi kecantikan dan asmara, istri setia Batara Kamajaya.' },
    { nama: 'Batara Kala', deskripsi: 'Dewa waktu yang berwujud raksasa, menguasai keburukan dan sifat rakus.' },
    { nama: 'Batari Durga', deskripsi: 'Istri Batara Guru yang dikutuk menjadi raksasi, penguasa Pasetran Gandamayit.' },
    { nama: 'Anantaboga', deskripsi: 'Dewa berwujud naga yang menyangga bumi, kakek Antareja.' },
    { nama: 'Nagatatmala', deskripsi: 'Putra Sanghyang Anantaboga yang juga berwujud naga sakti.' },
    { nama: 'Jayadrata', deskripsi: 'Raja Sindu yang membunuh Abimanyu, tewas oleh panah Arjuna.' },
    { nama: 'Kertamarma', deskripsi: 'Salah satu Kurawa yang selamat dari perang namun akhirnya tewas terbunuh.' },
    { nama: 'Yuyutsu', deskripsi: 'Satu-satunya saudara Kurawa yang memihak Pandawa karena membela kebenaran.' }
];

/**
 * Membuka modal daftar koleksi
 */
function bukaModalDaftarKoleksi() {
    const modal = document.getElementById('modal-koleksi');
    if (!modal) return;

    renderKoleksiList();

    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Menutup modal daftar koleksi
 */
function tutupModalKoleksi() {
    const modal = document.getElementById('modal-koleksi');
    if (!modal) return;

    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

/**
 * Merender isi tabel daftar koleksi
 */
function renderKoleksiList() {
    const tbody = document.getElementById('koleksi-list-body');
    if (!tbody) return;

    // Bersihkan isi sebelumnya
    tbody.innerHTML = '';

    koleksiWayangData.forEach((item, index) => {
        const tr = document.createElement('tr');
        
        // Garis pemisah antar baris
        tr.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
        
        // Efek hover
        tr.addEventListener('mouseenter', () => {
            tr.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        });
        tr.addEventListener('mouseleave', () => {
            tr.style.backgroundColor = 'transparent';
        });

        tr.innerHTML = `
            <td style="padding: 12px 16px; vertical-align: top; font-weight: 600; color: var(--gold);">${item.nama}</td>
            <td style="padding: 12px 16px; vertical-align: top; line-height: 1.5;">${item.deskripsi}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Daftarkan ke window agar bisa diakses dari HTML inline onclick
window.bukaModalDaftarKoleksi = bukaModalDaftarKoleksi;
window.tutupModalKoleksi = tutupModalKoleksi;
