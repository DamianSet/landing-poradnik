/*
 * ===================================================================
 *  KONFIGURACJA STRONY - to jest jedyny plik, który MUSISZ edytować
 *  przed startem kampanii.
 *
 *  Zasady edycji:
 *  - zmieniaj tylko wartości po dwukropku, zostaw cudzysłowy "..."
 *  - każda linia (poza ostatnią w bloku) kończy się przecinkiem
 *  - wszystko oznaczone "UZUPEŁNIJ" trzeba podmienić przed startem
 * ===================================================================
 */
window.SITE_CONFIG = {

  /* ---------- PRODUKT ---------- */
  product: {
    name: "Grafiki i wideo z AI",
    brand: "Skillset Academy",
    format: "poradnik PDF",

    // Cena - liczba z kropką jako separatorem, np. 29 albo 29.99
    price: 29, // UZUPEŁNIJ: docelowa cena
    currency: "PLN", // kod waluty (PLN, EUR, USD...) - używany też przez Piksel Meta

    // Jak cena ma się wyświetlać na stronie (np. "29 zł", "29,99 zł")
    priceLabel: "29 zł", // UZUPEŁNIJ: zgodnie z ceną powyżej

    // Identyfikator produktu przekazywany do Piksela Meta (dowolny, bez spacji)
    sku: "poradnik-grafiki-wideo-ai"
  },

  /* ---------- PŁATNOŚĆ ---------- */
  // Link do strony płatności (np. Stripe Payment Link, Przelewy24, EasyCart,
  // Gumroad, Lemon Squeezy...). Wszystkie przyciski "Kup" prowadzą tutaj.
  // Po opłaceniu operator płatności powinien przekierować klienta na:
  //   https://TWOJA-DOMENA/dziekujemy.html
  paymentUrl: "https://UZUPELNIJ-LINK-DO-PLATNOSCI", // UZUPEŁNIJ

  /* ---------- PIKSEL META (Facebook) ---------- */
  // Sam numer ID piksela z Menedżera zdarzeń, np. "123456789012345".
  // Zostaw pusty "" żeby wyłączyć piksel (np. podczas testów).
  metaPixelId: "", // UZUPEŁNIJ

  // true = piksel uruchamia się dopiero po zgodzie użytkownika w banerze
  // cookies (zalecane - wymóg prawa UE/PL). false = bez banera.
  requireCookieConsent: true,

  /* ---------- DANE SPRZEDAWCY (stopka, regulamin, polityka) ---------- */
  seller: {
    name: "UZUPEŁNIJ: imię i nazwisko / nazwa firmy",
    address: "UZUPEŁNIJ: ulica, kod pocztowy, miasto",
    nip: "UZUPEŁNIJ: NIP", // jeśli nie dotyczy, wpisz ""
    email: "UZUPELNIJ@example.com" // UZUPEŁNIJ: e-mail kontaktowy
  },

  /* ---------- SZKOLENIA SKILLSET ACADEMY ---------- */
  // Link do strony ze szkoleniami AI. Zostaw "" żeby ukryć link na stronie.
  trainingsUrl: "" // UZUPEŁNIJ (opcjonalnie)
};
