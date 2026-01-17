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
   GALLERY MODAL
====================== */
const modal = document.getElementById("gallery-modal");
const modalGallery = document.getElementById("modal-gallery");
const closeModal = document.querySelector(".close-modal");

const albumImages = {
  lavori: ["1.jpg", "2.jpg", "3.jpg"],
  video: ["1.jpg", "2.jpg"],
  adrenalina: ["1.jpg", "2.jpg", "3.jpg"],
  finiture: ["1.jpg", "2.jpg"]
};

document.querySelectorAll(".album-card").forEach(card => {
  card.addEventListener("click", () => {
    const album = card.dataset.album;
    modalGallery.innerHTML = "";

    albumImages[album].forEach(img => {
      const image = document.createElement("img");
image.dataset.src = `images/gallery/${album}/${img}`;
image.loading = "lazy";
image.classList.add("lazy-img");
modalGallery.appendChild(image);

    });

    modal.classList.add("open");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
});

/* Lazy load observer */
const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => img.classList.add("loaded");
      imgObserver.unobserve(img);
    }
  });
});

function observeLazyImages() {
  document.querySelectorAll(".lazy-img").forEach(img => {
    imgObserver.observe(img);
  });
}

let currentIndex = 0;
let currentImages = [];

function showImage(index) {
  modalGallery.innerHTML = "";
  const img = document.createElement("img");
  img.src = currentImages[index];
  modalGallery.appendChild(img);
enableZoom(img);
}

document.querySelectorAll(".album-card").forEach(card => {
  card.addEventListener("click", () => {
    const album = card.dataset.album;
    currentImages = albumImages[album].map(
      img => `images/gallery/${album}/${img}`
    );
    currentIndex = 0;
    showImage(currentIndex);
    modal.classList.add("open");
  });
});

/* Swipe detection */
let startX = 0;

modalGallery.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

modalGallery.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentIndex < currentImages.length - 1) {
      currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
    }
    showImage(currentIndex);
  }
});

let scale = 1;
let lastScale = 1;
let startDist = 0;
let posX = 0, posY = 0;
let lastX = 0, lastY = 0;
let isDragging = false;
let imgEl = null;

/* distanza tra due dita */
function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

function enableZoom(img) {
  imgEl = img;
  img.classList.add("zoomable");

  img.addEventListener("touchstart", e => {
    if (e.touches.length === 2) {
      startDist = getDistance(e.touches);
      lastScale = scale;
    }
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX - posX;
      lastY = e.touches[0].clientY - posY;
    }
  });

  img.addEventListener("touchmove", e => {
    e.preventDefault();

    if (e.touches.length === 2) {
      const dist = getDistance(e.touches);
      scale = Math.min(Math.max(1, lastScale * (dist / startDist)), 3);
    }

    if (e.touches.length === 1 && isDragging && scale > 1) {
      posX = e.touches[0].clientX - lastX;
      posY = e.touches[0].clientY - lastY;
    }

    img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  });

  img.addEventListener("touchend", () => {
    isDragging = false;
  });

  /* double tap → reset */
  let lastTap = 0;
  img.addEventListener("touchend", e => {
    const now = Date.now();
    if (now - lastTap < 300) {
      scale = 1;
      posX = posY = 0;
      img.style.transform = "scale(1)";
    }
    lastTap = now;
  });
}

