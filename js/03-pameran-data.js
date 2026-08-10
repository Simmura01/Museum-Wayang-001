

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
                img:null,
                desc:"Informasi dan sejarah koleksi wayang ini akan segera dilengkapi oleh tim kurator museum.",
                descEn:"Information and history of this wayang collection will be completed soon by the museum's curatorial team.",
                psikologi:"Analisis psikologi tokoh ini akan segera dilengkapi oleh tim kurator museum.",
                psikologiEn:"The psychological analysis of this character will be completed soon by the museum's curatorial team.",
                hubungan:"Informasi hubungan tokoh ini dengan tokoh wayang lainnya akan segera dilengkapi oleh tim kurator museum.",
                hubunganEn:"Information about this character's relationships with other wayang figures will be completed soon by the museum's curatorial team.",
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
                { img:"assets/images/pameran/lantai1/ruang1/display/arjuna.png", hotspots:[
                    {x: 25, y: 15, w: 50, h: 70,
                    nama: "Arjuna", 
                        label: "ARJUNA", 
                        img: "assets/images/pameran/lantai1/ruang1/display/arjuna.png",
                        desc: "Arjuna (atau Janaka) adalah salah satu dari lima ksatria Pandawa dalam wiracarita Mahabharata. Ia dikenal sebagai ksatria penengah Pandawa yang memiliki paras menawan, kelembutan budi, dan keahlian memanah yang tiada tanding di seantero jagat raya.",
                        descEn: "Arjuna (also known as Janaka) is one of the five Pandawa knights in the Mahabharata epic. He is renowned as the middle Pandawa warrior, celebrated for his striking appearance, gentle nature, and unrivaled archery skills throughout the entire world.",
                        karakter: "Arjuna melambangkan ksatria sejati yang ideal (lelananging jagad). Dengan wajah luruh (menunduk) dan gaya rambut gelung supit urang polos, karakternya memancarkan ketenangan, kesabaran, dan kehalusan budi. Meski tampak lembut dan gemar bertapa untuk mencari jati diri serta kesaktian, ia merupakan sosok petarung yang sangat tangguh, cerdik, dan tidak kenal takut di medan perang.",
                        karakterEn: "Arjuna embodies the ideal true knight (lelananging jagad). With a bowed face and a plain gelung supit urang hairstyle, his character radiates calmness, patience, and refinement of spirit. Though he appears gentle and fond of meditation to seek self-knowledge and power, he is an exceptionally tough, shrewd, and fearless fighter on the battlefield.",
                        hubungan: "Sebagai putra ketiga dari Pandu Dewanata dan Dewi Kunti, Arjuna adalah saudara dari Yudistira, Bima, Nakula, dan Sadewa. Ia sangat dihormati dan disayangi oleh Kresna, yang senantiasa bertindak sebagai penasihat spiritual sekaligus kusir keretanya dalam perang besar Bharatayuddha.",
                        hubunganEn: "As the third son of Pandu Dewanata and Dewi Kunti, Arjuna is the brother of Yudistira, Bima, Nakula, and Sadewa. He is deeply respected and beloved by Kresna, who always acts as his spiritual advisor and charioteer in the great Bharatayuddha war.",
                        audio: "assets/audio/arjuna.m4a", 
                        audioEn: "assets/audio/en/arjuna.m4a"
                    }
                ]},
                { img:"assets/images/pameran/lantai1/ruang1/display/srirama.png", hotspots:[
                    {x: 25, y: 15, w: 50, h: 70,nama: "Sri Rama", 
                        label: "SRI RAMA", 
                        img: "assets/images/pameran/lantai1/ruang1/display/srirama.png",
                        desc: "Sri Rama adalah tokoh utama dalam wiracarita Ramayana, pewaris takhta Kerajaan Kosala, dan diyakini sebagai awatara ketujuh Dewa Wisnu. Sosoknya sangat dihormati sebagai penguasa yang adil dan pembela mutlak kebenaran (dharma).",
                        descEn: "Sri Rama is the main character in the Ramayana epic, the heir to the throne of the Kingdom of Kosala, and is believed to be the seventh avatar of Lord Vishnu. His figure is greatly revered as a just ruler and an absolute defender of righteousness (dharma).",
                        karakter: "Sri Rama adalah perwujudan sejati dari darma dan kebajikan. Ia memiliki kesabaran yang luar biasa, berwibawa, dan rela berkorban, yang dibuktikan ketika ia menerima hukuman pembuangan ke hutan selama 14 tahun demi menjaga kehormatan sumpah sang ayah. Ia mengenakan mahkota raja (makuta) megah namun dengan gestur menunduk, melambangkan kekuasaan tertinggi yang dijalankan dengan penuh welas asih dan kebijaksanaan.",
                        karakterEn: "Sri Rama is the true embodiment of dharma and virtue. He possesses extraordinary patience, dignity, and a willingness to sacrifice, as proven when he accepted a 14-year exile to the forest to uphold the honor of his father's vow. He wears a magnificent royal crown (makuta) yet with a bowing gesture, symbolizing supreme power exercised with compassion and wisdom.",
                        hubungan: "Rama adalah suami setia dari Dewi Sinta, yang berjuang melintasi lautan untuk menyelamatkannya dari cengkeraman Rahwana. Ia juga merupakan panutan utama yang disembah dengan penuh pengabdian dan kepatuhan oleh Anoman, serta teladan bagi adiknya, Laksmana, yang setia mendampinginya di pengasingan.",
                        hubunganEn: "Rama is the devoted husband of Dewi Sinta, whom he fought across the ocean to rescue from Rahwana's clutches. He is also the supreme role model worshipped with full devotion and obedience by Anoman, and a guiding example for his younger brother Laksmana, who faithfully accompanied him in exile.",
                        audio: "assets/audio/srirama.m4a", 
                        audioEn: "assets/audio/en/srirama.m4a"}
                ]},
                { img:"assets/images/pameran/lantai1/ruang1/display/gatotkaca.png", hotspots:[
                    {x: 25, y: 15, w: 50, h: 70,nama: "Gatotkaca", 
                        label: "GATOTKACA", 
                        img: "assets/images/pameran/lantai1/ruang1/display/gatotkaca.png",
                        desc: "Gatotkaca adalah ksatria gagah berani penguasa kesatrian Pringgadani dalam wiracarita Mahabharata. Dikenal luas dengan julukan 'otot kawat tulang besi', ia adalah pahlawan pembela Pandawa yang memiliki kesaktian luar biasa, termasuk kemampuannya menembus awan dan terbang di angkasa.",
                        descEn: "Gatotkaca is the brave knight who rules the Pringgadani kingdom in the Mahabharata epic. Widely known by the epithet 'muscles of wire, bones of iron', he is a heroic defender of the Pandawa, possessing extraordinary powers, including the ability to pierce through clouds and fly through the sky.",
                        karakter: "Gatotkaca mewakili watak ksatria yang tegas, tanpa kompromi, pemberani, dan pantang menyerah. Ciri ikonografinya sangat khas: wajah berwarna hitam pekat, mata telengan (membelalak tajam), bertaring, dan mengenakan bintang suryakanta di dadanya. Di balik penampilannya yang garang sebagai keturunan raksasa, ia memiliki hati yang murni, berjiwa ksatria, dan memegang teguh pengabdian kepada jalan kebenaran.",
                        karakterEn: "Gatotkaca represents the character of a resolute, uncompromising, brave, and indomitable knight. His iconography is very distinctive: a deep black face, wide-open staring eyes (telengan), fangs, and a suryakanta star on his chest. Behind his fierce appearance as a descendant of giants, he possesses a pure heart, a knightly spirit, and unwavering dedication to the path of righteousness.",
                        hubungan: "Ia adalah putra dari Bima (Werkudara) dan Dewi Arimbi. Gatotkaca merupakan benteng pertahanan utama dan keponakan yang paling diandalkan oleh keluarga Pandawa. Dalam Perang Bharatayuddha, ia mengorbankan nyawanya dan gugur sebagai pahlawan agung setelah menerima hantaman senjata Kunta dari Adipati Karna, demi melindungi pamannya, Arjuna.",
                        hubunganEn: "He is the son of Bima (Werkudara) and Dewi Arimbi. Gatotkaca is the main defense and the most relied-upon nephew of the Pandawa family. In the Bharatayuddha War, he sacrificed his life and fell as a great hero after being struck by Adipati Karna's Kunta weapon, in order to protect his uncle Arjuna.",
                        audio: "assets/audio/gatotkaca.m4a", 
                        audioEn: "assets/audio/en/gatotkaca.m4a"}
                ]},
                { img:"assets/images/pameran/lantai1/ruang1/display/twalen.png", hotspots:[
                    {x: 25, y: 15, w: 50, h: 70,
                        nama: "Twalen", 
                        label: "TWALEN", 
                        img: "assets/images/pameran/lantai1/ruang1/display/twalen.png",
                        desc: "Twalen (atau Malen) adalah tokoh punakawan utama dan paling dihormati dalam tradisi kesenian pewayangan gaya Bali (seperti pada lakon Calonarang). Meski tampil sebagai pelayan atau abdi rakyat jelata, ia sesungguhnya adalah entitas suci atau perwujudan dewa (Sang Hyang Ismaya) yang turun ke dunia.",
                        descEn: "Twalen (or Malen) is the main and most revered punakawan figure in the Balinese wayang puppet tradition (such as in the Calonarang play). Although he appears as a servant or commoner, he is in reality a sacred entity or divine manifestation (Sang Hyang Ismaya) who has descended to earth.",
                        karakter: "Karakteristik visual Twalen sangat khas: tubuh gemuk dengan perut buncit, berkulit gelap, memiliki satu jambul rambut, serta senantiasa mengenakan kain poleng (kotak-kotak hitam putih) di lehernya. Kain poleng ini melambangkan filosofi Rwa Bhineda—keseimbangan alamiah antara kebaikan dan keburukan. Twalen memiliki watak jenaka, tenang, dan bijaksana. Dialognya sering kali menjadi penyampai pesan moral atau filsafat mendalam yang dibalut dengan humor yang membumi.",
                        karakterEn: "Twalen's visual characteristics are very distinctive: a fat body with a protruding belly, dark skin, a single tuft of hair, and always wearing a poleng cloth (black and white checkered) around his neck. This poleng cloth symbolizes the Rwa Bhineda philosophy—the natural balance between good and evil. Twalen has a humorous, calm, and wise character. His dialogues often convey deep moral messages or philosophy wrapped in down-to-earth humor.",
                        hubungan: "Dalam lakon pewayangan Bali, Twalen bertugas sebagai pengasuh, pembimbing spiritual, sekaligus penerjemah (karena sering menerjemahkan bahasa Kawi ke bahasa Bali halus) bagi ksatria-ksatria protagonis. Ia sering didampingi oleh putranya, Merdah, dan mereka berdua kerap terlibat adu argumen logis maupun jenaka melawan punakawan dari pihak antagonis, yakni Delem dan Sangut.",
                        hubunganEn: "In Balinese wayang performances, Twalen serves as a caretaker, spiritual guide, and translator (as he often translates Kawi language into refined Balinese) for the protagonist knights. He is often accompanied by his son, Merdah, and the two of them frequently engage in logical and humorous debates against the punakawan of the antagonist side, namely Delem and Sangut.",
                        audio: "assets/audio/twalen.m4a", 
                        audioEn: "assets/audio/en/twalen.m4a"
                    },
                ]}
            ]
        },
        ruang2:{ label:"Ruang 2", fullLabel:"Ruang 2 — Kisah Ramayana",
            displays: [
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 1.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70,
                    nama: "RAMA, LAKSMANA, SINTA DAN KIJANG", label: "RAMA, LAKSMANA, SINTA DAN KIJANG", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 1.jpg",
                    desc: "Saat masa pengasingan di hutan Dhandaka selama 14 tahun, Rama hidup bersama Sinta dan adiknya, Laksmana. Ketika masa pengasingan itu, Rahwana berhasil menculik Sinta atas bantuan Kalamarica yang menjelma menjadi seekor kijang. Rama memburu kijang tersebut atas permintaan Sinta.",
                    descEn: "During the 14-year exile in the Dhandaka forest, Rama lived together with Sinta and his younger brother Laksmana. During this exile, Rahwana managed to kidnap Sinta with the help of Kalamarica, who transformed into a deer. Rama pursued the deer at Sinta's request.",
                    psikologi: "Rama (Penyayang & Pelindung), Sinta (Tergoda keindahan duniawi), Laksmana (Waspada & Setia).",
                    psikologiEn: "Rama (Loving & Protective), Sinta (Tempted by worldly beauty), Laksmana (Alert & Loyal).",
                    hubungan: "Rama dan Sinta adalah sepasang suami istri. Laksmana adalah adik kandung Rama yang sangat setia menemani mereka di pengasingan.",
                    hubunganEn: "Rama and Sinta are husband and wife. Laksmana is Rama's younger brother who loyally accompanied them throughout the exile.",
                    audio:"assets/audio/adegan 1 ind.m4a",audioEn:"assets/audio/en/adegan 1 en.m4a"
                },
                
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 2.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70,
                    nama: "SUGRIWA SUBALI", label: "SUGRIWA SUBALI", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 2.jpg",
                    desc: "SSugriwa dan Subali adalah kakak-beradik, putra dari Resi Gotama. Sugriwa diceritakan bersifat baik dan Subali bersifat jahat. Sugriwa dan Subali berebut tahta Kiskenda. Sugriwa bersahabat dengan Rama dan atas bantuannya berhasil merebut Kiskenda dari keserakahan Subali.",
                    descEn: "Sugriwa and Subali are brothers, sons of the sage Resi Gotama. Sugriwa is described as good-natured while Subali is evil. They fought over the throne of Kiskenda. Sugriwa befriended Rama and, with his help, managed to take back Kiskenda from Subali's greed.",
                    psikologi: "Sugriwa (Baik budi & Benar), Subali (Jahat, Serakah, & Haus kekuasaan).",
                    psikologiEn: "Sugriwa (Good-natured & Righteous), Subali (Evil, Greedy, & Power-hungry).",
                    hubungan: "Sugriwa dan Subali adalah kakak beradik putra Resi Gotama. Sugriwa merupakan sekutu dan sahabat karib Sri Rama.",
                    hubunganEn: "Sugriwa and Subali are brothers, sons of sage Resi Gotama. Sugriwa is a close ally and dear friend of Sri Rama.",
                    audio:"assets/audio/adegan 2 ind.m4a",audioEn:"assets/audio/en/adegan 2 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 3.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "PASUKAN KERA", label: "PASUKAN KERA", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 3.jpg",
                    desc: "Pasukan Kera bersiap untuk turun ke medan pertempuran. Mereka adalah garda terdepan yang membantu perjuangan Sri Rama.",
                    descEn: "The Monkey Army prepares to descend onto the battlefield. They are the vanguard force that aids Sri Rama's cause.",
                    psikologi: "Pemberani, Setia, dan Penuh semangat juang.",
                    psikologiEn: "Brave, Loyal, and Full of fighting spirit.",
                    hubungan: "Pasukan Kera adalah bala tentara yang setia mengabdi kepada Sugriwa dan beraliansi dengan Sri Rama.",
                    hubunganEn: "The Monkey Army is the loyal force serving under Sugriwa and allied with Sri Rama.",
                    audio:"assets/audio/adegan 3 ind.m4a",audioEn:"assets/audio/en/adegan 3 en.m4a"
                },
                
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 4.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 22, h: 70, 
                    nama: "ANOMAN OBONG", label: "ANOMAN OBONG", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 4.jpg",
                    desc: "AAdegan Anoman Obong menceritakan peristiwa saat Anoman dikirim sebagai utusan oleh Rama untuk mencari keberadaan Sinta dan mengkonfirmasikan keberadaannya. Ia berhasil menemukan Sinta di Taman Argasoka Negeri Alengka. Pengkhianatan terjadi ketika Anoman berhasil ditemukan oleh pasukan Rahwana sehingga Anoman kemudian dijatuhkan hukuman dengan cara dibakar hidup-hidup. Namun Anoman kemudian berhasil membakar Kota Alengka.",
                    descEn: "The Anoman Obong scene tells of when Anoman was sent as Rama's envoy to find and confirm Sinta's whereabouts. He successfully found Sinta in the Argasoka Garden of the kingdom of Alengka. He was later discovered by Rahwana's forces and sentenced to be burned alive, but Anoman turned the tables and burned down the entire city of Alengka.",
                    psikologi: "Anoman (Cerdas, Lincah, & Utusan yang setia), Sinta (Penuh harap & Teguh pendirian).",
                    psikologiEn: "Anoman (Intelligent, Agile, & Faithful envoy), Sinta (Full of hope & Steadfast in conviction).",
                    hubungan: "Anoman adalah duta/utusan kepercayaan Sri Rama untuk menemui Dewi Sinta yang sedang ditawan.",
                    hubunganEn: "Anoman is Sri Rama's trusted ambassador, sent to meet with Dewi Sinta who is being held captive.",
                    audio:"assets/audio/adegan 4 ind.m4a",audioEn:"assets/audio/en/adegan 4 en.m4a"
                },
                
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 5.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "KERAJAAN ALENGKA: RAHWANA BERSAMA ADIK-ADIKNYA, KUMBAKARNA, WIBISANA DAN SARPAKENAKA", label: "KERAJAAN ALENGKA: RAHWANA BERSAMA ADIK-ADIKNYA, KUMBAKARNA, WIBISANA DAN SARPAKENAKA", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 5.jpg",
                    desc: "Rahwana bersama Kumbakarna, Wibisana, dan Sarpakenaka sedang menyusun strategi perang besar melawan pasukan kera yang dipimpin Rama. Terjadi sela sengit antara Rahwana dan Kumbakarna serta Wibisana. Rahwana dengan sifat jahatnya tetap bersikukuh tidak akan mengembalikan Sinta kepada Rama.",
                    descEn: "Rahwana, together with Kumbakarna, Wibisana, and Sarpakenaka, is devising a grand battle strategy against Rama's monkey army. A fierce argument erupts between Rahwana and both Kumbakarna and Wibisana. Rahwana, true to his evil nature, stubbornly insists that he will not return Sinta to Rama.",
                    psikologi: "Rahwana (Keras kepala, Egois, Jahat), Kumbakarna (Membela negara, bukan membenarkan kakaknya), Wibisana (Bijaksana, Berpihak pada kebenaran).",
                    psikologiEn: "Rahwana (Stubborn, Selfish, Evil), Kumbakarna (Defending the nation, not justifying his brother's actions), Wibisana (Wise, Siding with righteousness).",
                    hubungan: "Rahwana, Kumbakarna, Wibisana, dan Sarpakenaka adalah saudara kandung penguasa Alengka. Perbedaan prinsip membuat Wibisana nantinya menyeberang membela Rama.",
                    hubunganEn: "Rahwana, Kumbakarna, Wibisana, and Sarpakenaka are biological siblings and rulers of Alengka. Their differing principles lead Wibisana to eventually defect and side with Rama.",
                    audio:"assets/audio/adegan 5 ind.m4a",audioEn:"assets/audio/en/adegan 5 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 6.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "RAMA TAMBAK", label: "RAMA TAMBAK", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 6.jpg",
                    desc: "Adegan Rama Tambak menceritakan tentang pembuatan tambak untuk melintasi lautan yang terhalang oleh Selat Malaka. Tambak adalah sebuah titian yang dibangun menyambungkan daratan melalui sebuah koloni yang kemudian terendam. Masing-masing prajurit kera berhasil membuat tambak sehingga pasukan kera berhasil menyebrangi lautan dan melintasi selat tersebut.",
                    descEn: "The Rama Tambak scene tells of the construction of a bridge (tambak) to cross the sea blocked by the Malacca Strait. The tambak is a causeway built to connect the mainland through a colony of land that then became submerged. Each monkey soldier contributed to building the bridge, allowing the monkey army to successfully cross the ocean and traverse the strait.",
                    psikologi: "Rama (Pemimpin yang gigih), Wibisana (Ahli strategi yang cerdas).",
                    psikologiEn: "Rama (A persevering leader), Wibisana (An intelligent strategist).",
                    hubungan: "Wibisana (adik Rahwana) kini telah menjadi sekutu sekaligus penasihat utama Sri Rama dalam menembus pertahanan Alengka.",
                    hubunganEn: "Wibisana (Rahwana's younger brother) has now become Sri Rama's key ally and chief advisor in breaching the defenses of Alengka.",
                    audio:"assets/audio/adegan 6 ind.m4a",audioEn:"assets/audio/en/adegan 6 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 7.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "PERANG SARI KUDHUP PALWOGO", label: "PERANG SARI KUDHUP PALWOGO", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 7.jpg",
                    desc: "Krabika Sari Kudhup Palwogo merupakan perang besar antara pasukan tentara kera prajurit Rama melawan tentara raksasa prajurit Rahwana. Pertempuran dalam perang terjadi menjadi jadi beradu strategi sehingga banyak raksasa dan kera yang gugur di medan perang. Pertempuran berlangsung cukup lama, seakan tidak ada habisnya.",
                    descEn: "Krabika Sari Kudhup Palwogo is the great battle between Rama's monkey soldier army and Rahwana's giant soldier army. The battle becomes a contest of strategies, resulting in many giants and monkeys falling on the battlefield. The fighting lasts for a very long time, seemingly without end.",
                    psikologi: "Kegigihan, Keberanian luar biasa, dan Kekacauan perang.",
                    psikologiEn: "Perseverance, Extraordinary bravery, and the Chaos of war.",
                    hubungan: "Pasukan Kera (membela kebenaran/Rama) bertarung mati-matian melawan Pasukan Raksasa (membela kebatilan/Rahwana).",
                    hubunganEn: "The Monkey Army (defending righteousness/Rama) fights to the death against the Giant Army (defending evil/Rahwana).",
                    audio:"assets/audio/adegan 7 ind.m4a",audioEn:"assets/audio/en/adegan 7 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 8.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70,
                    nama: "KEMATIAN RAHWANA OLEH RAMAWIJAYA", label: "KEMATIAN RAHWANA OLEH RAMAWIJAYA", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 8.jpg",
                    desc: "Akhirnya, Rama memenangkan perang antara ia dan Rahwana. Rahwana gugur di medan perang. Suasana kemenangan Rama seskan dunia turut berbahagia atas hancurnya malapetaka angkara laksmana diri Rahwana.",
                    descEn: "Finally, Rama wins the war between himself and Rahwana. Rahwana falls on the battlefield. The atmosphere of Rama's victory fills the world with joy at the destruction of the calamity and malice that was Rahwana.",
                    psikologi: "Rama (Tegas, Pembela Kebenaran), Rahwana (Akhir dari Kesombongan dan Angkara Murka).",
                    psikologiEn: "Rama (Firm, Defender of Righteousness), Rahwana (The End of Arrogance and Tyrannical Wrath).",
                    hubungan: "Pertarungan puncak antara Ksatria (Kebenaran) melawan Raja Raksasa (Kejahatan). Kemenangan mutlak bagi Sri Rama.",
                    hubunganEn: "The climactic battle between the Knight (Righteousness) against the Demon King (Evil). An absolute victory for Sri Rama.",
                    audio:"assets/audio/adegan 8 ind.m4a",audioEn:"assets/audio/en/adegan 8 en.m4a"
                }
            ]
        },
        { 
            img: "assets/images/pameran/lantai1/ruang2/display/Adegan 9.jpg", 
            hotspots: [
                {
                    x: 25, y: 15, w: 50, h: 70, 
                    nama: "PERTEMUAN RAMAWIJAYA DAN DEWI SINTA", label: "PERTEMUAN RAMAWIJAYA DAN DEWI SINTA", 
                    img: "assets/images/pameran/lantai1/ruang2/display/Adegan 9.jpg",
                    desc: "Ramawijaya pada akhirnya bertemu kembali dengan Dewi Sinta setelah segala rintangan dan pertempuran yang penuh maha dahsyat. Setelah sekian lama berpisah, mereka akhirnya bertemu kembali. Inilah akhir dari kisah Ramayana yang melegenda, sebuah cerita tentang kesetiaan, pengorbanan, dan kemenangan kebaikan atas kejahatan.",
                    descEn: "Ramawijaya finally reunites with Dewi Sinta after all the tremendous obstacles and battles. After such a long separation, they are finally together again. This is the end of the legendary Ramayana story — a tale of loyalty, sacrifice, and the victory of good over evil.",
                    psikologi: "Rama (Pemimpin yang adil & bijaksana), Sinta (Suci, Setia, & Penuh cinta).",
                    psikologiEn: "Rama (A just & wise leader), Sinta (Pure, Faithful, & Full of love).",
                    hubungan: "Cinta sejati antara Rama dan Sinta yang akhirnya bersatu kembali sebagai Raja dan Ratu Ayodya, membawa harapan baru bagaikan matahari terbit.",
                    hubunganEn: "The true love between Rama and Sinta finally reunites them as the King and Queen of Ayodya, bringing new hope like the rising sun.",
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
                    descEn: "Wayang Kancil is a type of wayang that features the mousedeer (kancil) as its main character. This wayang was created by Sunan Giri in the 15th century CE as a medium for spreading Islam in the Nusantara archipelago, and was later revived by Bo Liem in 1925.\n\nThe stories performed in Wayang Kancil performances are usually adapted from the Serat Kancil Kridhamartana. Through the clever and resourceful mousedeer character, this wayang is rich with moral messages and good character values. Its stories consistently teach how one can avoid danger through wit and calm thinking.",
                    psikologi: "Kancil (Cerdik, banyak akal, lincah, pemikir cepat), Harimau & Buaya (Kuat namun mudah dipengaruhi/dikelabui), Petani (Sosok manusia bersahaja yang mewakili kehidupan sehari-hari).",
                    psikologiEn: "Kancil (Clever, resourceful, agile, quick-thinker), Tiger & Crocodile (Strong but easily influenced/deceived), Farmer (A humble human figure representing everyday life).",
                    hubungan: "Kancil sering kali digambarkan berkonflik dengan predator (seperti harimau dan buaya) atau berurusan dengan properti milik manusia (petani). Ia memanipulasi hubungan dan situasi tersebut untuk membebaskan diri dari ancaman.",
                    hubunganEn: "The Kancil is often depicted in conflict with predators (such as tigers and crocodiles) or dealing with property belonging to humans (farmers). He manipulates these relationships and situations to free himself from threats.",
                    audio: "assets/audio/arjuna.m4a", 
                    audioEn: "assets/audio/en/arjuna.m4a"
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
                    descEn: "Wayang Kulit Sasak is a wayang art form originating from the Lombok region of West Nusa Tenggara. Its name is taken directly from the name of the indigenous tribe that inhabits the Lombok area, the Sasak people. Visually, the form of Wayang Sasak bears similarities to Wayang Kulit Gedog and has characteristic profile features that intersect with Balinese wayang.\n\nIn the past, Wayang Kulit Sasak played a crucial role as a medium for spreading Islam on the island of Lombok. Beyond religious propagation, this wayang was also frequently performed to enliven various local traditional ceremonies, making it an inseparable part of the cultural and spiritual fabric of the Sasak community.",
                    psikologi: "Menampilkan tokoh-tokoh (adaptasi kisah Serat Menak) dengan pembawaan karakter yang tegas, berwibawa, agamis, ksatria, dan heroik.",
                    psikologiEn: "Features characters (adapted from the Serat Menak story) with firm, authoritative, religious, knightly, and heroic character portrayals.",
                    hubungan: "Interaksi antar tokohnya sering kali merepresentasikan konflik antara penyebar ajaran kebenaran (protagonis) melawan raja-raja arogan atau raksasa yang menentangnya (antagonis).",
                    hubunganEn: "The interactions between characters often represent a conflict between the spreaders of righteous teachings (protagonists) against arrogant kings or giants who oppose them (antagonists).",
                    audio: "assets/audio/arjuna.m4a", 
                    audioEn: "assets/audio/en/arjuna.m4a"
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
                    descEn: "Wayang Kulit Cirebon is a wayang art form that developed along the northern coastal area of West Java. This art form is believed to have been strongly and directly influenced by the Demak Sultanate during the era of the Wali Songo. Its distinctive visual features lie in its extremely fine tatahan (carving) and the use of sharp, bold paint colors.\n\nOne of the most iconic things that differentiates Wayang Cirebon from other Javanese wayang is the existence of nine Punakawan figures created by Sunan Panggung (Sunan Kalijaga). These nine Punakawan figures were created as symbols of the nine saints (Wali Songo) on the island of Java, blending popular entertainment with noble Islamic dakwah teachings.",
                    psikologi: "Tokoh Punakawan (Humoris, merakyat, bijaksana, penyabar, menjadi representasi rakyat kecil namun berilmu tinggi). Tokoh Ksatria (Elegan, tenang, dan menjunjung tinggi kebenaran).",
                    psikologiEn: "Punakawan Characters (Humorous, down-to-earth, wise, patient, representing the common people yet highly knowledgeable). Knight Characters (Elegant, calm, and upholding righteousness).",
                    hubungan: "Kesembilan tokoh Punakawan memiliki ikatan persaudaraan yang erat. Mereka selalu bertindak sebagai pengasuh, penasihat spiritual, sekaligus pendamping setia para ksatria di setiap peperangan melawan angkara murka.",
                    hubunganEn: "The nine Punakawan figures share a close bond of brotherhood. They always act as caretakers, spiritual advisors, and faithful companions to the knights in every battle against evil forces.",
                    audio: "assets/audio/arjuna.m4a", 
                    audioEn: "assets/audio/en/arjuna.m4a"
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
                    descEn: "Wayang Revolusi is a modern wayang creation specifically crafted in 1945, coinciding with the proclamation of the independence of the Republic of Indonesia. Unlike traditional wayang that presents ancient mythology, this wayang specifically records historical footprints and tells of the hardships of the Indonesian people in defending their independence from colonizers.\n\nThe main uniqueness of Wayang Revolusi is seen in the appearance of its characters, who are depicted realistically like humans in 1940s-era clothing. The performances feature national hero figures, uniformed soldiers, colonial officials, and humble common people. This wayang successfully became a living tool of historical documentation as well as entertainment that fostered patriotism in its era.",
                    psikologi: "Tokoh Pejuang (Patriotik, berani, tanpa pamrih, rela berkorban). Tokoh Penjajah (Otoriter, serakah, congkak). Rakyat Jelata (Tangguh, menderita namun memiliki pendirian teguh).",
                    psikologiEn: "Freedom Fighter Characters (Patriotic, brave, selfless, willing to sacrifice). Colonizer Characters (Authoritarian, greedy, arrogant). Common People (Tough, suffering but unwavering in their stance).",
                    hubungan: "Wayang ini menonjolkan solidaritas dan persatuan antar kelas sosial. Terlihat hubungan yang erat antara pemimpin negara, militer, dan rakyat sipil bersatu padu melawan pasukan kolonial Belanda dan sekutu.",
                    hubunganEn: "This wayang highlights solidarity and unity across social classes. It shows the close relationship between state leaders, the military, and civilians united against the Dutch colonial forces and their allies.",
                    audio: "assets/audio/arjuna.m4a", 
                    audioEn: "assets/audio/en/arjuna.m4a"
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
                    descEn: "Similar to Wayang Revolusi, Wayang Suluh was born and developed in the critical era of the war to defend the independence of the Republic of Indonesia, specifically created around 1947. The word \"Suluh\" in Indonesian means a torch or lighting tool, consistent with this wayang's essential function as a medium of information and education (penyuluhan) for the general public amid the turmoil of war.\n\nFunctionally, Wayang Suluh was massively used by the Republican government as a medium of propaganda and nationalism campaigns. The characters featured were real figures such as the Father of the Nation Soekarno, Moh. Hatta, and the hero Bung Tomo. Through touring performances to various regions, this wayang successfully conveyed information, educated the people of the revolution, and fanned the flames of the spirit of resistance.",
                    psikologi: "Tokoh Pemimpin Nasional (Kharismatik, visioner, pandai berorasi, berwibawa). Pasukan dan Rakyat (Berdedikasi tinggi, bersemangat api, penuh keberanian revolusioner).",
                    psikologiEn: "National Leader Characters (Charismatic, visionary, skilled orators, authoritative). Troops and People (Highly dedicated, fiery, full of revolutionary courage).",
                    hubungan: "Memperlihatkan ikatan komando dan koneksi emosional yang tak terpisahkan antara para pendiri bangsa (*Founding Fathers*) dengan rakyat yang bahu-membahu dalam satu visi mulia: Kemerdekaan Indonesia seutuhnya.",
                    hubunganEn: "It depicts the inseparable bond of command and emotional connection between the Founding Fathers and the people who worked side by side in one noble vision: the complete independence of Indonesia.",
                    audio: "assets/audio/arjuna.m4a", 
                    audioEn: "assets/audio/en/arjuna.m4a"
                }
            ]
        }
    ]
        },
        
    }}
};
