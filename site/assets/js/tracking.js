/*
 * Piksel Meta (Facebook) + baner zgody na cookies.
 *
 * - ID piksela i ustawienie zgody bierze z config.js (metaPixelId, requireCookieConsent)
 * - piksel ładuje się dopiero po zgodzie (jeśli requireCookieConsent = true)
 * - PageView wysyła automatycznie na każdej stronie, która ładuje ten plik
 * - inne zdarzenia: window.Tracking.track("NazwaZdarzenia", { ...parametry })
 *
 * Tego pliku nie trzeba edytować.
 */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var pixelId = String(cfg.metaPixelId || "").trim();
  var pixelEnabled = /^\d{5,20}$/.test(pixelId);
  var requireConsent = cfg.requireCookieConsent !== false;
  var CONSENT_KEY = "sa_cookie_consent"; // "granted" | "denied"

  var loaded = false;
  var queue = []; // zdarzenia czekające na zgodę (np. Purchase na stronie podziękowania)

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* tryb prywatny itp. */ }
  }
  function storageRemove(key) {
    try { window.localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  function hasConsent() {
    return !requireConsent || storageGet(CONSENT_KEY) === "granted";
  }

  // Standardowy kod Piksela Meta (wersja bez <noscript>, bo ta działałaby bez zgody)
  function loadPixel() {
    if (loaded || !pixelEnabled) return;
    loaded = true;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    queue.splice(0).forEach(function (item) { send(item[0], item[1], item[2]); });
  }

  function send(eventName, params, options) {
    if (options && options.eventID) {
      window.fbq("track", eventName, params || {}, { eventID: options.eventID });
    } else {
      window.fbq("track", eventName, params || {});
    }
    if (options && typeof options.onSent === "function") options.onSent();
  }

  /**
   * Wysyła zdarzenie do piksela.
   * options.queue = true -> jeśli brak jeszcze zgody, zdarzenie poczeka i wyśle się po jej udzieleniu.
   * options.eventID -> identyfikator do deduplikacji (np. z Conversions API).
   * options.onSent -> funkcja wywołana po faktycznym wysłaniu zdarzenia.
   * Zwraca true, jeśli zdarzenie zostało wysłane od razu.
   */
  function track(eventName, params, options) {
    if (!pixelEnabled) return false;
    if (loaded) { send(eventName, params, options); return true; }
    if (options && options.queue && storageGet(CONSENT_KEY) !== "denied") {
      queue.push([eventName, params, options]);
    }
    return false;
  }

  // ---------- Baner cookies ----------
  var banner = null;

  function showBanner() {
    if (banner) { banner.hidden = false; return; }
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Zgoda na pliki cookies");
    banner.innerHTML =
      '<p>Używamy plików cookies i Piksela Meta (Facebook), żeby mierzyć skuteczność naszych reklam. ' +
      'Uruchomimy je tylko za Twoją zgodą. Szczegóły w <a href="polityka-prywatnosci.html">polityce prywatności</a>.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn btn--ghost" data-consent="denied">Odrzucam</button>' +
      '<button type="button" class="btn" data-consent="granted">Akceptuję</button>' +
      "</div>";
    banner.addEventListener("click", function (e) {
      var choice = e.target.getAttribute && e.target.getAttribute("data-consent");
      if (!choice) return;
      var previous = storageGet(CONSENT_KEY);
      storageSet(CONSENT_KEY, choice);
      banner.hidden = true;
      if (choice === "granted") {
        loadPixel();
      } else {
        queue.length = 0;
        // wycofanie wcześniej udzielonej zgody - przeładuj, żeby wyłączyć załadowany piksel
        if (previous === "granted" && loaded) window.location.reload();
      }
    });
    document.body.appendChild(banner);
  }

  function initCookieSettingsLinks() {
    document.querySelectorAll(".js-cookie-settings").forEach(function (link) {
      if (!pixelEnabled || !requireConsent) { link.hidden = true; return; }
      link.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner();
      });
    });
  }

  function init() {
    initCookieSettingsLinks();
    if (!pixelEnabled) return;
    if (hasConsent()) {
      loadPixel();
    } else if (storageGet(CONSENT_KEY) === null) {
      showBanner();
    }
  }

  window.Tracking = {
    track: track,
    hasConsent: hasConsent,
    resetConsent: function () { storageRemove(CONSENT_KEY); showBanner(); }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
