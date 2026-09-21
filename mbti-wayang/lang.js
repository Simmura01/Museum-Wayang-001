/**
 * lang.js — Bilingual Data for MBTI Wayang Quiz
 * Supports: 'id' (Bahasa Indonesia) and 'en' (English)
 */

// --- UI Strings ---------------------------------------------------------------
const UI = {
  id: {
    backBtn: 'Kembali ke Museum',
    headerTitle: 'Museum Wayang Jakarta',
    heroBadge: 'Quiz Kepribadian',
    heroTitle: 'Kamu adalah Tokoh Wayang yang mana?',
    heroSub: 'Jawab 16 pertanyaan dan temukan karakter pewayangan yang mencerminkan kepribadian unikmu berdasarkan kerangka MBTI.',
    startBtn: 'Mulai Quiz →',
    questionLabel: 'Pertanyaan',
    questionOf: 'dari 16',
    prevBtn: '← Sebelumnya',
    photoBoothBtn: 'Abadikan di Photo Booth',
    retakeBtn: 'Ulangi Quiz',
    footerMuseum: 'Museum Wayang Jakarta © 2025',
    footerMbti: 'Berbasis Kerangka Myers-Briggs Type Indicator (MBTI)',
    mbtiSectionTitle: 'Tentang Tipe MBTI-mu',
  },
  en: {
    backBtn: 'Back to Museum',
    headerTitle: 'Museum Wayang Jakarta',
    heroBadge: 'Personality Quiz',
    heroTitle: 'Which Wayang Character Are You?',
    heroSub: 'Answer 16 questions and discover the wayang character that reflects your unique personality based on the MBTI framework.',
    startBtn: 'Start Quiz →',
    questionLabel: 'Question',
    questionOf: 'of 16',
    prevBtn: '← Previous',
    photoBoothBtn: 'Capture at Photo Booth',
    retakeBtn: 'Retake Quiz',
    footerMuseum: 'Museum Wayang Jakarta © 2025',
    footerMbti: 'Based on Myers-Briggs Type Indicator (MBTI) Framework',
    mbtiSectionTitle: 'About Your MBTI Type',
  },
};

// --- Questions (Bilingual) ----------------------------------------------------
const QUESTIONS_LANG = {
  id: [
    // Dimensi E/I
    { dim:'E/I', q:'Saat merasa lelah, kamu lebih suka...', a:'Berkumpul dengan teman untuk menyegarkan diri', valA:'E', b:'Menyendiri dan beristirahat dalam ketenangan', valB:'I' },
    { dim:'E/I', q:'Di sebuah pesta besar, kamu biasanya...', a:'Mudah berbicara dengan orang yang belum dikenal', valA:'E', b:'Lebih nyaman mengobrol dengan satu atau dua orang terdekat', valB:'I' },
    { dim:'E/I', q:'Saat menghadapi masalah, kamu...', a:'Mendiskusikannya dengan banyak orang untuk mendapat perspektif', valA:'E', b:'Merenung sendiri hingga menemukan jawabanmu', valB:'I' },
    { dim:'E/I', q:'Kamu mendapat energi dari...', a:'Interaksi sosial yang ramai dan penuh semangat', valA:'E', b:'Waktu sendiri yang tenang dan reflektif', valB:'I' },
    // Dimensi S/N
    { dim:'S/N', q:'Saat belajar hal baru, kamu lebih suka...', a:'Fakta konkret dan langkah-langkah yang jelas', valA:'S', b:'Konsep besar dan pola yang tersembunyi di balik fakta', valB:'N' },
    { dim:'S/N', q:'Kamu lebih percaya pada...', a:'Pengalaman nyata dan bukti yang bisa disentuh', valA:'S', b:'Intuisi dan firasat yang sulit dijelaskan', valB:'N' },
    { dim:'S/N', q:'Saat bercerita, kamu cenderung...', a:'Detail dan kronologis, peristiwa demi peristiwa', valA:'S', b:'Melompat ke makna dan gambaran besarnya', valB:'N' },
    { dim:'S/N', q:'Kamu lebih tertarik pada...', a:'Hal-hal yang nyata dan bisa langsung diterapkan', valA:'S', b:'Kemungkinan-kemungkinan masa depan yang penuh potensi', valB:'N' },
    // Dimensi T/F
    { dim:'T/F', q:'Saat membuat keputusan penting, kamu...', a:'Menganalisis pro-kontra secara logis dan objektif', valA:'T', b:'Mempertimbangkan dampaknya pada perasaan semua orang', valB:'F' },
    { dim:'T/F', q:'Kritik yang membangun menurutmu adalah...', a:'Langsung dan jujur, meski terasa pedas', valA:'T', b:'Disampaikan dengan lembut dan penuh empati', valB:'F' },
    { dim:'T/F', q:'Saat temanmu bersedih, kamu...', a:'Menawarkan solusi praktis untuk masalahnya', valA:'T', b:'Mendengarkan dan memvalidasi perasaannya terlebih dulu', valB:'F' },
    { dim:'T/F', q:'Keputusan yang baik adalah keputusan yang...', a:'Logis dan rasional, meski menyakitkan bagi beberapa pihak', valA:'T', b:'Menjaga harmoni dan mempertimbangkan semua perasaan', valB:'F' },
    // Dimensi J/P
    { dim:'J/P', q:'Sebelum liburan, kamu biasanya...', a:'Merencanakan semuanya jauh-jauh hari dengan detail', valA:'J', b:'Pergi mengikuti alur dan bersenang-senang secara spontan', valB:'P' },
    { dim:'J/P', q:'Ruang kerjamu biasanya...', a:'Rapi, terorganisir, semua ada tempatnya', valA:'J', b:'Tampak berantakan tapi kamu tahu di mana semuanya', valB:'P' },
    { dim:'J/P', q:'Tenggat waktu menurutmu...', a:'Sesuatu yang harus dipenuhi, bahkan lebih awal kalau bisa', valA:'J', b:'Titik awal untuk mulai benar-benar serius', valB:'P' },
    { dim:'J/P', q:'Kamu merasa paling produktif saat...', a:'Mengikuti jadwal dan rencana yang sudah ditetapkan', valA:'J', b:'Bebas bergerak dan bekerja sesuai suasana hati', valB:'P' },
  ],
  en: [
    // Dimension E/I
    { dim:'E/I', q:'When you feel tired, you prefer to...', a:'Hang out with friends to recharge', valA:'E', b:'Be alone and rest in peace and quiet', valB:'I' },
    { dim:'E/I', q:'At a big party, you usually...', a:'Easily talk to people you have never met', valA:'E', b:'Prefer chatting with one or two close friends', valB:'I' },
    { dim:'E/I', q:'When facing a problem, you...', a:'Discuss it with many people to gain perspective', valA:'E', b:'Reflect alone until you find the answer', valB:'I' },
    { dim:'E/I', q:'You get energy from...', a:'Lively and energetic social interactions', valA:'E', b:'Quiet alone time for reflection', valB:'I' },
    // Dimension S/N
    { dim:'S/N', q:'When learning something new, you prefer...', a:'Concrete facts and clear step-by-step instructions', valA:'S', b:'Big concepts and hidden patterns behind the facts', valB:'N' },
    { dim:'S/N', q:'You trust more in...', a:'Real experience and tangible evidence', valA:'S', b:'Intuition and gut feelings that are hard to explain', valB:'N' },
    { dim:'S/N', q:'When telling a story, you tend to...', a:'Be detailed and chronological, event by event', valA:'S', b:'Jump to the meaning and the big picture', valB:'N' },
    { dim:'S/N', q:'You are more interested in...', a:'Things that are real and can be applied right away', valA:'S', b:'Future possibilities full of potential', valB:'N' },
    // Dimension T/F
    { dim:'T/F', q:'When making an important decision, you...', a:'Analyze the pros and cons logically and objectively', valA:'T', b:'Consider how it will affect everyone\'s feelings', valB:'F' },
    { dim:'T/F', q:'Constructive criticism should be...', a:'Direct and honest, even if it stings', valA:'T', b:'Delivered gently and with empathy', valB:'F' },
    { dim:'T/F', q:'When your friend is sad, you...', a:'Offer practical solutions to the problem', valA:'T', b:'Listen and validate their feelings first', valB:'F' },
    { dim:'T/F', q:'A good decision is one that is...', a:'Logical and rational, even if it hurts some people', valA:'T', b:'Maintains harmony and considers everyone\'s feelings', valB:'F' },
    // Dimension J/P
    { dim:'J/P', q:'Before a vacation, you usually...', a:'Plan everything well in advance with great detail', valA:'J', b:'Go with the flow and have fun spontaneously', valB:'P' },
    { dim:'J/P', q:'Your workspace is usually...', a:'Neat, organized, everything in its place', valA:'J', b:'Looks messy but you know where everything is', valB:'P' },
    { dim:'J/P', q:'Deadlines are...', a:'Something that must be met, even earlier if possible', valA:'J', b:'A starting point to get really serious', valB:'P' },
    { dim:'J/P', q:'You feel most productive when...', a:'Following a set schedule and plan', valA:'J', b:'Free to move and work according to your mood', valB:'P' },
  ],
};

// --- Wayang Character Data (Bilingual) ----------------------------------------
const WAYANG_LANG = {
  Arjuna: {
    name: 'Arjuna',
    icon: '',
    id: {
      subtitle: 'Kesatria Pandawa, Pemanah Ulung',
      desc: 'Seperti Arjuna, sang kesatria terpilih Pandawa, kamu adalah pribadi yang penuh visi jauh ke depan. Kamu memiliki standar tinggi untuk dirimu sendiri dan tak mudah puas dengan hasil yang biasa-biasa saja. Dalam sunyi, kamu menemukan kekuatanmu-seperti Arjuna yang bermeditasi bertahun-tahun sebelum menerima Gandewa, busur ilahi dari Dewa Indra.\n\nKamu tidak banyak bicara, namun setiap kata yang kamu ucapkan memiliki bobot dan makna. Kamu adalah perencana yang cerdas dan strategis, selalu beberapa langkah lebih maju dari yang lain. Bagi orang-orang terdekatmu, kamu adalah pelindung setia yang rela berkorban demi kebenaran.',
      quote: '"Senjata terbaik seorang kesatria bukanlah panahnya, melainkan ketenangannya."',
      quoteAttr: '- Falsafah Arjuna dalam Mahabharata',
      traits: ['Strategis', 'Visioner', 'Independen', 'Perfeksionis', 'Misterius'],
    },
    en: {
      subtitle: 'Pandawa Knight, Master Archer',
      desc: 'Like Arjuna, the chosen knight of the Pandavas, you are a person full of far-reaching vision. You hold yourself to high standards and are never easily satisfied with mediocre results. In solitude, you find your strength — just as Arjuna meditated for years before receiving the Gandewa, the divine bow from Lord Indra.\n\nYou don\'t talk much, but every word you say carries weight and meaning. You are a smart and strategic planner, always several steps ahead of others. For those closest to you, you are a loyal protector willing to sacrifice for the truth.',
      quote: '"A knight\'s greatest weapon is not his arrow, but his composure."',
      quoteAttr: '- Arjuna\'s Philosophy in the Mahabharata',
      traits: ['Strategic', 'Visionary', 'Independent', 'Perfectionist', 'Mysterious'],
    },
  },
  Srikandi: {
    name: 'Srikandi',
    icon: '',
    id: {
      subtitle: 'Pejuang Wanita Sejati',
      desc: 'Seperti Srikandi, prajurit wanita tangguh pewayangan, kamu memiliki intuisi yang tajam dan nilai-nilai yang tak bisa dikompromikan. Di balik penampilanmu yang tenang, tersimpan tekad baja yang siap membela siapa saja yang kamu cintai.\n\nKamu peka terhadap perasaan orang lain dan sering tahu apa yang mereka butuhkan bahkan sebelum mereka mengatakannya. Seperti Srikandi yang belajar memanah dari Arjuna namun akhirnya melampaui gurunya, kamu pun tak pernah berhenti berkembang demi mewujudkan impian yang kamu percayai.',
      quote: '"Keberanian bukan absennya rasa takut, melainkan melangkah maju meski rasa takut itu ada."',
      quoteAttr: '- Watak Srikandi, Prajurit Wanita Pandawa',
      traits: ['Intuitif', 'Berprinsip', 'Empatik', 'Protektif', 'Tegar'],
    },
    en: {
      subtitle: 'True Woman Warrior',
      desc: 'Like Srikandi, the fierce female warrior of the wayang world, you have sharp intuition and uncompromising values. Behind your calm appearance lies an iron will ready to defend anyone you love.\n\nYou are sensitive to others\' feelings and often know what they need even before they say it. Like Srikandi who learned archery from Arjuna but eventually surpassed her teacher, you never stop growing to realize the dreams you believe in.',
      quote: '"Courage is not the absence of fear, but moving forward even when fear is present."',
      quoteAttr: '- The Spirit of Srikandi, Female Warrior of the Pandavas',
      traits: ['Intuitive', 'Principled', 'Empathetic', 'Protective', 'Resilient'],
    },
  },
  Bima: {
    name: 'Bima',
    icon: '',
    id: {
      subtitle: 'Putra Pandawa, Sang Ksatria Tangguh',
      desc: 'Seperti Bima, sang Werkudara yang teguh tak tergoyahkan, kamu adalah pemimpin alami yang lahir dengan tekad membara. Kamu tidak suka bertele-tele-kamu melihat tujuan dan melangkah maju tanpa ragu.\n\nKamu tidak takut membuat keputusan sulit, bahkan ketika itu berarti berdiri sendirian melawan arus. Seperti Bima yang terkenal pantang berbohong dan tak mau membungkukkan kepala kepada siapapun kecuali kepada kebenaran, kamu pun menjunjung tinggi integritas di atas segalanya.',
      quote: '"Sekali bertekad, pantang surut. Karena mundur hanya ada dalam kamus pengecut."',
      quoteAttr: '- Sifat Werkudara dalam Pedalangan Jawa',
      traits: ['Tegas', 'Pemimpin', 'Bernyali', 'Efisien', 'Jujur'],
    },
    en: {
      subtitle: 'Pandava Son, The Mighty Warrior',
      desc: 'Like Bima, the unwavering Werkudara, you are a natural-born leader with a burning determination. You don\'t like beating around the bush — you see the goal and march forward without hesitation.\n\nYou are not afraid to make tough decisions, even when it means standing alone against the tide. Like Bima who was famous for never lying and refused to bow his head to anyone except the truth, you uphold integrity above all else.',
      quote: '"Once determined, never retreat. For retreat exists only in the dictionary of cowards."',
      quoteAttr: '- The Character of Werkudara in Javanese Puppetry',
      traits: ['Decisive', 'Leader', 'Courageous', 'Efficient', 'Honest'],
    },
  },
  Semar: {
    name: 'Semar',
    icon: '',
    id: {
      subtitle: 'Pamong Sejati, Kebijaksanaan Tersembunyi',
      desc: 'Seperti Semar, sang pamong agung yang menyembunyikan kesejatiannya di balik penampilan sederhana, kamu adalah jiwa bebas yang penuh kejutan. Kamu melihat dunia dari sudut pandang yang berbeda dan inilah yang membuatmu begitu istimewa.\n\nKamu menyalakan api semangat di mana pun kamu pergi. Seperti Semar yang selalu hadir dengan guyonan namun menyimpan hikmat terdalam, kamu pun memiliki kemampuan luar biasa untuk menyentuh hati orang dengan cara yang tak terduga.',
      quote: '"Orang bijak tertawa bukan karena dunia lucu, tetapi karena ia mengerti."',
      quoteAttr: '- Hikmat Semar Badranaya',
      traits: ['Kreatif', 'Inspiratif', 'Spontan', 'Bijak', 'Penuh Humor'],
    },
    en: {
      subtitle: 'True Guardian, Hidden Wisdom',
      desc: 'Like Semar, the great guardian who hides his true nature behind a humble appearance, you are a free spirit full of surprises. You see the world from a different perspective, and this is what makes you so special.\n\nYou light the fire of enthusiasm wherever you go. Like Semar who always comes with jokes yet holds the deepest wisdom, you have an extraordinary ability to touch people\'s hearts in unexpected ways.',
      quote: '"The wise laugh not because the world is funny, but because they understand."',
      quoteAttr: '- The Wisdom of Semar Badranaya',
      traits: ['Creative', 'Inspirational', 'Spontaneous', 'Wise', 'Humorous'],
    },
  },
  Yudistira: {
    name: 'Yudistira',
    icon: '',
    id: {
      subtitle: 'Raja Bermartabat, Penjaga Dharma',
      desc: 'Seperti Yudistira, sang raja Pandawa yang dikenal sebagai Dharmaputra-putra kebajikan, kamu adalah penjaga tatanan dan kepercayaan. Kamu menyelesaikan apa yang kamu mulai, memenuhi setiap janjimu, dan hidupmu dibangun di atas fondasi integritas yang kokoh.\n\nOrang-orang di sekitarmu tahu mereka bisa mengandalkanmu kapan pun. Seperti Yudistira yang rela menanggung penderitaan demi menjaga kebenaran dan keselamatan saudaranya, kamu pun rela mengalah demi menjaga harmoni dalam hubungan yang kamu jaga.',
      quote: '"Kejujuran adalah pakaian terbaikku. Aku takkan menanggalkannya meski ditebus dengan dunia."',
      quoteAttr: '- Dharmaputra Yudistira',
      traits: ['Terpercaya', 'Disiplin', 'Loyal', 'Bermartabat', 'Harmonis'],
    },
    en: {
      subtitle: 'Noble King, Guardian of Dharma',
      desc: 'Like Yudistira, the king of the Pandavas known as Dharmaputra — the son of virtue, you are a guardian of order and trust. You finish what you start, keep every promise, and your life is built on a solid foundation of integrity.\n\nPeople around you know they can count on you anytime. Like Yudistira who was willing to endure suffering to uphold truth and protect his brothers, you too are willing to yield for the sake of harmony in the relationships you cherish.',
      quote: '"Honesty is my finest garment. I shall never remove it even if offered the whole world."',
      quoteAttr: '- Dharmaputra Yudistira',
      traits: ['Trustworthy', 'Disciplined', 'Loyal', 'Dignified', 'Harmonious'],
    },
  },
  Gatotkaca: {
    name: 'Gatotkaca',
    icon: '',
    id: {
      subtitle: 'Putra Bima, Panglima Perang Handal',
      desc: 'Seperti Gatotkaca, sang putra Bima yang lahir dengan kekuatan luar biasa dan nyali yang tak tertandingi, kamu adalah pribadi yang hidup di momen saat ini. Kamu tidak menunggu-kamu bertindak, merespons, dan menyelesaikan masalah dengan cepat dan tuntas.\n\nKamu adalah problem-solver yang handal; di tanganmu, situasi yang tampak rumit bisa diurai menjadi langkah-langkah konkret yang bisa dikerjakan. Seperti Gatotkaca yang selalu hadir di garis terdepan saat dibutuhkan, kamu pun tidak pernah lari dari tantangan.',
      quote: '"Otot kawat, balung wesi. Aku dilahirkan untuk melindungi."',
      quoteAttr: '- Gatotkaca, Satria Pringgandani',
      traits: ['Pemberani', 'Tanggap', 'Praktis', 'Pelindung', 'Spontan'],
    },
    en: {
      subtitle: 'Son of Bima, Skilled War Commander',
      desc: 'Like Gatotkaca, the son of Bima who was born with extraordinary strength and unmatched courage, you are someone who lives in the present moment. You don\'t wait — you act, respond, and solve problems quickly and thoroughly.\n\nYou are a skilled problem-solver; in your hands, situations that seem complex can be broken down into concrete, actionable steps. Like Gatotkaca who was always present at the front lines when needed, you never run from a challenge.',
      quote: '"Muscles of wire, bones of steel. I was born to protect."',
      quoteAttr: '- Gatotkaca, Knight of Pringgandani',
      traits: ['Brave', 'Responsive', 'Practical', 'Protector', 'Spontaneous'],
    },
  },
  Kresna: {
    name: 'Kresna',
    icon: '',
    id: {
      subtitle: 'Avatara Wisnu, Pembimbing Abadi',
      desc: 'Seperti Kresna, sang avatara Wisnu yang menjadi pembimbing abadi bagi Pandawa, kamu memiliki karisma alami yang menarik orang untuk mendekat dan mendengarkanmu. Kamu memiliki bakat luar biasa untuk memahami apa yang orang lain butuhkan dan membantu mereka menemukan jalan terbaik.\n\nBagaikan Kresna yang menyampaikan Bhagavad Gita di tengah medan perang Kurukshetra, kamu pun memiliki kemampuan untuk menyampaikan kebenaran di saat yang paling kritis dengan cara yang menggerakkan hati.',
      quote: '"Jangan risau pada hasil. Lakukan tugasmu sebaik-baiknya, maka semesta akan mengurus sisanya."',
      quoteAttr: '- Bhagavad Gita, Kresna kepada Arjuna',
      traits: ['Karismatik', 'Empatik', 'Pembimbing', 'Diplomatik', 'Bijaksana'],
    },
    en: {
      subtitle: 'Avatar of Vishnu, Eternal Guide',
      desc: 'Like Kresna, the avatar of Vishnu who became the eternal guide for the Pandavas, you have a natural charisma that draws people in and makes them listen. You have an extraordinary talent for understanding what others need and helping them find the best path.\n\nLike Kresna who delivered the Bhagavad Gita in the middle of the Kurukshetra battlefield, you too have the ability to convey truth at the most critical moments in a way that moves hearts.',
      quote: '"Do not worry about the outcome. Do your duty to the best of your ability, and the universe will take care of the rest."',
      quoteAttr: '- Bhagavad Gita, Kresna to Arjuna',
      traits: ['Charismatic', 'Empathetic', 'Guide', 'Diplomatic', 'Wise'],
    },
  },
  DewiKunti: {
    name: { id: 'Dewi Kunti', en: 'Dewi Kunti' },
    icon: '',
    id: {
      subtitle: 'Ibu Agung Pandawa, Penuh Kasih',
      desc: 'Seperti Dewi Kunti, ibu agung para Pandawa yang mencurahkan seluruh hidupnya dengan penuh kasih, kamu adalah jiwa yang hangat dan hadir sepenuhnya untuk orang-orang yang kamu cintai. Kamu merasakan kebahagiaan saat kamu bisa memberikan sesuatu-perhatian, senyuman, atau pertolongan sekecil apapun.\n\nKamu hidup dengan sepenuh hati, menikmati setiap pengalaman dengan penuh rasa syukur. Seperti Dewi Kunti yang meski mengalami banyak cobaan tetap memancarkan keanggunan dan ketabahan, kamu pun memiliki kedalaman emosi yang menjadi kekuatan terbesarmu.',
      quote: '"Cinta seorang ibu adalah samudra tanpa tepi-luas, dalam, dan tak pernah kering."',
      quoteAttr: '- Dewi Kunti, Ibu Pandawa',
      traits: ['Hangat', 'Ekspresif', 'Penuh Kasih', 'Hadir', 'Artistik'],
    },
    en: {
      subtitle: 'Great Mother of the Pandavas, Full of Love',
      desc: 'Like Dewi Kunti, the great mother of the Pandavas who devoted her entire life with boundless love, you are a warm soul who is fully present for the people you love. You feel happiness when you can give something — attention, a smile, or even the smallest act of kindness.\n\nYou live wholeheartedly, savoring every experience with deep gratitude. Like Dewi Kunti who despite facing many trials continued to radiate grace and resilience, you too possess a depth of emotion that is your greatest strength.',
      quote: '"A mother\'s love is an ocean without shores — vast, deep, and never runs dry."',
      quoteAttr: '- Dewi Kunti, Mother of the Pandavas',
      traits: ['Warm', 'Expressive', 'Loving', 'Present', 'Artistic'],
    },
  },
};

// --- MBTI Type Descriptions (Bilingual) ---------------------------------------
const MBTI_DESC = {
  INTJ: {
    id: 'INTJ — "Sang Arsitek"\n\nTipe INTJ dikenal sebagai perencana strategis yang brilian. Mereka memiliki visi jangka panjang yang jelas dan kemampuan analitis yang tajam. INTJ selalu mencari cara paling efisien untuk mencapai tujuan mereka. Mereka mandiri, percaya diri dengan ide-idenya, dan tidak mudah terpengaruh oleh opini publik. Meskipun terkesan dingin, di balik itu terdapat semangat yang membara untuk mewujudkan visi besarnya.',
    en: 'INTJ — "The Architect"\n\nThe INTJ type is known as a brilliant strategic planner. They have a clear long-term vision and sharp analytical skills. INTJs always seek the most efficient way to achieve their goals. They are independent, confident in their ideas, and not easily swayed by public opinion. Although they may seem cold, behind that exterior lies a burning passion to realize their grand vision.',
  },
  INTP: {
    id: 'INTP — "Sang Pemikir"\n\nTipe INTP adalah pemikir logis yang haus akan pengetahuan. Mereka menikmati menganalisis masalah kompleks dan menemukan pola-pola tersembunyi. INTP memiliki rasa ingin tahu yang tak terbatas dan senang mengeksplorasi ide-ide abstrak. Mereka menghargai kebenaran objektif di atas segalanya dan selalu mencari penjelasan yang paling akurat dan elegan.',
    en: 'INTP — "The Thinker"\n\nThe INTP type is a logical thinker hungry for knowledge. They enjoy analyzing complex problems and finding hidden patterns. INTPs have an unlimited curiosity and love exploring abstract ideas. They value objective truth above all else and always seek the most accurate and elegant explanations.',
  },
  INFJ: {
    id: 'INFJ — "Sang Penasihat"\n\nTipe INFJ adalah idealis yang berprinsip teguh. Mereka memiliki visi mendalam tentang bagaimana dunia seharusnya dan tekad kuat untuk mewujudkannya. INFJ memahami orang lain secara intuitif dan sering menjadi tempat curhat yang dipercaya. Mereka kreatif, penuh wawasan, dan selalu berusaha memberikan dampak positif yang bermakna bagi lingkungan sekitarnya.',
    en: 'INFJ — "The Advocate"\n\nThe INFJ type is a principled idealist. They have a profound vision of how the world should be and a strong determination to make it happen. INFJs understand others intuitively and are often trusted confidants. They are creative, insightful, and always strive to make a meaningful positive impact on their surroundings.',
  },
  INFP: {
    id: 'INFP — "Sang Mediator"\n\nTipe INFP adalah jiwa idealis yang penuh empati dan kreativitas. Mereka hidup berdasarkan nilai-nilai terdalam dan selalu berusaha menjadi autentik. INFP memiliki dunia batin yang kaya dan imaginasi yang luar biasa. Mereka peka terhadap keindahan dan ketidakadilan, serta memiliki keinginan kuat untuk membuat dunia menjadi tempat yang lebih baik.',
    en: 'INFP — "The Mediator"\n\nThe INFP type is an idealistic soul full of empathy and creativity. They live according to their deepest values and always strive to be authentic. INFPs have a rich inner world and extraordinary imagination. They are sensitive to beauty and injustice, and have a strong desire to make the world a better place.',
  },
  ENTJ: {
    id: 'ENTJ — "Sang Komandan"\n\nTipe ENTJ adalah pemimpin alami yang tegas dan berorientasi pada tujuan. Mereka memiliki kemampuan luar biasa untuk mengorganisir orang dan sumber daya demi mencapai visi besar. ENTJ percaya diri, berani mengambil keputusan sulit, dan tidak takut pada tantangan. Mereka menginspirasi orang lain dengan energi dan tekad mereka yang tak kenal lelah.',
    en: 'ENTJ — "The Commander"\n\nThe ENTJ type is a natural-born leader who is decisive and goal-oriented. They have an extraordinary ability to organize people and resources to achieve a grand vision. ENTJs are confident, brave in making tough decisions, and unafraid of challenges. They inspire others with their tireless energy and determination.',
  },
  ENTP: {
    id: 'ENTP — "Sang Pendebat"\n\nTipe ENTP adalah inovator yang penuh ide dan energi. Mereka senang menantang status quo dan melihat kemungkinan di mana orang lain melihat keterbatasan. ENTP memiliki pikiran yang gesit, humor yang tajam, dan kemampuan berargumen yang luar biasa. Mereka selalu mencari cara baru dan lebih baik untuk melakukan sesuatu.',
    en: 'ENTP — "The Debater"\n\nThe ENTP type is an innovator full of ideas and energy. They enjoy challenging the status quo and seeing possibilities where others see limitations. ENTPs have agile minds, sharp humor, and extraordinary argumentation skills. They are always looking for new and better ways to do things.',
  },
  ESTJ: {
    id: 'ESTJ — "Sang Eksekutif"\n\nTipe ESTJ adalah organisator andal yang menjunjung tinggi tradisi dan ketertiban. Mereka bertanggung jawab, pekerja keras, dan selalu bisa diandalkan. ESTJ percaya bahwa aturan dan struktur penting untuk menjaga keharmonisan. Mereka memimpin dengan memberi contoh dan memastikan semuanya berjalan sesuai rencana.',
    en: 'ESTJ — "The Executive"\n\nThe ESTJ type is a reliable organizer who upholds tradition and order. They are responsible, hardworking, and always dependable. ESTJs believe that rules and structure are essential for maintaining harmony. They lead by example and make sure everything runs according to plan.',
  },
  ENFP: {
    id: 'ENFP — "Sang Juru Kampanye"\n\nTipe ENFP adalah jiwa bebas yang penuh antusiasme dan kreativitas. Mereka melihat kehidupan sebagai kanvas besar yang penuh kemungkinan. ENFP memiliki kemampuan luar biasa untuk menginspirasi dan memotivasi orang lain. Mereka hangat, spontan, dan selalu penuh energi untuk mengejar ide-ide baru yang mereka yakini.',
    en: 'ENFP — "The Campaigner"\n\nThe ENFP type is a free spirit full of enthusiasm and creativity. They see life as a grand canvas full of possibilities. ENFPs have an extraordinary ability to inspire and motivate others. They are warm, spontaneous, and always full of energy to pursue new ideas they believe in.',
  },
  ISTJ: {
    id: 'ISTJ — "Sang Inspektur"\n\nTipe ISTJ adalah pribadi yang dapat diandalkan, bertanggung jawab, dan sistematis. Mereka menghargai fakta, tradisi, dan ketelitian. ISTJ selalu menepati janji dan menyelesaikan tugasnya dengan standar tinggi. Mereka adalah pilar kekuatan yang kokoh bagi keluarga dan komunitasnya.',
    en: 'ISTJ — "The Inspector"\n\nThe ISTJ type is dependable, responsible, and systematic. They value facts, tradition, and thoroughness. ISTJs always keep their promises and complete tasks to a high standard. They are the solid pillars of strength for their family and community.',
  },
  ISFJ: {
    id: 'ISFJ — "Sang Pelindung"\n\nTipe ISFJ adalah pribadi yang hangat, setia, dan penuh perhatian. Mereka selalu siap membantu orang lain tanpa mengharapkan imbalan. ISFJ memiliki ingatan yang kuat tentang detail dan tradisi penting. Mereka bekerja keras di balik layar untuk memastikan orang-orang yang mereka cintai merasa aman dan bahagia.',
    en: 'ISFJ — "The Defender"\n\nThe ISFJ type is warm, loyal, and attentive. They are always ready to help others without expecting anything in return. ISFJs have a strong memory for important details and traditions. They work hard behind the scenes to ensure the people they love feel safe and happy.',
  },
  ISTP: {
    id: 'ISTP — "Sang Pengrajin"\n\nTipe ISTP adalah problem-solver yang tanggap dan praktis. Mereka memiliki kemampuan alami untuk memahami bagaimana sesuatu bekerja dan memperbaikinya. ISTP hidup di momen saat ini, menikmati sensasi dan tantangan fisik. Mereka tenang di bawah tekanan dan bertindak dengan efisien saat situasi membutuhkan.',
    en: 'ISTP — "The Virtuoso"\n\nThe ISTP type is a responsive and practical problem-solver. They have a natural ability to understand how things work and fix them. ISTPs live in the present moment, enjoying physical thrills and challenges. They are calm under pressure and act efficiently when the situation demands it.',
  },
  ESTP: {
    id: 'ESTP — "Sang Pengusaha"\n\nTipe ESTP adalah pribadi yang dinamis, berani, dan berorientasi pada aksi. Mereka hidup untuk momen saat ini dan menikmati setiap detik dengan penuh semangat. ESTP memiliki kemampuan luar biasa untuk membaca situasi dan bertindak cepat. Mereka karismatik, persuasif, dan selalu menjadi pusat perhatian.',
    en: 'ESTP — "The Entrepreneur"\n\nThe ESTP type is dynamic, bold, and action-oriented. They live for the present moment and enjoy every second with full enthusiasm. ESTPs have an extraordinary ability to read situations and act quickly. They are charismatic, persuasive, and always the center of attention.',
  },
  ENFJ: {
    id: 'ENFJ — "Sang Protagonis"\n\nTipe ENFJ adalah pemimpin karismatik yang dipenuhi empati dan semangat untuk membantu orang lain berkembang. Mereka memiliki kemampuan alami untuk menginspirasi dan membimbing. ENFJ peka terhadap kebutuhan emosional orang lain dan selalu berusaha menciptakan harmoni. Mereka adalah guru, mentor, dan pembimbing yang sejati.',
    en: 'ENFJ — "The Protagonist"\n\nThe ENFJ type is a charismatic leader filled with empathy and a passion for helping others grow. They have a natural ability to inspire and guide. ENFJs are sensitive to the emotional needs of others and always strive to create harmony. They are true teachers, mentors, and guides.',
  },
  ESFJ: {
    id: 'ESFJ — "Sang Konsul"\n\nTipe ESFJ adalah pribadi yang hangat, peduli, dan selalu hadir untuk orang lain. Mereka menikmati menciptakan keharmonisan dan memastikan semua orang merasa diterima. ESFJ setia pada komitmen dan tradisi, serta selalu bisa diandalkan. Mereka adalah perekat sosial yang membuat setiap kelompok menjadi lebih kuat.',
    en: 'ESFJ — "The Consul"\n\nThe ESFJ type is warm, caring, and always present for others. They enjoy creating harmony and making sure everyone feels welcomed. ESFJs are loyal to their commitments and traditions, and always dependable. They are the social glue that makes every group stronger.',
  },
  ESFP: {
    id: 'ESFP — "Sang Penghibur"\n\nTipe ESFP adalah jiwa yang ceria, spontan, dan penuh kehidupan. Mereka menikmati setiap momen dan menyebarkan kebahagiaan ke mana pun mereka pergi. ESFP memiliki energi yang menular, selera humor yang alami, dan kemampuan untuk membuat orang lain merasa istimewa. Mereka hidup dengan sepenuh hati dan menghargai keindahan dalam hal-hal sederhana.',
    en: 'ESFP — "The Entertainer"\n\nThe ESFP type is a cheerful, spontaneous, and vibrant soul. They enjoy every moment and spread happiness wherever they go. ESFPs have infectious energy, a natural sense of humor, and the ability to make others feel special. They live wholeheartedly and appreciate beauty in simple things.',
  },
  ISFP: {
    id: 'ISFP — "Sang Petualang"\n\nTipe ISFP adalah jiwa artistik yang lembut namun penuh keberanian. Mereka hidup berdasarkan nilai-nilai pribadi yang mendalam dan mengekspresikan diri melalui tindakan. ISFP menghargai keindahan, kebebasan, dan autentisitas. Mereka hangat terhadap orang-orang terdekat dan memiliki kepekaan estetika yang luar biasa.',
    en: 'ISFP — "The Adventurer"\n\nThe ISFP type is a gentle yet courageous artistic soul. They live according to deeply personal values and express themselves through actions. ISFPs appreciate beauty, freedom, and authenticity. They are warm toward those closest to them and have an extraordinary aesthetic sensibility.',
  },
};
