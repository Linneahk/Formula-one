let circuits = [], drivers = [];
let ci = 0, di = 0;

const cc = document.getElementById('circuit-content');
const dc = document.getElementById('driver-content');

function showCircuit(i) {
  const c = circuits[i];
  if (!c) return;
  cc.innerHTML = `
    <div class="overlay">
      ${c.country ? `<div class="country">${c.country}</div>` : ""}
      ${c.name ? `<h4>${c.name}</h4>` : ""}
      ${c.length ? `<p>Length: ${c.length}</p>` : ""}
      ${c.rounds ? `<p>Rounds: ${c.rounds}</p>` : ""}
    </div>`;
  cc.parentElement.style.backgroundImage = c.image ? `url('${c.image}')` : "none";
}

function showDriver(i) {
  const d = drivers[i];
  if (!d) return;
  dc.innerHTML = `
    <div class="overlay">
      ${d.country ? `<div class="country">${d.country}</div>` : ""}
      ${d.name ? `<h4>${d.name}</h4>` : ""}
      ${d.Team ? `<p>Team: ${d.Team}</p>` : ""}
      ${d.number ? `<p>Number: ${d.number}</p>` : ""}
    </div>`;
  dc.parentElement.style.backgroundImage = d.image ? `url('${d.image}')` : "none";
}

fetch('data/circuit.json').then(r=>r.json()).then(d=>{circuits=d;showCircuit(ci);});
fetch('data/driver.json').then(r=>r.json()).then(d=>{drivers=d;showDriver(di);});

document.getElementById('prev-circuit').onclick = ()=>{ ci = (ci>0)?ci-1:circuits.length-1; showCircuit(ci); };
document.getElementById('next-circuit').onclick = ()=>{ ci = (ci<circuits.length-1)?ci+1:0; showCircuit(ci); };
document.getElementById('prev-driver').onclick  = ()=>{ di = (di>0)?di-1:drivers.length-1; showDriver(di); };
document.getElementById('next-driver').onclick  = ()=>{ di = (di<drivers.length-1)?di+1:0; showDriver(di); };
