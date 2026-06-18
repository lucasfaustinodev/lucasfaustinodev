document.documentElement.classList.add("js-enabled");

const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(
  ".hero-panel, .snap-strip article, .section-heading, .combo-card, .menu-header, .tabs, .product-card, .order-heading, .order-layout, .footer"
);

function initSmoothScroll() {
  if (isTouchDevice || prefersReducedMotion || typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    duration: 1,
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

  revealItems.forEach((item) => item.classList.add("reveal"));

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
    const delay = Math.min(index * 0.025, 0.12);

    gsap.fromTo(
      item,
      {
        autoAlpha: 0,
        y: 22
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
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

initSmoothScroll();
initRevealAnimations();

window.addEventListener("load", () => {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});

const tabs = document.querySelectorAll(".tab");
const products = document.querySelectorAll(".product-card");
const addButtons = document.querySelectorAll(".add-button");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const headerCount = document.querySelector("[data-header-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const orderForm = document.querySelector("[data-order-form]");
const cartLink = document.querySelector(".cart-link");
const smartOrderLinks = document.querySelectorAll("[data-smart-order]");
const floatingCart = document.querySelector("[data-floating-cart]");
const floatingCount = document.querySelector("[data-floating-count]");

const whatsappNumber = "5500000000000";
const cart = new Map();

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const renderCart = () => {
  const items = [...cart.values()];
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems === 1 ? "1 item" : `${totalItems} itens`;
  headerCount.textContent = totalItems;
  floatingCount.textContent = totalItems;
  cartTotal.textContent = formatCurrency(total);
  floatingCart.classList.toggle("is-hidden", totalItems === 0);
  smartOrderLinks.forEach((link) => {
    link.setAttribute("href", totalItems > 0 ? "#pedido" : "#cardapio");
  });

  if (!items.length) {
    cartItems.innerHTML = '<p class="empty-cart">Seu carrinho ainda está vazio.</p>';
    return;
  }

  cartItems.innerHTML = items
    .map(
      (item) => `
        <article class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <small>${item.quantity}x ${formatCurrency(item.price)}</small>
          </div>
          <div class="cart-controls" aria-label="Quantidade de ${item.name}">
            <button type="button" data-cart-action="decrease" data-name="${item.name}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-name="${item.name}">+</button>
          </div>
        </article>
      `
    )
    .join("");
};

const syncView = () => {
  document.body.classList.toggle("order-view", window.location.hash === "#pedido");
};

const addToCart = (name, price) => {
  const current = cart.get(name) || { name, price, quantity: 0 };
  current.quantity += 1;
  cart.set(name, current);
  renderCart();
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    products.forEach((product) => {
      const category = product.dataset.category;
      const visible = filter === "todos" || category === filter || category === "todos";

      product.classList.toggle("is-hidden", !visible);

      if (visible) {
        product.animate(
          [
            { opacity: 0, transform: "translateY(14px) scale(.98)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            duration: 280,
            easing: "cubic-bezier(.16, 1, .3, 1)",
          }
        );
      }
    });
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-name][data-price]");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    addToCart(name, price);
    cartLink.classList.remove("bump");
    void cartLink.offsetWidth;
    cartLink.classList.add("bump");
    button.classList.add("added");
    button.textContent = "Adicionado";
    window.setTimeout(() => {
      button.textContent = "Adicionar";
      button.classList.remove("added");
    }, 900);
  });
});

window.addEventListener("hashchange", syncView);

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;

  const item = cart.get(button.dataset.name);
  if (!item) return;

  if (button.dataset.cartAction === "increase") {
    item.quantity += 1;
  } else {
    item.quantity -= 1;
  }

  if (item.quantity <= 0) {
    cart.delete(item.name);
  } else {
    cart.set(item.name, item);
  }

  renderCart();
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const items = [...cart.values()];
  if (!items.length) {
    alert("Adicione pelo menos um item ao carrinho antes de enviar o pedido.");
    return;
  }

  const data = new FormData(orderForm);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const payment = data.get("pagamento");

  const orderLines = items
    .map((item) => `- ${item.quantity}x ${item.name} (${formatCurrency(item.price)} cada)`)
    .join("\n");

  const message = `Olá! Quero fazer um pedido no Mordida Quente.\n\nPedido:\n${orderLines}\n\nTotal estimado: ${formatCurrency(total)}\n\nNome: ${data.get("nome") || "Não informado"}\nTelefone: ${data.get("telefone") || "Não informado"}\nEndereço: ${data.get("endereco") || "Não informado"}\nComplemento/referência: ${data.get("referencia") || "Não informado"}\nPagamento: ${payment}\nObservações: ${data.get("observacoes") || "Nenhuma"}\n\nPode confirmar meu pedido?`;

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
});

renderCart();
syncView();
