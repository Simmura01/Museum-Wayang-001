/* ============================================================
   05-JELAJAH-DATA.JS
   Data untuk halaman Jelajah:
   - dataJelajah   : detail tiap node (nama, ikon, referensi ke
                     museumData, pertanyaan kuis)
   - jelajahData   : struktur lantai > ruang > display > node_id

   Node id memakai prefiks per ruangan supaya tidak bentrok:
     r1_...  = Lantai 1, Ruang 1 (Galeri Utama Wayang Golek)
     r2_...  = Lantai 1, Ruang 2 (Kisah Ramayana)
     l2a_... = Lantai 2, Ruang A (Galeri Wayang Modern)

   museumRef mengikuti format "lantai.ruang.indexDisplay.indexHotspot"
   sesuai urutan pada museumData di 03-pameran-data.js.

   === SINKRONISASI DENGAN PAMERAN ===
   museumData — Lantai 1, Ruang 1: 4 display, masing-masing 1 hotspot
     display 0: Arjuna
     display 1: Sri Rama
     display 2: Gatotkaca
     display 3: Twalen

   museumData — Lantai 1, Ruang 2: 9 display, masing-masing 1 hotspot
     display 0: Rama, Laksmana, Sinta & Kijang (Adegan 1)
     display 1: Sugriwa Subali (Adegan 2)
     display 2: Pasukan Kera (Adegan 3)
     display 3: Anoman Obong (Adegan 4)
     display 4: Kerajaan Alengka (Adegan 5)
     display 5: Rama Tambak (Adegan 6)
     display 6: Perang Sari Kudhup Palwogo (Adegan 7)
     display 7: Kematian Rahwana (Adegan 8)
     display 8: Pertemuan Ramawijaya & Dewi Sinta (Adegan 9)

   museumData — Lantai 2, Ruang A: 5 display, masing-masing 1 hotspot
     display 0: Wayang Kancil
     display 1: Wayang Kulit Sasak
     display 2: Wayang Kulit Cirebon
     display 3: Wayang Revolusi
     display 4: Wayang Suluh

   Total: 4 + 9 + 5 = 18 node
   ============================================================ */

const ICON_DEFAULT = "assets/images/jelajah/icons/icon-wayang.png";

const dataJelajah = {
    /* ───── RUANG 1 — Galeri Utama Wayang Golek (4 node) ───── */
    "r1_arjuna":{
        nama:"Arjuna",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang1.0.0",
        q:"Arjuna (Janaka) adalah ksatria ke berapa dari Pandawa dalam wiracarita Mahabharata?",
        opsi:["Ketiga","Pertama","Kelima"],
        ans:0
    },
    "r1_srirama":{
        nama:"Sri Rama",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang1.1.0",
        q:"Sri Rama diyakini sebagai awatara ke berapa dari Dewa Wisnu?",
        opsi:["Ketujuh","Pertama","Kesepuluh"],
        ans:0
    },
    "r1_gatotkaca":{
        nama:"Gatotkaca",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang1.2.0",
        q:"Gatotkaca adalah putra dari ksatria Pandawa bernama?",
        opsi:["Bima (Werkudara)","Arjuna","Yudistira"],
        ans:0
    },
    "r1_twalen":{
        nama:"Twalen",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang1.3.0",
        q:"Kain poleng yang dikenakan Twalen melambangkan filosofi?",
        opsi:["Rwa Bhineda (keseimbangan baik-buruk)","Tri Hita Karana","Sad Kerthi"],
        ans:0
    },

    /* ───── RUANG 2 — Kisah Ramayana (9 node) ───── */
    "r2_adegan1":{
        nama:"Adegan 1 — Rama, Sinta & Kijang",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.0.0",
        q:"Siapa nama anak buah Rahwana yang menyamar menjadi kijang emas untuk menculik Sinta?",
        opsi:["Kalamarica","Sarpakenaka","Indrajit"],
        ans:0
    },
    "r2_adegan2":{
        nama:"Adegan 2 — Sugriwa Subali",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.1.0",
        q:"Sugriwa dan Subali adalah putra dari resi bernama?",
        opsi:["Resi Gotama","Resi Bharadwaja","Resi Walmiki"],
        ans:0
    },
    "r2_adegan3":{
        nama:"Adegan 3 — Pasukan Kera",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.2.0",
        q:"Pasukan Kera bersekutu dengan Rama dan dipimpin oleh?",
        opsi:["Sugriwa","Wibisana","Anoman"],
        ans:0
    },
    "r2_adegan4":{
        nama:"Adegan 4 — Anoman Obong",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.3.0",
        q:"Anoman dikirim Rama ke Alengka untuk menemui Sinta di taman apa?",
        opsi:["Taman Argasoka","Taman Sriwedari","Taman Banjaran"],
        ans:0
    },
    "r2_adegan5":{
        nama:"Adegan 5 — Kerajaan Alengka",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.4.0",
        q:"Siapa adik Rahwana yang akhirnya menyeberang membela pihak Rama?",
        opsi:["Wibisana","Kumbakarna","Sarpakenaka"],
        ans:0
    },
    "r2_adegan6":{
        nama:"Adegan 6 — Rama Tambak",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.5.0",
        q:"Rama Tambak menceritakan pembangunan jembatan untuk menyeberangi selat apa?",
        opsi:["Selat Malaka","Selat Sunda","Selat Bali"],
        ans:0
    },
    "r2_adegan7":{
        nama:"Adegan 7 — Perang Sari Kudhup Palwogo",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.6.0",
        q:"Perang besar antara pasukan kera dan raksasa dalam Ramayana ini dikenal sebagai?",
        opsi:["Krabika Sari Kudhup Palwogo","Perang Bharatayuddha","Perang Kurusetra"],
        ans:0
    },
    "r2_adegan8":{
        nama:"Adegan 8 — Kematian Rahwana",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.7.0",
        q:"Siapa yang akhirnya mengalahkan Rahwana di medan perang?",
        opsi:["Ramawijaya (Sri Rama)","Laksmana","Anoman"],
        ans:0
    },
    "r2_adegan9":{
        nama:"Adegan 9 — Pertemuan Rama & Sinta",
        icon:ICON_DEFAULT,
        museumRef:"lantai1.ruang2.8.0",
        q:"Setelah perang usai, Rama dinobatkan sebagai raja di kerajaan?",
        opsi:["Ayodya","Alengka","Kiskenda"],
        ans:0
    },

    /* ───── RUANG A LANTAI 2 — Galeri Wayang Modern (5 node) ───── */
    "l2a_kancil":{
        nama:"Wayang Kancil",
        icon:ICON_DEFAULT,
        museumRef:"lantai2.ruangA.0.0",
        q:"Wayang Kancil pertama kali diciptakan pada abad ke-15 oleh?",
        opsi:["Sunan Giri","Sunan Kalijaga","Sunan Kudus"],
        ans:0
    },
    "l2a_sasak":{
        nama:"Wayang Kulit Sasak",
        icon:ICON_DEFAULT,
        museumRef:"lantai2.ruangA.1.0",
        q:"Wayang Kulit Sasak berasal dari daerah?",
        opsi:["Lombok, NTB","Bali","Madura"],
        ans:0
    },
    "l2a_cirebon":{
        nama:"Wayang Kulit Cirebon",
        icon:ICON_DEFAULT,
        museumRef:"lantai2.ruangA.2.0",
        q:"Sembilan tokoh Punakawan pada Wayang Kulit Cirebon diciptakan oleh?",
        opsi:["Sunan Panggung (Sunan Kalijaga)","Sunan Giri","Sunan Bonang"],
        ans:0
    },
    "l2a_revolusi":{
        nama:"Wayang Revolusi",
        icon:ICON_DEFAULT,
        museumRef:"lantai2.ruangA.3.0",
        q:"Wayang Revolusi diciptakan bertepatan dengan peristiwa bersejarah apa?",
        opsi:["Proklamasi Kemerdekaan RI 1945","Sumpah Pemuda 1928","Kebangkitan Nasional 1908"],
        ans:0
    },
    "l2a_suluh":{
        nama:"Wayang Suluh",
        icon:ICON_DEFAULT,
        museumRef:"lantai2.ruangA.4.0",
        q:"Kata \"Suluh\" dalam Wayang Suluh berarti?",
        opsi:["Obor / alat penerangan","Pedang","Perisai"],
        ans:0
    },
};

const jelajahData = {
    lantai1:{ label:"Lantai 1", rooms:{
        ruang1:{ label:"Ruang 1", fullLabel:"Galeri Utama Wayang Golek",
            displays:[
                ["r1_arjuna"],
                ["r1_srirama"],
                ["r1_gatotkaca"],
                ["r1_twalen"]
            ]
        },
        ruang2:{ label:"Ruang 2", fullLabel:"Kisah Ramayana",
            displays:[
                ["r2_adegan1"],
                ["r2_adegan2"],
                ["r2_adegan3"],
                ["r2_adegan4"],
                ["r2_adegan5"],
                ["r2_adegan6"],
                ["r2_adegan7"],
                ["r2_adegan8"],
                ["r2_adegan9"]
            ]
        }
    }},
    lantai2:{ label:"Lantai 2", rooms:{
        ruangA:{ label:"Ruang A", fullLabel:"Galeri Wayang Modern",
            displays:[
                ["l2a_kancil"],
                ["l2a_sasak"],
                ["l2a_cirebon"],
                ["l2a_revolusi"],
                ["l2a_suluh"]
            ]
        }
    }}
};
