# BikeTripFrontend - Dokumentaatio
## Johdanto

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

## Rakenne ja komponentit

Sovelluksessa on neljä komponenttia. Sekö kaksi serviceä.

## Komponentit

## MapComponent:

Angular-komponentti, joka vastaa karttanäkymän hallinnasta ja kaupunkipyöräasemien näyttämisestä kartalla. Se käyttää Leaflet-kirjastoa kartan luomiseen ja kaupunkipyöräasemien merkintöjen lisäämiseen kartalle.

Metodit:

ngAfterViewInit-metodi:
Metodi suoritetaan, kun komponentin näkymä on luotu ja näkyvissä.
Kutsuu initMap-metodia kartan luomiseksi ja getAndDisplayStations-metodia kaupunkipyöräasemien noutamiseksi ja näyttämiseksi kartalla.

initMap-metodi:
Luo Leafletin kartan, asettaa kartan näkymän ja lisää kartalle OpenStreetMap-taustakarttatason.

getAndDisplayStations-metodi:
Kutsuu stationsService-palvelun getStations-metodia kaupunkipyöräasemien tietojen noutamiseksi.
Käy läpi jokaisen kaupunkipyöräaseman tiedot ja lisää merkinnän kartalle Leafletin L.Marker-objektina.

## StationsComponent: 
Angular-komponentti, joka vastaa kaupunkipyöräasemien näyttämisestä ja hakutoiminnallisuudesta. Komponentti käyttää StationsService-palvelua kaupunkipyöräasemien tietojen hakuun ja Router-palvelua reitityksen hallintaan. 

Käytin tässä limit ja offset rajoittaakseni saapuvan datan määrää tietokannasta.

Tärkeimmät metodit ja niiden tarkoitukset:

### ngOnInit(): 
Kutsutaan komponentin alustuksen yhteydessä ja hakee kaupunkipyöräasemat palvelusta.

### ngAfterViewInit(): 
Kutsutaan komponentin näkymän luomisen jälkeen ja asettaa tapahtumankäsittelijän hakukentälle. Reagoi hakukentän muutoksiin ja hakee vastaavat kaupunkipyöräasemat palvelusta.

### searchStations(): 
Kutsutaan hakutoiminnon laukaisemiseksi. Lähettää hakutekstin searchTerm-subjektiin.

### selectStation(index: number): 
Asettaa valitun kaupunkipyöräaseman indeksin, jota käytetään näyttämään aseman tiedot.

### selectHeader(header: string): 
Asettaa valitun otsikon, jota käytetään lajittelun tai ryhmittelyn merkitsemiseen.

### fetchStations(): 
Hakee kaupunkipyöräasemat palvelusta annetuilla rajoituksilla (sivunumero, asemat per sivu) ja päivittää näytettävät asemat ja kokonaismäärän.

### openStationDetails(station: Stations): 
Avaa valitun kaupunkipyöräaseman yksityiskohdat toisessa näkymässä.

### loadNextStations(): 
Lataa seuraavan sivun kaupunkipyöräasemat.

### loadPreviousStations(): 
Lataa edellisen sivun kaupunkipyöräasemat.


## TripsComponent:
On vastuussa hakemaan matkatietoja ja näyttämään ne käyttöliittymässä. 

Tässä on avattuna komponentin metodit:

### ngOnInit(): 
Tämä Angularin elinkaarimetodi suoritetaan komponentin alustuksen yhteydessä. 
Se kutsuu fetchTrips()-metodia matkatietojen hakemiseksi.

### fetchTrips():
Tämä metodi käyttää TripsService-palvelua hakemaan matkatiedot. Se määrittää myös raja-arvot (limit ja offset) pyynnölle sivutetun haun toteuttamiseksi. Vastauksen saavuttua se muokkaa tietoja halutun muodon saamiseksi ja päivittää trips-muuttujan arvon sekä laskee kokonaismatkojen määrän.

### loadNextTrips(): 
Tämä metodi lataa seuraavan sivun matkatietoja.


## StationDetailsComponent
Vastaa aseman yksityiskohtien näyttämisestä käyttöliittymässä. Tässä on avattuna komponentin metodit:

### ngOnInit(): 
Tämä Angularin elinkaarimetodi suoritetaan komponentin alustuksen yhteydessä. Se asettaa station-muuttujan arvon saadun tilan (state) perusteella ja kutsuu getDepartureCount() ja getReturnCount() -metodeja matkalaskujen hakuun.

### getDepartureCount(): 
Tämä metodi käyttää TripsService-palvelua hakeakseen lähtevien matkojen lukumäärän kyseiseltä asemalta. Vastauksen saavuttua se päivittää departureCount-muuttujan arvon.

### getReturnCount(): 
Tämä metodi käyttää TripsService-palvelua hakeakseen palaavien matkojen lukumäärän kyseiseltä asemalta. Vastauksen saavuttua se päivittää returnCount-muuttujan arvon.

### backToStations(): 
Tämä metodi ohjaa takaisin asemien näkymään ('/') käyttäen Angularin reititystä (Router).

Komponentti saa station-tiedon @Input()-dekoroinnin avulla, jolloin komponenttia voidaan käyttää antamalla station-objekti sen sisään komponenttia käytettäessä.


## Services

### StationsService: 
vastaa asemien tietojen hakemisesta palvelimelta.

### getStations(limit: string, offset: string): 
Tämä metodi lähettää HTTP GET -pyynnön palvelimelle käyttäen Angularin HttpClient-moduulia. Pyyntöön liitetään parametrit limit ja offset, jotka määrittävät kuinka monta asemaa haetaan ja miltä indeksistä aloitetaan. Metodi palauttaa Observablen, joka vastaanottaa asemien tiedot tyyppinä Stations[].

### getStationsSearch(searchText: string): 
Tämä metodi suorittaa hakukyselyn palvelimelle, jossa se lähettää HTTP GET -pyynnön parametrina searchText-hakutekstin. Metodi palauttaa Observable, joka vastaanottaa hakutulokset tyyppinä Stations[].


StationsService käyttää HttpClient-moduulia HTTP-pyyntöjen lähettämiseen palvelimelle. Tiettyjen parametrien asettaminen pyyntöihin tapahtuu HttpParams-luokan avulla. Palvelu on määritelty root-tason injektoitavaksi (@Injectable({ providedIn: 'root' })), joten se on käytettävissä koko sovelluksen laajuisesti ilman erillistä injektiota.


### TripsService: 
vastaa matkojen tietojen hakemisesta palvelimelta.

### getTrips(limit: string, offset: string): 
Tämä metodi lähettää HTTP GET -pyynnön palvelimelle käyttäen Angularin HttpClient-moduulia. Pyyntöön liitetään parametrit limit ja offset, jotka määrittävät kuinka monta matkaa haetaan ja miltä indeksistä aloitetaan. Metodi palauttaa Observable, joka vastaanottaa matkojen tiedot tyyppinä Trips[].

### getDepartureCount(stationName: string): 
Tämä metodi lähettää HTTP GET -pyynnön palvelimelle, jossa se hakee pyynnön mukaisen aseman lähtevien pyörien lukumäärän. Pyyntöön liitetään parametri stationName, joka määrittää aseman nimen. Metodi palauttaa Observable, joka vastaanottaa lähtevien pyörien lukumäärän tyyppinä number.

### getReturnCount(stationName: string): 
Tämä metodi lähettää HTTP GET -pyynnön palvelimelle, jossa se hakee pyynnön mukaisen aseman palaavien pyörien lukumäärän. Pyyntöön liitetään parametri stationName, joka määrittää aseman nimen. Metodi palauttaa Observable, joka vastaanottaa palaavien pyörien lukumäärän tyyppinä number.


TripsService käyttää HttpClient-moduulia HTTP-pyyntöjen lähettämiseen palvelimelle. Tiettyjen parametrien asettaminen pyyntöihin tapahtuu HttpParams-luokan avulla. Palvelu on määritelty root-tason injektoitavaksi (@Injectable({ providedIn: 'root' })), joten se on käytettävissä koko sovelluksen laajuis

## API-Dokumentaatio

Löytyy Biketrip_Backend projektista.

## Testaus ja testausohjeet

Tein yksikkötestit TripsServicelle ja StationsServicelle.Testit varmistavat, että palvelut toimivat odotetusti, 
lähettävät oikeat HTTP-pyynnöt ja käsittelevät vastaukset oikein.

Testit hyödyntävät HttpClientTestingModule-moduulia simuloidakseen HTTP-pyyntöjä .

Kummassakin testitapauksessa on ensin luotu testiympäristö käyttäen TestBed.configureTestingModule-metodia. Palvelu on injektoitu TestBed.inject-metodilla, ja HttpTestingController on saatu myös injektoitua tarvittaessa. afterEach-lohkossa httpMock.verify() varmistaa, että kaikki odotetut HTTP-pyynnöt on käsitelty ja vastaukset ovat saapuneet.

Jokaisessa testitapauksessa ensin tarkistetaan, että palvelu on luotu (expect(service).toBeTruthy()). Sen jälkeen tehdään testipyynnöt palveluun ja tarkistetaan odotetut tulokset. httpMock.expectOne-metodi seuraa HTTP-pyyntöä ja req.flush lähettää simuloitun vastauksen.

Nämä testit varmistavat, että StationsService ja TripsService palauttavat odotetut tiedot ja toimivat oikein sovelluksen muiden osien kanssa.

Suorittamalla komentoriviltä ng test voi ajaa testit Karma-testikehyksellä.

Lisäksi käytin eslint TypeScript koodin tarkistamiseen. En integoroinut eslint testien yhteyteen.


## Muuta

Olen toteuttanut kaikki suositellut ominaisuudet sivulle. Lisäksi olen onnistunut toteuttamaan asemien haun tietokannasta niiden nimellä ja näyttämään asemat kartalla niiden koordinaattien perusteella. Alun perin tarkoituksena oli toteuttaa vielä lisää toiminnallisuuksia, mutta valitettavasti aika ei riittänyt siihen. On ollut haasteellista tasapainottaa ajan käyttöä myös samanaikaisen kouluprojektin kanssa.