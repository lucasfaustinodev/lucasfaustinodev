document.documentElement.classList.add("js-enabled");

const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const glow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");
const revealItems = document.querySelectorAll(".reveal");

function initSmoothScroll() {
  if (isTouchDevice || prefersReducedMotion || typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    lerp: 0.08
  });

  lenis.on("scroll", () => {
    if (window.ScrollTrigger) {
      ScrollTrigger.update();
    }
  });

  function raf(time) {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  }

  window.requestAnimationFrame(raf);
}

function initRevealAnimations() {
  if (!revealItems.length) return;

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (isTouchDevice || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    initMobileReveal(revealItems);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  revealItems.forEach((item, index) => {
    const delay = Math.min(index * 0.035, 0.18);

    gsap.fromTo(
      item,
      {
        autoAlpha: 0,
        y: 26
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.78,
        delay,
        ease: "power3.out",
        overwrite: "auto",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          end: "bottom 8%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });
}

function initMobileReveal(items) {
  if (!("IntersectionObserver" in window)) {
    initManualReveal(items);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    }
  );

  const observeItems = () => {
    items.forEach((item) => observer.observe(item));
  };

  if (document.readyState === "complete") {
    window.requestAnimationFrame(observeItems);
  } else {
    window.addEventListener("load", () => window.requestAnimationFrame(observeItems), { once: true });
  }
}

function initManualReveal(items) {
  let ticking = false;

  const update = () => {
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const triggerPoint = rect.top + Math.min(rect.height * 0.35, 180);
      const visible = triggerPoint < viewHeight * 0.88 && rect.bottom > viewHeight * 0.08;
      item.classList.toggle("is-visible", visible);
    });

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.requestAnimationFrame(requestUpdate);
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("orientationchange", requestUpdate);
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

initSmoothScroll();
initRevealAnimations();
initCursorGlow();
initTiltCards();

window.addEventListener("load", () => {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});
