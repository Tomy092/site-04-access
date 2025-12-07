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
