/*
 * Zdarzenie Purchase dla Piksela Meta - ładowane tylko na stronie dziekujemy.html.
 * Wartość i waluta pochodzą z config.js.
 * Ochrona przed podwójnym liczeniem: przy odświeżeniu strony (lub ponownym wejściu
 * w ciągu 24 h z tej samej przeglądarki) zdarzenie nie zostanie wysłane drugi raz.
 */
(function () {
  "use strict";

  if (!window.Tracking) return;

  var product = (window.SITE_CONFIG || {}).product || {};
  var KEY = "sa_purchase_sent_at";
  var DAY = 24 * 60 * 60 * 1000;

  var last = 0;
  try { last = Number(window.localStorage.getItem(KEY)) || 0; } catch (e) { /* ignore */ }
  if (Date.now() - last < DAY) return;

  var eventId = "purchase-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);

  window.Tracking.track("Purchase", {
    value: Number(product.price) || 0,
    currency: product.currency || "PLN",
    content_ids: [product.sku],
    content_name: product.name,
    content_type: "product",
    num_items: 1
  }, {
    queue: true, // jeśli klient jeszcze nie zaakceptował cookies - wyślij po akceptacji
    eventID: eventId,
    onSent: function () {
      try { window.localStorage.setItem(KEY, String(Date.now())); } catch (e) { /* ignore */ }
    }
  });
})();
