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
    navToggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open") ? "true" : "false",
    );

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Chiudi il menu quando si clicca su un link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Chiudi la nav se si clicca fuori quando è aperta
  document.addEventListener("click", (e) => {
    if (!nav || !navToggle) return;
    if (!nav.classList.contains("open")) return;
    const target = e.target;
    // Se il click è sul toggle o su un suo discendente (es. gli <span> interni),
    // oppure dentro la nav, non chiudiamo.
    if (
      nav.contains(target) ||
      (target.closest && target.closest("#nav-toggle"))
    )
      return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });

  // Chiudi nav con ESC
  document.addEventListener("keydown", (e) => {
    if (!nav) return;
    if (e.key === "Escape") {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Gestione submit form: invio admin + autoreply tramite EmailJS
  // Nota: la public key viene inizializzata in `index.html`. Non sovrascriverla qui.
  const consultForm = document.getElementById("consult-form");

  // Debug: verifica presenza SDK EmailJS e del tag script in pagina
  try {
    console.log("[DEBUG] EmailJS global presente:", !!window.emailjs);
    console.log("[DEBUG] window.emailjs:", window.emailjs);
    const scripts = Array.from(document.querySelectorAll("script")).filter(
      (s) => s.src && s.src.includes("emailjs"),
    );
    console.log(
      "[DEBUG] script tags matching emailjs:",
      scripts.map((s) => ({
        src: s.src,
        readyState: s.readyState || null,
        async: s.async,
      })),
    );
  } catch (e) {
    console.warn("[DEBUG] impossibile leggere stato EmailJS:", e);
  }

  // EmailJS configuration: aggiorna questi valori con quelli reali dal tuo account
  const EMAILJS_SERVICE_ID = "service_f06kseh";
  const EMAILJS_TEMPLATE_ADMIN = "template_6ngdvax";
  const EMAILJS_TEMPLATE_AUTOREPLY = "template_kuz4hzp";

  if (consultForm) {
    consultForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const form = this;
      const formData = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        to_email: form.email.value, // 🔑 chiave
        slot: form.slot.value,
        message: form.message.value,
      };

      /* 1️⃣ EMAIL A TE */
      console.log("[DEBUG] submit: emailjs present?", !!window.emailjs);
      if (!window.emailjs) {
        // ulteriore info: controlla che il tag SDK sia caricato e non bloccato
        console.error(
          "[ERROR] EmailJS SDK non trovato su window.emailjs. Verifica che https://cdn.emailjs.com/sdk/3.2.0/email.min.js sia raggiungibile e caricato prima di script.js.",
        );
        alert("Servizio email non disponibile. Riprova più tardi.");
        return;
      }

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, formData)

        /* 2️⃣ AUTO-REPLY ALL’UTENTE */
        .then(() => {
          return emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_AUTOREPLY,
            formData,
          );
        })

        .then(() => {
          alert("Richiesta inviata correttamente! Ti contatteremo a breve.");
          form.reset();
        })

        .catch((error) => {
          console.error("Errore EmailJS:", error);
          // Mostra informazioni utili per il debug (status / message / oggetto)
          const msg =
            (error && (error.text || error.message || error.status)) ||
            JSON.stringify(error);
          alert(
            "Errore durante l'invio: " +
              msg +
              " — Controlla la console per dettagli.",
          );
        });
    });
  }
});

/* ======================
   ON SCROLL ANIMATION
====================== */
const fadeElements = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window && fadeElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        // L'elemento non deve più essere controllato dopo l'animazione.
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  fadeElements.forEach((element) => observer.observe(element));
} else {
  fadeElements.forEach((element) => element.classList.add("visible"));
}

/* ======================
   GALLERIA MODALE
====================== */
const modal = document.getElementById("gallery-modal");
const modalGallery = document.getElementById("modal-gallery");
const closeModal = document.querySelector(".close-modal");
const galleryCounter = document.querySelector(".gallery-counter");
const counterCurrent = galleryCounter?.querySelector(".current");
const counterTotal = galleryCounter?.querySelector(".total");

let currentImages = [];
let currentIndex = 0;
let currentVideos = [];
let isVideoModal = false;

const albumImages = {
  lavori: [
    "immagini/gallery/lavori/lavorazioni-(1).webp",
    "immagini/gallery/lavori/lavorazioni-(2).webp",
    "immagini/gallery/lavori/lavorazioni-(3).webp",
    "immagini/gallery/lavori/lavorazioni-(4).webp",
    "immagini/gallery/lavori/lavorazioni-(5).webp",
    "immagini/gallery/lavori/lavorazioni-(6).webp",
    "immagini/gallery/lavori/lavorazioni-(7).webp",
    "immagini/gallery/lavori/lavorazioni-(8).webp",
    "immagini/gallery/lavori/lavorazioni-(9).webp",
    "immagini/gallery/lavori/lavorazioni-(10).webp",
    "immagini/gallery/lavori/lavorazioni-(11).webp",
    "immagini/gallery/lavori/lavorazioni-(12).webp",
    "immagini/gallery/lavori/lavorazioni-(13).webp",
    "immagini/gallery/lavori/lavorazioni-(14).webp",
    "immagini/gallery/lavori/lavorazioni-(15).webp",
    "immagini/gallery/lavori/lavorazioni-(16).webp",
    "immagini/gallery/lavori/lavorazioni-(17).webp",
    "immagini/gallery/lavori/lavorazioni-(18).webp",
    "immagini/gallery/lavori/lavorazioni-(19).webp",
    "immagini/gallery/lavori/lavorazioni-(20).webp",
    "immagini/gallery/lavori/lavorazioni-(21).webp",
    "immagini/gallery/lavori/lavorazioni-(22).webp",
    "immagini/gallery/lavori/lavorazioni-(23).webp",
    "immagini/gallery/lavori/lavorazioni-(24).webp",
    "immagini/gallery/lavori/lavorazioni-(25).webp",
    "immagini/gallery/lavori/lavorazioni-(26).webp",
    "immagini/gallery/lavori/lavorazioni-(27).webp",
    "immagini/gallery/lavori/lavorazioni-(28).webp",
    "immagini/gallery/lavori/lavorazioni-(29).webp",
    "immagini/gallery/lavori/lavorazioni-(30).webp",
    "immagini/gallery/lavori/lavorazioni-(31).webp",
    "immagini/gallery/lavori/lavorazioni-(32).webp",
    "immagini/gallery/lavori/lavorazioni-(33).webp",
    "immagini/gallery/lavori/lavorazioni-(34).webp",
    "immagini/gallery/lavori/lavorazioni-(35).webp",
    "immagini/gallery/lavori/lavorazioni-(36).webp",
    "immagini/gallery/lavori/lavorazioni-(37).webp",
    "immagini/gallery/lavori/lavorazioni-(38).webp",
    "immagini/gallery/lavori/lavorazioni-(39).webp",
    "immagini/gallery/lavori/lavorazioni-(40).webp",
    "immagini/gallery/lavori/lavorazioni-(41).webp",
    "immagini/gallery/lavori/lavorazioni-(42).webp",
    "immagini/gallery/lavori/lavorazioni-(43).webp",
    "immagini/gallery/lavori/lavorazioni-(44).webp",
    "immagini/gallery/lavori/lavorazioni-(45).webp",
    "immagini/gallery/lavori/lavorazioni-(46).webp",
    "immagini/gallery/lavori/lavorazioni-(47).webp",
    "immagini/gallery/lavori/lavorazioni-(48).webp",
    "immagini/gallery/lavori/lavorazioni-(49).webp",
    "immagini/gallery/lavori/lavorazioni-(50).webp",
    "immagini/gallery/lavori/lavorazioni-(51).webp",
    "immagini/gallery/lavori/lavorazioni-(52).webp",
    "immagini/gallery/lavori/lavorazioni-(53).webp",
    "immagini/gallery/lavori/lavorazioni-(54).webp",
    "immagini/gallery/lavori/lavorazioni-(55).webp",
    "immagini/gallery/lavori/lavorazioni-(56).webp",
    "immagini/gallery/lavori/lavorazioni-(57).webp",
    "immagini/gallery/lavori/lavorazioni-(58).webp",
    "immagini/gallery/lavori/lavorazioni-(59).webp",
    "immagini/gallery/lavori/lavorazioni-(60).webp",
    "immagini/gallery/lavori/lavorazioni-(61).webp",
    "immagini/gallery/lavori/lavorazioni-(62).webp",
    "immagini/gallery/lavori/lavorazioni-(63).webp",
    "immagini/gallery/lavori/lavorazioni-(64).webp",
    "immagini/gallery/lavori/lavorazioni-(65).webp",
    "immagini/gallery/lavori/lavorazioni-(66).webp",
    "immagini/gallery/lavori/lavorazioni-(67).webp",
    "immagini/gallery/lavori/lavorazioni-(68).webp",
    "immagini/gallery/lavori/lavorazioni-(69).webp",
    "immagini/gallery/lavori/lavorazioni-(70).webp",
    "immagini/gallery/lavori/lavorazioni-(71).webp",
    "immagini/gallery/lavori/lavorazioni-(72).webp",
    "immagini/gallery/lavori/lavorazioni-(73).webp",
    "immagini/gallery/lavori/lavorazioni-(74).webp",
    "immagini/gallery/lavori/lavorazioni-(75).webp",
    "immagini/gallery/lavori/lavorazioni-(76).webp",
    "immagini/gallery/lavori/lavorazioni-(77).webp",
    "immagini/gallery/lavori/lavorazioni-(78).webp",
    "immagini/gallery/lavori/lavorazioni-(79).webp",
    "immagini/gallery/lavori/lavorazioni-(80).webp",
    "immagini/gallery/lavori/lavorazioni-(81).webp",
    "immagini/gallery/lavori/lavorazioni-(82).webp",
    "immagini/gallery/lavori/lavorazioni-(83).webp",
    "immagini/gallery/lavori/lavorazioni-(84).webp",
    "immagini/gallery/lavori/lavorazioni-(85).webp",
    "immagini/gallery/lavori/lavorazioni-(86).webp",
    "immagini/gallery/lavori/lavorazioni-(87).webp",
    "immagini/gallery/lavori/lavorazioni-(88).webp",
    "immagini/gallery/lavori/lavorazioni-(89).webp",
    "immagini/gallery/lavori/lavorazioni-(90).webp",
    "immagini/gallery/lavori/lavorazioni-(91).webp",
    "immagini/gallery/lavori/lavorazioni-(92).webp",
    "immagini/gallery/lavori/lavorazioni-(93).webp",
  ],

  adrenalina: [
    "immagini/gallery/adrenalina/adrenalina-(1).webp",
    "immagini/gallery/adrenalina/adrenalina-(2).webp",
    "immagini/gallery/adrenalina/adrenalina-(3).webp",
    "immagini/gallery/adrenalina/adrenalina-(4).webp",
    "immagini/gallery/adrenalina/adrenalina-(5).webp",
    "immagini/gallery/adrenalina/adrenalina-(6).webp",
    "immagini/gallery/adrenalina/adrenalina-(7).webp",
    "immagini/gallery/adrenalina/adrenalina-(8).webp",
    "immagini/gallery/adrenalina/adrenalina-(9).webp",
    "immagini/gallery/adrenalina/adrenalina-(10).webp",
    "immagini/gallery/adrenalina/adrenalina-(11).webp",
    "immagini/gallery/adrenalina/adrenalina-(12).webp",
    "immagini/gallery/adrenalina/adrenalina-(13).webp",
    "immagini/gallery/adrenalina/adrenalina-(14).webp",
    "immagini/gallery/adrenalina/adrenalina-(15).webp",
    "immagini/gallery/adrenalina/adrenalina-(16).webp",
    "immagini/gallery/adrenalina/adrenalina-(17).webp",
    
  ],
  finiture: [
    "immagini/gallery/interni/interni-(1).webp",
    "immagini/gallery/interni/interni-(2).webp",
    "immagini/gallery/interni/interni-(3).webp",
    "immagini/gallery/interni/interni-(4).webp",
    "immagini/gallery/interni/interni-(5).webp",
    "immagini/gallery/interni/interni-(6).webp",
    "immagini/gallery/interni/interni-(7).webp",
  ],
};
const albumVideos = {
  video: [
    "immagini/gallery/video/video-(1).mp4",
    "immagini/gallery/video/video-(2).mp4",
    "immagini/gallery/video/video-(3).mp4",
    "immagini/gallery/video/video-(4).mp4",
    "immagini/gallery/video/video-(5).mp4",
    "immagini/gallery/video/video-(6).mp4",
    "immagini/gallery/video/video-(7).mp4",
    "immagini/gallery/video/video-(8).mp4",
    "immagini/gallery/video/video-(9).mp4",
    "immagini/gallery/video/video-(10).mp4",
    "immagini/gallery/video/video-(11).mp4",
    "immagini/gallery/video/video-(12).mp4",
    "immagini/gallery/video/video-(13).mp4",
    "immagini/gallery/video/video-(14).mp4",
    "immagini/gallery/video/video-(15).mp4",
    "immagini/gallery/video/video-(16).mp4",
    "immagini/gallery/video/video-(17).mp4",
    "immagini/gallery/video/video-(18).mp4",
  ],
};

// Normalizza e codifica correttamente un percorso immagine/video
function normalizePath(p) {
  if (typeof p !== "string") return p;
  // rimuove eventuali spazi iniziali/finali e codifica correttamente i caratteri
  return encodeURI(p.trim());
}

function showVideo(index) {
  if (
    !modalGallery ||
    !Array.isArray(currentVideos) ||
    currentVideos.length === 0
  )
    return;

  currentIndex = typeof index === "number" ? index : currentIndex;
  modalGallery.replaceChildren();
  // Segnala che la modale contiene un video per applicare stili specifici
  modalGallery.classList.add("is-video");

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

  const playBtn = overlay.querySelector(".play-btn");

  // Gestione input: distinguiamo tap (play) da swipe (no play)
  let touchStartX = 0,
    touchStartY = 0,
    touchMoved = false;
  overlay._suppressClick = false;

  overlay.addEventListener(
    "touchstart",
    (e) => {
      if (isSmallScreen()) return; // non attivare play logic su mobile/tablet
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
      }
    },
    { passive: true },
  );

  overlay.addEventListener(
    "touchmove",
    (e) => {
      if (isSmallScreen()) return;
      if (e.touches && e.touches.length === 1) {
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);
        if (dx > 10 || dy > 10) touchMoved = true;
      }
    },
    { passive: true },
  );

  overlay.addEventListener("touchend", (e) => {
    if (isSmallScreen()) {
      // impediamo il play su mobile/tablet
      overlay._suppressClick = true;
      setTimeout(() => {
        overlay._suppressClick = false;
      }, 400);
      return;
    }
    e.stopPropagation();
    if (!touchMoved) {
      try {
        video.play();
      } catch (err) {}
      // Previeni il click sintetico che alcuni browser generano dopo touch
      overlay._suppressClick = true;
      setTimeout(() => {
        overlay._suppressClick = false;
      }, 400);
    }
  });

  // Click mouse/pen: normale play. Se è stato appena eseguito un touch, sopprimiamo il click sintetico.
  overlay.addEventListener("click", (e) => {
    if (isSmallScreen()) return; // non permettere click play su mobile/tablet
    if (overlay._suppressClick) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    try {
      video.play();
    } catch (err) {}
  });

  // Nascondi overlay quando parte la riproduzione; mostralo su pausa/ended
  video.addEventListener("play", () => {
    overlay.classList.add("hidden");
  });
  video.addEventListener("playing", () => {
    overlay.classList.add("hidden");
  });
  video.addEventListener("pause", () => {
    overlay.classList.remove("hidden");
  });
  video.addEventListener("ended", () => {
    overlay.classList.remove("hidden");
  });

  // Se il video è già in stato 'playing' (edge cases), nascondi overlay
  if (!video.paused && !video.ended) {
    overlay.classList.add("hidden");
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

  // aggiorna contatore video
  updateCounter(currentIndex, currentVideos.length);
}

document.querySelectorAll(".album-card").forEach((card) => {
  card.addEventListener("click", () => {
    const album = card.dataset.album;

    if (album === "video") {
      currentVideos = albumVideos[album];
      currentIndex = 0;
      isVideoModal = true;
      showVideo(currentIndex);
      if (modal) modal.classList.add("open");
      document.body.classList.add("modal-open");
      updateCounter(currentIndex, currentVideos.length);
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

function updateCounter(index, total) {
  if (!galleryCounter || !counterCurrent || !counterTotal) return;

  counterCurrent.textContent = index + 1;
  counterTotal.textContent = total;

  galleryCounter.style.display = total > 1 ? "block" : "none";
}

/* ======================
   MOSTRA IMMAGINE
====================== */
/* Unified showImage: accepts optional index, uses encodeURI and handles nav visibility */
function showImage(index = currentIndex) {
  if (
    !modalGallery ||
    !Array.isArray(currentImages) ||
    currentImages.length === 0
  )
    return;

  currentIndex = typeof index === "number" ? index : currentIndex;
  modalGallery.replaceChildren();

  // Rimuovi eventuale flag video quando mostriamo immagini
  modalGallery.classList.remove("is-video");

  const img = document.createElement("img");
  img.src = normalizePath(currentImages[currentIndex]);
  img.classList.add("zoomable");
  img.loading = "lazy";

  modalGallery.appendChild(img);
  enableZoom(img);

  updateCounter(currentIndex, currentImages.length);

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
      try {
        v.pause();
        v.currentTime = 0;
      } catch (e) {}
    }
    isVideoModal = false;
    // Rimuovi anche la classe is-video se presente
    if (modalGallery) modalGallery.classList.remove("is-video");
  });
}

/* ======================
   SWIPE ORIZZONTALE
====================== */
let startX = 0;

if (modal) {
  modal.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchend",
    (e) => {
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
          updateCounter(currentIndex, currentVideos.length);
        } else {
          if (diff > 0 && currentIndex < currentImages.length - 1) {
            currentIndex++;
          } else if (diff < 0 && currentIndex > 0) {
            currentIndex--;
          }

          showImage(currentIndex);
        }
      }
    },
    { passive: true },
  );
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
  let zoomFrame = null;

  img.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 2) {
        startDist = getDistance(e.touches);
      }
    },
    { passive: true },
  );

  img.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length !== 2 || startDist <= 0) return;

      const distance = getDistance(e.touches);
      const nextScale = Math.min(Math.max(distance / startDist, 1), 3);

      if (zoomFrame !== null) {
        cancelAnimationFrame(zoomFrame);
      }

      zoomFrame = requestAnimationFrame(() => {
        scale = nextScale;
        img.style.transform = `scale(${scale})`;
        zoomFrame = null;
      });
    },
    { passive: true },
  );

  img.addEventListener(
    "touchend",
    () => {
      if (scale <= 1) {
        img.style.transform = "scale(1)";
      }
    },
    { passive: true },
  );
}

const prevBtn = document.querySelector(".gallery-nav.prev");
const nextBtn = document.querySelector(".gallery-nav.next");

// Ritorna true su Mobile/Tablet (<=1024px)
const smallScreenMediaQuery = window.matchMedia("(max-width: 1024px)");

const isSmallScreen = () => smallScreenMediaQuery.matches;

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
      updateCounter(currentIndex, currentVideos.length);
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
document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("open")) return;

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (isVideoModal) {
      if (currentIndex > 0) currentIndex--;
      else currentIndex = currentVideos.length - 1;
      showVideo(currentIndex);
    } else {
      if (currentIndex > 0) currentIndex--;
      else currentIndex = currentImages.length - 1;
      showImage(currentIndex);
    }
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    if (isVideoModal) {
      if (currentIndex < currentVideos.length - 1) currentIndex++;
      else currentIndex = 0;
      showVideo(currentIndex);
      updateCounter(currentIndex, currentVideos.length);
    } else {
      if (currentIndex < currentImages.length - 1) currentIndex++;
      else currentIndex = 0;
      showImage(currentIndex);
    }
  } else if (e.key === "Escape") {
    // chiudi modal
    if (modal) modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    const v = modalGallery ? modalGallery.querySelector("video") : null;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch (err) {}
    }
    isVideoModal = false;
    // Rimuovi eventuale classe video
    if (modalGallery) modalGallery.classList.remove("is-video");
  }
});

