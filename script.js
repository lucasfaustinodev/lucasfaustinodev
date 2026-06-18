document.documentElement.classList.add("js-enabled");

const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
const glow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");
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

function initRevealAnimations() {
  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
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
      rootMargin: "0px 0px 12% 0px",
      threshold: 0.04
    }
  );

  revealItems.forEach((item, index) => {
    const itemDelay = item.dataset.revealDelay || (isTouchDevice ? Math.min(index * 16, 80) : Math.min(index * 35, 180));
    item.style.transitionDelay = `${itemDelay}ms`;
    revealObserver.observe(item);
  });
}

function initCursorGlow() {
  if (isTouchDevice || !glow) return;

  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
  });
}

function initTiltCards() {
  if (isTouchDevice) return;

  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateX = ((y / bounds.height) - 0.5) * -5;
      const rotateY = ((x / bounds.width) - 0.5) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

initRevealAnimations();
initCursorGlow();
initTiltCards();
