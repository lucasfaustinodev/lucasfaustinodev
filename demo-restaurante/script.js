const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const cartStorageKey = "mordida-quente-premium-cart";
const whatsappNumber = "5500000000000";

const cart = new Map();
let confirmedOrder = null;

const productCards = document.querySelectorAll("[data-category]");
const filters = document.querySelectorAll("[data-filter]");
const addButtons = document.querySelectorAll(".add-to-cart");
const openCartButtons = document.querySelectorAll("[data-open-cart]");
const closeCartButtons = document.querySelectorAll("[data-close-cart]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartBadge = document.querySelector("[data-cart-badge]");
const checkoutTotal = document.querySelector("[data-checkout-total]");
const floatingCart = document.querySelector("[data-floating-cart]");
const floatingCount = document.querySelector("[data-floating-count]");
const clearCartButton = document.querySelector("[data-clear-cart]");
const confirmItemsButton = document.querySelector("[data-confirm-items]");
const backCartButton = document.querySelector("[data-back-cart]");
const orderForm = document.querySelector("[data-order-form]");
const formStatus = document.querySelector("[data-form-status]");
const orderReview = document.querySelector("[data-order-review]");
const reviewItems = document.querySelector("[data-review-items]");
const reviewInfo = document.querySelector("[data-review-info]");
const reviewTotal = document.querySelector("[data-review-total]");
const reviewBack = document.querySelector("[data-review-back]");
const reviewStatus = document.querySelector("[data-review-status]");
const finalizeOrder = document.querySelector("[data-finalize-order]");
const drawerScreens = document.querySelectorAll("[data-drawer-screen]");

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });

const formatMoney = (value) => money.format(value);
const getCartItems = () => [...cart.values()];

const getTotals = () => {
  const items = getCartItems();
  return {
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
};

const setDrawerScreen = (screenName) => {
  drawerScreens.forEach((screen) => {
    screen.hidden = screen.dataset.drawerScreen !== screenName;
  });
};

const openCart = (screenName = "cart") => {
  setDrawerScreen(screenName);
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  updateFloatingCart(getTotals().count);
};

const closeCart = () => {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  updateFloatingCart(getTotals().count);
};

const saveCart = () => {
  localStorage.setItem(cartStorageKey, JSON.stringify(getCartItems()));
};

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(cartStorageKey) || "[]");
    if (!Array.isArray(saved)) return;

    saved.forEach((item) => {
      if (!item.name || !Number.isFinite(item.price) || !Number.isFinite(item.quantity)) {
        return;
      }
      cart.set(item.name, {
        name: item.name,
        price: item.price,
        image: item.image || "assets/images/hero-burger.png",
        quantity: Math.max(1, item.quantity),
      });
    });
  } catch {
    localStorage.removeItem(cartStorageKey);
  }
};

const updateFloatingCart = (count) => {
  if (!floatingCart || !floatingCount) return;

  floatingCount.textContent = count;
  const drawerOpen = cartDrawer.classList.contains("is-open");
  floatingCart.classList.toggle("is-hidden", count === 0 || drawerOpen);
};

const renderCart = () => {
  const items = getCartItems();
  const { count, total } = getTotals();

  cartCount.textContent = count === 1 ? "1 item" : `${count} itens`;
  cartTotal.textContent = formatMoney(total);
  checkoutTotal.textContent = formatMoney(total);
  cartBadge.textContent = count;
  clearCartButton.hidden = count === 0;
  updateFloatingCart(count);

  if (items.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Seu carrinho ainda está vazio. Escolha um item do cardápio para começar.</p>';
    confirmedOrder = null;
    saveCart();
    return;
  }

  cartItems.innerHTML = items
    .map(
      (item) => `
        <article class="cart-item">
          <figure class="cart-thumb">
            <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" />
          </figure>
          <div>
            <strong>${escapeHTML(item.name)}</strong>
            <small>${formatMoney(item.price)}</small>
            <div class="cart-controls" aria-label="Quantidade de ${escapeHTML(item.name)}">
              <button type="button" data-cart-action="decrease" data-name="${escapeHTML(item.name)}">-</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-action="increase" data-name="${escapeHTML(item.name)}">+</button>
            </div>
          </div>
          <strong class="cart-line-total">${formatMoney(item.price * item.quantity)}</strong>
          <button class="remove-item" type="button" data-cart-action="remove" data-name="${escapeHTML(item.name)}" aria-label="Remover ${escapeHTML(item.name)}">×</button>
        </article>
      `,
    )
    .join("");

  saveCart();
};

const addToCart = (item) => {
  const current = cart.get(item.name) || { ...item, quantity: 0 };
  current.quantity += 1;
  cart.set(item.name, current);
  confirmedOrder = null;
  renderCart();
  openCart("cart");
};

const getProductData = (button) => {
  const card = button.closest("[data-name][data-price]");
  if (!card) return null;

  const price = Number(card.dataset.price);
  const image = card.querySelector("img")?.getAttribute("src") || "assets/images/hero-burger.png";
  if (!card.dataset.name || !Number.isFinite(price)) return null;

  return {
    name: card.dataset.name,
    price,
    image,
  };
};

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const active = filter.dataset.filter;

    filters.forEach((item) => {
      item.classList.toggle("active", item === filter);
      item.setAttribute("aria-selected", item === filter ? "true" : "false");
    });

    productCards.forEach((card) => {
      const visible = active === "Todos" || card.dataset.category === active;
      card.hidden = !visible;
    });
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = getProductData(button);
    if (!item) return;

    addToCart(item);
    button.classList.add("is-added");
    button.textContent = "Adicionado";

    window.setTimeout(() => {
      button.classList.remove("is-added");
      button.textContent = button.classList.contains("button")
        ? "Adicionar ao pedido"
        : "Adicionar";
    }, 1000);
  });
});

openCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openCart("cart");
  });
});

closeCartButtons.forEach((button) => {
  button.addEventListener("click", closeCart);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) {
    closeCart();
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;

  const item = cart.get(button.dataset.name);
  if (!item) return;

  if (button.dataset.cartAction === "increase") {
    item.quantity += 1;
    cart.set(item.name, item);
  }

  if (button.dataset.cartAction === "decrease") {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart.delete(item.name);
    } else {
      cart.set(item.name, item);
    }
  }

  if (button.dataset.cartAction === "remove") {
    cart.delete(item.name);
  }

  confirmedOrder = null;
  renderCart();
});

clearCartButton.addEventListener("click", () => {
  cart.clear();
  confirmedOrder = null;
  orderForm.reset();
  renderCart();
  setDrawerScreen("cart");
});

confirmItemsButton.addEventListener("click", () => {
  if (getCartItems().length === 0) return;
  setDrawerScreen("checkout");
});

backCartButton.addEventListener("click", () => {
  setDrawerScreen("cart");
});

const showStatus = (target, message) => {
  target.textContent = message;
};

const collectFormData = () => {
  const data = new FormData(orderForm);
  return {
    endereco: String(data.get("endereco") || "").trim(),
    referencia: String(data.get("referencia") || "").trim(),
    pagamento: String(data.get("pagamento") || "Pix").trim(),
    observacoes: String(data.get("observacoes") || "").trim(),
  };
};

const renderReview = (items, data) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  reviewItems.innerHTML = items
    .map(
      (item) => `
        <article class="review-item">
          <div>
            <strong>${item.quantity}x ${escapeHTML(item.name)}</strong>
            <small>${formatMoney(item.price)} cada.</small>
          </div>
          <strong>${formatMoney(item.price * item.quantity)}</strong>
        </article>
      `,
    )
    .join("");

  reviewInfo.innerHTML = `
    <div class="review-info">
      <span><strong>Endereço:</strong> ${escapeHTML(data.endereco)}</span>
      <span><strong>Referência:</strong> ${escapeHTML(data.referencia || "Não informado.")}</span>
      <span><strong>Pagamento:</strong> ${escapeHTML(data.pagamento)}</span>
      <span><strong>Observações:</strong> ${escapeHTML(data.observacoes || "Nenhuma.")}</span>
    </div>
  `;

  reviewTotal.textContent = formatMoney(total);
};

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showStatus(formStatus, "");

  const items = getCartItems();
  if (items.length === 0) {
    showStatus(formStatus, "Adicione pelo menos um item antes de confirmar.");
    setDrawerScreen("cart");
    return;
  }

  const data = collectFormData();
  if (!data.endereco) {
    showStatus(formStatus, "Informe o endereço de entrega para continuar.");
    return;
  }

  confirmedOrder = {
    items: items.map((item) => ({ ...item })),
    data,
  };

  renderReview(confirmedOrder.items, confirmedOrder.data);
  showStatus(reviewStatus, "");
  setDrawerScreen("review");
});

reviewBack.addEventListener("click", () => {
  setDrawerScreen("checkout");
});

finalizeOrder.addEventListener("click", () => {
  if (!confirmedOrder) {
    showStatus(reviewStatus, "Confirme suas informações antes de finalizar.");
    return;
  }

  const currentItems = getCartItems();
  const currentTotal = currentItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderLines = currentItems
    .map((item) => `${item.quantity}x ${item.name} - ${formatMoney(item.price * item.quantity)}`)
    .join("\n");
  const data = confirmedOrder.data;

  const message = [
    "*NOVO PEDIDO — Mordida Quente*",
    "",
    "*Itens:*",
    orderLines,
    "",
    `*Total:* ${formatMoney(currentTotal)}`,
    "",
    "*Entrega*",
    `Endereço: ${data.endereco}`,
    `Referência: ${data.referencia || "Não informado"}`,
    "",
    `*Pagamento:* ${data.pagamento}`,
  ];

  if (data.observacoes) {
    message.push("", `*Observações:* ${data.observacoes}`);
  }

  const popup = window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.join("\n"))}`,
    "_blank",
    "noopener,noreferrer",
  );

  if (!popup) {
    showStatus(reviewStatus, "Não foi possível abrir o WhatsApp. Verifique o bloqueador de pop-up.");
  }
});

loadCart();
renderCart();
setDrawerScreen("cart");
