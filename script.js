// Fecha bonita
// document.getElementById("fecha").textContent = new Date().toLocaleString("es-PE", {
//   dateStyle: "full",
//   timeStyle: "short"
// });

// ===== Fondo de corazones =====
const heartsWrap = document.querySelector(".hearts");
const emojis = ["❤️", "💖", "💗", "💘", "🌹", "✨"];

function spawnHeart(extra = false) {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const x = Math.random() * 100;
  const size = 14 + Math.random() * 26;
  const duration = 5 + Math.random() * 6;

  h.style.left = x + "vw";
  h.style.bottom = (extra ? "18vh" : "-20px");
  h.style.fontSize = size + "px";
  h.style.animationDuration = duration + "s";

  heartsWrap.appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}
setInterval(() => spawnHeart(false), 520);

// Lluvia de amor (pantalla 1)
// document.getElementById("btnHearts").addEventListener("click", () => {
//   for(let i=0;i<55;i++){
//     setTimeout(()=>spawnHeart(true), i*18);
//   }
// });

// Lluvia de amor (pantalla 2)
// document.getElementById("moreLove").addEventListener("click", () => {
//   for(let i=0;i<70;i++){
//     setTimeout(()=>spawnHeart(true), i*14);
//   }
// });

// ===== Pantallas =====
const screenHero = document.getElementById("screenHero");
const screenMensaje = document.getElementById("screenMensaje");
const goMensaje = document.getElementById("goMensaje");
const backHero = document.getElementById("backHero");

function showScreen(target) {
  screenHero.classList.remove("active");
  screenMensaje.classList.remove("active");
  target.classList.add("active");
  target.scrollTo({ top: 0, behavior: "instant" });
}

goMensaje.addEventListener("click", () => showScreen(screenMensaje));
backHero.addEventListener("click", () => showScreen(screenHero));

// ===== Sobre abrir/cerrar =====
const env = document.getElementById("env");
const openEnv = document.getElementById("openEnv");
const closeEnv = document.getElementById("moreLove");

openEnv.addEventListener("click", () => {
  env.classList.add("opened");
  // pequeñita lluvia al abrir (sorpresa)
  for (let i = 0; i < 28; i++) {
    setTimeout(() => spawnHeart(true), i * 16);
  }
});

closeEnv.addEventListener("click", () => {
  env.classList.remove("opened");
});

// ===== Música de fondo al abrir el mensaje =====
const bgMusic = document.getElementById("bgMusic");

// Volumen suave (romántico)
bgMusic.volume = 0.35;

// Cuando se abre la pantalla del mensaje
goMensaje.addEventListener("click", async () => {
  try {
    await bgMusic.play();
  } catch (e) {
    // Algunos navegadores bloquean autoplay
    console.log("El navegador bloqueó el autoplay. El usuario debe interactuar.");
  }
});

// Opcional: cuando vuelve a la pantalla principal, pausamos
backHero.addEventListener("click", () => {
  bgMusic.pause();
  bgMusic.currentTime = 0;
});

// ===== btnHearts abre VIDEO =====
const btnHearts = document.getElementById("btnHearts");
const videoModal = document.getElementById("videoModal");
const closeVideo = document.getElementById("closeVideo");
const loveVideo = document.getElementById("loveVideo");

btnHearts.addEventListener("click", async () => {
  videoModal.classList.add("active");
  loveVideo.currentTime = 0;

  // (opcional) pausa música de fondo para que no se mezclen
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) bgMusic.pause();

  try {
    await loveVideo.play();
  } catch (e) {
    console.log("Autoplay bloqueado. Dale play manualmente.");
  }
});

function cerrarVideo() {
  loveVideo.pause();
  videoModal.classList.remove("active");

  // (opcional) reanuda música
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) bgMusic.play().catch(() => { });
}

closeVideo.addEventListener("click", cerrarVideo);

// Cerrar tocando fuera del video
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) cerrarVideo();
});


// Animación de entrada del overlay
const overlay = document.querySelector(".video-overlay");
overlay.style.opacity = "0";
overlay.style.transform = "translateY(10px)";
setTimeout(() => {
  overlay.style.transition = "opacity .6s ease, transform .6s ease";
  overlay.style.opacity = "1";
  overlay.style.transform = "translateY(0)";
}, 50);
