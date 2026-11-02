# Strona sprzedażowa poradnika „Grafiki i wideo z AI”

Landing page Skillset Academy pod reklamy na Facebooku (Meta Ads). Czysty HTML + CSS + trochę JavaScriptu – bez bibliotek, bez instalowania czegokolwiek.

- `CLAUDE.md` – opis projektu i wymagań
- `ZALOZENIA.md` – decyzje podjęte podczas budowy strony (warto przeczytać)

## Struktura

```
site/                         ← to jest cała strona (tylko ten katalog trafia do internetu)
├── config.js                 ← CENA, LINK PŁATNOŚCI, ID PIKSELA, dane sprzedawcy
├── index.html                ← strona sprzedażowa (teksty, rozdziały, FAQ)
├── dziekujemy.html           ← strona po zakupie (zdarzenie Purchase)
├── regulamin.html            ← szablon regulaminu
├── polityka-prywatnosci.html ← szablon polityki prywatności
├── robots.txt
└── assets/
    ├── css/style.css         ← wygląd (kolory na górze pliku)
    ├── js/main.js            ← przyciski, przyklejony przycisk na telefonie
    ├── js/tracking.js        ← Piksel Meta + baner cookies
    ├── js/purchase.js        ← zdarzenie Purchase
    ├── img/                  ← okładka, favicon, obrazek do udostępniania
    └── przyklady/            ← grafiki i filmy do sekcji „Przykłady prac”
.github/workflows/pages.yml   ← automatyczna publikacja na GitHub Pages
```

Pliki najprościej edytować bezpośrednio na GitHubie: otwórz plik → ikona ołówka → zmień → **Commit changes**. Po zapisaniu zmian w gałęzi `main` strona sama się zaktualizuje w ciągu 1–2 minut.

> Wszystko, co trzeba uzupełnić przed startem, jest oznaczone napisem **UZUPEŁNIJ**. Wyszukaj go w plikach (na GitHubie: klawisz `/` lub wyszukiwarka repozytorium).

---

## 1. Cena

Plik `site/config.js`:

```js
price: 29,          // liczba - trafia do Piksela Meta (wartość konwersji)
currency: "PLN",
priceLabel: "29 zł", // tak cena wyświetla się na stronie
```

Zmień **obie** wartości: `price` (liczba, grosze po kropce, np. `29.99`) i `priceLabel` (tekst, np. `"29,99 zł"`). Cena zmieni się automatycznie we wszystkich przyciskach i w sekcji zakupu.

## 2. Link do płatności

Plik `site/config.js`:

```js
paymentUrl: "https://twoj-link-do-platnosci",
```

Wklej link ze swojego systemu płatności (Stripe Payment Link, Przelewy24, EasyCart, Gumroad itp.). Wszystkie przyciski „Kup” prowadzą tam. Dopóki link nie jest ustawiony, kliknięcie przycisku pokazuje komunikat.

**W systemie płatności ustaw przekierowanie po udanej płatności** na:

```
https://ADRES-TWOJEJ-STRONY/dziekujemy.html
```

(np. `https://damianset.github.io/landing-poradnik/dziekujemy.html`). Tylko wtedy Piksel zarejestruje zakup.

Dodatkowo w systemie płatności:
- ustaw automatyczną wysyłkę PDF (link do pobrania) e-mailem po zakupie,
- dodaj obowiązkowy checkbox o zgodzie na dostarczenie treści cyfrowej przed upływem 14 dni i utracie prawa odstąpienia (patrz §5 regulaminu).

## 3. ID Piksela Meta

Plik `site/config.js`:

```js
metaPixelId: "123456789012345",
```

ID znajdziesz w Menedżerze zdarzeń Meta (Events Manager) → Twój piksel → ustawienia. Wpisz same cyfry. Puste `""` = piksel wyłączony.

Zdarzenia wysyłane przez stronę:

| Zdarzenie | Kiedy |
|---|---|
| `PageView` | wejście na każdą podstronę |
| `InitiateCheckout` | kliknięcie dowolnego przycisku zakupu (z ceną i walutą) |
| `Purchase` | wejście na `dziekujemy.html` (z ceną i walutą, raz na 24 h na przeglądarkę) |

**Ważne:** piksel uruchamia się dopiero po kliknięciu „Akceptuję” w banerze cookies (wymóg RODO / Prawa komunikacji elektronicznej). Można to wyłączyć (`requireCookieConsent: false`), ale nie jest to zalecane.

**Jak sprawdzić, czy działa:** zainstaluj w Chrome rozszerzenie *Meta Pixel Helper*, wejdź na stronę, zaakceptuj cookies i kliknij przycisk zakupu. Albo użyj zakładki „Testuj zdarzenia” w Menedżerze zdarzeń.

## 4. Teksty

Wszystkie teksty sprzedażowe są w `site/index.html`. Każda sekcja jest oznaczona komentarzem, np. `<!-- ================= DLA KOGO ================= -->`. Zmieniaj tekst między znacznikami, nie ruszając samych znaczników (`<p>`, `<li>` itd.).

Do uzupełnienia:
- **tytuły 7 rozdziałów** – sekcja `SPIS ROZDZIAŁÓW`, zamień `[UZUPEŁNIJ: tytuł rozdziału X]`. Jeśli nie chcesz opisów pod tytułami, zostaw `<span class="chapters__desc"></span>` puste – zniknie.
- punkty w sekcji **„Czego się nauczysz”** – dopasuj do faktycznej treści poradnika,
- opis **ściągawki** w sekcji `BONUS`,
- odpowiedzi w **FAQ** oznaczone `UZUPEŁNIJ` (sposób dostarczenia, liczba stron, faktury),
- tytuł i opis strony w `<head>` (to widać w Google i przy udostępnianiu linku).

Dane sprzedawcy (stopka) i link do szkoleń Skillset Academy uzupełnia się w `config.js` (`seller`, `trainingsUrl`).

### Okładka

Wrzuć plik do `site/assets/img/` (np. `okladka.webp`) i w `index.html` w sekcji `NAGŁÓWEK (HERO)` zamień blok `<div class="cover">…</div>` na kod podany w komentarzu obok.

### Przykłady prac (grafiki i wideo)

Wrzuć pliki do `site/assets/przyklady/` i w sekcji `PRZYKŁADY PRAC` w `index.html` zamień kafelki „Miejsce na…” na gotowy kod z komentarza (osobny wzór dla grafiki i dla wideo). Wskazówki:
- grafiki: `.webp` lub `.jpg`, ok. 800 px szerokości,
- wideo: `.mp4`, krótkie i skompresowane (najlepiej poniżej 5 MB), z kadrem-okładką (`poster`).

### Opinie

Sekcja opinii jest celowo pusta i ukryta. Gdy zbierzesz **prawdziwe** opinie klientów (za ich zgodą), postępuj zgodnie z komentarzem w sekcji `OPINIE` w `index.html`.

### Kolory

Na górze pliku `site/assets/css/style.css` są zmienne kolorów (`--c-primary` – kolor marki, `--c-accent` – kolor przycisków zakupu).

## 5. Regulamin i polityka prywatności

`site/regulamin.html` i `site/polityka-prywatnosci.html` to **szablony** – miejsca do uzupełnienia są oznaczone `[UZUPEŁNIJ: ...]` i wyświetlają się na żółto. Po uzupełnieniu i weryfikacji usuń żółtą ramkę „Szablon do uzupełnienia” na górze każdego dokumentu.

## 6. Publikacja (GitHub Pages)

Jednorazowo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Potem każda zmiana w gałęzi `main` publikuje się automatycznie (zakładka **Actions** pokazuje postęp). Adres strony: `https://<użytkownik>.github.io/<nazwa-repozytorium>/`.

Własna domena: Settings → Pages → Custom domain (i rekord DNS u rejestratora domeny). Po zmianie adresu zaktualizuj przekierowanie po płatności.

### Podgląd na własnym komputerze

```bash
python3 -m http.server 8000 -d site
```

i otwórz `http://localhost:8000`.

## 7. Kolejny poradnik / wersja angielska

1. Skopiuj katalog `site/` (do nowego repozytorium razem z `.github/` albo do podkatalogu, np. `site-en/`).
2. Zmień `config.js` (nazwa, cena, link płatności, `sku`; ID piksela może zostać to samo).
3. Podmień teksty w `index.html`, okładkę i przykłady.
4. Dla wersji angielskiej: zmień `lang="pl"` na `lang="en"` we wszystkich plikach HTML, przetłumacz teksty (także w `tracking.js` – treść banera cookies – i w `main.js` – komunikat o braku linku), regulamin i politykę dostosuj do rynku docelowego.
5. Jeśli publikujesz z innego katalogu niż `site/`, zmień `path: site` w `.github/workflows/pages.yml`.
