/* =====================================================
   DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     FOOTER – ANNO AUTOMATICO
  ====================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ======================
     NAVBAR – MENU MOBILE
  ====================== */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open") ? "true" : "false"
    );

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (!nav || !navToggle) return;
    if (!nav.classList.contains("open")) return;
    const target = e.target;
    if (nav.contains(target) || (target.closest && target.closest("#nav-toggle"))) return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (e) => {
    if (!nav) return;
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ======================
     EMAILJS – FORM CONSULENZA
  ====================== */
  const consultForm = document.getElementById("consult-form");

  try {
    console.log("[DEBUG] EmailJS global presente:", !!window.emailjs);
    const scripts = Array.from(document.querySelectorAll("script")).filter(
      (s) => s.src && s.src.includes("emailjs")
    );
    console.log("[DEBUG] EmailJS scripts:", scripts.map(s => s.src));
  } catch (e) {}

  const EMAILJS_SERVICE_ID = "service_f06kseh";
  const EMAILJS_TEMPLATE_ADMIN = "template_6ngdvax";
  const EMAILJS_TEMPLATE_AUTOREPLY = "template_kuz4hzp";

  if (consultForm) {
    consultForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        name: this.name.value,
        phone: this.phone.value,
        email: this.email.value,
        to_email: this.email.value,
        slot: this.slot.value,
        message: this.message.value,
      };

      if (!window.emailjs) {
        alert("Servizio email non disponibile.");
        return;
      }

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, formData)
        .then(() =>
          emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_AUTOREPLY,
            formData
          )
        )
        .then(() => {
          alert("Richiesta inviata correttamente! Ti contatteremo a breve. - Axes");
          this.reset();
        })
        .catch((error) => {
          alert("Errore durante l'invio. Controlla i dati inseriti.");
          console.error(error);
        });
    });
  }
});

/* =====================================================
   ANIMAZIONI ON SCROLL
===================================================== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

/* =====================================================
   GALLERIA – VARIABILI GLOBALI
===================================================== */
const modal = document.getElementById("gallery-modal");
const modalGallery = document.getElementById("modal-gallery");
const closeModal = document.querySelector(".close-modal");
const prevBtn = document.querySelector(".gallery-nav.prev");
const nextBtn = document.querySelector(".gallery-nav.next");

let currentImages = [];
let currentVideos = [];
let currentIndex = 0;
let isVideoModal = false;

/* ======================
   DATA ALBUM
====================== */
const albumImages = {
  lavori: [
    "immagini/gallery/lavori/lavorazioni (1).jpeg",
    "immagini/gallery/lavori/lavorazioni (2).jpeg",
    ...
    "immagini/gallery/lavori/lavorazioni (97).jpeg"
  ],
  adrenalina: [
    "immagini/gallery/adrenalina/adrenalina (1).jpeg",
    ...
  "immagini/gallery/adrenalina/adrenalina (10).jpeg"
],
  finiture: [
    "immagini/gallery/interni/1.jpg",
    "immagini/gallery/interni/2.jpg"
  ]
};

const albumVideos = {
  video: [
    "immagini/gallery/video/video (1).mp4",
    ...
    "immagini/gallery/video/video (18).mp4"
  ]
};

/* ======================
   UTILS
====================== */
const isSmallScreen = () =>
  window.matchMedia("(max-width:1024px)").matches;

function normalizePath(p) {
  return typeof p === "string" ? encodeURI(p.trim()) : p;
}

/* =====================================================
   MOSTRA IMMAGINI
===================================================== */
function showImage(index = currentIndex) {
  if (!modalGallery || !currentImages.length) return;

  currentIndex = index;
  modalGallery.innerHTML = "";
  modalGallery.classList.remove("is-video");

  const img = document.createElement("img");
  img.src = normalizePath(currentImages[currentIndex]);
  img.classList.add("zoomable");
  img.loading = "lazy";

  modalGallery.appendChild(img);
  enableZoom(img);

  if (prevBtn && nextBtn) {
    const hide = currentImages.length <= 1;
    prevBtn.classList.toggle("hidden", hide);
    nextBtn.classList.toggle("hidden", hide);
  }
}

/* =====================================================
   MOSTRA VIDEO
===================================================== */
function showVideo(index) {
  if (!modalGallery || !currentVideos.length) return;

  currentIndex = index;
  modalGallery.innerHTML = "";
  modalGallery.classList.add("is-video");

  const video = document.createElement("video");
  video.controls = true;

  const source = document.createElement("source");
  source.src = normalizePath(currentVideos[currentIndex]);
  source.type = "video/mp4";

  video.appendChild(source);
  modalGallery.appendChild(video);
}

/* =====================================================
   APERTURA ALBUM
===================================================== */
document.querySelectorAll(".album-card").forEach((card) => {
  card.addEventListener("click", () => {
    const album = card.dataset.album;

    if (album === "video") {
      currentVideos = albumVideos[album];
      isVideoModal = true;
      showVideo(0);
    } else {
      currentImages = albumImages[album];
      isVideoModal = false;
      showImage(0);
    }

    modal.classList.add("open");
    document.body.classList.add("modal-open");
  });
});

/* =====================================================
   CHIUSURA MODALE
===================================================== */
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    modalGallery.innerHTML = "";
    isVideoModal = false;
  });
}

/* =====================================================
   NAVIGAZIONE
===================================================== */
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (isSmallScreen()) return;
    currentIndex =
      currentIndex > 0 ? currentIndex - 1 : (isVideoModal ? currentVideos.length : currentImages.length) - 1;
    isVideoModal ? showVideo(currentIndex) : showImage(currentIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (isSmallScreen()) return;
    currentIndex =
      currentIndex < (isVideoModal ? currentVideos.length : currentImages.length) - 1
        ? currentIndex + 1
        : 0;
    isVideoModal ? showVideo(currentIndex) : showImage(currentIndex);
  });
}

/* =====================================================
   ZOOM TOUCH
===================================================== */
let scale = 1;
let startDist = 0;

function getDistance(t) {
  return Math.hypot(
    t[0].clientX - t[1].clientX,
    t[0].clientY - t[1].clientY
  );
}

function enableZoom(img) {
  img.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) startDist = getDistance(e.touches);
  });

  img.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      scale = Math.min(Math.max(getDistance(e.touches) / startDist, 1), 3);
      img.style.transform = `scale(${scale})`;
    }
  });

  img.addEventListener("touchend", () => {
    if (scale <= 1) img.style.transform = "scale(1)";
  });
}

/* =====================================================
   TASTIERA
===================================================== */
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;

  if (e.key === "Escape") {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
});
