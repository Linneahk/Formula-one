let circuits = [], drivers = [];
let ci = 0, di = 0;

const cc = document.getElementById('circuit-content');
const dc = document.getElementById('driver-content');

const showCircuit = i => {
  const c = circuits[i];
  cc.innerHTML = c ? `
    <div class="overlay">
      <div class="country">${c.country}</div>
      <h4>${c.name}</h4>
      <p>Lengde: ${c.length || 'Ikkje tilgjengeleg'}</p>
      <p>Runder: ${c.rounds || 'Ikkje tilgjengeleg'}</p>
    </div>` : 'Ingen circuits funnet';
  cc.parentElement.style.backgroundImage = `url('${c?.image || 'img/placeholder.jpg'}')`;
};

const showDriver = i => {
  const d = drivers[i];
  dc.innerHTML = d ? `
    <div class="overlay">
      <div class="country">${d.country}</div>
      <h4>${d.name}</h4>
      <p>Team: ${d.team || 'Ikkje tilgjengeleg'}</p>
    </div>` : 'Ingen drivers funnet';
  dc.parentElement.style.backgroundImage = `url('${d?.image || 'img/placeholder.jpg'}')`;
};

fetch('data/circuit.json').then(r=>r.json()).then(d=>{circuits=d;showCircuit(ci);});
fetch('data/driver.json').then(r=>r.json()).then(d=>{drivers=d;showDriver(di);});

document.getElementById('prev-circuit').onclick = ()=>{ ci = (ci>0)?ci-1:circuits.length-1; showCircuit(ci); };
document.getElementById('next-circuit').onclick = ()=>{ ci = (ci<circuits.length-1)?ci+1:0; showCircuit(ci); };
document.getElementById('prev-driver').onclick  = ()=>{ di = (di>0)?di-1:drivers.length-1; showDriver(di); };
document.getElementById('next-driver').onclick  = ()=>{ di = (di<drivers.length-1)?di+1:0; showDriver(di); };

fetch('data/circuit.json')
  .then(r => r.json())
  .then(d => { circuits = d; showCircuit(ci); })
  .catch(err => console.error("Feil i circuit.json:", err));
