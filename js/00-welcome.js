/* ============================================================
   00-WELCOME.JS
   Logika layar sambutan (klik untuk masuk ke aplikasi utama).
   ============================================================ */
const welcomeScreen = document.getElementById('welcome-screen');
const welcomeText   = document.getElementById('welcome-text');
const mainApp       = document.getElementById('main-app');
const navMenu       = document.getElementById('nav-menu');
let isNavMode = false;

welcomeScreen.addEventListener('click', function(){
    if(isNavMode) return;
    isNavMode = true;
    welcomeText.style.opacity = '0';
    welcomeScreen.classList.add('fade-out');
    setTimeout(()=>{
        welcomeScreen.style.display='none';
        mainApp.style.display='block';
        navMenu.style.display='flex';
    }, 800);
});
