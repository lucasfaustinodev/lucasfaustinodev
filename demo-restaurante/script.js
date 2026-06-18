document.documentElement.classList.add("js-enabled");

const revealItems = document.querySelectorAll(
  ".hero-panel, .snap-strip article, .section-heading, .combo-card, .menu-header, .tabs, .product-card, .order-heading, .order-layout, .footer"
);
let revealTicking = false;

const updateRevealItems = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const revealStart = viewportHeight * 0.88;
  const resetAfterTop = viewportHeight * -0.16;
  const resetBeforeBottom = viewportHeight * 1.04;

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const shouldShow = rect.top < revealStart && rect.bottom > 0;
    const shouldReset = rect.bottom < resetAfterTop || rect.top > resetBeforeBottom;

    if (shouldShow) {
      item.classList.add("is-visible");
    } else if (shouldReset) {
      item.classList.remove("is-visible");
    }
  });

  revealTicking = false;
};

const requestRevealUpdate = () => {
  if (revealTicking) return;
  revealTicking = true;
  window.requestAnimationFrame(updateRevealItems);
};

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--delay", `${Math.min(index * 10, 80)}ms`);
});

window.addEventListener("scroll", requestRevealUpdate, { passive: true });
window.addEventListener("resize", requestRevealUpdate);
window.addEventListener("load", requestRevealUpdate);
window.addEventListener("pageshow", requestRevealUpdate);
window.visualViewport?.addEventListener("resize", requestRevealUpdate);
requestRevealUpdate();

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
