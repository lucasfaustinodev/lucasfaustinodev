const revealItems = document.querySelectorAll(".reveal");
const glow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
let revealTicking = false;

const updateRevealItems = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const revealStart = viewportHeight * 0.84;
  const revealEnd = viewportHeight * 0.08;

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const isInsideRevealBand = rect.top < revealStart && rect.bottom > revealEnd;
    item.classList.toggle("is-visible", isInsideRevealBand);
  });

  revealTicking = false;
};

const requestRevealUpdate = () => {
  if (revealTicking) return;
  revealTicking = true;
  window.requestAnimationFrame(updateRevealItems);
};

revealItems.forEach((item, index) => {
  const delay = item.dataset.delay || (isTouchDevice ? Math.min(index * 8, 40) : Math.min(index * 45, 220));
  item.style.setProperty("--delay", `${delay}ms`);
});

window.addEventListener("scroll", requestRevealUpdate, { passive: true });
window.addEventListener("resize", requestRevealUpdate);
requestRevealUpdate();

if (!isTouchDevice) {
  window.addEventListener("pointermove", (event) => {
    if (!glow) return;

    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
  });
}

tiltCards.forEach((card) => {
  if (isTouchDevice) return;

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
