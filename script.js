// Anno automatico footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Toggle menu mobile
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    // Chiudi il menu quando si clicca su un link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // Gestione submit form (solo messaggio lato client)
  const consultForm = document.getElementById("consult-form");
  const formNote = document.getElementById("form-note");

  if (consultForm && formNote) {
    consultForm.addEventListener("submit", (e) => {
      e.preventDefault();

      formNote.textContent =
        "Richiesta inviata. Ti ricontatteremo al più presto per confermare la consulenza.";
      formNote.style.color = "#00c9ff";

      consultForm.reset();
    });
  }
});

/* ======================
   ON SCROLL ANIMATION
====================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

/* ======================
   GALLERIA MODALE
====================== */
const modal = document.getElementById("gallery-modal");
const modalGallery = document.getElementById("modal-gallery");
const closeModal = document.querySelector(".close-modal");

let currentImages = [];
let currentIndex = 0;

const albumImages = {
  lavori: [
    "immagini/gallery/lavori/lavorazioni (1).jpeg",
    "immagini/gallery/lavori/lavorazioni (2).jpeg",
    "immagini/gallery/lavori/lavorazioni (3).jpeg",
    "immagini/gallery/lavori/lavorazioni (4).jpeg",
    "immagini/gallery/lavori/lavorazioni (5).jpeg",
    "immagini/gallery/lavori/lavorazioni (6).jpeg",
    "immagini/gallery/lavori/lavorazioni (7).jpeg",
    "immagini/gallery/lavori/lavorazioni (8).jpeg",
    "immagini/gallery/lavori/lavorazioni (9).jpeg",
    "immagini/gallery/lavori/lavorazioni (10).jpeg",
    "immagini/gallery/lavori/lavorazioni (11).jpeg",
    "immagini/gallery/lavori/lavorazioni (12).jpeg",
    "immagini/gallery/lavori/lavorazioni (13).jpeg",
    "immagini/gallery/lavori/lavorazioni (14).jpeg",
    "immagini/gallery/lavori/lavorazioni (15).jpeg",
    "immagini/gallery/lavori/lavorazioni (16).jpeg",
    "immagini/gallery/lavori/lavorazioni (17).jpeg",
    "immagini/gallery/lavori/lavorazioni (18).jpeg",
    "immagini/gallery/lavori/lavorazioni (19).jpeg",
    "immagini/gallery/lavori/lavorazioni (20).jpeg",
    "immagini/gallery/lavori/lavorazioni (21).jpeg",
    "immagini/gallery/lavori/lavorazioni (22).jpeg",
    "immagini/gallery/lavori/lavorazioni (23).jpeg",
    "immagini/gallery/lavori/lavorazioni (24).jpeg",
    "immagini/gallery/lavori/lavorazioni (25).jpeg",
    "immagini/gallery/lavori/lavorazioni (26).jpeg",
    "immagini/gallery/lavori/lavorazioni (27).jpeg",
    "immagini/gallery/lavori/lavorazioni (28).jpeg",
    "immagini/gallery/lavori/lavorazioni (29).jpeg",
    "immagini/gallery/lavori/lavorazioni (30).jpeg",
    "immagini/gallery/lavori/lavorazioni (31).jpeg",
    "immagini/gallery/lavori/lavorazioni (32).jpeg",
    "immagini/gallery/lavori/lavorazioni (33).jpeg",
    "immagini/gallery/lavori/lavorazioni (34).jpeg",
    "immagini/gallery/lavori/lavorazioni (35).jpeg",
    "immagini/gallery/lavori/lavorazioni (36).jpeg",
    "immagini/gallery/lavori/lavorazioni (37).jpeg",
    "immagini/gallery/lavori/lavorazioni (38).jpeg",
    "immagini/gallery/lavori/lavorazioni (39).jpeg",
    "immagini/gallery/lavori/lavorazioni (40).jpeg",
    "immagini/gallery/lavori/lavorazioni (41).jpeg",
    "immagini/gallery/lavori/lavorazioni (42).jpeg",
    "immagini/gallery/lavori/lavorazioni (43).jpeg",
    "immagini/gallery/lavori/lavorazioni (44).jpeg",
    "immagini/gallery/lavori/lavorazioni (45).jpeg",
    "immagini/gallery/lavori/lavorazioni (46).jpeg",
    "immagini/gallery/lavori/lavorazioni (47).jpeg",
    "immagini/gallery/lavori/lavorazioni (48).jpeg",
    "immagini/gallery/lavori/lavorazioni (49).jpeg",
    "immagini/gallery/lavori/lavorazioni (50).jpeg",
    "immagini/gallery/lavori/lavorazioni (51).jpeg",
    "immagini/gallery/lavori/lavorazioni (52).jpeg",
    "immagini/gallery/lavori/lavorazioni (53).jpeg",
    "immagini/gallery/lavori/lavorazioni (54).jpeg",
    "immagini/gallery/lavori/lavorazioni (55).jpeg"
  ],
  video: [
    "immagini/gallery/video/1.jpg",
    "immagini/gallery/video/2.jpg"
  ],
  adrenalina: [
    "immagini/gallery/adrenalina/1.jpg",
    "immagini/gallery/adrenalina/2.jpg"
  ],
  finiture: [
    "immagini/gallery/interni/1.jpg",
    "immagini/gallery/interni/2.jpg"
  ]
};

/* ======================
   MOSTRA IMMAGINE
====================== */
/* Unified showImage: accepts optional index, uses encodeURI and handles nav visibility */
function showImage(index = currentIndex) {
  if (!modalGallery || !Array.isArray(currentImages) || currentImages.length === 0) return;

  currentIndex = typeof index === "number" ? index : currentIndex;
  modalGallery.innerHTML = "";

  const img = document.createElement("img");
  img.src = encodeURI(currentImages[currentIndex]);
  img.classList.add("zoomable");
  img.loading = "lazy";

  modalGallery.appendChild(img);
  enableZoom(img);

  // Nascondi/mostra frecce
  if (prevBtn && nextBtn) {
    if (currentImages.length <= 1) {
      prevBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
    }
  }
}

/* ======================
   APERTURA ALBUM
====================== */
document.querySelectorAll(".album-card").forEach(card => {
  card.addEventListener("click", () => {
    const album = card.dataset.album;
    const imgs = albumImages[album];
    if (!imgs || !Array.isArray(imgs) || imgs.length === 0) return;
    currentImages = imgs.slice();
    currentIndex = 0;
    showImage();
    modal.classList.add("open");
  });
});

/* ======================
   CHIUSURA
====================== */
if (closeModal) {
  closeModal.addEventListener("click", () => {
    if (modal) modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  });
}

/* ======================
   SWIPE ORIZZONTALE
====================== */
let startX = 0;

if (modal) {
  modal.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
    }
  });

  modal.addEventListener("touchend", e => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < currentImages.length - 1) {
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
      }
      showImage();
    }
  });
}

let scale = 1;
let startDist = 0;

function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

function enableZoom(img) {
  scale = 1;

  img.addEventListener("touchstart", e => {
    if (e.touches.length === 2) {
      startDist = getDistance(e.touches);
    }
  });

  img.addEventListener("touchmove", e => {
    if (e.touches.length === 2) {
      const dist = getDistance(e.touches);
      scale = Math.min(Math.max(dist / startDist, 1), 3);
      img.style.transform = `scale(${scale})`;
    }
  });

  img.addEventListener("touchend", () => {
    if (scale <= 1) img.style.transform = "scale(1)";
  });
}

const prevBtn = document.querySelector(".gallery-nav.prev");
const nextBtn = document.querySelector(".gallery-nav.next");

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = currentImages.length - 1; // loop
    }
    showImage(currentIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop
    }
    showImage(currentIndex);
  });
}
