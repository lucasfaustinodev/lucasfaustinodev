const revealItems = document.querySelectorAll(".reveal");
const glow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      window.requestAnimationFrame(() => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    });
  },
  {
    rootMargin: "0px 0px 12% 0px",
    threshold: 0.04
  }
);

revealItems.forEach((item, index) => {
  const delay = item.dataset.delay || (isTouchDevice ? Math.min(index * 18, 90) : Math.min(index * 45, 220));
  item.style.setProperty("--delay", `${delay}ms`);
  revealObserver.observe(item);
});

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
