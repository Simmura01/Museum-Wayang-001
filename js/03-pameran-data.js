/* ============================================================
   03-PAMERAN-DATA.JS
   Semua DATA koleksi wayang di halaman Pameran: teks
   penjelasan/psikologi/hubungan, path gambar, dan path audio.

   STRUKTUR FOLDER GAMBAR (lihat README.md untuk detail):
     assets/images/pameran/<lantai>/<ruang>/display/  -> foto lemari (background)
     assets/images/pameran/<lantai>/<ruang>/detail/   -> foto close-up per wayang

   Untuk MENAMBAH/MENGGANTI koleksi baru, cukup edit objek
   museumData di bawah ini — tidak perlu menyentuh file lain.
   ============================================================ */

const POSISI_3_HOTSPOT = [{x:10,y:18,w:22,h:64},{x:37,y:12,w:24,h:74},{x:66,y:18,w:22,h:64}];
const POSISI_2_HOTSPOT = [{x:25,y:15,w:22,h:70},{x:54,y:15,w:22,h:70}];

function buatDisplayPlaceholder(noDisplayMulai, jumlahDisplay, hotspotPerDisplay){
    const posisi = hotspotPerDisplay===3 ? POSISI_3_HOTSPOT : POSISI_2_HOTSPOT;
    const hasil = [];
    for(let i=0;i<jumlahDisplay;i++){
        const noDisplay = noDisplayMulai + i;
        const hotspots = [];
        for(let h=0;h<hotspotPerDisplay;h++){
            hotspots.push({
                ...posisi[h],
                nama:`Wayang ${noDisplay}.${h+1}`,label:`WAYANG ${noDisplay}.${h+1}`,
                img:null,desc:"Informasi dan sejarah koleksi wayang ini akan segera dilengkapi oleh tim kurator museum.",
                psikologi:"Analisis psikologi tokoh ini akan segera dilengkapi oleh tim kurator museum.",
                hubungan:"Informasi hubungan tokoh ini dengan tokoh wayang lainnya akan segera dilengkapi oleh tim kurator museum.",
                audio:"",audioEn:""
            });
        }
        hasil.push({ img:null, hotspots });
    }
    return hasil;
}

const museumData = {
    lantai1:{ label:"Lantai 1", rooms:{
        ruang1:{ label:"Ruang 1", fullLabel:"Ruang 1 — Galeri Utama Wayang Golek",
            displays:[
                { img:"assets/images/pameran/lantai1/ruang1/display/display1.png", hotspots:[
                    {x:10,y:18,w:22,h:64,nama:"Wayang Ramawijaya",label:"RAMAWIJAYA",img:"assets/images/pameran/lantai1/ruang1/detail/Mahawijaya.jpeg",
                        desc:"Ramawijaya (atau Sri Rama) adalah tokoh utama dalam wiracarita Hindu Ramayana. Ia merupakan putra mahkota Kerajaan Kosala beribu kota Ayodhya dan diyakini sebagai awatara ketujuh Dewa Wisnu yang turun ke bumi untuk menegakkan dharma (kebenaran) dan menciptakan kesejahteraan.",
                        karakter:"Prabu Ramawijaya adalah perwujudan mutlak dari ksatria utama yang memegang teguh dharma (kebenaran, tugas, dan etika). Karakternya didominasi oleh ketenangan batin, kebijaksanaan, keikhlasan, dan kepatuhan yang luar biasa pada orang tua serta janji. Hal ini terlihat jelas dari keputusannya yang rela melepaskan takhta Ayodhya dan menjalani masa pembuangan di hutan selama 14 tahun hanya demi menjaga kehormatan sumpah ayahnya, Prabu Dasarata. Ramawijaya sama sekali tidak terikat pada ambisi duniawi; baginya, kekuasaan adalah amanah yang harus dijalankan dengan welas asih, bukan hak milik yang harus dipertahankan mati-matian.",
                        hubungan:"Ramawijaya adalah Awatara (inkarnasi) Dewa Wisnu yang ketujuh, yang bertugas menegakkan keadilan di zamannya. Di era Mahabharata, Dewa Wisnu kembali berinkarnasi menjadi Kresna untuk membimbing Pandawa menumpas kejahatan. Dengan demikian, meskipun Duryadana tidak pernah berhadapan dengan Ramawijaya, kejahatan dan keserakahan yang dilakukan Duryadana pada akhirnya berhadapan dan dihancurkan oleh entitas kebenaran universal yang sama, yang pada zaman dahulu bersemayam di dalam diri Ramawijaya.",
                        audio:"assets/audio/ramawijaya.m4a",audioEn:"assets/audio/en/ramawijaya.m4a"},
                    {x:37,y:12,w:24,h:74,nama:"Rahwana",label:"RAHWANA",img:"assets/images/pameran/lantai1/ruang1/detail/rahwana.png",
                        desc:"Rahwana, juga dikenal sebagai Dasamuka (Raja Sepuluh Wajah), adalah raja   raksasa penguasa Kerajaan Alengka. Ia adalah putra Resi Wisrawa dan Dewi Sukesi.\n\nKoleksi ini adalah contoh Wayang Golek, seni pertunjukan boneka kayu ukir khas Sunda yang kaya akan detail artistik dan merupakan warisan budaya yang tak ternilai.",
                        karakter:"Rahwana digambarkan sebagai sosok ambisius dan haus kekuasaan, namun juga cerdas dan berpengetahuan luas. Sifat angkuhnya sering menjadi sumber kehancurannya sendiri — ia tidak mampu mengendalikan hawa nafsu dan keinginannya.",
                        hubungan:"Putra Resi Wisrawa dan Dewi Sukesi, kakak dari Kumbakarna dan Sarpakenaka. Dalam Ramayana, ia berhadapan langsung dengan Rama dan Hanoman setelah menculik Dewi Shinta, istri Rama.",
                        audio:"assets/audio/rahwana.mpeg",audioEn:"assets/audio/en/rahwana.mpeg"},
                    {x:66,y:18,w:22,h:64,nama:"Wayang Duryadana",label:"DURYUDANA",img:"assets/images/pameran/lantai1/ruang1/detail/Duryadana.jpeg",
                        desc:"Duryudana (atau Duryodana) adalah tokoh antagonis utama dalam wiracarita Mahabarata. Ia merupakan putra sulung dari 100 bersaudara keluarga Kurawa, anak dari Raja Dretarastra dan Dewi Gandari dari Kerajaan Kuru (Hastinapura).",
                        karakter:"perilaku licik dan ambisius Duryadana sebenarnya merupakan cerminan dari rasa tidak aman dan sindrom inferioritas yang sangat mendalam. Sejak kecil, ia selalu merasa dibayang-bayangi oleh kehebatan sepupunya; Bima yang lebih kuat secara fisik, Arjuna yang lebih berbakat dalam ilmu senjata, dan Yudistira yang lebih dicintai rakyat. Perasaan selalu menjadi yang kedua inilah yang memicu kebencian mendarah daging, yang kemudian ia tutupi dengan ambisi buta dan sikap merasa paling berhak atas segalanya. Sebagai putra sulung Dretarastra, ia merasa takhta Hastinapura adalah hak mutlaknya semenjak lahir, menutup mata pada fakta hukum pewaris yang sah, dan puncaknya adalah keengganannya menyerahkan tanah walau seluas ujung jarum pun kepada Pandawa menjelang Bharatayuddha.",
                        hubungan:"Dalam hubungannya dengan Sang Wijaya(Arjuna) dan keluarga Pandawa, interaksi mereka murni dilandasi oleh rivalitas kekuasaan, ketakutan, dan manipulasi. Secara militer, Duryadana sangat sadar bahwa ancaman terbesarnya adalah kekuatan Arjuna, sehingga ia memupuk persahabatan dengan Karna tidak hanya murni karena simpati, tetapi juga sebagai senjata psikologis untuk menyeimbangi kehebatan memanah Arjuna. Secara politik, karena sadar tidak bisa menyingkirkan Pandawa secara terbuka dan jujur, Duryadana kerap menggunakan taktik licik yang dimanipulasi oleh pamannya, Sengkuni, seperti pembakaran pesanggrahan hingga permainan dadu yang curang. Pada akhirnya, Duryadana menjadi sosok antagonis bukan karena ia secara alamiah menyukai kejahatan, melainkan karena ia terlalu mencintai kekuasaan dan tidak mampu menerima kenyataan bahwa ada orang lain yang lebih unggul serta lebih diakui daripada dirinya.",
                        audio:"assets/audio/duryudana.m4a",audioEn:"assets/audio/en/duryudana.m4a"}
                ]},
                { img:"assets/images/pameran/lantai1/ruang1/display/display2.jpeg", hotspots:[
                    {x:10,y:18,w:22,h:64,nama:"Ramawijaya dan dewi sinta",label:"Ramawijaya dan dewi sinta",img:"assets/images/pameran/lantai1/ruang1/display/Ramawijaya dan dewi sinta.jpeg",
                        desc:"Koleksi ini menampilkan Ramawijaya berdampingan dengan Dewi Sinta, istrinya — pasangan sentral dalam wiracarita Ramayana yang kisahnya berpuncak pada penculikan, pencarian, dan akhirnya pertemuan kembali setelah peperangan besar melawan Rahwana di Alengka.",
                        karakter:"Adegan ini menghadirkan dua watak yang saling melengkapi. Ramawijaya tetap konsisten sebagai ksatria pemegang dharma, sementara Dewi Sinta digambarkan sebagai lambang kesucian, kesetiaan, dan keteguhan hati yang tidak tergoyahkan meski diuji dengan penderitaan panjang di pengasingan Alengka. Kesetiaannya pada Rama tidak pernah luntur walau dibujuk dan diancam oleh Rahwana.\n\nKetika Sinta harus menjalani upacara obong (uji bakar/agni pariksa) untuk membuktikan kesuciannya setelah dibebaskan, ia menerimanya bukan dari keraguan atau ketidakberdayaan, melainkan sebagai bentuk penegasan diri terhadap keteguhan batinnya sendiri. Pasangan ini bersama-sama menjadi simbol bahwa cinta sejati dan kesetiaan harus diuji, bukan sekadar diucapkan.",
                        hubungan:"Sebagai suami-istri, hubungan Ramawijaya dan Dewi Sinta adalah poros utama seluruh alur Ramayana — penculikan Sinta oleh Rahwana adalah pemicu peperangan besar Ayodhya melawan Alengka, dan pertemuan kembali keduanya menjadi penyelesaian dari konflik tersebut.\n\nHubungan ini juga menautkan tokoh-tokoh lain yang dipamerkan di ruangan ini: Rahwana berperan sebagai perusak keharmonisan rumah tangga mereka, sementara Anoman (lihat koleksi di sebelahnya) berperan sebagai utusan setia yang menjembatani pencarian dan penyelamatan Sinta dari Alengka.",
                        audio:"",audioEn:""},
                    {x:37,y:12,w:24,h:74,nama:"Anoman",label:"Anoman",img:"assets/images/pameran/lantai1/ruang1/display/Anoman.jpeg",
                        desc:"Anoman (Hanoman) adalah kera putih sakti, panglima pasukan kera Kerajaan Kiskenda, dan salah satu tokoh paling dicintai dalam Ramayana karena kesetiaan dan pengabdiannya yang tanpa syarat kepada Ramawijaya.",
                        karakter:"Anoman adalah perwujudan bhakti (pengabdian) tanpa pamrih. Meskipun terlahir sebagai kera, ia memiliki kesaktian luar biasa — mampu terbang, memperbesar dan memperkecil tubuh, serta memiliki kekuatan fisik yang tak tertandingi. Namun kehebatannya tidak pernah membuatnya sombong; ia tetap rendah hati dan menempatkan dirinya sebagai abdi setia, bukan sebagai pahlawan yang mencari pujian.\n\nKarakternya juga mengajarkan pengendalian diri: ketika ditangkap dan dipermalukan di istana Alengka, ia tidak serta-merta membalas dengan amarah membabi buta, melainkan menunggu momen yang tepat untuk bertindak. Sifat setia, cerdas, dan disiplin inilah yang menjadikannya lebih dari sekadar simbol kekuatan fisik, tetapi juga simbol kecerdasan emosional dan pengabdian yang tulus.",
                        hubungan:"Anoman adalah panglima kera yang mengabdi kepada Ramawijaya sebagai utusan tepercaya sekaligus pencari jejak Dewi Sinta yang diculik Rahwana. Ia juga bawahan setia Prabu Sugriwa, raja Kiskenda, yang bersekutu dengan Rama untuk membalas budi atas bantuan yang pernah diberikan Rama kepadanya.\n\nDalam tradisi Jawa, Anoman diyakini sebagai putra Dewa Bayu (dewa angin), yang menjelaskan kesaktiannya dalam bergerak secepat angin. Ketokohannya kemudian melampaui kisah Ramayana itu sendiri — Anoman kerap muncul di berbagai lakon wayang lain sebagai simbol pelindung dan penasihat spiritual.",
                        audio:"",audioEn:""},
                    {x:66,y:18,w:22,h:64,nama:"Bima Dalam Lakon Dewa Ruci",label:"Bima Dalam Lakon Dewa Ruci",img:"assets/images/pameran/lantai1/ruang1/display/Bimadalamlakon.jpeg",
                        desc:"Lakon Dewa Ruci mengisahkan perjalanan spiritual Bima (Werkudara) dari Pandawa, yang diperintahkan gurunya, Resi Durna, untuk mencari Tirta Prawitasari (air kehidupan sejati) demi mencapai kesempurnaan batin.",
                        karakter:"Pada lakon ini, Bima tidak lagi ditampilkan sekadar sebagai ksatria berkekuatan fisik luar biasa, melainkan sebagai pencari kebenaran sejati. Ia menjalankan tugas berbahaya dari gurunya dengan kepatuhan penuh, bahkan ketika tugas itu membawanya menyelami dasar samudra dan menghadapi bahaya maut — termasuk pertarungan melawan naga raksasa Nemburnawa yang menghadangnya.\n\nDi dasar samudra, ia bertemu Dewa Ruci, sosok mungil yang wujudnya identik dengan dirinya sendiri namun memancarkan kebijaksanaan tak terhingga. Pertemuan inilah yang menjadi inti ajaran “manunggaling kawula lan Gusti” (menyatunya manusia dengan Sang Pencipta) — mengubah Bima dari ksatria yang mengandalkan kekuatan otot menjadi pribadi yang telah mencapai kematangan spiritual.",
                        hubungan:"Bima adalah putra kedua Pandawa, dikenal karena kekuatan fisiknya yang luar biasa dan sifatnya yang jujur serta blak-blakan. Dalam lakon ini, hubungannya dengan gurunya, Resi Durna, penuh nuansa ganda — di satu sisi Durna adalah guru yang dihormati, di sisi lain tugas mencari Tirta Prawitasari sebenarnya diberikan dengan harapan tersembunyi agar Bima gagal atau celaka, mengingat kedekatan Durna dengan pihak Kurawa.\n\nSementara itu, hubungan Bima dengan Dewa Ruci bukanlah relasi guru-murid biasa, melainkan simbol pertemuan manusia dengan hakikat dirinya sendiri yang paling dalam — sebuah bentuk relasi spiritual antara manusia dan Sang Pencipta yang menjadi puncak ajaran filsafat Jawa dalam dunia pewayangan.",
                        audio:"",audioEn:""}
                ]},
                { img:"assets/images/pameran/lantai1/ruang1/display/display3.jpeg", hotspots:[
                    {x:8,y:18,w:18,h:62,nama:"Wayang Golek Pakuan Bogor",label:"Wayang Golek Pakuan Bogor",img:"assets/images/pameran/lantai1/ruang1/display/display3.jpeg",
                        desc:"Wayang golek purwa bergaya Pakuan yang mengambil nama dari Pakuan Pajajaran, ibu kota Kerajaan Sunda kuno yang berlokasi di wilayah Bogor sekarang. Wayang golek jenis ini membawakan kisah Mahabharata dan Ramayana dengan pengantar bahasa Sunda.",
                        karakter:"Gaya Pakuan Bogor mencerminkan nilai estetika Sunda yang halus dan lembut — ukiran wajah serta gestur tokoh dibuat lebih ramping dan berwibawa dibanding gaya wayang golek dari daerah lain. Karakter yang ditampilkan umumnya menonjolkan sifat “someah” (ramah) dan kehalusan budi yang menjadi ciri khas kepribadian masyarakat Sunda.\n\nMeski membawakan kisah besar Mahabharata dan Ramayana yang sama dengan wayang kulit Jawa, penokohannya diberi sentuhan lokal Sunda baik dari segi busana, warna, maupun cara penyampaian dialog dalang, sehingga tokoh yang sama bisa terasa berbeda nuansanya dibanding versi Jawa Tengah maupun Jawa Timur.",
                        hubungan:"Wayang golek gaya Pakuan Bogor memiliki ikatan historis dengan Kerajaan Sunda Pajajaran yang beribu kota di Pakuan (kini Bogor), menjadikannya bagian dari kebanggaan identitas budaya Sunda pra-Islam yang terus dilestarikan hingga kini.\n\nDalam keluarga besar wayang golek, gaya ini tergolong wayang golek purwa — berbeda dengan wayang golek cepak dari Cirebon (lihat koleksi di sebelahnya) yang justru membawakan cerita babad dan legenda lokal bernuansa Islam. Perbedaan ini menunjukkan bagaimana satu bentuk kesenian wayang kayu dapat berkembang dengan wajah budaya yang berbeda-beda tergantung wilayah asalnya.",
                        audio:"",audioEn:""},
                    {x:28,y:18,w:18,h:62,nama:"Wayang Golek Cepak Cirebon",label:"Wayang Golek Cepak Cirebon",img:"assets/images/pameran/lantai1/ruang1/display/display3.jpeg",
                        desc:"Wayang golek cepak (atau papak) adalah wayang kayu khas Cirebon yang diberi nama dari bentuk kepalanya yang rata/datar. Konon mulai berkembang pada masa Panembahan Ratu, cicit Sunan Gunung Jati, sekitar abad ke-16 hingga ke-17.",
                        karakter:"Berbeda dari wayang golek purwa yang halus dan berdasar kisah Hindu, wayang cepak Cirebon justru tampil lebih sederhana dan membumi — mencerminkan karakter tokoh dari cerita babad tanah Jawa dan legenda lokal, bukan dewa atau ksatria mitologis. Tokoh-tokohnya sering digambarkan dengan cara yang lebih bersahaja dan mudah dipahami masyarakat awam.\n\nPertunjukannya biasa diselingi gaya bahasa jenaka dan gelak tawa, namun tetap membawa pesan moral yang serius. Ciri khas ini menjadikan wayang cepak sebagai media dakwah yang efektif — pesan-pesan keislaman disampaikan lewat kisah yang akrab dengan keseharian rakyat, bukan lewat kisah dewa-dewa yang jauh dari kehidupan sehari-hari.",
                        hubungan:"Wayang cepak Cirebon berakar dari masa Kesultanan Cirebon, terutama berkembang pesat pada masa Pangeran Girilaya (1650–1662) yang memperkaya lakonnya dengan babad tanah Jawa dan sejarah penyebaran Islam. Sejarah ini menautkan wayang cepak erat dengan misi dakwah para wali di pesisir utara Jawa.\n\nDalam keluarga besar wayang golek, wayang cepak Cirebon berbeda arah cerita dengan wayang golek purwa gaya Pakuan Bogor (lihat koleksi di sebelahnya) yang membawakan Mahabharata dan Ramayana. Perbedaan sumber cerita ini menunjukkan bagaimana wayang golek berkembang menjadi dua cabang besar: satu berakar pada epos Hindu, satu lagi berakar pada sejarah dan dakwah Islam lokal.",
                        audio:"",audioEn:""},
                    {x:51,y:18,w:18,h:62,nama:"Wayang Golek Menak Kebumen",label:"Wayang Golek Menak Kebumen",img:"assets/images/pameran/lantai1/ruang1/display/display3.jpeg",
                        desc:"Wayang golek menak khas Kebumen membawakan Serat Menak, saduran Jawa dari Hikayat Amir Hamzah — kisah kepahlawanan paman Nabi Muhammad SAW dalam menyebarkan Islam. Ciri paling khasnya adalah wajah tokoh yang dibuat menyerupai wajah manusia, berbeda dari wayang menak gaya Solo maupun Yogyakarta yang wajahnya lebih menyerupai topeng.",
                        karakter:"Tokoh-tokoh dalam wayang menak Kebumen menggabungkan jiwa kepahlawanan dengan nilai dakwah Islam, namun disampaikan dengan gaya dalang yang khas Kebumen — serius sekaligus jenaka, diselingi kritik sosial dan humor lokal. Wujudnya yang menyerupai wajah manusia membuat penonton merasa lebih dekat secara emosional dengan tokoh yang ditampilkan, dibanding kesan “bertopeng” pada gaya lain.\n\nKarena bersumber dari Serat Menak yang sama namun diolah bebas oleh masing-masing dalang, karakter dan bahkan alur lakon bisa berbeda dari satu pertunjukan ke pertunjukan lain — mencerminkan tradisi lisan yang hidup dan terus berkembang, bukan naskah baku yang kaku.",
                        hubungan:"Kisah Menak berasal dari sastra Persia Qissa'i Amir Hamzah, masuk ke Nusantara lewat sastra Melayu, lalu digubah ke bahasa Jawa oleh pujangga keraton Yasadipura I dan II menjadi Serat Menak. Di Kebumen, tradisi ini dikembangkan turun-temurun oleh dalang-dalang lokal seperti Ki Sindhu Jataryono, yang bahkan menciptakan lakon-lakon sempalan (Menak Pang) di luar naskah asli.\n\nWalau berasal dari sumber cerita yang sama, wayang menak Kebumen berkembang terpisah dari wayang menak Pekalongan (lihat koleksi di sebelahnya) — keduanya adalah “saudara” yang tumbuh dengan wajah dan gaya berbeda karena diwariskan oleh jalur dalang dan komunitas yang berlainan.",
                        audio:"",audioEn:""},
                    {x:72,y:18,w:18,h:62,nama:"Wayang Golek Menak Pekalongan",label:"Wayang Golek Menak Pekalongan",img:"assets/images/pameran/lantai1/ruang1/display/display3.jpeg",
                        desc:"Sama seperti wayang menak Kebumen, wayang golek menak Pekalongan juga membawakan Serat Menak (kisah Amir Hamzah), namun berkembang sebagai varian regional tersendiri di wilayah pesisir utara Jawa Tengah.",
                        karakter:"Sebagai wayang dari kota pesisir yang dikenal dengan tradisi batiknya, wayang menak Pekalongan umumnya tampil dengan pewarnaan dan ornamen yang lebih semarak, mencerminkan pengaruh budaya pesisir yang terbuka terhadap percampuran gaya dari luar daerah lewat jalur perdagangan.\n\nSeperti halnya varian Kebumen, wayang ini tetap mengemban fungsi ganda sebagai hiburan sekaligus media dakwah dan pendidikan moral, dengan tokoh-tokoh yang menampilkan keteguhan iman dan keberanian dalam menghadapi tantangan hidup.",
                        hubungan:"Wayang menak Pekalongan berbagi akar cerita yang sama dengan wayang menak Kebumen — sama-sama bersumber dari Serat Menak — namun tumbuh sebagai cabang regional yang berbeda di sepanjang pesisir utara Jawa Tengah, dibawakan oleh jalur dalang dan komunitas seni yang terpisah.\n\nKeberadaan berbagai varian wayang menak di banyak daerah (Kebumen, Pekalongan, Yogyakarta, Solo) menunjukkan bagaimana satu epos sastra yang sama bisa “berbicara” dengan wajah budaya lokal yang berbeda-beda, tergantung wilayah dan komunitas yang mewariskannya.",
                        audio:"",audioEn:""}
                ]},
                { img:"assets/images/pameran/lantai1/ruang1/display/display4.jpeg", hotspots:[
                    {x:10,y:18,w:22,h:64,nama:"Wayang Klithik Gaya Yogyakarta",label:"Wayang Klithik Gaya Yogyakarta",img:"assets/images/pameran/lantai1/ruang1/display/display4.jpeg",
                        desc:"Wayang klithik adalah wayang kayu pipih (bukan tiga dimensi seperti wayang golek), dinamai dari bunyi “klithik-klithik” yang dihasilkan saat digerakkan. Gaya Yogyakarta menampilkan ukiran dan sunggingan (pewarnaan) yang halus khas kraton Ngayogyakarta.",
                        karakter:"Karena terbuat dari kayu tipis dan bukan kulit, wayang klithik memiliki detail ukiran yang lebih menonjol namun tetap ringan dan fleksibel untuk dimainkan tanpa layar kelir. Gaya Yogyakarta secara khusus menekankan kehalusan garis dan warna yang tenang, sejalan dengan estetika kraton yang mengutamakan sifat “alus” (halus, tenang, terkendali) pada tokoh-tokoh yang berwatak baik.\n\nWayang klithik umumnya membawakan kisah Panji atau Damarwulan, bukan Ramayana/Mahabharata — sehingga tokoh yang ditampilkan mencerminkan nilai kepahlawanan lokal Nusantara: kesetiaan, keberanian, dan kecerdikan dalam menghadapi intrik politik kerajaan.",
                        hubungan:"Wayang klithik diyakini berkembang sejak era Kerajaan Majapahit, sebagai alternatif dari wayang kulit yang membutuhkan bahan kulit dan layar pertunjukan. Kehadirannya menautkan koleksi ini dengan sejarah panjang seni pertunjukan pasca-Majapahit di tanah Jawa.\n\nDi ruangan ini, wayang klithik menempati posisi tersendiri sebagai bentuk “peralihan” teknik antara wayang kulit yang pipih transparan dan wayang golek yang penuh tiga dimensi — menunjukkan bagaimana kerajinan wayang berevolusi mengikuti bahan dan kebutuhan pertunjukan di setiap daerah.",
                        audio:"",audioEn:""},
                    {x:37,y:12,w:24,h:74,nama:"Wayang Klithik Gaya Yogyakarta",label:"Wayang Klithik Gaya Yogyakarta",img:"assets/images/pameran/lantai1/ruang1/display/display4.jpeg",
                        desc:"Koleksi kedua wayang klithik gaya Yogyakarta ini menampilkan tokoh dengan ukiran dan sunggingan senada, memperlihatkan konsistensi gaya kraton Ngayogyakarta dalam penggarapan wayang kayu pipih ini.",
                        karakter:"Sebagaimana koleksi klithik gaya Yogyakarta lainnya, tokoh ini digarap dengan garis ukiran yang halus dan proporsi tubuh yang ramping, mengikuti kaidah estetika kraton yang menomorsatukan kesan tenang dan berwibawa dibanding kesan garang atau berlebihan.\n\nPenempatannya berdampingan dengan koleksi klithik lain di lemari ini menggambarkan bagaimana satu gaya (gagrag) wayang klithik biasanya menampilkan beberapa tokoh sekaligus dalam satu adegan atau babak cerita Panji/Damarwulan yang sama.",
                        hubungan:"Sebagai bagian dari rumpun wayang klithik gaya Yogyakarta, tokoh ini berbagi akar tradisi yang sama dengan koleksi klithik lain di lemari ini — sama-sama lahir dari kebutuhan akan wayang kayu yang lebih ringan dan fleksibel dibanding wayang kulit maupun wayang golek.\n\nHubungannya dengan tokoh-tokoh lain dalam lakon Panji/Damarwulan umumnya bersifat sezaman — saling melengkapi sebagai bagian dari satu rangkaian kisah kepahlawanan dan roman kerajaan Jawa Timur-Tengah pasca-Majapahit.",
                        audio:"",audioEn:""},
                    {x:66,y:18,w:22,h:64,nama:"Wayang Klithik Gaya Yogyakarta",label:"Wayang Klithik Gaya Yogyakarta",img:"assets/images/pameran/lantai1/ruang1/display/display4.jpeg",
                        desc:"Koleksi ketiga wayang klithik gaya Yogyakarta ini melengkapi rangkaian tokoh yang dipamerkan bersama dalam satu lemari, menampilkan keragaman karakter dalam satu gaya ukiran dan pewarnaan yang sama.",
                        karakter:"Tokoh ini turut memperlihatkan bagaimana wayang klithik gaya Yogyakarta mampu menampilkan spektrum watak yang beragam — dari yang halus (alus) hingga yang lebih tegas — namun tetap terikat pada kaidah estetika kraton yang konsisten dari segi warna dan bentuk ukiran.\n\nKarena dimainkan tanpa memerlukan layar kelir seperti wayang kulit, ekspresi dan detail wajah tokoh klithik dapat dilihat langsung oleh penonton, sehingga pengukir memberi perhatian ekstra pada detail mimik untuk menyampaikan karakter tokoh secara visual.",
                        hubungan:"Sebagai satu dari tiga koleksi klithik gaya Yogyakarta yang dipamerkan berdampingan, tokoh ini menunjukkan bagaimana satu babak cerita Panji atau Damarwulan biasanya melibatkan beberapa tokoh sekaligus yang tampil dalam satu adegan pewayangan.\n\nSecara lebih luas, ketiga koleksi klithik gaya Yogyakarta di lemari ini menjadi representasi dari kekayaan tradisi wayang klithik Jawa Tengah, yang berdampingan namun berbeda gaya dengan wayang klithik gaya Jawa Timuran yang dipamerkan di lemari berikutnya.",
                        audio:"",audioEn:""}
                ]},
                { img:"assets/images/pameran/lantai1/ruang1/display/display5.jpeg", hotspots:[
                    {x:25,y:15,w:22,h:70,nama:"Wayang Klithik Purwa Gaya Jawa Timuran",label:"Wayang Klithik Purwa Gaya Jawa Timuran",img:"assets/images/pameran/lantai1/ruang1/display/display5.jpeg",
                        desc:"Berbeda dari wayang klithik gaya Yogyakarta yang membawakan kisah Panji/Damarwulan, wayang klithik purwa gaya Jawa Timuran ini justru membawakan cerita Mahabharata dan Ramayana (“purwa” berarti cerita kuno/awal), namun digarap dengan gaya khas Jawa Timur.",
                        karakter:"Wayang klithik gaya Jawa Timuran (dikenal juga dengan istilah gagrag “Brang Wetan”) memiliki ciri visual yang lebih berani dibanding gaya Jawa Tengah — pewarnaan mencolok dengan kontras warna yang tajam, menghasilkan kesan visual yang lebih ekspresif dan surealis untuk menonjolkan emosi tokoh di atas pentas.\n\nKarakter tokoh purwa yang sama (misalnya ksatria Pandawa atau tokoh Ramayana) bisa terasa lebih “hidup” dan menggebu dalam gaya ini, mencerminkan temperamen budaya Jawa Timur yang cenderung ekspresif dan lugas dibanding kehalusan gaya kraton Jawa Tengah.",
                        hubungan:"Meski sama-sama membawakan kisah purwa (Mahabharata/Ramayana) seperti wayang kulit gaya Yogyakarta maupun Surakarta, wayang klithik Jawa Timuran berkembang lewat jalur pakeliran tersendiri di wilayah Brang Wetan (Surabaya, Malang, Mojokerto, Kediri, Jombang, dan sekitarnya), sehingga memiliki gending pengiring dan gaya penyajian dalang yang berbeda dari gaya Mataraman.\n\nDi ruangan ini, koleksi ini berdampingan dengan Wayang Klithik Gedog Kediri Jawa Timuran (lihat koleksi di sebelahnya) — keduanya berasal dari rumpun gagrag Jawa Timuran yang sama, namun berbeda sumber cerita: satu dari epos Hindu (purwa), satu lagi dari kisah asli Nusantara (Panji/Gedog).",
                        audio:"",audioEn:""},
                    {x:54,y:15,w:22,h:70,nama:"Wayang Klithik Gedog Kediri Jawa Timuran",label:"Wayang Klithik Gedog Kediri Jawa Timuran",img:"assets/images/pameran/lantai1/ruang1/display/display5.jpeg",
                        desc:"Wayang gedog adalah wayang yang membawakan cerita Panji, dinamai “gedog” dari kata “kedok” (topeng) karena wajah tokohnya digambarkan menyerupai topeng. Wayang gedog gaya Kediri ini erat terkait dengan Kerajaan Kediri, latar utama kisah Panji Asmarabangun dan Dewi Sekartaji.",
                        karakter:"Berbeda dari tokoh purwa yang bisa berwujud dewa, raksasa, atau kera sakti, tokoh-tokoh dalam wayang gedog adalah manusia biasa yang menghadapi persoalan hidup yang lebih membumi — asmara, perjodohan paksa, dan perebutan kekuasaan antar kerajaan. Hal ini membuat wayang gedog terasa lebih dekat dengan pengalaman keseharian penontonnya dibanding kisah-kisah mitologis.\n\nTokoh utamanya, Panji Asmarabangun, digambarkan sebagai ksatria yang gagah namun setia, sementara Dewi Sekartaji melambangkan kesucian dan keteguhan cinta meski harus melalui penyamaran dan pengembaraan panjang untuk bersatu kembali dengan kekasihnya.",
                        hubungan:"Kisah gedog berpusat pada hubungan asmara Panji Asmarabangun dari Kerajaan Jenggala dengan Dewi Sekartaji dari Kerajaan Kediri (Daha/Panjalu) — pertautan dua kerajaan ini menjadi latar politik sekaligus romantis sepanjang cerita Panji.\n\nSecara lebih luas, cerita Panji yang menjadi dasar wayang gedog Kediri ini telah diakui UNESCO sebagai warisan budaya tak benda dunia, dan pengaruhnya menyebar jauh melampaui Jawa — memengaruhi tradisi cerita di Bali, Melayu, bahkan mengilhami kisah Inao di Thailand dan Kamboja, menjadikan koleksi ini bagian dari jejaring budaya Asia Tenggara yang jauh lebih besar.",
                        audio:"",audioEn:""}
                ]}
            ]
        },
        ruang2:{ label:"Ruang 2", fullLabel:"Ruang 2 — Kisah Ramayana",
            displays: [
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 1.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 22, h: 70, 
                    nama: "Adegan 1 A", label: "Adegan 1 A", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 1.jpg",
                    desc: "Rama, Sinta, dan Laksmana menjalani masa pengasingan di Hutan Dandaka selama 14 tahun. Kehidupan damai mereka terusik ketika Sinta melihat seekor kijang emas yang indah.",
                    psikologi: "Rama (Penyayang & Pelindung), Sinta (Tergoda keindahan duniawi), Laksmana (Waspada & Setia).",
                    hubungan: "Rama dan Sinta adalah sepasang suami istri. Laksmana adalah adik kandung Rama yang sangat setia menemani mereka di pengasingan.",
                    audio:"assets/audio/adegan 1 ind.m4a",audioEn:"assets/audio/en/adegan 1 en.m4a"
                },
                
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 2.jpg", 
            hotspots: [
                {
                    x: 36, y: 14, w: 28, h: 72, 
                    nama: "Adegan 2", label: "Adegan 2", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 2.jpg",
                    desc: "Sugriwa dan Subali berebut tahta Kiskenda. Atas bantuan Rama, Sugriwa akhirnya berhasil merebut kembali Kiskenda dari keserakahan kakaknya, Subali.",
                    psikologi: "Sugriwa (Baik budi & Benar), Subali (Jahat, Serakah, & Haus kekuasaan).",
                    hubungan: "Sugriwa dan Subali adalah kakak beradik putra Resi Gotama. Sugriwa merupakan sekutu dan sahabat karib Sri Rama.",
                    audio:"assets/audio/adegan 2 ind.m4a",audioEn:"assets/audio/en/adegan 2 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 3.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 22, h: 70, 
                    nama: "Adegan 3 A", label: "Adegan 3 A", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 3.jpg",
                    desc: "Pasukan Kera bersiap untuk turun ke medan pertempuran. Mereka adalah garda terdepan yang membantu perjuangan Sri Rama.",
                    psikologi: "Pemberani, Setia, dan Penuh semangat juang.",
                    hubungan: "Pasukan Kera adalah bala tentara yang setia mengabdi kepada Sugriwa dan beraliansi dengan Sri Rama.",
                    audio:"assets/audio/adegan 3 ind.m4a",audioEn:"assets/audio/en/adegan 3 en.m4a"
                },
                
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 4.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 22, h: 70, 
                    nama: "Adegan 4 A", label: "Adegan 4 A", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 4.jpg",
                    desc: "Adegan Anoman Obong. Anoman berhasil menyusup ke Taman Argasoka di Alengka untuk menyampaikan pesan dari Rama kepada Dewi Sinta bahwa ia akan segera diselamatkan.",
                    psikologi: "Anoman (Cerdas, Lincah, & Utusan yang setia), Sinta (Penuh harap & Teguh pendirian).",
                    hubungan: "Anoman adalah duta/utusan kepercayaan Sri Rama untuk menemui Dewi Sinta yang sedang ditawan.",
                    audio:"assets/audio/adegan 4 ind.m4a",audioEn:"assets/audio/en/adegan 4 en.m4a"
                },
                
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 5.jpg", 
            hotspots: [
                {
                    x: 36, y: 14, w: 28, h: 72, 
                    nama: "Adegan 5", label: "Adegan 5", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 5.jpg",
                    desc: "Rahwana mengadakan rapat strategi bersama adik-adiknya (Kumbakarna, Wibisana, Sarpakenaka). Terjadi perdebatan sengit karena Wibisana dan Kumbakarna menyarankan agar Sinta dikembalikan, namun Rahwana bersikukuh untuk berperang.",
                    psikologi: "Rahwana (Keras kepala, Egois, Jahat), Kumbakarna (Membela negara, bukan membenarkan kakaknya), Wibisana (Bijaksana, Berpihak pada kebenaran).",
                    hubungan: "Rahwana, Kumbakarna, Wibisana, dan Sarpakenaka adalah saudara kandung penguasa Alengka. Perbedaan prinsip membuat Wibisana nantinya menyeberang membela Rama.",
                    audio:"assets/audio/adegan 5 ind.m4a",audioEn:"assets/audio/en/adegan 5 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 6.jpg", 
            hotspots: [
                {
                    x: 36, y: 14, w: 28, h: 72, 
                    nama: "Adegan 6", label: "Adegan 6", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 6.jpg",
                    desc: "Adegan Rama Tambak. Rama dan pasukan kera membangun bendungan/jembatan (tambak) membelah lautan menuju Alengka. Pembuatan tambak ini adalah usulan strategi dari Wibisana.",
                    psikologi: "Rama (Pemimpin yang gigih), Wibisana (Ahli strategi yang cerdas).",
                    hubungan: "Wibisana (adik Rahwana) kini telah menjadi sekutu sekaligus penasihat utama Sri Rama dalam menembus pertahanan Alengka.",
                    audio:"assets/audio/adegan 6 ind.m4a",audioEn:"assets/audio/en/adegan 6 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 7.jpg", 
            hotspots: [
                {
                    x: 36, y: 14, w: 28, h: 72, 
                    nama: "Adegan 7", label: "Adegan 7", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 7.jpg",
                    desc: "Perang Sapi Kudhup Palwogo. Terjadi perang besar antara pasukan kera (prajurit Rama) melawan tentara raksasa (prajurit Rahwana). Pertempuran berlangsung sangat lama, beradu strategi, dan memakan banyak korban dari kedua belah pihak.",
                    psikologi: "Kegigihan, Keberanian luar biasa, dan Kekacauan perang.",
                    hubungan: "Pasukan Kera (membela kebenaran/Rama) bertarung mati-matian melawan Pasukan Raksasa (membela kebatilan/Rahwana).",
                    audio:"assets/audio/adegan 7 ind.m4a",audioEn:"assets/audio/en/adegan 7 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 8.jpg", 
            hotspots: [
                {
                    x: 36, y: 14, w: 28, h: 72, 
                    nama: "Adegan 8", label: "Adegan 8", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 8.jpg",
                    desc: "Akhir dari perang epik, Rama berhasil memenangkan pertempuran. Rahwana gugur di medan perang, menandakan hancurnya sifat angkara murka dan kembalinya kedamaian dunia.",
                    psikologi: "Rama (Tegas, Pembela Kebenaran), Rahwana (Akhir dari Kesombongan dan Angkara Murka).",
                    hubungan: "Pertarungan puncak antara Ksatria (Kebenaran) melawan Raja Raksasa (Kejahatan). Kemenangan mutlak bagi Sri Rama.",
                    audio:"assets/audio/adegan 8 ind.m4a",audioEn:"assets/audio/en/adegan 8 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 9.jpg", 
            hotspots: [
                {
                    x: 36, y: 14, w: 28, h: 72, 
                    nama: "Adegan 9", label: "Adegan 9", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 9.jpg",
                    desc: "Pertemuan kembali Ramawijaya dan Dewi Sinta. Setelah membuktikan kesuciannya melalui upacara suci, Sinta dan Rama kembali ke Ayodya. Rama dinobatkan sebagai Raja Ayodya yang disambut suka cita oleh rakyatnya.",
                    psikologi: "Rama (Pemimpin yang adil & bijaksana), Sinta (Suci, Setia, & Penuh cinta).",
                    hubungan: "Cinta sejati antara Rama dan Sinta yang akhirnya bersatu kembali sebagai Raja dan Ratu Ayodya, membawa harapan baru bagaikan matahari terbit.",
                    audio:"assets/audio/adegan 9 ind.m4a",audioEn:"assets/audio/en/adegan 9 en.m4a"
                }
            ]
        }
    ]
        }
    }},
    lantai2:{ label:"Lantai 2", rooms:{
        ruangA:{ label:"Ruang A", fullLabel:"Ruang A — Galeri Wayang Modern",
            displays: [
        { 
            img: "assets/images/pameran/lantai2/ruangA/display/Wayang Kancil.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "Wayang Kancil", 
                    label: "WAYANG KANCIL", 
                    img: "assets/images/pameran/lantai2/ruangA/display/Wayang Kancil.jpg",
                    desc: "Wayang Kancil merupakan jenis wayang yang menjadikan hewan kancil sebagai tokoh utamanya. Wayang ini diciptakan oleh Sunan Giri pada abad ke-15 Masehi sebagai salah satu media penyebaran agama Islam di Nusantara, yang kemudian dipopulerkan kembali oleh Bo Liem pada tahun 1925.\n\nCerita yang dibawakan dalam pertunjukan Wayang Kancil biasanya diadaptasi dari Serat Kancil Kridhamartana. Melalui tokoh si kancil yang cerdik dan banyak akal, wayang ini sarat akan pesan moral dan budi pekerti. Kisahnya senantiasa mengajarkan bagaimana seseorang dapat terhindar dari marabahaya melalui kecerdikan dan ketenangan dalam berpikir.",
                    psikologi: "Kancil (Cerdik, banyak akal, lincah, pemikir cepat), Harimau & Buaya (Kuat namun mudah dipengaruhi/dikelabui), Petani (Sosok manusia bersahaja yang mewakili kehidupan sehari-hari).",
                    hubungan: "Kancil sering kali digambarkan berkonflik dengan predator (seperti harimau dan buaya) atau berurusan dengan properti milik manusia (petani). Ia memanipulasi hubungan dan situasi tersebut untuk membebaskan diri dari ancaman.",
                    audio: ""
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai2/ruangA/display/Wayang Kulit Basak.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "Wayang Kulit Sasak", 
                    label: "WAYANG KULIT SASAK", 
                    img: "assets/images/pameran/lantai2/ruangA/display/Wayang Kulit Basak.jpg",
                    desc: "Wayang Kulit Sasak adalah kesenian wayang yang berasal dari daerah Lombok, Nusa Tenggara Barat. Penamaan wayang ini diambil langsung dari nama suku asli yang mendiami wilayah Lombok, yakni Suku Sasak. Secara visual, bentuk Wayang Sasak memiliki kemiripan dengan Wayang Kulit Gedog serta memiliki ciri khas profil yang beririsan dengan pewayangan Bali.\n\nPada masa lampau, Wayang Kulit Sasak memegang peranan krusial sebagai media dakwah penyebaran agama Islam di Pulau Lombok. Selain untuk syiar agama, wayang ini juga sering dipentaskan untuk memeriahkan berbagai upacara adat setempat, menjadikannya bagian tak terpisahkan dari jalinan budaya dan spiritualitas masyarakat Sasak.",
                    psikologi: "Menampilkan tokoh-tokoh (adaptasi kisah Serat Menak) dengan pembawaan karakter yang tegas, berwibawa, agamis, ksatria, dan heroik.",
                    hubungan: "Interaksi antar tokohnya sering kali merepresentasikan konflik antara penyebar ajaran kebenaran (protagonis) melawan raja-raja arogan atau raksasa yang menentangnya (antagonis).",
                    audio: ""
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai2/ruangA/display/Wayang Kulit Cirebon.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "Wayang Kulit Cirebon", 
                    label: "WAYANG KULIT CIREBON", 
                    img: "assets/images/pameran/lantai2/ruangA/display/Wayang Kulit Cirebon.jpg",
                    desc: "Wayang Kulit Cirebon merupakan seni pewayangan yang berkembang di kawasan pesisir utara Jawa Barat. Kesenian ini diperkirakan mendapat pengaruh kuat secara langsung dari Kesultanan Demak pada era Wali Songo. Ciri khas visual dari wayang ini terletak pada bentuk tatahan (ukiran) yang sangat halus serta penggunaan warna cat yang cenderung tajam dan berani.\n\nSalah satu hal paling ikonik yang membedakan Wayang Cirebon dari wayang Jawa lainnya adalah eksistensi tokoh Punakawan yang diciptakan berjumlah sembilan orang oleh Sunan Panggung (Sunan Kalijaga). Kesembilan tokoh Punakawan ini diciptakan sebagai simbol sembilan wali (Wali Songo) di tanah Jawa, memadukan elemen hiburan rakyat dengan petuah-petuah dakwah Islam yang luhur.",
                    psikologi: "Tokoh Punakawan (Humoris, merakyat, bijaksana, penyabar, menjadi representasi rakyat kecil namun berilmu tinggi). Tokoh Ksatria (Elegan, tenang, dan menjunjung tinggi kebenaran).",
                    hubungan: "Kesembilan tokoh Punakawan memiliki ikatan persaudaraan yang erat. Mereka selalu bertindak sebagai pengasuh, penasihat spiritual, sekaligus pendamping setia para ksatria di setiap peperangan melawan angkara murka.",
                    audio: ""
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai2/ruangA/display/Wayang Revolusi.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "Wayang Revolusi", 
                    label: "WAYANG REVOLUSI", 
                    img: "assets/images/pameran/lantai2/ruangA/display/Wayang Revolusi.jpg",
                    desc: "Wayang Revolusi adalah kreasi wayang modern yang secara khusus diciptakan pada tahun 1945, bertepatan dengan masa proklamasi kemerdekaan Republik Indonesia. Berbeda dari wayang tradisional yang membawakan mitologi kuno, wayang ini secara spesifik merekam jejak sejarah dan menceritakan kerasnya perjuangan rakyat Indonesia dalam mempertahankan kemerdekaan dari tangan penjajah.\n\nKeunikan utama dari Wayang Revolusi tampak pada rupa tokoh-tokohnya yang digambarkan secara realistis layaknya manusia dengan pakaian era 1940-an. Pertunjukan ini menampilkan figur pahlawan nasional, tentara berseragam, pejabat kolonial, hingga rakyat jelata bersahaja. Wayang ini sukses menjadi alat dokumentasi sejarah yang hidup sekaligus hiburan yang memupuk rasa patriotisme pada masanya.",
                    psikologi: "Tokoh Pejuang (Patriotik, berani, tanpa pamrih, rela berkorban). Tokoh Penjajah (Otoriter, serakah, congkak). Rakyat Jelata (Tangguh, menderita namun memiliki pendirian teguh).",
                    hubungan: "Wayang ini menonjolkan solidaritas dan persatuan antar kelas sosial. Terlihat hubungan yang erat antara pemimpin negara, militer, dan rakyat sipil bersatu padu melawan pasukan kolonial Belanda dan sekutu.",
                    audio: ""
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai2/ruangA/display/Wayang suluh.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "Wayang Suluh", 
                    label: "WAYANG SULUH", 
                    img: "assets/images/pameran/lantai2/ruangA/display/Wayang suluh.jpg",
                    desc: "Serupa dengan Wayang Revolusi, Wayang Suluh lahir dan berkembang di era genting perang mempertahankan kemerdekaan Republik Indonesia, tepatnya mulai diciptakan sekitar tahun 1947. Kata \"Suluh\" dalam bahasa Indonesia memiliki arti obor atau alat penerangan, sejalan dengan fungsi esensial wayang ini sebagai media penerangan atau penyuluhan bagi masyarakat luas di tengah gejolak perang.\n\nSecara fungsional, Wayang Suluh digunakan secara masif oleh pemerintah Republik sebagai media propaganda dan kampanye nasionalisme. Tokoh-tokoh yang ditampilkan adalah figur nyata seperti Bapak Bangsa Soekarno, Moh. Hatta, hingga pahlawan Bung Tomo. Melalui pementasan keliling ke berbagai daerah, wayang ini berhasil menyampaikan informasi, mengedukasi rakyat revolusi, dan mengobarkan api semangat perlawanan.",
                    psikologi: "Tokoh Pemimpin Nasional (Kharismatik, visioner, pandai berorasi, berwibawa). Pasukan dan Rakyat (Berdedikasi tinggi, bersemangat api, penuh keberanian revolusioner).",
                    hubungan: "Memperlihatkan ikatan komando dan koneksi emosional yang tak terpisahkan antara para pendiri bangsa (*Founding Fathers*) dengan rakyat yang bahu-membahu dalam satu visi mulia: Kemerdekaan Indonesia seutuhnya.",
                    audio: ""
                }
            ]
        }
    ]
        },
        
    }}
};
