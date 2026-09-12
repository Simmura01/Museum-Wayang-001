/**
 * Dalang MBTI Quiz — quiz.js
 * 16 pertanyaan A/B ? 4 dimensi ? tipe MBTI ? karakter wayang
 */

// --- Data Pertanyaan ---------------------------------------------------------
const QUESTIONS = [
  // Dimensi E/I
  { dim:'E/I', q:'Saat merasa lelah, kamu lebih suka...',         a:'Berkumpul dengan teman untuk menyegarkan diri',                       valA:'E', b:'Menyendiri dan beristirahat dalam ketenangan',                      valB:'I' },
  { dim:'E/I', q:'Di sebuah pesta besar, kamu biasanya...',       a:'Mudah berbicara dengan orang yang belum dikenal',                    valA:'E', b:'Lebih nyaman mengobrol dengan satu atau dua orang terdekat',          valB:'I' },
  { dim:'E/I', q:'Saat menghadapi masalah, kamu...',              a:'Mendiskusikannya dengan banyak orang untuk mendapat perspektif',      valA:'E', b:'Merenung sendiri hingga menemukan jawabanmu',                         valB:'I' },
  { dim:'E/I', q:'Kamu mendapat energi dari...',                  a:'Interaksi sosial yang ramai dan penuh semangat',                     valA:'E', b:'Waktu sendiri yang tenang dan reflektif',                             valB:'I' },
  // Dimensi S/N
  { dim:'S/N', q:'Saat belajar hal baru, kamu lebih suka...',     a:'Fakta konkret dan langkah-langkah yang jelas',                      valA:'S', b:'Konsep besar dan pola yang tersembunyi di balik fakta',               valB:'N' },
  { dim:'S/N', q:'Kamu lebih percaya pada...',                    a:'Pengalaman nyata dan bukti yang bisa disentuh',                     valA:'S', b:'Intuisi dan firasat yang sulit dijelaskan',                            valB:'N' },
  { dim:'S/N', q:'Saat bercerita, kamu cenderung...',             a:'Detail dan kronologis, peristiwa demi peristiwa',                   valA:'S', b:'Melompat ke makna dan gambaran besarnya',                             valB:'N' },
  { dim:'S/N', q:'Kamu lebih tertarik pada...',                   a:'Hal-hal yang nyata dan bisa langsung diterapkan',                   valA:'S', b:'Kemungkinan-kemungkinan masa depan yang penuh potensi',               valB:'N' },
  // Dimensi T/F
  { dim:'T/F', q:'Saat membuat keputusan penting, kamu...',       a:'Menganalisis pro-kontra secara logis dan objektif',                  valA:'T', b:'Mempertimbangkan dampaknya pada perasaan semua orang',               valB:'F' },
  { dim:'T/F', q:'Kritik yang membangun menurutmu adalah...',     a:'Langsung dan jujur, meski terasa pedas',                            valA:'T', b:'Disampaikan dengan lembut dan penuh empati',                          valB:'F' },
  { dim:'T/F', q:'Saat temanmu bersedih, kamu...',               a:'Menawarkan solusi praktis untuk masalahnya',                        valA:'T', b:'Mendengarkan dan memvalidasi perasaannya terlebih dulu',              valB:'F' },
  { dim:'T/F', q:'Keputusan yang baik adalah keputusan yang...', a:'Logis dan rasional, meski menyakitkan bagi beberapa pihak',         valA:'T', b:'Menjaga harmoni dan mempertimbangkan semua perasaan',                valB:'F' },
  // Dimensi J/P
  { dim:'J/P', q:'Sebelum liburan, kamu biasanya...',             a:'Merencanakan semuanya jauh-jauh hari dengan detail',                valA:'J', b:'Pergi mengikuti alur dan bersenang-senang secara spontan',             valB:'P' },
  { dim:'J/P', q:'Ruang kerjamu biasanya...',                     a:'Rapi, terorganisir, semua ada tempatnya',                           valA:'J', b:'Tampak berantakan tapi kamu tahu di mana semuanya',                   valB:'P' },
  { dim:'J/P', q:'Tenggat waktu menurutmu...',                    a:'Sesuatu yang harus dipenuhi, bahkan lebih awal kalau bisa',         valA:'J', b:'Titik awal untuk mulai benar-benar serius',                           valB:'P' },
  { dim:'J/P', q:'Kamu merasa paling produktif saat...',          a:'Mengikuti jadwal dan rencana yang sudah ditetapkan',                valA:'J', b:'Bebas bergerak dan bekerja sesuai suasana hati',                      valB:'P' },
];

// --- Data Karakter Wayang -----------------------------------------------------
const WAYANG = {
  Arjuna: {
    name:'Arjuna', icon:'', subtitle:'Kesatria Pandawa, Pemanah Ulung',
    desc:'Seperti Arjuna, sang kesatria terpilih Pandawa, kamu adalah pribadi yang penuh visi jauh ke depan. Kamu memiliki standar tinggi untuk dirimu sendiri dan tak mudah puas dengan hasil yang biasa-biasa saja. Dalam sunyi, kamu menemukan kekuatanmu—seperti Arjuna yang bermeditasi bertahun-tahun sebelum menerima Gandewa, busur ilahi dari Dewa Indra.\n\nKamu tidak banyak bicara, namun setiap kata yang kamu ucapkan memiliki bobot dan makna. Kamu adalah perencana yang cerdas dan strategis, selalu beberapa langkah lebih maju dari yang lain. Bagi orang-orang terdekatmu, kamu adalah pelindung setia yang rela berkorban demi kebenaran.',
    quote:'"Senjata terbaik seorang kesatria bukanlah panahnya, melainkan ketenangannya."', quoteAttr:'— Falsafah Arjuna dalam Mahabharata',
    traits:['Strategis','Visioner','Independen','Perfeksionis','Misterius'],
  },
  Srikandi: {
    name:'Srikandi', icon:'', subtitle:'Pejuang Wanita Sejati',
    desc:'Seperti Srikandi, prajurit wanita tangguh pewayangan, kamu memiliki intuisi yang tajam dan nilai-nilai yang tak bisa dikompromikan. Di balik penampilanmu yang tenang, tersimpan tekad baja yang siap membela siapa saja yang kamu cintai.\n\nKamu peka terhadap perasaan orang lain dan sering tahu apa yang mereka butuhkan bahkan sebelum mereka mengatakannya. Seperti Srikandi yang belajar memanah dari Arjuna namun akhirnya melampaui gurunya, kamu pun tak pernah berhenti berkembang demi mewujudkan impian yang kamu percayai.',
    quote:'"Keberanian bukan absennya rasa takut, melainkan melangkah maju meski rasa takut itu ada."', quoteAttr:'— Watak Srikandi, Prajurit Wanita Pandawa',
    traits:['Intuitif','Berprinsip','Empatik','Protektif','Tegar'],
  },
  Bima: {
    name:'Bima', icon:'', subtitle:'Putra Pandawa, Sang Ksatria Tangguh',
    desc:'Seperti Bima, sang Werkudara yang teguh tak tergoyahkan, kamu adalah pemimpin alami yang lahir dengan tekad membara. Kamu tidak suka bertele-tele—kamu melihat tujuan dan melangkah maju tanpa ragu.\n\nKamu tidak takut membuat keputusan sulit, bahkan ketika itu berarti berdiri sendirian melawan arus. Seperti Bima yang terkenal pantang berbohong dan tak mau membungkukkan kepala kepada siapapun kecuali kepada kebenaran, kamu pun menjunjung tinggi integritas di atas segalanya.',
    quote:'"Sekali bertekad, pantang surut. Karena mundur hanya ada dalam kamus pengecut."', quoteAttr:'— Sifat Werkudara dalam Pedalangan Jawa',
    traits:['Tegas','Pemimpin','Bernyali','Efisien','Jujur'],
  },
  Semar: {
    name:'Semar', icon:'', subtitle:'Pamong Sejati, Kebijaksanaan Tersembunyi',
    desc:'Seperti Semar, sang pamong agung yang menyembunyikan kesejatiannya di balik penampilan sederhana, kamu adalah jiwa bebas yang penuh kejutan. Kamu melihat dunia dari sudut pandang yang berbeda dan inilah yang membuatmu begitu istimewa.\n\nKamu menyalakan api semangat di mana pun kamu pergi. Seperti Semar yang selalu hadir dengan guyonan namun menyimpan hikmat terdalam, kamu pun memiliki kemampuan luar biasa untuk menyentuh hati orang dengan cara yang tak terduga.',
    quote:'"Orang bijak tertawa bukan karena dunia lucu, tetapi karena ia mengerti."', quoteAttr:'— Hikmat Semar Badranaya',
    traits:['Kreatif','Inspiratif','Spontan','Bijak','Penuh Humor'],
  },
  Yudistira: {
    name:'Yudistira', icon:'', subtitle:'Raja Bermartabat, Penjaga Dharma',
    desc:'Seperti Yudistira, sang raja Pandawa yang dikenal sebagai Dharmaputra—putra kebajikan, kamu adalah penjaga tatanan dan kepercayaan. Kamu menyelesaikan apa yang kamu mulai, memenuhi setiap janjimu, dan hidupmu dibangun di atas fondasi integritas yang kokoh.\n\nOrang-orang di sekitarmu tahu mereka bisa mengandalkanmu kapan pun. Seperti Yudistira yang rela menanggung penderitaan demi menjaga kebenaran dan keselamatan saudaranya, kamu pun rela mengalah demi menjaga harmoni dalam hubungan yang kamu jaga.',
    quote:'"Kejujuran adalah pakaian terbaikku. Aku takkan menanggalkannya meski ditebus dengan dunia."', quoteAttr:'— Dharmaputra Yudistira',
    traits:['Terpercaya','Disiplin','Loyal','Bermartabat','Harmonis'],
  },
  Gatotkaca: {
    name:'Gatotkaca', icon:'', subtitle:'Putra Bima, Panglima Perang Handal',
    desc:'Seperti Gatotkaca, sang putra Bima yang lahir dengan kekuatan luar biasa dan nyali yang tak tertandingi, kamu adalah pribadi yang hidup di momen saat ini. Kamu tidak menunggu—kamu bertindak, merespons, dan menyelesaikan masalah dengan cepat dan tuntas.\n\nKamu adalah problem-solver yang handal; di tanganmu, situasi yang tampak rumit bisa diurai menjadi langkah-langkah konkret yang bisa dikerjakan. Seperti Gatotkaca yang selalu hadir di garis terdepan saat dibutuhkan, kamu pun tidak pernah lari dari tantangan.',
    quote:'"Otot kawat, balung wesi. Aku dilahirkan untuk melindungi."', quoteAttr:'— Gatotkaca, Satria Pringgandani',
    traits:['Pemberani','Tanggap','Praktis','Pelindung','Spontan'],
  },
  Kresna: {
    name:'Kresna', icon:'', subtitle:'Avatara Wisnu, Pembimbing Abadi',
    desc:'Seperti Kresna, sang avatara Wisnu yang menjadi pembimbing abadi bagi Pandawa, kamu memiliki karisma alami yang menarik orang untuk mendekat dan mendengarkanmu. Kamu memiliki bakat luar biasa untuk memahami apa yang orang lain butuhkan dan membantu mereka menemukan jalan terbaik.\n\nBagaikan Kresna yang menyampaikan Bhagavad Gita di tengah medan perang Kurukshetra, kamu pun memiliki kemampuan untuk menyampaikan kebenaran di saat yang paling kritis dengan cara yang menggerakkan hati.',
    quote:'"Jangan risau pada hasil. Lakukan tugasmu sebaik-baiknya, maka semesta akan mengurus sisanya."', quoteAttr:'— Bhagavad Gita, Kresna kepada Arjuna',
    traits:['Karismatik','Empatik','Pembimbing','Diplomatik','Bijaksana'],
  },
  DewiKunti: {
    name:'Dewi Kunti', icon:'', subtitle:'Ibu Agung Pandawa, Penuh Kasih',
    desc:'Seperti Dewi Kunti, ibu agung para Pandawa yang mencurahkan seluruh hidupnya dengan penuh kasih, kamu adalah jiwa yang hangat dan hadir sepenuhnya untuk orang-orang yang kamu cintai. Kamu merasakan kebahagiaan saat kamu bisa memberikan sesuatu—perhatian, senyuman, atau pertolongan sekecil apapun.\n\nKamu hidup dengan sepenuh hati, menikmati setiap pengalaman dengan penuh rasa syukur. Seperti Dewi Kunti yang meski mengalami banyak cobaan tetap memancarkan keanggunan dan ketabahan, kamu pun memiliki kedalaman emosi yang menjadi kekuatan terbesarmu.',
    quote:'"Cinta seorang ibu adalah samudra tanpa tepi—luas, dalam, dan tak pernah kering."', quoteAttr:'— Dewi Kunti, Ibu Pandawa',
    traits:['Hangat','Ekspresif','Penuh Kasih','Hadir','Artistik'],
  },
};

// --- Pemetaan MBTI ? Karakter ------------------------------------------------
const MBTI_MAP = {
  INTJ:'Arjuna', INTP:'Arjuna',
  INFJ:'Srikandi', INFP:'Srikandi',
  ENTJ:'Bima', ESTJ:'Bima',
  ENTP:'Semar', ENFP:'Semar',
  ISTJ:'Yudistira', ISFJ:'Yudistira',
  ISTP:'Gatotkaca', ESTP:'Gatotkaca',
  ENFJ:'Kresna', ESFJ:'Kresna',
  ESFP:'DewiKunti', ISFP:'DewiKunti',
};

// --- State --------------------------------------------------------------------
let currentIdx = 0;
let answers    = [];
let lastResult = null;

// --- DOM refs -----------------------------------------------------------------
const heroScreen   = document.getElementById('heroScreen');
const quizScreen   = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

// --- Mulai Quiz ---------------------------------------------------------------
function startQuiz() {
  currentIdx = 0;
  answers    = [];
  heroScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  renderQuestion();
}

// --- Render Pertanyaan --------------------------------------------------------
function renderQuestion() {
  const q = QUESTIONS[currentIdx];
  document.getElementById('qNum').textContent         = currentIdx + 1;
  document.getElementById('qDim').textContent         = q.dim;
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('choiceAText').textContent  = q.a;
  document.getElementById('choiceBText').textContent  = q.b;
  document.getElementById('progressFill').style.width = `${(currentIdx / QUESTIONS.length) * 100}%`;
  const backBtn = document.getElementById('backBtn');
  if (currentIdx > 0) backBtn.classList.remove('hidden');
  else backBtn.classList.add('hidden');
}

// --- Pilih Jawaban ------------------------------------------------------------
function handleAnswer(val) {
  answers[currentIdx] = val;
  currentIdx++;
  if (currentIdx < QUESTIONS.length) {
    renderQuestion();
  } else {
    document.getElementById('progressFill').style.width = '100%';
    showResult();
  }
}

// --- Sebelumnya ---------------------------------------------------------------
function prevQuestion() {
  if (currentIdx > 0) { currentIdx--; renderQuestion(); }
}

// --- Hitung & Tampilkan Hasil -------------------------------------------------
function showResult() {
  const s = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
  answers.forEach(a => { if (s[a] !== undefined) s[a]++; });
  const mbtiType =
    (s.E >= s.I ? 'E':'I') +
    (s.S >= s.N ? 'S':'N') +
    (s.T >= s.F ? 'T':'F') +
    (s.J >= s.P ? 'J':'P');

  const charKey = MBTI_MAP[mbtiType];
  const char    = WAYANG[charKey];
  lastResult = { mbtiType, characterName: char.name, archetype: char.name };

  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  if(typeof window.gtag === 'function') {
      window.gtag('event', 'mbti_result', { 'mbti_type': mbtiType, 'character': char.name });
  }

  document.getElementById('resultType').textContent          = mbtiType;
  document.getElementById('resultArchetype').textContent     = char.name;
  document.getElementById('resultIcon').textContent          = char.icon;
  document.getElementById('resultCharName').textContent      = char.name;
  document.getElementById('resultCharSubtitle').textContent  = char.subtitle;
  document.getElementById('resultDesc').textContent          = char.desc;
  document.getElementById('resultQuote').textContent         = char.quote;
  document.getElementById('resultQuoteAttr').textContent     = char.quoteAttr;

  const traitsEl = document.getElementById('resultTraits');
  traitsEl.innerHTML = '';
  char.traits.forEach(t => {
    const chip = document.createElement('span');
    chip.className   = 'trait-chip';
    chip.textContent = t;
    traitsEl.appendChild(chip);
  });
}

// --- Photo Booth --------------------------------------------------------------
function goToPhotoBooth() {
  if (lastResult) {
    sessionStorage.setItem('mbtiResult', JSON.stringify(lastResult));
    window.location.href = '../photo-booth/index.html';
  }
}

// --- Ulangi Quiz --------------------------------------------------------------
function retakeQuiz() {
  resultScreen.classList.add('hidden');
  heroScreen.classList.remove('hidden');
}

// --- Event Listeners ----------------------------------------------------------
document.getElementById('startBtn')?.addEventListener('click',  startQuiz);
document.getElementById('backBtn')?.addEventListener('click',   prevQuestion);
document.getElementById('choiceABtn')?.addEventListener('click', () => handleAnswer(QUESTIONS[currentIdx].valA));
document.getElementById('choiceBBtn')?.addEventListener('click', () => handleAnswer(QUESTIONS[currentIdx].valB));
document.getElementById('photoBoothBtn')?.addEventListener('click', goToPhotoBooth);
document.getElementById('retakeBtn')?.addEventListener('click', retakeQuiz);

