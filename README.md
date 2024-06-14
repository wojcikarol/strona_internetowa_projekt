# Strona Tytułowa Uczelni

## Akademia Tarnowska

---

#### Tytuł Projektu: 
**Aplikacja o Tematyce Pogodowej**

---

#### Numer Projektu: 
**21**

---

#### Autor: 
**Jakub Wiatr 36414, Karol Wójcik 36421**

---

#### Kierunek Studiów: 
**Informatyka**

---

#### Data:
**14.06.2024**

---

# Aplikacja Pogodowa

Aplikacja Pogodowa to interaktywna aplikacja webowa umożliwiająca uzyskanie bieżących informacji pogodowych dla wybranego miasta oraz prognozy na najbliższe godziny i dni. Aplikacja wykorzystuje API OpenWeatherMap do pobierania danych pogodowych.

## Technologie
- HTML5
- CSS3
- JavaScript (ES6+)
- API OpenWeatherMap
- XML

## Sposób uruchomienia
1. Pobierz wszystkie pliki i umieść je w jednym katalogu.
2. Otwórz plik `index.html` w przeglądarce.

## Interfejs użytkownika
- **Nagłówek**: Tytuł aplikacji oraz przycisk zmiany motywu.
- **Główna sekcja**: Podzielona na trzy części - lewa sekcja, sekcja pogodowa, prawa sekcja.
- **Formularz wyszukiwania**: Wyszukiwanie miasta i wyświetlanie sugestii.
- **Sekcja wyników pogody**: Aktualna temperatura, opis pogody, wiatr, wilgotność, widoczność, ikona pogodowa.
- **Prognoza pogody**: Prognoza na najbliższe dni i godziny.
- **Lista najczęściej wyszukiwanych miast**: Wyświetlanie najczęściej wyszukiwanych miast.

## Funkcjonalności

### Wyszukiwanie miast
Użytkownik może wprowadzić nazwę miasta w formularzu wyszukiwania, a aplikacja wyświetli sugestie na podstawie wprowadzonych liter. Po wybraniu miasta aplikacja pobierze i wyświetli aktualne dane pogodowe.

### Sugestie miast
Podczas wpisywania nazwy miasta, aplikacja dynamicznie pokazuje sugestie miast, które pasują do wprowadzonych liter, korzystając z API OpenWeatherMap.

### Bieżące informacje pogodowe
Po wybraniu miasta aplikacja wyświetla aktualną temperaturę, opis pogody, prędkość i kierunek wiatru, wilgotność oraz widoczność. Dodatkowo pokazuje odpowiednią ikonę pogody.

### Prognoza pogody
Aplikacja prezentuje prognozę pogody na najbliższe godziny oraz dni. Użytkownik może zobaczyć przewidywane warunki pogodowe, takie jak temperatura, opady deszczu, wiatr i inne istotne informacje.

### Przełączanie motywu (ciemny/jasny)
Aplikacja oferuje możliwość przełączania między motywem ciemnym a jasnym, aby dostosować wygląd interfejsu do preferencji użytkownika. Przycisk do zmiany motywu znajduje się w nagłówku.

### Lista najczęściej wyszukiwanych miast
Aplikacja prowadzi rejestr najczęściej wyszukiwanych miast i wyświetla je w sekcji bocznej. Użytkownicy mogą szybko uzyskać informacje o pogodzie w tych miastach, klikając na ich nazwy.

## Instrukcja instalacji i uruchomienia
1. Pobierz i rozpakuj pliki aplikacji.
2. Otwórz folder i wpisz w terminalu `npm run start`.
3. Uruchomi się serwer na `localhost:3000`.
4. Aplikacja jest gotowa do użycia.

---