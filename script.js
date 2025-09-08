document.querySelector(".search-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const q = document.getElementById("search").value.trim();
  if (q) {
    location.href = "DC.html?search=" + encodeURIComponent(q);
  }
});


let circuits = [], drivers = [];
let ci = 0, di = 0;

const cc = document.getElementById('circuit-content');
const dc = document.getElementById('driver-content');

// --- visning ---
function showCircuit(i) {
  const c = circuits[i]; if (!c) return;
  cc.innerHTML = `
    <div class="overlay">
      <div class="country">${c.country || ""}</div>
      <h4>${c.name || ""}</h4>
      <p>${c.length ? "Length: " + c.length : ""}</p>
      <p>${c.rounds ? "Rounds: " + c.rounds : ""}</p>
    </div>`;
  cc.parentElement.style.backgroundImage = c.image ? `url('${c.image}')` : "none";
}
function showDriver(i) {
  const d = drivers[i]; if (!d) return;
  dc.innerHTML = `
    <div class="overlay">
      <div class="country">${d.country || ""}</div>
      <h4>${d.name || ""}</h4>
      <p>${d.Team ? "Team: " + d.Team : ""}</p>
      <p>${d.number ? "Number: " + d.number : ""}</p>
    </div>`;
  dc.parentElement.style.backgroundImage = d.image ? `url('${d.image}')` : "none";
}

// --- knapper ---
document.getElementById('prev-circuit').onclick = () => { ci = (ci>0)?ci-1:circuits.length-1; showCircuit(ci); };
document.getElementById('next-circuit').onclick = () => { ci = (ci<circuits.length-1)?ci+1:0; showCircuit(ci); };
document.getElementById('prev-driver').onclick  = () => { di = (di>0)?di-1:drivers.length-1; showDriver(di); };
document.getElementById('next-driver').onclick  = () => { di = (di<drivers.length-1)?di+1:0; showDriver(di); };

// --- søkeskjema på forsiden ---
document.querySelector(".search-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const q = document.getElementById("search").value.trim();
  if (q) location.href = "DC.html?search=" + encodeURIComponent(q);
});

// --- Bare på DC.html: vis søk ---
if (location.pathname.endsWith("DC.html")) {
  const q = new URLSearchParams(location.search).get("search")?.toLowerCase();
  if (q) {
    // Vent til begge JSON-filene er ferdig lasta
    Promise.all([
      fetch("data/driver.json").then(r => r.json()),
      fetch("data/circuit.json").then(r => r.json())
    ]).then(([d, c]) => {
      drivers = d;
      circuits = c;

      // Sjekk driver
      let di = drivers.findIndex(x => x.name.toLowerCase().includes(q));
      if (di >= 0) showDriver(di);

      // Sjekk circuit
      let ci = circuits.findIndex(x => x.name.toLowerCase().includes(q));
      if (ci >= 0) showCircuit(ci);
    });
  }
}



// --- last data og håndter søk ---
Promise.all([
  fetch('data/circuit.json').then(r => r.json()),
  fetch('data/driver.json').then(r => r.json())
]).then(([cData, dData]) => {
  circuits = cData; drivers = dData;
  showCircuit(ci); showDriver(di);

  // hvis vi er på DC.html med ?search=
  if (location.pathname.endsWith("DC.html")) {
    const q = new URLSearchParams(location.search).get("search")?.toLowerCase();
    if (q) {
      let d = drivers.findIndex(x => x.name.toLowerCase().includes(q));
      if (d >= 0) { di = d; showDriver(di); }
      let c = circuits.findIndex(x => x.name.toLowerCase().includes(q));
      if (c >= 0) { ci = c; showCircuit(ci); }
    }
  }
});
