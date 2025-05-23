Global News and Weather

Student: Tomescu-Dumitrescu Mihnea, Grupa 1134

Link Video - Prezentare Proiect: [TBD]
Link Publicare: [TBD]

1. Introducere

Global News and Weather este o aplicație web modernă dezvoltată cu React, TypeScript și Vite care oferă utilizatorilor informații meteorologice în timp real și ultimele știri din întreaga lume. Aplicația demonstrează integrarea seamless a serviciilor cloud prin intermediul API-urilor REST, oferind o experiență de utilizare responsivă și intuitivă.

Proiectul prezintă practici moderne de dezvoltare web incluzând:

- TypeScript pentru siguranța tipurilor și o experiență de dezvoltare îmbunătățită
- Vite pentru dezvoltare rapidă și build-uri optimizate
- SCSS pentru stilizare mentenabilă
- Arhitectură bazată pe componente cu React
- Integrarea API-urilor REST cu gestionarea erorilor

Aplicația permite utilizatorilor să caute orice oraș din lume și să vizualizeze atât condițiile meteorologice curente cât și știrile relevante pentru acea locație, totul într-o interfață unificată și ușor de utilizat.

2. Descrierea Problemei

În lumea noastră interconectată, accesarea informațiilor actualizate despre condițiile meteorologice și evenimentele curente este crucială pentru luarea deciziilor informate. Totuși, aceasta necesită de obicei navigarea între platforme diferite, creând o experiență fragmentată pentru utilizatori.

Provocările identificate:

Fragmentarea Informației

- Utilizatorii trebuie să navigheze între platforme diferite pentru a obține informații meteorologice și știri
- Lipsa unei viziuni unificate asupra informațiilor contextuale

Relevanța Contextuală

- Vremea și știrile ar trebui să fie geografic relevante pentru interesele utilizatorului
- Necesitatea corelării informațiilor bazate pe locație

Experiența Utilizatorului

- Nevoia unei interfețe unificate și responsive care funcționează pe toate dispozitivele
- Importanța unei navigări intuitive și rapide

Prospețimea Datelor

- Accesul în timp real la condițiile meteorologice curente și știrile de ultimă oră
- Actualizarea automată a informațiilor când utilizatorul schimbă locația

Soluția Propusă

Aplicația noastră oferă un dashboard centralizat unde utilizatorii pot accesa atât prognoze meteorologice cât și articole de știri pentru orice locație din lume, cu capacități de filtrare și un design modern, responsive.

3. Descrierea API-urilor

Această aplicație integrează două API-uri REST puternice bazate pe cloud pentru a livra informații comprehensive:

OpenWeatherMap API

Scop: Furnizează date meteorologice comprehensive incluzând condițiile curente și prognoze
URL de bază: https://api.openweathermap.org/data/2.5/
Autentificare: Cheie API (transmisă ca parametru appid)
Limitări: 60 apeluri/minut, 1,000 apeluri/zi (tier gratuit)
Format date: JSON

Endpoint-uri utilizate:

- GET /weather - Date meteorologice curente pentru o locație specifică
- GET /forecast - Prognoză meteorologică pe 5 zile cu interval de 3 ore

Caracteristici:

- Date meteorologice globale pentru peste 200,000 de orașe
- Informații detaliate: temperatură, umiditate, vânt, presiune
- Iconuri meteorologice pentru reprezentare vizuală
- Suport pentru multiple unități de măsură

The Guardian API

Scop: Livrează titluri de știri și articole de la The Guardian
URL de bază: https://content.guardianapis.com/
Autentificare: Cheie API (transmisă ca parametru api-key)
Limitări: 5,000 cereri/zi (tier gratuit)
Format date: JSON

Endpoint-uri utilizate:

- GET /search - Căutare articole cu filtrare și sortare

Caracteristici:

- Conținut de înaltă calitate de la o sursă de știri reputată
- Filtrare după secțiuni (politică, business, tehnologie, etc.)
- Căutare bazată pe locație pentru relevanță contextuală
- Miniaturi și rezumate pentru articole

Arhitectura Integrării API-urilor

Aplicația folosește un pattern de service layer cu interfețe TypeScript pentru a asigura siguranța tipurilor:

// Service layer gestionează toate comunicările API
export const weatherApi = {
getCurrentWeather: async (city: string, country: string): Promise<CurrentWeatherData>
getForecast: async (city: string, country: string): Promise<ForecastData>
}

export const newsApi = {
getTopHeadlines: async (city: string, country: string, section: string): Promise<GuardianArticle[]>
}

4. Fluxul de Date

Exemple de Request/Response

OpenWeatherMap - Vremea Curentă

Cerere HTTP:
GET https://api.openweathermap.org/data/2.5/weather?q=Bucuresti,ro&units=metric&appid=YOUR_API_KEY
Accept: application/json
User-Agent: News-Weather-Dashboard/1.0

Răspuns:
{
"coord": {
"lon": 26.1063,
"lat": 44.4323
},
"weather": [
{
"id": 800,
"main": "Clear",
"description": "cer senin",
"icon": "01d"
}
],
"main": {
"temp": 22.05,
"feels_like": 21.79,
"temp_min": 20.12,
"temp_max": 24.18,
"pressure": 1015,
"humidity": 56
},
"wind": {
"speed": 3.09,
"deg": 10
},
"sys": {
"country": "RO",
"sunrise": 1621309119,
"sunset": 1621363012
},
"name": "Bucuresti",
"dt": 1621345578
}

The Guardian API - Căutare Știri

Cerere HTTP:
GET https://content.guardianapis.com/search?api-key=YOUR_API_KEY&show-fields=headline,trailText,thumbnail&page-size=15&order-by=newest&q="Bucuresti"%20OR%20"Romania"&section=world
Accept: application/json
User-Agent: News-Weather-Dashboard/1.0

Răspuns:
{
"response": {
"status": "ok",
"userTier": "developer",
"total": 127,
"startIndex": 1,
"pageSize": 15,
"currentPage": 1,
"pages": 9,
"results": [
{
"id": "world/2023/nov/15/romania-elections-update",
"type": "article",
"sectionId": "world",
"sectionName": "World news",
"webPublicationDate": "2023-11-15T14:30:00Z",
"webTitle": "România: Alegeri parlamentare decisive pentru viitorul țării",
"webUrl": "https://www.theguardian.com/world/2023/nov/15/romania-elections",
"apiUrl": "https://content.guardianapis.com/world/2023/nov/15/romania-elections",
"fields": {
"headline": "România se pregătește pentru alegeri cruciale",
"trailText": "Alegerile parlamentare din România ar putea remodela peisajul politic al țării...",
"thumbnail": "https://media.guim.co.uk/romania-elections-thumb.jpg"
}
}
]
}
}

Autentificare și Securitate

Ambele API-uri necesită autentificare prin cheie API:

Autentificare OpenWeatherMap:
const response = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
);

Autentificare The Guardian:
const response = await axios.get(
`https://content.guardianapis.com/search?api-key=${API_KEY}&q=${searchQuery}`
);

Considerații de Securitate:

- Cheile API sunt stocate în variabile de mediu (VITE_WEATHER_API_KEY, VITE_GUARDIAN_API_KEY)
- Stocarea client-side expune cheile în build-urile de producție

Fluxul de Date al Aplicației

Input Utilizator (Oraș, Țară)
↓
Componenta Header
↓
Actualizare State App (Locația)
↓
Apeluri API Paralele:
├── Weather API (Curent + Prognoză)
└── News API (Știri bazate pe locație)
↓
Procesare Date & Actualizare State
↓
Re-render Componente:
├── WeatherDashboard (Vremea curentă + prognoză 5 zile)
└── NewsDashboard (Articole de știri filtrate)

5. Capturi de Ecran ale Aplicației

6. Referințe

Documentații API

- OpenWeatherMap API Documentation: https://openweathermap.org/api - Documentația completă pentru API-ul meteorologic
- The Guardian Open Platform: https://open-platform.theguardian.com/documentation/ - Ghid complet pentru The Guardian API
- OpenWeatherMap Weather Icons: https://openweathermap.org/weather-conditions - Lista completă de iconuri meteorologice

Note de Implementare

Stack Tehnologic:

- Frontend: React 18 + TypeScript + Vite
- Styling: SCSS cu design responsive
- HTTP Client: Axios pentru cererile API
- Development: ESLint + TypeScript compiler
- Deployment: Vercel

Funcționalități Cheie:

- Căutare locații globale
- Vremea în timp real cu prognoze pe 5 zile
- Știri bazate pe locație cu filtrare după categorii
- Design responsive pentru toate dispozitivele
- Gestionarea erorilor și loading states
- TypeScript pentru siguranța tipurilor
