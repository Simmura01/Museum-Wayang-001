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

   Path ikon node ada di: assets/images/jelajah/icons/
   Ganti "icon:" pada tiap node bila ingin ikon unik per node
   (saat ini semua masih memakai ikon default icon-wayang.png).
   ============================================================ */

const ICON_DEFAULT = "assets/images/jelajah/icons/icon-wayang.png";

const dataJelajah = {
    /* ───── RUANG 1 — Galeri Utama Wayang Golek (15 node) ───── */
    "r1_d1_1":{nama:"Wayang Ramawijaya",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.0.0",
        q:"Ramawijaya diyakini sebagai awatara (inkarnasi) dari dewa apa?",opsi:["Dewa Wisnu","Dewa Siwa","Dewa Brahma"],ans:0},
    "r1_d1_2":{nama:"Rahwana",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.0.1",
        q:"Rahwana dikenal juga dengan julukan?",opsi:["Dasamuka","Dasabahu","Dasanetra"],ans:0},
    "r1_d1_3":{nama:"Wayang Duryadana",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.0.2",
        q:"Duryadana merupakan putra sulung dari raja?",opsi:["Prabu Dretarastra","Prabu Pandu","Prabu Yudistira"],ans:0},

    "r1_d2_1":{nama:"Ramawijaya dan dewi sinta",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.1.0",
        q:"Upacara yang dijalani Dewi Sinta untuk membuktikan kesuciannya disebut?",opsi:["Upacara Obong (Agni Pariksa)","Upacara Ruwatan","Upacara Tedak Siten"],ans:0},
    "r1_d2_2":{nama:"Anoman",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.1.1",
        q:"Anoman diyakini sebagai putra dari dewa?",opsi:["Dewa Bayu","Dewa Indra","Dewa Wisnu"],ans:0},
    "r1_d2_3":{nama:"Bima Dalam Lakon Dewa Ruci",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.1.2",
        q:"Dalam lakon Dewa Ruci, Bima mencari air kehidupan sejati yang disebut?",opsi:["Tirta Prawitasari","Tirta Amerta","Tirta Suci"],ans:0},

    "r1_d3_1":{nama:"Wayang Golek Pakuan Bogor",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.2.0",
        q:"Wayang golek gaya Pakuan Bogor terhubung dengan sejarah kerajaan?",opsi:["Sunda Pajajaran","Majapahit","Mataram Islam"],ans:0},
    "r1_d3_2":{nama:"Wayang Golek Cepak Cirebon",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.2.1",
        q:"Wayang golek cepak Cirebon dinamai dari bentuk kepalanya yang?",opsi:["Datar/rata","Lancip","Bulat"],ans:0},
    "r1_d3_3":{nama:"Wayang Golek Menak Kebumen",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.2.2",
        q:"Cerita wayang menak Kebumen bersumber dari kisah?",opsi:["Amir Hamzah (Serat Menak)","Mahabharata","Ramayana"],ans:0},
    "r1_d3_4":{nama:"Wayang Golek Menak Pekalongan",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.2.3",
        q:"Wayang menak Pekalongan berkembang di wilayah?",opsi:["Pesisir utara Jawa Tengah","Pedalaman Jawa Timur","Priangan Jawa Barat"],ans:0},

    "r1_d4_1":{nama:"Wayang Klithik Gaya Yogyakarta",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.3.0",
        q:"Wayang klithik dinamai dari bunyi yang dihasilkan saat digerakkan, yaitu?",opsi:["Klithik-klithik","Kemrincing","Gemerincing"],ans:0},
    "r1_d4_2":{nama:"Wayang Klithik Gaya Yogyakarta",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.3.1",
        q:"Wayang klithik gaya Yogyakarta umumnya membawakan kisah?",opsi:["Panji atau Damarwulan","Mahabharata","Ramayana"],ans:0},
    "r1_d4_3":{nama:"Wayang Klithik Gaya Yogyakarta",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.3.2",
        q:"Dibanding wayang kulit, wayang klithik terbuat dari bahan?",opsi:["Kayu tipis","Kulit kerbau","Kain batik"],ans:0},

    "r1_d5_1":{nama:"Wayang Klithik Purwa Gaya Jawa Timuran",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.4.0",
        q:"Istilah \"purwa\" pada wayang klithik purwa berarti?",opsi:["Cerita kuno/awal","Cerita baru","Cerita rakyat"],ans:0},
    "r1_d5_2":{nama:"Wayang Klithik Gedog Kediri Jawa Timuran",icon:ICON_DEFAULT,museumRef:"lantai1.ruang1.4.1",
        q:"Wayang gedog dinamai dari kata \"kedok\" yang berarti?",opsi:["Topeng","Mahkota","Selendang"],ans:0},

    /* ───── RUANG 2 — Kisah Ramayana (12 node) ───── */
    "r2_d1_1":{nama:"Adegan 1 A",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.0.0",
        q:"Apa yang membuat Sinta tergoda saat berada di Hutan Dandaka?",opsi:["Kijang emas","Bunga teratai","Burung merak"],ans:0},
    "r2_d1_2":{nama:"Adegan 1 B",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.0.1",
        q:"Siapa nama anak buah Rahwana yang menyamar menjadi kijang emas?",opsi:["Kalamarica","Sarpakenaka","Indrajit"],ans:0},
    "r2_d2":{nama:"Adegan 2",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.1.0",
        q:"Sugriwa berebut tahta Kiskenda melawan siapa?",opsi:["Subali","Rahwana","Kumbakarna"],ans:0},
    "r2_d3_1":{nama:"Adegan 3 A",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.2.0",
        q:"Pasukan Kera mengabdi setia kepada siapa?",opsi:["Sugriwa","Rahwana","Wibisana"],ans:0},
    "r2_d3_2":{nama:"Adegan 3 B",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.2.1",
        q:"Pasukan Kera menyerang kerajaan mana untuk merebut kembali Sinta?",opsi:["Alengka","Kiskenda","Ayodya"],ans:0},
    "r2_d4_1":{nama:"Adegan 4 A",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.3.0",
        q:"Anoman menyusup ke taman apa di Alengka untuk menemui Sinta?",opsi:["Taman Argasoka","Taman Sriwedari","Taman Banjaran"],ans:0},
    "r2_d4_2":{nama:"Adegan 4 B",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.3.1",
        q:"Peristiwa terbakarnya benteng Alengka oleh Anoman dikenal dengan sebutan?",opsi:["Anoman Obong","Anoman Duta","Anoman Rah"],ans:0},
    "r2_d5":{nama:"Adegan 5",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.4.0",
        q:"Siapa adik Rahwana yang akhirnya menyeberang membela pihak Rama?",opsi:["Wibisana","Kumbakarna","Sarpakenaka"],ans:0},
    "r2_d6":{nama:"Adegan 6",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.5.0",
        q:"Siapa yang mengusulkan strategi membangun tambak menuju Alengka?",opsi:["Wibisana","Sugriwa","Anoman"],ans:0},
    "r2_d7":{nama:"Adegan 7",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.6.0",
        q:"Perang besar antara pasukan kera dan raksasa ini dikenal dengan nama?",opsi:["Perang Sapi Kudhup Palwogo","Perang Bharatayuddha","Perang Baratayuda"],ans:0},
    "r2_d8":{nama:"Adegan 8",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.7.0",
        q:"Siapa yang gugur di akhir peperangan besar melawan Rama?",opsi:["Rahwana","Kumbakarna","Wibisana"],ans:0},
    "r2_d9":{nama:"Adegan 9",icon:ICON_DEFAULT,museumRef:"lantai1.ruang2.8.0",
        q:"Setelah perang usai, Rama dinobatkan sebagai raja di?",opsi:["Ayodya","Alengka","Kiskenda"],ans:0},

    /* ───── RUANG A LANTAI 2 — Galeri Wayang Modern (5 node) ───── */
    "l2a_d1":{nama:"Wayang Kancil",icon:ICON_DEFAULT,museumRef:"lantai2.ruangA.0.0",
        q:"Wayang Kancil pertama kali diciptakan oleh?",opsi:["Sunan Giri","Sunan Kalijaga","Sunan Kudus"],ans:0},
    "l2a_d2":{nama:"Wayang Kulit Sasak",icon:ICON_DEFAULT,museumRef:"lantai2.ruangA.1.0",
        q:"Wayang Kulit Sasak berasal dari daerah?",opsi:["Lombok","Bali","Madura"],ans:0},
    "l2a_d3":{nama:"Wayang Kulit Cirebon",icon:ICON_DEFAULT,museumRef:"lantai2.ruangA.2.0",
        q:"Sembilan tokoh Punakawan pada Wayang Kulit Cirebon diciptakan oleh?",opsi:["Sunan Kalijaga","Sunan Giri","Sunan Bonang"],ans:0},
    "l2a_d4":{nama:"Wayang Revolusi",icon:ICON_DEFAULT,museumRef:"lantai2.ruangA.3.0",
        q:"Wayang Revolusi diciptakan pada tahun?",opsi:["1945","1955","1935"],ans:0},
    "l2a_d5":{nama:"Wayang Suluh",icon:ICON_DEFAULT,museumRef:"lantai2.ruangA.4.0",
        q:"Kata \"Suluh\" dalam bahasa Indonesia berarti?",opsi:["Obor/alat penerangan","Pedang","Perisai"],ans:0},
};

const jelajahData = {
    lantai1:{ label:"Lantai 1", rooms:{
        ruang1:{ label:"Ruang 1", fullLabel:"Galeri Utama Wayang Golek",
            displays:[
                ["r1_d1_1","r1_d1_2","r1_d1_3"],
                ["r1_d2_1","r1_d2_2","r1_d2_3"],
                ["r1_d3_1","r1_d3_2","r1_d3_3","r1_d3_4"],
                ["r1_d4_1","r1_d4_2","r1_d4_3"],
                ["r1_d5_1","r1_d5_2"]
            ]
        },
        ruang2:{ label:"Ruang 2", fullLabel:"Kisah Ramayana",
            displays:[
                ["r2_d1_1","r2_d1_2"],
                ["r2_d2"],
                ["r2_d3_1","r2_d3_2"],
                ["r2_d4_1","r2_d4_2"],
                ["r2_d5"],
                ["r2_d6"],
                ["r2_d7"],
                ["r2_d8"],
                ["r2_d9"]
            ]
        }
    }},
    lantai2:{ label:"Lantai 2", rooms:{
        ruangA:{ label:"Ruang A", fullLabel:"Galeri Wayang Modern",
            displays:[
                ["l2a_d1"],
                ["l2a_d2"],
                ["l2a_d3"],
                ["l2a_d4"],
                ["l2a_d5"]
            ]
        }
    }}
};
