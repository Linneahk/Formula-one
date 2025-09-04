let circuits = [], drivers = [];
let ci = 0, di = 0;

const cc = document.getElementById('circuit-content');
const dc = document.getElementById('driver-content');

// VIS CIRCUIT
function showCircuit(i) {
  const c = circuits[i];
  if (!c) {
    cc.textContent = 'Ingen circuits funnet';
    return;
  }
  cc.innerHTML = `
    <img src="${c.image}" alt="${c.name}" style="width:120px; float:left; margin-right:10px; border-radius:5px;">
    <div>
      <h4>${c.name}</h4>
      <p>Land: ${c.country}</p>
      <p>Lengde: ${c.length}</p>
      <p>Runder: ${c.rounds}</p>
    </div>
  `;
}

// VIS DRIVER
function showDriver(i) {
  const d = drivers[i];
  if (!d) {
    dc.textContent = 'Ingen drivers funnet';
    return;
  }
  dc.innerHTML = `
    <img src="${d.image}" alt="${d.name}" style="width:120px; float:left; margin-right:10px; border-radius:5px;">
    <div>
      <h4>${d.name}</h4>
      <p>Team: ${d.team}</p>
      <p>Land: ${d.country}</p>
    </div>
  `;
}

// HENT CIRCUITS
fetch('circuit.json')
  .then(r => r.json())
  .then(data => {
    circuits = data;
    showCircuit(ci);
  });

// HENT DRIVERS
fetch('drivers.json')
  .then(r => r.json())
  .then(data => {
    drivers = data;
    showDriver(di);
  });

// KNAPPAR
document.getElementById('prev-circuit').onclick = () => {
  if (ci > 0) showCircuit(--ci);
};
document.getElementById('next-circuit').onclick = () => {
  if (ci < circuits.length - 1) showCircuit(++ci);
};

document.getElementById('prev-driver').onclick = () => {
  if (di > 0) showDriver(--di);
};
document.getElementById('next-driver').onclick = () => {
  if (di < drivers.length - 1) showDriver(++di);
};
