/*
 * Logika strony sprzedażowej (bez bibliotek).
 * - wstawia wartości z config.js w elementy z atrybutem data-config
 * - ustawia link płatności na przyciskach .js-buy
 * - pokazuje przyklejony przycisk zakupu na telefonie
 * Treści i ustawienia edytuj w config.js / index.html - tego pliku nie trzeba ruszać.
 */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

  function get(path) {
    return path.split(".").reduce(function (o, k) {
      return o && o[k] !== undefined ? o[k] : undefined;
    }, cfg);
  }

  function isFilled(value) {
    return typeof value === "string" && value.trim() !== "" && !/UZUPE[LŁ]NIJ/i.test(value);
  }

  // ---------- 1. Wartości z konfiguracji ----------
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var value = get(el.getAttribute("data-config"));
    if (value === undefined || value === null) return;
    value = String(value);
    var prefix = el.getAttribute("data-prefix");
    if (prefix !== null) {
      // pola opcjonalne (np. NIP) - ukryj, gdy puste
      if (value.trim() === "") { el.hidden = true; return; }
      value = prefix + value;
    }
    el.textContent = value;
  });

  document.querySelectorAll("[data-config-mailto]").forEach(function (el) {
    var email = get(el.getAttribute("data-config-mailto"));
    if (email) el.setAttribute("href", "mailto:" + email);
  });

  var year = document.querySelector(".js-year");
  if (year) year.textContent = new Date().getFullYear();

  var trainingsLink = document.querySelector(".js-trainings-link");
  if (trainingsLink && isFilled(cfg.trainingsUrl)) {
    trainingsLink.href = cfg.trainingsUrl;
    trainingsLink.hidden = false;
  }

  // ---------- 2. Przyciski zakupu ----------
  var paymentUrl = cfg.paymentUrl;
  var paymentReady = isFilled(paymentUrl) && /^https?:\/\//.test(paymentUrl);
  var product = cfg.product || {};

  document.querySelectorAll(".js-buy").forEach(function (btn) {
    if (paymentReady) btn.href = paymentUrl;

    btn.addEventListener("click", function (e) {
      if (!paymentReady) {
        e.preventDefault();
        alert("Link do płatności nie jest jeszcze ustawiony (config.js → paymentUrl).");
        return;
      }

      // Zdarzenie InitiateCheckout dla Piksela Meta (jeśli jest aktywny)
      var tracked = window.Tracking && window.Tracking.track("InitiateCheckout", {
        value: Number(product.price) || 0,
        currency: product.currency || "PLN",
        content_ids: [product.sku],
        content_name: product.name,
        content_type: "product",
        num_items: 1
      });

      // Jeśli zdarzenie zostało wysłane, dajmy mu chwilę na dotarcie przed przejściem
      // do płatności. Klik z Ctrl/środkowym przyciskiem (nowa karta) zostawiamy w spokoju.
      if (tracked && !(e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1)) {
        e.preventDefault();
        setTimeout(function () { window.location.href = paymentUrl; }, 300);
      }
    });
  });

  // ---------- 3. Przyklejony przycisk na telefonie ----------
  var sticky = document.querySelector(".sticky-cta");
  var heroCta = document.querySelector(".hero .cta");
  var finalCta = document.querySelector(".final-cta");

  if (sticky && heroCta && "IntersectionObserver" in window) {
    var heroVisible = true;
    var heroPassed = false;
    var finalVisible = false;

    var update = function () {
      var show = !heroVisible && heroPassed && !finalVisible;
      sticky.classList.toggle("is-visible", show);
      sticky.setAttribute("aria-hidden", show ? "false" : "true");
      var link = sticky.querySelector("a");
      if (link) link.tabIndex = show ? 0 : -1;
    };

    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      heroPassed = entries[0].boundingClientRect.top < 0;
      update();
    }).observe(heroCta);

    if (finalCta) {
      new IntersectionObserver(function (entries) {
        finalVisible = entries[0].isIntersecting;
        update();
      }).observe(finalCta);
    }
  }
})();
