# Założenia projektowe

Decyzje podjęte samodzielnie tam, gdzie opis projektu (`CLAUDE.md`) nie rozstrzygał sprawy.
Każdą z nich można zmienić - obok podaję, gdzie.

## Technologia i struktura

1. **Czysty HTML + CSS + odrobina JavaScriptu, bez frameworków i bez kroku budowania.**
   Strona ma być lekka i szybka na telefonie z reklamy. Brak zależności = nic się nie zestarzeje i nie trzeba niczego instalować.
2. **Cała strona leży w katalogu `site/`.** Do GitHub Pages trafia wyłącznie ten katalog (pliki `README.md`, `CLAUDE.md`, `ZALOZENIA.md` nie są publikowane).
   Kolejny poradnik = skopiowanie katalogu `site/` (do nowego repozytorium albo podkatalogu) i podmiana treści oraz `config.js`.
3. **Wszystkie ścieżki są względne**, więc strona działa zarówno pod adresem `https://uzytkownik.github.io/landing-poradnik/`, jak i pod własną domeną czy w podkatalogu.
4. **Ustawienia "biznesowe" (cena, link płatności, ID piksela, dane sprzedawcy) są w jednym pliku `site/config.js`.**
   Teksty sprzedażowe są bezpośrednio w HTML (łatwiej je czytać i edytować w kontekście, a strona wyświetla się bez czekania na JavaScript).
   Elementy z atrybutem `data-config="..."` są uzupełniane wartościami z `config.js` (cena, nazwa sprzedawcy, e-mail itd.), więc cenę zmienia się w jednym miejscu.
5. **Bez zewnętrznych czcionek** - systemowy zestaw czcionek (szybciej, brak zapytań do Google Fonts, brak problemu z RODO).
6. **Wersja anglojęzyczna**: zakładam osobną kopię katalogu (np. `site-en/` lub osobne repo) z przetłumaczonym HTML i `lang="en"`. Nie budowałem mechanizmu tłumaczeń - przy jednej stronie to zbędna komplikacja.

## Sprzedaż i płatności

7. **Operator płatności nie jest znany** - przycisk "Kup" prowadzi do dowolnego linku z `config.js` (`paymentUrl`). Działa ze Stripe Payment Links, Przelewy24, EasyCart, Gumroad itp.
8. **Po płatności operator ma przekierować klienta na `dziekujemy.html`** - tam strzela zdarzenie `Purchase`. Wysyłkę PDF zakładam po stronie operatora płatności / systemu sprzedaży (e-mail z linkiem do pobrania). Strona podziękowania o tym informuje, ale sama pliku nie udostępnia (żeby nie dało się go pobrać bez płacenia).
9. **Cena domyślna `29 zł` to tylko wartość przykładowa** - właściciel wpisuje właściwą w `config.js`.
10. **Brak przekreślonej "starej" ceny i liczników czasu.** Promocja z przekreśloną ceną wymaga (dyrektywa Omnibus) pokazania najniższej ceny z 30 dni, a sztuczne liczniki są nieuczciwą praktyką. Strona pokazuje po prostu cenę.
11. **Prawo odstąpienia od umowy**: dla treści cyfrowych konsument traci je, jeśli przed pobraniem wyraził zgodę i przyjął to do wiadomości. Regulamin zawiera taki zapis jako szablon - zgodę trzeba zebrać przy płatności (checkbox u operatora płatności). Zaznaczone w szablonie do weryfikacji.

## Piksel Meta i cookies

12. **Baner zgody na cookies, piksel ładuje się dopiero po kliknięciu "Akceptuję".** W Polsce/UE piksel marketingowy wymaga uprzedniej zgody. Można to wyłączyć w `config.js` (`requireCookieConsent: false`), ale nie zalecam.
    Konsekwencja: osoby, które nie zaakceptują cookies, nie będą liczone w statystykach reklam.
13. **Zgoda zapamiętywana w `localStorage`** przeglądarki, z możliwością zmiany przez link "Ustawienia cookies" w stopce.
14. **Zdarzenia:**
    - `PageView` - na każdej stronie (po zgodzie),
    - `InitiateCheckout` - po kliknięciu dowolnego przycisku zakupu (z wartością i walutą); przejście do płatności następuje po ok. 0,3 s, żeby zdarzenie zdążyło się wysłać,
    - `Purchase` - na `dziekujemy.html` (z wartością i walutą). Zabezpieczenie przed podwójnym liczeniem przy odświeżeniu: zdarzenie wysyła się raz na przeglądarkę na 24 h (znacznik w `localStorage`).
15. **Brak tagu `<noscript>` z pikselem** - działałby bez zgody użytkownika.
16. **Brak Conversions API (serwerowego)** - GitHub Pages to hosting statyczny. Jeśli operator płatności ma integrację z Meta CAPI, warto ją włączyć u niego.
17. `dziekujemy.html` ma `noindex`, żeby nie trafiała do Google.

## Treść

18. **Tytuły 7 rozdziałów** - wyraźne miejsca `[UZUPEŁNIJ: tytuł rozdziału X]` w `site/index.html`.
19. **Sekcja opinii jest pusta i ukryta** (atrybut `hidden`) z komentarzem w HTML, jak ją włączyć. Żadnych wymyślonych opinii ani liczb sprzedaży.
20. **Przykłady prac** - kafelki z napisem "Miejsce na grafikę/wideo". Pliki wrzuca się do `site/assets/przyklady/`, instrukcja w komentarzu HTML i README.
21. **Bez obietnic zarobków i wyników** - teksty mówią o nauce umiejętności, nie o efektach finansowych. FAQ zawiera uczciwą informację, że efekty zależą od praktyki.
22. **Szkolenia Skillset Academy** - krótka wzmianka w sekcji bonus/po zakupie; link pokazuje się tylko, gdy uzupełni się `trainingsUrl` w `config.js`.
23. **Narzędzia AI** - w tekstach nie wymieniam konkretnych nazw narzędzi (nie znam treści poradnika, a narzędzia szybko się zmieniają). Właściciel może je dopisać.
24. **Regulamin i polityka prywatności** - to szablony, NIE porady prawne. Miejsca do uzupełnienia oznaczone `[UZUPEŁNIJ: ...]` i wyróżnione na żółto, żeby nie dało się ich przeoczyć.
