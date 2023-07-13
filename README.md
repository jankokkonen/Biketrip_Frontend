# BikeTripFrontend - Dokumentaatio
## Johdanto

https://github.com/solita/dev-academy-2023-exercise

Tämä dokumentti antaa yleiskuvan Biketrip-sovellusprojektista, joka näyttää tietoja Helsingin pääkaupunkiseudulla tehdyistä kaupunkipyörämatkoista.
Projektissa luodaan ja taustapalvelu, joka hakee ja esittää tiedot.

## Teknologiat

Projekti on toteutettu käyttäen seuraavia teknologioita:

HTML

Tailwind CSS: Valitsin Tailwindin, koska Tailwind tarjoaa valmiita tyylimäärittelyjä ja 
komponentteja nopeaan ja joustavaan sivustojen kehitykseen.

Angular: Valitsin projektiin Angularin, koska se on laajalti 
käytetty TypeScript-pohjainen JavaScript-kehys

TypeScript

RxJS: observaatiot ja operaattorit

Leaflet: Valitsin Leaflet karttaohjelmiston, koska siitä on jo hieman kokemusta koulun projektin kautta

git: versionhallinta

npm: paketinhallinta

Docker: Valitsin Dockerin, koska se tarjoaa kätevän ja tehokkaan tavan paketoida sovelluksen ja 
sen riippuvuudet yhtenäiseksi kontiksi. 

## Asennus

Käytin Dockeria projektin kääntämiseen ja luomiseen yhdeksi imageksi, 
mikä helpottaa sovelluksen käyttöönottamista ja suorittamista eri ympäristöissä. 

### Asennusohjeet

Kloonaa GitHubista projektitiedostot paikallisesti koneellesi.

Varmista, että sinulla on Docker asennettuna järjestelmääsi. Voit tarkistaa Dockerin asennuksen komennolla docker --version.

Avaa komentokehote tai terminaali ja siirry Biketrip_Frontend projektikansion juureen.

Varmista, että sinulla on lisätty Biketrip_Backend/data kansioon vaadittavat .csv tiedostot ja
polku korjattu docker-compose.yml tiedostossa osoittamaan oikeaan tiedostoon mistä .csv tiedostot löytyvät.

Käynnistä Docker-kontti käyttäen Docker Composea komennolla: docker-compose up --build 
Tämä komento rakentaa uuden imagen projektista ja käynnistää Docker-kontin frontendin, backendin ja PostgreSQL-tietokannan kanssa.

Kun Docker-kontti on käynnissä, voit avata selaimessa sovelluksen käyttämällä osoitetta http://localhost:4200.

