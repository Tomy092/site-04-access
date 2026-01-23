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
    // Assicura che l'attributo aria-expanded sia sincronizzato collo stato della nav
    // Imposta stato iniziale
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Chiudi il menu quando si clicca su un link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Chiudi la nav se si clicca fuori quando è aperta
  document.addEventListener('click', (e) => {
    if (!nav || !navToggle) return;
    if (!nav.classList.contains('open')) return;
    const target = e.target;
    // Se il click è sul toggle o su un suo discendente (es. gli <span> interni),
    // oppure dentro la nav, non chiudiamo.
    if (nav.contains(target) || (target.closest && target.closest('#nav-toggle'))) return;
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });

  // Chiudi nav con ESC
  document.addEventListener('keydown', (e) => {
    if (!nav) return;
    if (e.key === 'Escape') {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

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
let currentVideos = [];
let isVideoModal = false;

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

  adrenalina: [
    "immagini/gallery/adrenalina/1.jpg",
    "immagini/gallery/adrenalina/2.jpg"
  ],
  finiture: [
    "immagini/gallery/interni/1.jpg",
    "immagini/gallery/interni/2.jpg"
  ]
};
 const albumVideos = {
  video: [
    "immagini/gallery/video/video (1).mp4",
    "immagini/gallery/video/video (2).mp4",
    "immagini/gallery/video/video (3).mp4",
    "immagini/gallery/video/video (4).mp4",
    "immagini/gallery/video/video (5).mp4",
    "immagini/gallery/video/video (6).mp4",
    "immagini/gallery/video/video (7).mp4",
    "immagini/gallery/video/video (8).mp4",
    "immagini/gallery/video/video (9).mp4",
    "immagini/gallery/video/video (10).mp4",
    "immagini/gallery/video/video (11).mp4",
    "immagini/gallery/video/video (12).mp4",
    "immagini/gallery/video/video (13).mp4",
    "immagini/gallery/video/video (14).mp4",
    "immagini/gallery/video/video (15).mp4",
    "immagini/gallery/video/video (16).mp4",
    "immagini/gallery/video/video (17).mp4",
    "immagini/gallery/video/video (18).mp4",
    "immagini/gallery/video/video (19).mp4"
  ]
};

// Normalizza e codifica correttamente un percorso immagine/video
function normalizePath(p) {
  if (typeof p !== 'string') return p;
  // rimuove eventuali spazi iniziali/finali e sostituisce spazi interni con %20
  return encodeURI(p.trim().replace(/\\s+/g, '%20'));
}

function showVideo(index) {
  if (!modalGallery || !Array.isArray(currentVideos) || currentVideos.length === 0) return;

  currentIndex = typeof index === "number" ? index : currentIndex;
  modalGallery.innerHTML = "";
  // Segnala che la modale contiene un video per applicare stili specifici
  modalGallery.classList.add('is-video');

  const video = document.createElement("video");
  video.controls = true;
  video.autoplay = false;
  video.poster = ""; // opzionale: miniatura

  const source = document.createElement("source");
  source.src = normalizePath(currentVideos[currentIndex]);
  source.type = "video/mp4";

  video.appendChild(source);
  modalGallery.appendChild(video);

  // overlay play: mostra un grande pulsante al centro che avvia il video
  const overlay = document.createElement("div");
  overlay.className = "video-play-overlay";
  overlay.innerHTML = `
    <div class="play-btn" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>
    </div>
  `;
  modalGallery.appendChild(overlay);

  const playBtn = overlay.querySelector('.play-btn');

  // Gestione input: distinguiamo tap (play) da swipe (no play)
  let touchStartX = 0, touchStartY = 0, touchMoved = false;
  overlay._suppressClick = false;

  overlay.addEventListener('touchstart', (e) => {
    if (isSmallScreen()) return; // non attivare play logic su mobile/tablet
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }
  }, { passive: true });

  overlay.addEventListener('touchmove', (e) => {
    if (isSmallScreen()) return;
    if (e.touches && e.touches.length === 1) {
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dx > 10 || dy > 10) touchMoved = true;
    }
  }, { passive: true });

  overlay.addEventListener('touchend', (e) => {
    if (isSmallScreen()) {
      // impediamo il play su mobile/tablet
      overlay._suppressClick = true;
      setTimeout(() => { overlay._suppressClick = false; }, 400);
      return;
    }
    e.stopPropagation();
    if (!touchMoved) {
      try { video.play(); } catch (err) {}
      // Previeni il click sintetico che alcuni browser generano dopo touch
      overlay._suppressClick = true;
      setTimeout(() => { overlay._suppressClick = false; }, 400);
    }
  });

  // Click mouse/pen: normale play. Se è stato appena eseguito un touch, sopprimiamo il click sintetico.
  overlay.addEventListener('click', (e) => {
    if (isSmallScreen()) return; // non permettere click play su mobile/tablet
    if (overlay._suppressClick) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    try { video.play(); } catch (err) {}
  });

  // Nascondi overlay quando parte la riproduzione; mostralo su pausa/ended
  video.addEventListener('play', () => { overlay.classList.add('hidden'); });
  video.addEventListener('playing', () => { overlay.classList.add('hidden'); });
  video.addEventListener('pause', () => { overlay.classList.remove('hidden'); });
  video.addEventListener('ended', () => { overlay.classList.remove('hidden'); });

  // Se il video è già in stato 'playing' (edge cases), nascondi overlay
  if (!video.paused && !video.ended) {
    overlay.classList.add('hidden');
  }

  // Nascondi/mostra frecce per video
  if (prevBtn && nextBtn) {
    if (currentVideos.length <= 1) {
      prevBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
    }
  }
}

document.querySelectorAll(".album-card").forEach(card => {
  card.addEventListener("click", () => {
    const album = card.dataset.album;

    if (album === "video") {
      currentVideos = albumVideos[album];
      currentIndex = 0;
      isVideoModal = true;
      showVideo(currentIndex);
      if (modal) modal.classList.add("open");
      document.body.classList.add("modal-open");
    } else {
      // mostra immagini
      currentImages = albumImages[album];
      currentIndex = 0;
      isVideoModal = false;
      showImage(currentIndex);
      if (modal) modal.classList.add("open");
      document.body.classList.add("modal-open");
    }
  });
});


/* ======================
   MOSTRA IMMAGINE
====================== */
/* Unified showImage: accepts optional index, uses encodeURI and handles nav visibility */
function showImage(index = currentIndex) {
  if (!modalGallery || !Array.isArray(currentImages) || currentImages.length === 0) return;

  currentIndex = typeof index === "number" ? index : currentIndex;
  modalGallery.innerHTML = "";

  // Rimuovi eventuale flag video quando mostriamo immagini
  modalGallery.classList.remove('is-video');

  const img = document.createElement("img");
  img.src = normalizePath(currentImages[currentIndex]);
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
// NOTE: l'apertura degli album è gestita sopra (una singola gestione che copre immagini e video)

/* ======================
   CHIUSURA
====================== */
if (closeModal) {
  closeModal.addEventListener("click", () => {
    if (modal) modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    // Se era un video, interrompi la riproduzione
    const v = modalGallery ? modalGallery.querySelector("video") : null;
    if (v) {
      try { v.pause(); v.currentTime = 0; } catch (e) {}
    }
    isVideoModal = false;
    // Rimuovi anche la classe is-video se presente
    if (modalGallery) modalGallery.classList.remove('is-video');
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
      if (isVideoModal) {
        if (diff > 0 && currentIndex < currentVideos.length - 1) {
          currentIndex++;
        } else if (diff < 0 && currentIndex > 0) {
          currentIndex--;
        }
        showVideo(currentIndex);
      } else {
        if (diff > 0 && currentIndex < currentImages.length - 1) {
          currentIndex++;
        } else if (diff < 0 && currentIndex > 0) {
          currentIndex--;
        }
        showImage(currentIndex);
      }
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

// Ritorna true su Mobile/Tablet (<=1024px)
const isSmallScreen = () => window.matchMedia("(max-width:1024px)").matches;

if (prevBtn) {
  prevBtn.addEventListener("click", (e) => {
    if (isSmallScreen()) return; // non rispondere su mobile/tablet
    if (isVideoModal) {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = currentVideos.length - 1; // loop
      }
      showVideo(currentIndex);
    } else {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = currentImages.length - 1; // loop
      }
      showImage(currentIndex);
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    if (isSmallScreen()) return; // non rispondere su mobile/tablet
    if (isVideoModal) {
      if (currentIndex < currentVideos.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // loop
      }
      showVideo(currentIndex);
    } else {
      if (currentIndex < currentImages.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // loop
      }
      showImage(currentIndex);
    }
  });
}

// NAVIGAZIONE DA TASTIERA: frecce sinistra/destra per scorrere, Esc per chiudere
document.addEventListener('keydown', (e) => {
  if (!modal || !modal.classList.contains('open')) return;

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    if (isVideoModal) {
      if (currentIndex > 0) currentIndex--; else currentIndex = currentVideos.length - 1;
      showVideo(currentIndex);
    } else {
      if (currentIndex > 0) currentIndex--; else currentIndex = currentImages.length - 1;
      showImage(currentIndex);
    }
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    if (isVideoModal) {
      if (currentIndex < currentVideos.length - 1) currentIndex++; else currentIndex = 0;
      showVideo(currentIndex);
    } else {
      if (currentIndex < currentImages.length - 1) currentIndex++; else currentIndex = 0;
      showImage(currentIndex);
    }
  } else if (e.key === 'Escape') {
    // chiudi modal
    if (modal) modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    const v = modalGallery ? modalGallery.querySelector('video') : null;
    if (v) { try { v.pause(); v.currentTime = 0; } catch (err) {} }
    isVideoModal = false;
    // Rimuovi eventuale classe video
    if (modalGallery) modalGallery.classList.remove('is-video');
  }
});
