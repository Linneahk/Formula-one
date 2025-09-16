//  søkeskjema på forsiden 
document.querySelector(".search-form")?.addEventListener("submit", e => {
  e.preventDefault(); 
  const q = document.getElementById("search").value.trim(); // Henter teksten fra input-feltet
  if (q) {
    // Sender brukeren til DC.html og legger søket som parameter i URL-en
    // Eksempel: DC.html?search=hamilton
    location.href = "DC.html?search=" + encodeURIComponent(q);
  }
});

let circuits = [], drivers = []; // Tomme arrays som skal fylles med JSON-data
let ci = 0, di = 0;              // Indexer for hvilken bane (circuit) og fører (driver) vi viser

// Henter referanser til HTML-elementene der data skal vises
const cc = document.getElementById('circuit-content');
const dc = document.getElementById('driver-content');

 
function showCircuit(i) {
  const c = circuits[i]; // Henter banen med index i
  if (!c) return;        // Stopper hvis banen ikke finnes
  cc.innerHTML = `       // Lager HTML med informasjonen om banen
    <div class="overlay">
      <div class="country">${c.country || ""}</div>
      <h4>${c.name || ""}</h4>
      <p>${c.length ? "Length: " + c.length : ""}</p>
      <p>${c.rounds ? "Rounds: " + c.rounds : ""}</p>
    </div>`;
  
  cc.parentElement.style.backgroundImage = c.image ? `url('${c.image}')` : "none";
}


function showDriver(i) {
  const d = drivers[i]; // Henter sjåfør med index i
  if (!d) return;
  dc.innerHTML = `       // Viser navn, team, nummer og land
    <div class="overlay">
      <div class="country">${d.country || ""}</div>
      <h4>${d.name || ""}</h4>
      <p>${d.Team ? "Team: " + d.Team : ""}</p>
      <p>${d.number ? "Number: " + d.number : ""}</p>
    </div>`;
  
  dc.parentElement.style.backgroundImage = d.image ? `url('${d.image}')` : "none";
}


document.getElementById('prev-circuit').onclick = () => { 
  // Hvis vi ikke er på første, gå tilbake. Hvis vi er på første, hopp til siste.
  ci = (ci > 0) ? ci - 1 : circuits.length - 1; 
  showCircuit(ci); // Oppdater visningen
};
document.getElementById('next-circuit').onclick = () => { 
  // Hvis vi ikke er på siste, gå fremover. Hvis vi er på siste, hopp til første.
  ci = (ci < circuits.length - 1) ? ci + 1 : 0; 
  showCircuit(ci);
};
document.getElementById('prev-driver').onclick  = () => { 
  di = (di > 0) ? di - 1 : drivers.length - 1;
  showDriver(di);
};
document.getElementById('next-driver').onclick  = () => { 
  di = (di < drivers.length - 1) ? di + 1 : 0;
  showDriver(di);
};

//  Sjekk om me er på DC.html, og vis søkeresultat 
if (location.pathname.endsWith("DC.html")) {
  // Hent søket fra URL-en (?search=)
  const q = new URLSearchParams(location.search).get("search")?.toLowerCase();
  if (q) {
    // Last begge JSON-filene (drivers og circuits)
    Promise.all([
      fetch("data/driver.json").then(r => r.json()),
      fetch("data/circuit.json").then(r => r.json())
    ]).then(([d, c]) => {
      drivers = d; // Lagre driver-data
      circuits = c; // Lagre circuit-data

      // Finn driver som matcher søket (bruker .includes for delvis match)
      let di = drivers.findIndex(x => x.name.toLowerCase().includes(q));
      if (di >= 0) showDriver(di);

      // Finn circuit som matcher søket
      let ci = circuits.findIndex(x => x.name.toLowerCase().includes(q));
      if (ci >= 0) showCircuit(ci);
    });
  }
}


Promise.all([
  fetch('data/circuit.json').then(r => r.json()), // Hent circuit.json
  fetch('data/driver.json').then(r => r.json())   // Hent driver.json
]).then(([cData, dData]) => {
  circuits = cData; // Lagre circuit-data
  drivers = dData;  // Lagre driver-data
  showCircuit(ci);  // Vis første circuit
  showDriver(di);   // Vis første driver

  // Hvis vi er på DC.html og har ?search i URL-en → vis riktig treff
  if (location.pathname.endsWith("DC.html")) {
    const q = new URLSearchParams(location.search).get("search")?.toLowerCase();
    if (q) {
      // Søk i drivers
      let d = drivers.findIndex(x => x.name.toLowerCase().includes(q));
      if (d >= 0) { di = d; showDriver(di); }
      // Søk i circuits
      let c = circuits.findIndex(x => x.name.toLowerCase().includes(q));
      if (c >= 0) { ci = c; showCircuit(ci); }
    }
  }
});
