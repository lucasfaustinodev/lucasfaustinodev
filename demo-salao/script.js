document.documentElement.classList.add("js-enabled");

const revealItems = document.querySelectorAll(".reveal");

function showRevealItem(item) {
  if (item.classList.contains("is-visible")) {
    return;
  }

  window.requestAnimationFrame(() => {
    item.classList.add("is-visible");
  });
}

function hideRevealItem(item) {
  window.requestAnimationFrame(() => {
    item.classList.remove("is-visible");
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showRevealItem(entry.target);
      } else {
        hideRevealItem(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -4% 0px",
    threshold: 0.1
  }
);

revealItems.forEach((item, index) => {
  const itemDelay = item.dataset.revealDelay || Math.min(index * 35, 180);
  item.style.transitionDelay = `${itemDelay}ms`;
  item.style.animationDelay = `${itemDelay}ms`;
  revealObserver.observe(item);
});

const bookingForm = document.querySelector("#bookingForm");
const phoneNumber = "5500000000000";

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const clientName = document.querySelector("#clientName").value.trim();
  const serviceName = document.querySelector("#serviceName").value.trim();
  const preferredDate = document.querySelector("#preferredDate").value.trim();
  const preferredTime = document.querySelector("#preferredTime").value.trim();
  const notes = document.querySelector("#notes").value.trim();

  const message = [
    "Olá! Quero agendar um horário.",
    "",
    `Nome: ${clientName || "Não informado"}`,
    `Serviço: ${serviceName || "Não informado"}`,
    `Dia preferido: ${preferredDate || "A combinar"}`,
    `Horário preferido: ${preferredTime || "A combinar"}`,
    `Observações: ${notes || "Nenhuma"}`
  ].join("\n");

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeLightbox = lightbox.querySelector(".lightbox-close");
const galleryButtons = document.querySelectorAll(".gallery-item");

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function hideLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    openLightbox(button.dataset.image, image.alt);
  });
});

closeLightbox.addEventListener("click", hideLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    hideLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideLightbox();
  }
});
