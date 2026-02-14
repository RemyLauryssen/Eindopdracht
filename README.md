# Celia's Kitchen

## Inleiding

Deze applicatie opgezet om een alles-in-een-toepassing te bieden voor een kleinschalig huiskamerrestaurant.
In de frontend heb je daarom de mogelijkheid om als admin de menukaart aan te passen, producten toe te voegen aan de webshop,
reserveringen te bekijken en je krijgt een overzicht van bestellingen die via de webshop zijn geplaatst.
Een gebruiker die geen admin is, maar wel een ingelogde gebruiker, heeft de mogelijkheid om producten in de webshop 
in zijn winkelwagen te plaatsen en de producten vervolgens te bestellen.
Een openbare, niet-ingelogde gebruiker heeft toegang tot de algemene pagina's van de website, zoals het menu,
de reserveringsfunctie en de webshop, al is het plaatsen van bestellingen via de webshop alleen mogelijk als ingelogde gebruiker.


# Benodigdheden
## Frontend
De frontend maakt gebruik van een combinatie van React en Vite om de applicatie te kunnen draaien.

## Backend
De backend is gebouwd op een combinate van Spring Boot (3.2.5) met Maven (4.0.0) en heeft de volgende projectstructuur:
<pre> 
src/
├── main/
│   ├── java/
│   │   ├── nl/
│   │       ├── novi/
│   │           ├── webshop/
│   │               ├── config/
│   │               │   ├── GlobalCorsConfiguration.java
│   │               │   └── OauthSecurityConfiguration.java
│   │               ├── controllers/
│   │               │   ├── MenuController.java
│   │               │   ├── OrderController.java
│   │               │   ├── ProductController.java
│   │               │   └── ReservationDetailsController.java
│   │               ├── dtos/
│   │               │   ├── menu/
│   │               │   │   ├── MenuRequestDTO.java
│   │               │   │   └── MenuResponseDTO.java
│   │               │   ├── order/
│   │               │   │   ├── OrderRequestDTO.java
│   │               │   │   └── OrderResponseDTO.java
│   │               │   ├── product/
│   │               │   │   ├── ProductRequestDTO.java
│   │               │   │   └── ProductResponseDTO.java
│   │               │   ├── reservationDetails/
│   │               │       ├── ReservationDetailsRequestDTO.java
│   │               │       ├── ReservationDetailsResponseDTO.java
│   │               │       └── ReservationStatusUpdateDTO.java
│   │               ├── entities/
│   │               │   ├── BaseEntity.java
│   │               │   ├── MenuEntity.java
│   │               │   ├── OrderEntity.java
│   │               │   ├── OrderItem.java
│   │               │   ├── ProductEntity.java
│   │               │   ├── ReservationDetailsEntity.java
│   │               │   └── ReservationStatus.java
│   │               ├── exceptions/
│   │               │   ├── BadRequestException.java
│   │               │   └── RecordNotFoundException.java
│   │               ├── helpers/
│   │               │   ├── GlobalExceptionHandler.java
│   │               │   └── UrlHelper.java
│   │               ├── mappers/
│   │               │   ├── DTOMapper.java
│   │               │   ├── MenuDTOMapper.java
│   │               │   ├── OrderDTOMapper.java
│   │               │   ├── ProductDTOMapper.java
│   │               │   └── ReservationDetailsDTOMapper.java
│   │               ├── repositories/
│   │               │   ├── MenuRepository.java
│   │               │   ├── OrderRepository.java
│   │               │   ├── ProductRepository.java
│   │               │   └── ReservationDetailsRepository.java
│   │               ├── services/
│   │               │   ├── ImageService.java
│   │               │   ├── MenuService.java
│   │               │   ├── OrderService.java
│   │               │   ├── ProductService.java
│   │               │   └── ReservationDetailsService.java
│   │               └── WebshopApplication.java
│   ├── resources/
│       ├── static/
│       ├── templates/
│       ├── application.properties
│       └── data.sql
├── test/
├── java/
│   ├── nl/
│       ├── novi/
│           ├── webshop/
│               ├── controllers/
│               │   ├── MenuControllerIntegrationTest.java
│               │   └── ReservationControllerIntegrationTest.java
│               ├── services/
│               │   ├── MenuServiceTest.java
│               │   └── ReservationDetailsServiceTest.java
│               └── WebshopApplicationTests.java
├── resources/
└── application-test.properties
</pre>
De Maven-dependencies die worden gebruikt om de backend te runnen zijn als volgt:
 - spring-boot-starter-web

 - spring-boot-starter-data-jpa

 - spring-boot-starter-validation

 - spring-boot-starter-security

 - spring-boot-starter-oauth2-resource-server

Daarnaast is er nog een dependency voor het runnen van de database (in dit geval postgres, zie hieronder):
 - postgresql

En een dependency voor het ophalen van API-documentatie (Swagger):
 - springdoc-openapi-starter-webmvc-ui

Voor het uitvoeren van testen worden de volgende dependencies gebruikt:
 - spring-boot-starter-test

- spring-security-test

- junit-jupiter

- h2 (test scope)

## Keycloak
Voor het gebruikersbeheer wordt gebruikgemaakt van Keycloak versie 26.5.1 (zie [documentatie](https://www.keycloak.org/)) voor het configureren van de verschillende Clients en de bijbehorende gebruikersrollen:
Voor dit project is gebruikgemaakt van twee clients in één realm: Webshop-frontend en Webshop-backend.
Er zijn twee verschillende gebruikersrollen (afgezien van de derde, anonieme, gebruiker): USER en ADMIN.

## Postgres
Voor de database wordt gebruikgemaakt van postgres 18, en voor het beheer ervan wordt pgAdmin 4 versie 9.9 (zie [documentatie](https://www.pgadmin.org/)) gebruikt.
De applicatie bevat al een voorgevuld data.sql-bestand met enkele voorbeelden van hoe de lokaal gedraaide server gevuld moet worden.

# Stappenplan
Voor het runnen van deze applicatie wordt het aanbevolen om het volgende stappenplan te volgen:

Allereerst moeten pgAdmin 4 en Keycloak worden uitgevoerd. Er wordt hierbij vanuit gegaan dat deze inmiddels geïnstalleerd zijn.
1. Voer in de terminal de volgende commando's uit:
   `cd C:\[locatie]\keycloak-26.5.1\keycloak-26.5.1`
    `bin\kc.bat start-dev --http-port=9090`
2. Ga naar https://localhost:9090 en configureer Keycloak met de volgende configuraties:
 De realm:
 - Webshop
 Twee afzonderlijke Client-ID's:
 - Webshop-frontend: Client authentication uitgeschakeld;
 - Webshop-backend: Client authentication ingeschakeld.
Voor beide mag Standard flow en Direct access grants worden ingeschakeld.

Een token-mapper voor zowel de frontend als de backend:
 - Type: audience;
 - Add to ID token: ingeschakeld;
 - Add to access token: ingeschakeld;
 - Add to lightweight access token: uitgeschakeld;
 - Add to token introspection: ingeschakeld;
Vervolgens kunnen er een of meerdere gebruikers aan de client worden toegevoegd:
 - Minimaal één met de rolnaam USER.
 - Minimaal één met de rolnaam ADMIN.
Geef ze beide in ieder geval een voornaam, achternaam, e-mailadres en wachtwoord mee.
Vergeet niet om in de Realm settings het volgende in te schakelen:
 - User registration,
 - Forgot password,
 - Email as username,
 - Login with email;

4. Voor postgres wordt standaard de gebruiker `postgres` gebruikt en de naam van de database is `webshop` en postgres draait op `poort 5432`.
   (Voor het standaard wachtwoord heb ik `password` gebruikt, maar dit kan later nog worden gewijzigd.)

Vervolgens moet ervoor worden gezorgd dat de applicatie wordt opgestart.
5. Open de directory in je IDE en blader naar het bestand 'WebshopApplication'.
6. Klik vervolgens op de knop om de applicatie te runnen.

Tot slot moet ook de frontend-applicatie worden uitgevoerd.
7. Run in de terminal van je IDE het commando `npm install`.
   (Het is ook mogelijk dat afzonderlijke modules nog geïnstalleerd moeten worden.
    Voor het huidige project moeten dan de volgende onderdelen worden geïnstalleerd:
    - keycloak-js: `npm install keycloak-js`;
    - axios: `npm install axios`;
    - embla-carousel: `npm install embla-carousel-autoplay --save`;
    - jwt-decode: `npm install jwt-decode@2.2.0`;
    - vite: `npm install vite-plugin-svgr --save-dev`;
7. Uiteindelijk zou het mogelijk moeten zijn om het project te draaien door `npm run dev` in te voeren in de terminal. Deze zou moeten worden uitgevoerd op https://localhost:5173.

Het project zou nu naar behoren moeten draaien!

# Tests
Voor het testen van de verschillende endpoints kan gebruik worden gemaakt van Postman of de endpoints kunnen in de applicatie worden getest.
Dit zijn de endpoints van de applicatie, inclusief de authenticatie:
 - Vrij toegankelijk:
    - GET-requests:
        - `/`
        - `/menu`
        - `/menu/**`
        - `/products`
        - `/products/*`
        - `products/*/image/**`
    - POST-requests:
      - `/reservation-details`
      - `/reservation-details/*`
    - De Swagger-ui:
      - `/swagger-ui/**`
      - `/v3/api-docs/**`
      
 - Toegankelijk met de USER-authenticatie:
   - GET-requests:
     - `/orders/*`
   - POST-requests:
     - `/orders/**`

- Toegankelijk met de ADMIN-authenticatie:
  - Alle requests in het admin-menu:
    - `/admin/**`
  - POST-requests:
    - `/products/**`
    - `/products/create/**`
  - PUT-requests:
    - `/menu/**`
    - `/reservation-details/*`
  - PATCH-requests:
    - `/reservation-details/*/status`
  - DELETE-requests:
    - `/menu/*`
    - `/reservation-details/*`
    - `/products/*`
    - `/products/*/image`

Hopelijk heb je veel plezier bij en nut van het gebruik van deze applicatie!