/**
 * Dalang MBTI Quiz - quiz.js
 * 16 pertanyaan A/B -> 4 dimensi -> tipe MBTI -> karakter wayang
 * Bilingual support: ID / EN (data from lang.js)
 */

// --- Pemetaan MBTI -> Karakter ------------------------------------------------
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
let currentIdx  = 0;
let answers     = [];
let lastResult  = null;
let currentLang = 'id';
let lastMbtiType = null;
let lastCharKey  = null;

// --- DOM refs -----------------------------------------------------------------
const heroScreen   = document.getElementById('heroScreen');
const quizScreen   = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

// --- Language Toggle ----------------------------------------------------------
function setLanguage(lang) {
  currentLang = lang;

  // Update slider visual
  const track = document.getElementById('langSliderTrack');
  const opts  = document.querySelectorAll('.lang-option');
  if (lang === 'en') {
    track.classList.add('en');
  } else {
    track.classList.remove('en');
  }
  opts.forEach(function(o) {
    o.classList.toggle('active', o.dataset.lang === lang);
  });

  // Update UI text
  var ui = UI[lang];
  // Header
  var backBtnEl = document.querySelector('.back-btn');
  if (backBtnEl) {
    var svg = backBtnEl.querySelector('svg');
    backBtnEl.textContent = '';
    if (svg) backBtnEl.prepend(svg);
    backBtnEl.append(' ' + ui.backBtn);
  }
  var headerTitle = document.querySelector('.header-title');
  if (headerTitle) headerTitle.textContent = ui.headerTitle;

  // Hero screen
  var heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) heroBadge.textContent = ui.heroBadge;
  var heroTitleEl = document.querySelector('.hero-title');
  if (heroTitleEl) heroTitleEl.textContent = ui.heroTitle;
  var heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.textContent = ui.heroSub;
  var startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.innerHTML = ui.startBtn;

  // Quiz screen progress label
  var progressLabel = document.querySelector('.progress-label > span:first-child');
  if (progressLabel) {
    var qNum = document.getElementById('qNum');
    var numVal = qNum ? qNum.textContent : (currentIdx + 1);
    progressLabel.innerHTML = ui.questionLabel + ' <span id="qNum">' + numVal + '</span> ' + ui.questionOf;
  }

  // Back button in quiz
  var backBtn2 = document.getElementById('backBtn');
  if (backBtn2) backBtn2.innerHTML = ui.prevBtn;

  // Result buttons
  var photoBoothBtn = document.getElementById('photoBoothBtn');
  if (photoBoothBtn) photoBoothBtn.textContent = ui.photoBoothBtn;
  var retakeBtn = document.getElementById('retakeBtn');
  if (retakeBtn) retakeBtn.textContent = ui.retakeBtn;

  // Footer
  var footerSpans = document.querySelectorAll('.site-footer > span');
  if (footerSpans.length >= 3) {
    footerSpans[0].textContent = ui.footerMuseum;
    footerSpans[2].textContent = ui.footerMbti;
  }

  // If quiz is active, re-render current question in new language
  if (!quizScreen.classList.contains('hidden')) {
    renderQuestion();
  }

  // If result is visible, re-render in new language
  if (!resultScreen.classList.contains('hidden') && lastMbtiType && lastCharKey) {
    renderResult(lastMbtiType, lastCharKey);
  }
}

// --- Init Language Toggle Events ----------------------------------------------
function initLangToggle() {
  var track = document.getElementById('langSliderTrack');
  var opts  = document.querySelectorAll('.lang-option');

  if (track) {
    track.addEventListener('click', function() {
      setLanguage(currentLang === 'id' ? 'en' : 'id');
    });
  }
  opts.forEach(function(o) {
    o.addEventListener('click', function() {
      setLanguage(o.dataset.lang);
    });
  });
}

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
  var questions = QUESTIONS_LANG[currentLang];
  var q = questions[currentIdx];
  var ui = UI[currentLang];

  document.getElementById('qNum').textContent         = currentIdx + 1;
  document.getElementById('qDim').textContent         = q.dim;
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('choiceAText').textContent  = q.a;
  document.getElementById('choiceBText').textContent  = q.b;
  document.getElementById('progressFill').style.width = ((currentIdx / questions.length) * 100) + '%';

  // Update progress label text for current language
  var progressLabel = document.querySelector('.progress-label > span:first-child');
  if (progressLabel) {
    progressLabel.innerHTML = ui.questionLabel + ' <span id="qNum">' + (currentIdx + 1) + '</span> ' + ui.questionOf;
  }

  var backBtn = document.getElementById('backBtn');
  if (currentIdx > 0) backBtn.classList.remove('hidden');
  else backBtn.classList.add('hidden');
}

// --- Pilih Jawaban ------------------------------------------------------------
function handleAnswer(val) {
  answers[currentIdx] = val;
  currentIdx++;
  var questions = QUESTIONS_LANG[currentLang];
  if (currentIdx < questions.length) {
    renderQuestion();
  } else {
    document.getElementById('progressFill').style.width = '100%';
    showResult();
  }
}

// --- Get current answer value -------------------------------------------------
function getCurrentValA() {
  return QUESTIONS_LANG[currentLang][currentIdx].valA;
}
function getCurrentValB() {
  return QUESTIONS_LANG[currentLang][currentIdx].valB;
}

// --- Sebelumnya ---------------------------------------------------------------
function prevQuestion() {
  if (currentIdx > 0) { currentIdx--; renderQuestion(); }
}

// --- Hitung & Tampilkan Hasil -------------------------------------------------
function showResult() {
  var s = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
  answers.forEach(function(a) { if (s[a] !== undefined) s[a]++; });
  var mbtiType =
    (s.E >= s.I ? 'E':'I') +
    (s.S >= s.N ? 'S':'N') +
    (s.T >= s.F ? 'T':'F') +
    (s.J >= s.P ? 'J':'P');

  var charKey = MBTI_MAP[mbtiType];
  lastMbtiType = mbtiType;
  lastCharKey  = charKey;

  var charData = WAYANG_LANG[charKey];
  var charName = typeof charData.name === 'object' ? charData.name[currentLang] : charData.name;
  lastResult = { mbtiType: mbtiType, characterName: charName, archetype: charName };

  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  if(typeof window.gtag === 'function') {
    window.gtag('event', 'mbti_result', { 'mbti_type': mbtiType, 'character': charName });
  }

  renderResult(mbtiType, charKey);
}

// --- Render Result (for language switching) ------------------------------------
function renderResult(mbtiType, charKey) {
  var charData = WAYANG_LANG[charKey];
  var langData = charData[currentLang];
  var charName = typeof charData.name === 'object' ? charData.name[currentLang] : charData.name;
  var ui = UI[currentLang];

  document.getElementById('resultType').textContent          = mbtiType;
  document.getElementById('resultArchetype').textContent     = charName;
  document.getElementById('resultIcon').textContent          = charData.icon;
  document.getElementById('resultCharName').textContent      = charName;
  document.getElementById('resultCharSubtitle').textContent  = langData.subtitle;
  document.getElementById('resultDesc').textContent          = langData.desc;
  document.getElementById('resultQuote').textContent         = langData.quote;
  document.getElementById('resultQuoteAttr').textContent     = langData.quoteAttr;

  // Traits
  var traitsEl = document.getElementById('resultTraits');
  traitsEl.innerHTML = '';
  langData.traits.forEach(function(t) {
    var chip = document.createElement('span');
    chip.className   = 'trait-chip';
    chip.textContent = t;
    traitsEl.appendChild(chip);
  });

  // MBTI Explanation
  var mbtiDesc = MBTI_DESC[mbtiType];
  if (mbtiDesc) {
    document.getElementById('mbtiExplanationTitle').textContent = ui.mbtiSectionTitle;
    document.getElementById('mbtiExplanationText').textContent  = mbtiDesc[currentLang];
    document.getElementById('mbtiExplanation').style.display = '';
  }

  // Update buttons text
  var photoBoothBtn = document.getElementById('photoBoothBtn');
  if (photoBoothBtn) photoBoothBtn.textContent = ui.photoBoothBtn;
  var retakeBtn = document.getElementById('retakeBtn');
  if (retakeBtn) retakeBtn.textContent = ui.retakeBtn;

  // Update lastResult for photo booth
  lastResult = { mbtiType: mbtiType, characterName: charName, archetype: charName };
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
  lastMbtiType = null;
  lastCharKey  = null;
}

// --- Event Listeners ----------------------------------------------------------
document.getElementById('startBtn')?.addEventListener('click',  startQuiz);
document.getElementById('backBtn')?.addEventListener('click',   prevQuestion);
document.getElementById('choiceABtn')?.addEventListener('click', function() { handleAnswer(getCurrentValA()); });
document.getElementById('choiceBBtn')?.addEventListener('click', function() { handleAnswer(getCurrentValB()); });
document.getElementById('photoBoothBtn')?.addEventListener('click', goToPhotoBooth);
document.getElementById('retakeBtn')?.addEventListener('click', retakeQuiz);

// --- Init Language Toggle on Load ---------------------------------------------
initLangToggle();
